import {
  Controller,
  Get,
  Post,
  Query,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { S3Service } from './s3.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { OpenAIService } from 'src/ai/openai.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('s3')
export class S3Controller {
  constructor(
    private readonly s3Service: S3Service,
    private readonly prisma: PrismaService,
    private readonly openaiService: OpenAIService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post('image')
  @UseInterceptors(FileInterceptor('image'))
  async uploadImage(@UploadedFile() file: File, @Req() req) {
    const userId = req.user.id;
    const imageUrl = await this.s3Service.uploadFile(file, userId);
    const description = await this.openaiService.generateDescription(file);

    const image = await this.prisma.image.create({
      data: {
        userId,
        s3Url: imageUrl,
        description,
      },
    });

    return { message: 'Upload successful', image };
  }

  @UseGuards(JwtAuthGuard)
  @Get('images')
  async getAllImages(@Req() req) {
    const userId = req.user.id;

    const images = await this.prisma.image.findMany({
      where: {
        userId,
      },
    });

    if (!images.length) {
      return { message: 'No images found' };
    }

    return { message: 'Images fetched successfully', images };
  }

  @Get('image')
  async getPresignedUrl(@Query('filename') filename: string) {
    if (!filename) {
      return { error: 'Filename is required' };
    }
    const url = await this.s3Service.getPresignedUrl(filename);
    return { url };
  }
}
