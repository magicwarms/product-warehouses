import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe, VersioningType } from '@nestjs/common';

async function bootstrap() {
  const config: ConfigService = new ConfigService();
  const app = await NestFactory.create(AppModule);

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    stopAtFirstError: true,
    forbidNonWhitelisted: true,
    enableDebugMessages: config.get<string>('APP_ENV') === "development"
  }));

  app.enableShutdownHooks();

  await app.listen(config.get<string>('APP_PORT'));
}

bootstrap();
