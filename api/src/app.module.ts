import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { UploadController } from './s3/upload.controller';
import { S3Service } from './s3/s3.service';
import { GetController } from './s3/get.controller';
import { ImageService } from './image/image.service';
import { ImageController } from './image/image.controller';
import { OpenAIService } from './ai/openai.service';
import { S3Controller } from './s3/s3.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    AuthModule,
  ],
  controllers: [UploadController, GetController, ImageController, S3Controller],
  providers: [S3Service, ImageService, OpenAIService],
})
export class AppModule {}
