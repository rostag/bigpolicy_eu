import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder, SwaggerBaseConfig } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  app.setGlobalPrefix('api/v1');

  const options: SwaggerBaseConfig = new DocumentBuilder()
    .setBasePath('api/v1')
    .addBearerAuth()
    .setTitle('Big policy api')
    .setDescription('Big policy api')
    .setVersion('1.0')
    .addTag('v1')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);

  await app.listen(3001);
}
bootstrap();
