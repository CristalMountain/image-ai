import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { S3Service } from './s3/s3.service';
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
  controllers: [S3Controller],
  providers: [S3Service, OpenAIService],
})
export class AppModule {}
