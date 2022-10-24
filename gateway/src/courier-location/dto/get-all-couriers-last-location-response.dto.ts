import { ApiProperty } from '@nestjs/swagger';
import { GetAllCouriersLastLocationApiResponse } from '../courier-location-service.interface';

export class GetAllCouriersLastLocationResponseDto {
  @ApiProperty({
    description: 'The id of courier',
  })
  courierId: string;

  @ApiProperty({
    description: 'The latitude of courier location',
  })
  latitude: number;

  @ApiProperty({
    description: 'The latitude of courier location',
  })
  longitude: number;

  @ApiProperty({
    description: 'Creation date of courier location',
  })
  createdAt: string;

  constructor(apiResponse: GetAllCouriersLastLocationApiResponse) {
    this.courierId = apiResponse.data.courierId;
    this.latitude = apiResponse.data.latitude;
    this.longitude = apiResponse.data.longitude;
    this.createdAt = apiResponse.data.createdAt;
  }
}
