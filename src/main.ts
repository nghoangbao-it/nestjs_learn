import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { UnprocessableEntityException, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
      exceptionFactory: (validationErrors) => {
        const customErrors = validationErrors.map((error) => ({
          field: error.property,
          message: Object.values(error.constraints || '').join(', '),
        }));

        return new UnprocessableEntityException(customErrors);
      },
    }),
  );
  await app.listen(3000);
}
bootstrap();
