import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function start() {
  try {
    const PORT = process.env.PORT || 5000;
    const app = await NestFactory.create(AppModule);
    app.use(cookieParser());
    app.enableCors({
      origin: true,
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      preflightContinue: false,
      credentials: true,
      allowedHeaders: 'Content-Type, Accept',
    }); //add valid cors
    app.useGlobalPipes(new ValidationPipe());
    app.setGlobalPrefix('api');
    await app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));
  } catch (err) {
    console.log(err);
  }
}
start();
