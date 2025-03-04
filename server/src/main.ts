import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';
import { MongoExceptionFilter } from './mongo-exception/mongo-exception.filter';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    origin: ['http://localhost:3000'], // Allow only these origins
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'], // Allowed HTTP methods
    credentials: true, // Allow cookies to be sent
  });
  app.useGlobalFilters(new MongoExceptionFilter());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
