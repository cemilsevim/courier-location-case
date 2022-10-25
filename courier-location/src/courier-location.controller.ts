import { Body, Controller, Logger, Param } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { CourierLocationService } from './courier-location.service';
import { SaveCourierLocationDto } from './dto/save-courier-location.dto';
import { CourierLocationEntity } from './entities/courier-location.entity';

@Controller('courier')
export class CourierLocationController {
  constructor(
    private readonly courierLocationService: CourierLocationService,
  ) {}

  @MessagePattern('save_courier_location')
  saveCourierLocation(
    saveCourierLocationDto: SaveCourierLocationDto,
  ): Promise<CourierLocationEntity> {
    return this.courierLocationService.saveCourierLocation(
      saveCourierLocationDto,
    );
  }

  @MessagePattern('get-courier-last-location')
  getCourierLastLocation(courierId: string): Promise<CourierLocationEntity | null> {
    return this.courierLocationService.getCourierLastLocation(courierId);
  }

  @MessagePattern('get-all-couriers-last-location')
  getAllCouriersLastLocation(): Promise<CourierLocationService[] | null> {
    return this.courierLocationService.getAllCouriersLastLocation();
  }
}
