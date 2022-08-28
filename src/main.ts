import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DeckModule } from './modules/deck/deck.module';

async function bootstrap() {
  const app = await NestFactory.create(DeckModule);

  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  await app.listen(3000);
  Logger.log(`Url for Swagger [OpenApi]: ${await app.getUrl()}/docs`);
}
bootstrap();
