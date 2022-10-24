import { Body, Controller, Get, Logger, Param, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { firstValueFrom } from 'rxjs';
import { CourierLocationService } from './courier-location.service';
import { GetAllCouriersLastLocationResponseDto } from './dto/get-all-couriers-last-location-response.dto';
import { GetCourierLastLocationResponseDto } from './dto/get-courier-last-location-response.dto';
import { SaveCourierLocationDto } from './dto/save-courier-location.dto';

@ApiTags('courier')
@Controller('courier')
export class CourierLocationController {
  constructor(
    private readonly courierLocationService: CourierLocationService,
  ) {}

  @ApiOkResponse({
    type: SaveCourierLocationDto,
  })
  @Post('save-courier-location')
  saveCourierLocation(
    @Body() saveCourierLocationDto: SaveCourierLocationDto,
  ): Promise<SaveCourierLocationDto> {
    return this.courierLocationService.saveCourierLocation(
      saveCourierLocationDto,
    );
  }

  @ApiOkResponse({
    type: GetCourierLastLocationResponseDto,
  })
  @Get('get-courier-last-location/:courierId')
  async getCourierLastLocation(
    @Param('courierId') courierId: string,
  ): Promise<GetCourierLastLocationResponseDto> {
    const courierlastLocation =
      await this.courierLocationService.getCourierLastLocation(courierId);

    return new GetCourierLastLocationResponseDto(courierlastLocation);
  }

  @ApiOkResponse({
    type: GetAllCouriersLastLocationResponseDto,
    isArray: true,
  })
  @Get('get-all-couriers-last-location')
  async getAllCouriersLastLocation(): Promise<
    GetAllCouriersLastLocationResponseDto[]
  > {
    const allCouriersLastLocation =
      await this.courierLocationService.getAllCouriersLastLocation();

    return allCouriersLastLocation.map(
      (couriersLastLocation) =>
        new GetAllCouriersLastLocationResponseDto(couriersLastLocation),
    );
  }
}
