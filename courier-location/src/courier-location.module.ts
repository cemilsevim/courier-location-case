import { CacheModule, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CourierLocationController } from './courier-location.controller';
import { CourierLocationService } from './courier-location.service';
import {
  CourierLocationEntity,
  CourierLocationSchema,
} from './entities/courier-location.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as redisStore from 'cache-manager-redis-store';

// config.get<string>('MONGODB_URI'),
@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        uri: process.env.MONGO_URI,
      }),
    }),
    MongooseModule.forFeature([
      { name: CourierLocationEntity.name, schema: CourierLocationSchema },
    ]),
    CacheModule.register<any>({
      store: redisStore,

      // Store-specific configuration:
      host: 'redis',
      port: 6379,
    }),
  ],
  controllers: [CourierLocationController],
  providers: [CourierLocationService],
})
export class CourierLocationModule {}
