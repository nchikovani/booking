import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';
import { ApiSuccessResponseDto, ApiErrorResponseDto } from './common/dto/api-response.dto';

export function setupSwagger(app: INestApplication): void {
  const config = new DocumentBuilder()
    .setTitle('Booking API')
    .setDescription('API для платформы онлайн-записи')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config, {
    extraModels: [ApiSuccessResponseDto, ApiErrorResponseDto],
  });
  SwaggerModule.setup('swagger', app, document, {
    useGlobalPrefix: false,
    jsonDocumentUrl: '/swagger-json',
  });
}
