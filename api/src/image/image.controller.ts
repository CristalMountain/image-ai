import { Controller, Get, Param, UseGuards, Request } from '@nestjs/common';
import { ImageService } from './image.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('images')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @UseGuards(JwtAuthGuard)
  @Get(':key')
  async getPresignedUrl(@Param('key') key: string, @Request() req) {
    return { url: await this.imageService.getPresignedUrl(key) };
  }
}
