import { Body, Controller, Get, Logger, Param, Post } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { CourierLocationService } from './courier-location.service';
import { CourierLocationResponseDto } from './dto/courier-location-response.dto';
import { SaveCourierLocationDto } from './dto/save-courier-location.dto';

@Controller('courier')
export class CourierLocationController {
  constructor(
    private readonly courierLocationService: CourierLocationService,
  ) {}

  @Post('save-courier-location')
  saveCourierLocation(
    @Body() saveCourierLocationDto: SaveCourierLocationDto,
  ): Promise<SaveCourierLocationDto> {
    return this.courierLocationService.saveCourierLocation(
      saveCourierLocationDto,
    );
  }

  @Get('get-courier-last-location/:courierId')
  getCourierLastLocation(@Param('courierId') courierId: string) {
    return this.courierLocationService.getCourierLastLocation(courierId);
  }

  @Get('get-all-couriers-last-location')
  getAllCouriersLastLocation() {
    return this.courierLocationService.getAllCouriersLastLocation();
  }
}
