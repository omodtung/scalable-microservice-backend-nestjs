import { Module } from '@nestjs/common';
import { ModelDefinition, MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';
import { ConfigModule } from '../config/config.module';
@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get('MONGODB_URI'),
      }),
      inject: [ConfigService],
    }),
  ],
})
// register mongose model  within a specific module ,ensure proper dependency injection modulazation
export class DatabaseModule {
  static forFeature(models: ModelDefinition[]) {
    return MongooseModule.forFeature(models);
  }
}
