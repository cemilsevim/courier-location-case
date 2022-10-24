import { ApiProperty } from '@nestjs/swagger';
import { GetCourierLastLocationApiResponse } from '../courier-location-service.interface';

export class GetCourierLastLocationResponseDto {
  @ApiProperty({
    description: 'The id of courier',
  })
  courierId: string;

  @ApiProperty({
    description: 'The latitude of courier location',
  })
  latitude: number;

  @ApiProperty({
    description: 'The longitude of courier location',
  })
  longitude: number;

  constructor(apiResponse: GetCourierLastLocationApiResponse) {
    this.courierId = apiResponse.courierId;
    this.latitude = apiResponse.latitude;
    this.longitude = apiResponse.longitude;
  }
}
