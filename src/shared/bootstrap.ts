import { NestFactory } from '@nestjs/core';
import { AppModule } from '@src/modules/app/app.module';
import { initializeSwagger } from './swagger-config';
import * as bodyParser from 'body-parser';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import responseTime from 'response-time';

export async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
  });

  initializeApp(app);
  await initializeSwagger(app);

  await app.listen(process.env.SERVICE_API_PORT);
}

async function initializeApp(app: INestApplication) {
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(responseTime({ header: 'x-response-time' }));
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      validationError: {
        target: false,
        value: false,
      },
    }),
  );
  app.setGlobalPrefix(process.env.SERVICE_API_PATH, {
    exclude: ['create-user']
  });
}
