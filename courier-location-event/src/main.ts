import { NestFactory } from '@nestjs/core';
import { CourierLocationEventModule } from './courier-location-event.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    CourierLocationEventModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://rabbitmq:5672'],
        queue: 'courier_locations',
        queueOptions: {
          durable: false,
        },
        noAck: false,
      },
    },
  );

  app.listen();
}
bootstrap();
