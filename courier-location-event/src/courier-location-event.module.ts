import { Module } from '@nestjs/common';
import {
  ClientProxyFactory,
  TcpClientOptions,
  Transport,
} from '@nestjs/microservices';
import { CourierLocationEventController } from './courier-location-event.controller';
import { CourierLocationEventService } from './courier-location-event.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [CourierLocationEventController],
  providers: [
    CourierLocationEventService,
    {
      provide: 'COURIER_LOCATION_SERVICE',
      useFactory: () => {
        const tokenServiceOptions: TcpClientOptions = {
          transport: Transport.TCP,
          options: {
            host: process.env.COURIER_LOCATION_SERVICE_HOST,
            port: parseInt(process.env.COURIER_LOCATION_SERVICE_PORT),
          },
        };
        return ClientProxyFactory.create(tokenServiceOptions);
      },
      inject: [ConfigService],
    },
  ],
})
export class CourierLocationEventModule {}
