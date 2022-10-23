import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { SaveCourierLocationDto } from './dto/save-courier-location.dto';
import { SaveCourierLocationResponseDto } from './dto/save-courirer-location-response.dto';

@Injectable()
export class CourierLocationEventService {
  constructor(
    @Inject('COURIER_LOCATION_SERVICE') private client: ClientProxy,
  ) {}

  async saveLocation(
    saveCourierLocationDto: SaveCourierLocationDto,
  ): Promise<SaveCourierLocationResponseDto> {
    const response = await firstValueFrom(
      this.client.send('save_courier_location', saveCourierLocationDto),
    );

    return response;
  }
}
