import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { NestFactory } from '@nestjs/core';
import { CourierLocationModule } from './courier-location.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    CourierLocationModule,
    {
      transport: Transport.TCP,
      options: {
        host: '0.0.0.0',
        port: parseInt(process.env.COURIER_LOCATION_SERVICE_PORT),
      },
    },
  );

  await app.listen();
}
bootstrap();
