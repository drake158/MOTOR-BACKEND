import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // CORS para que el frontend (3000) hable con backend (3001)
  app.enableCors({
    origin: [/^http:\/\/localhost:3\d{3}$/],
    credentials: true,
  });

  // Validación global de DTOs
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  // Swagger
  const config = new DocumentBuilder()
    .setTitle('Inspiration API')
    .setDescription('API para usuarios, búsquedas e inspiraciones')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const port = parseInt(process.env.PORT ?? '3001', 10);
  await app.listen(port);
  console.log(`🚀 API on http://localhost:${port}  |  Swagger /api`);
}
bootstrap();
