import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Console } from 'console';
import { AppModule } from './app.module';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { ValidationPipe } from './pipes/validation.pipe';

async function start() {
  const PORT = process.env.PORT || 5000;
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Приложение на NestJS')
    .setDescription('Документация REST API')
    .setVersion('1.0.0')
    .addTag('Ludvig Runo')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/rest', app, document);

  // app.useGlobalGuards(JwtAuthGuard); глобальная проврка гуардом

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(PORT, () => console.log(`Server started on port = ${PORT}`));
}

start();
