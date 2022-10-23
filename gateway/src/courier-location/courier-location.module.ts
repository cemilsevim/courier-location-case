import { Module } from '@nestjs/common';
import { CourierLocationService } from './courier-location.service';
import { CourierLocationController } from './courier-location.controller';
import {
  ClientProxyFactory,
  ClientsModule,
  TcpClientOptions,
  Transport,
} from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'COURIER_LOCATION_EVENT_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://rabbitmq:5672'],
          queue: 'courier_locations',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
  ],
  providers: [
    CourierLocationService,
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
    },
  ],
  controllers: [CourierLocationController],
})
export class CourierLocationModule {}
