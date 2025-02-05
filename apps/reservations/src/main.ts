import { NestFactory } from '@nestjs/core';
import { ReservationsModule } from './reservations.module';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(ReservationsModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  //  app.useLogger(app.get(Logger));
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
// nest g app reservation
