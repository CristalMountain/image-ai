import {
  S3Client,
  PutObjectCommand,
  ListObjectsCommand,
  GetObjectCommand,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { File as MulterFile } from 'multer';
import { PrismaService } from 'src/prisma/prisma.service';

dotenv.config();

@Injectable()
export class S3Service {
  private s3: S3Client;
  private bucketName = process.env.AWS_S3_BUCKET_NAME;
  private readonly prisma: PrismaService;

  constructor(prisma: PrismaService) {
    this.prisma = prisma;
    const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
    const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

    if (!accessKeyId || !secretAccessKey) {
      throw new Error('AWS credentials are not defined');
    }

    this.s3 = new S3Client({
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
    });
  }

  async uploadFile(file: MulterFile, userId: string) {
    const fileKey = `uploads/${userId}/${Date.now()}-${file.originalname}`;

    const uploadParams = {
      Bucket: this.bucketName,
      Key: fileKey,
      Body: file.buffer,
      ContentType: file.mimetype,
    };

    await this.s3.send(new PutObjectCommand(uploadParams));

    return `https://${this.bucketName}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileKey}`;
  }

  async getFiles(userId: string) {
    const listParams = {
      Bucket: this.bucketName,
      Prefix: `uploads/${userId}/`,
    };

    const data = await this.s3.send(new ListObjectsCommand(listParams));

    if (!data.Contents) {
      return [];
    }

    return data.Contents.map((item) => {
      return `https://${this.bucketName}.s3.${process.env.AWS_REGION}.amazonaws.com/${item.Key}`;
    });
  }

  async getItemS3Url(id: string) {
    return this.prisma.image.findUnique({
      where: { id },
      select: { s3Url: true },
    });
  }

  async getPresignedUrl(fileKey: string): Promise<string> {
    const command = new GetObjectCommand({
      Bucket: this.bucketName,
      Key: fileKey,
    });

    return getSignedUrl(this.s3, command, { expiresIn: 3600 }); // 1 hour
  }
}
