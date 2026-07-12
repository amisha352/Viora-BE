import { NestFactory } from '@nestjs/core';
import { VersioningType } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { GlobalExceptionFilter } from './common/filters/global-exception.filter';
import { CustomValidationPipe } from './common/pipes/validation.pipe';
import { buildSwaggerDocument, swaggerCustomOptions } from './config/swagger.config';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  const apiPrefix = configService.get<string>('app.apiPrefix', 'api');
  const apiVersion = configService.get<string>('app.apiVersion', 'v1');
  const port = configService.get<number>('app.port', 3000);
  const corsOrigin = configService.get<string>('app.corsOrigin', '*');

  app.setGlobalPrefix(apiPrefix);
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: apiVersion.replace('v', ''),
  });

  app.enableCors({ origin: corsOrigin });
  app.useGlobalFilters(new GlobalExceptionFilter());
  app.useGlobalPipes(new CustomValidationPipe());

  const swaggerConfig = buildSwaggerDocument();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup(`${apiPrefix}/docs`, app, document, swaggerCustomOptions);

  await app.listen(port);
}

bootstrap();
