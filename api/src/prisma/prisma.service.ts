import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { withAccelerate } from '@prisma/extension-accelerate';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  async onModuleInit() {
    const prisma = new PrismaClient().$extends(withAccelerate());
    await prisma.$connect();
  }

  async onModuleDestroy() {
    const prisma = new PrismaClient().$extends(withAccelerate());
    await prisma.$disconnect();
  }
}
