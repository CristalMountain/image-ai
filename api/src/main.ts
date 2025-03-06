import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: ['https://ui-beryl-nine.vercel.app', 'http://localhost:3000'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTION'],
    credentials: true,
  });

  await app.listen(process.env.PORT ?? 8080, '0.0.0.0');
}

bootstrap();
