import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { UnprocessableEntityException, ValidationPipe } from '@nestjs/common';
import { LoggingInterceptor } from './shared/interceptor/logging.interceptor';
import { TransformInterceptor } from './shared/interceptor/transform.interceptor';

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

  
app.useGlobalInterceptors(new LoggingInterceptor());
app.useGlobalInterceptors(new TransformInterceptor());

  await app.listen(3000);
}
bootstrap();
