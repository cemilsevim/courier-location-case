import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CourierLocationController } from './courier-location.controller';
import { CourierLocationService } from './courier-location.service';
import {
  CourierLocationEntity,
  CourierLocationSchema,
} from './entities/courier-location.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';

// config.get<string>('MONGODB_URI'),
@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        uri: 'mongodb://root:pass@db:27017/courierLocationCase?authSource=admin',
      }),
    }),
    MongooseModule.forFeature([
      { name: CourierLocationEntity.name, schema: CourierLocationSchema },
    ]),
  ],
  controllers: [CourierLocationController],
  providers: [CourierLocationService],
})
export class CourierLocationModule {}
