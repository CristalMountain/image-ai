import { Controller, Get, Query } from '@nestjs/common';
import { S3Service } from './s3.service';

@Controller('s3')
export class S3Controller {
  constructor(private readonly s3Service: S3Service) {}

  @Get('get-image-url')
  async getPresignedUrl(@Query('filename') filename: string) {
    if (!filename) {
      return { error: 'Filename is required' };
    }
    const url = await this.s3Service.getPresignedUrl(filename);
    return { url };
  }
}
