import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { TypeORMExceptionFilter } from './typeorm-exception.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.useGlobalFilters(new TypeORMExceptionFilter());

  const config = new DocumentBuilder()
    .setTitle('star-wars-app')
    .setDescription('star-wars-app API description')
    .setVersion('1.0')
    .addTag('star-wars')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(parseInt(process.env.PORT!, 10));
}

void bootstrap();
