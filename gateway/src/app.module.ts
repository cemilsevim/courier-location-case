import { Module } from '@nestjs/common';
import { CourierLocationModule } from './courier-location/courier-location.module';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [CourierLocationModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
