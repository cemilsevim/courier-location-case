import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom, lastValueFrom } from 'rxjs';
import { SaveCourierLocationDto } from './dto/save-courier-location.dto';

@Injectable()
export class CourierLocationService {
  constructor(
    @Inject('COURIER_LOCATION_EVENT_SERVICE')
    private courierLocationEventClient: ClientProxy,
    @Inject('COURIER_LOCATION_SERVICE')
    private courierLocationClient: ClientProxy,
  ) {}

  async saveCourierLocation(
    saveCourierLocationDto: SaveCourierLocationDto,
  ): Promise<SaveCourierLocationDto> {
    this.courierLocationEventClient
      .send('save_location', saveCourierLocationDto)
      .subscribe((response) => response);

    return saveCourierLocationDto;
  }

  async getCourierLastLocation(courierId: string) {
    const response = await firstValueFrom(
      this.courierLocationClient.send('get-courier-last-location', courierId),
    );

    return response;
  }

  async getAllCouriersLastLocation() {
    const response = await firstValueFrom(
      this.courierLocationClient.send('get-all-couriers-last-location', {}),
    );

    return response;
  }
}
