import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'https://icesi-marketplace-frontend.vercel.app',
    credentials: true,
  });
  await app.listen(5000);
}
bootstrap();
