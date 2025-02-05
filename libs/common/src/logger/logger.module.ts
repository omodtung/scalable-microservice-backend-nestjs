import { Module } from '@nestjs/common';
import { LoggerModule as PinoLoggerModule } from 'nestjs-pino';

@Module({
  imports: [
    PinoLoggerModule.forRoot({
      pinoHttp: {
        transport: {
          target: 'pino-pretty', // default is pino-pretty
          options: {
            singleLine: true, // default is false
          },
        },
      },
    }),
  ],
})
export class LoggerModule {}
