import {
  Controller,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  Req,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { S3Service } from '../s3/s3.service';
import { PrismaService } from '../prisma/prisma.service';
import { OpenAIService } from 'src/ai/openai.service';

@Controller('upload')
export class UploadController {
  constructor(
    private readonly s3Service: S3Service,
    private readonly prisma: PrismaService,
    private readonly openaiService: OpenAIService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(FileInterceptor('file'))
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
}
