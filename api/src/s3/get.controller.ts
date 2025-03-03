import { Controller, Get, UseGuards, Req, Param } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { S3Service } from '../s3/s3.service';
import { PrismaService } from '../prisma/prisma.service';

@Controller('files')
export class GetController {
  constructor(
    private readonly s3Service: S3Service,
    private readonly prisma: PrismaService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('all')
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

    const imageUrls = await this.s3Service.getFiles(userId);

    return { message: 'Images fetched successfully', imageUrls };
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getImage(@Param('id') id: string) {
    return this.s3Service.getItemS3Url(id);
  }
}
