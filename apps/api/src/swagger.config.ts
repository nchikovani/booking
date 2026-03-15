import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';
import { ApiSuccessResponseDto, ApiErrorResponseDto } from './common/dto/api-response.dto';
import { AppConfigService } from './config/app-config.service';

export function setupSwagger(app: INestApplication): void {

  const config = new DocumentBuilder()
    .setTitle('Booking API')
    .setDescription('API для платформы онлайн-записи')
    .setVersion('1.0.0')
    .addBearerAuth()
    .addCookieAuth('refreshToken', {
      type: 'apiKey',
      in: 'cookie',
      name: 'refreshToken',
    })
    .build();

  const document = SwaggerModule.createDocument(app, config, {
    extraModels: [ApiSuccessResponseDto, ApiErrorResponseDto],
  });
  SwaggerModule.setup('swagger', app, document, {
    useGlobalPrefix: false,
    jsonDocumentUrl: '/swagger-json',
  });
}
