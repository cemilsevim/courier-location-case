import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom, lastValueFrom } from 'rxjs';
import {
  GetAllCouriersLastLocationApiResponse,
  GetCourierLastLocationApiResponse,
} from './courier-location-service.interface';
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
    await this.courierLocationEventClient
      .send('save_location', saveCourierLocationDto)
      .subscribe((response) => response);

    return saveCourierLocationDto;
  }

  async getCourierLastLocation(
    courierId: string,
  ): Promise<GetCourierLastLocationApiResponse> {
    const response = await firstValueFrom<GetCourierLastLocationApiResponse>(
      this.courierLocationClient.send('get-courier-last-location', courierId),
    );

    return response;
  }

  async getAllCouriersLastLocation(): Promise<
    GetAllCouriersLastLocationApiResponse[]
  > {
    const response = await firstValueFrom<
      GetAllCouriersLastLocationApiResponse[]
    >(this.courierLocationClient.send('get-all-couriers-last-location', {}));

    return response;
  }
}
