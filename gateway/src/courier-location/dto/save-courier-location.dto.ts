import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class SaveCourierLocationDto {
  @ApiProperty({
    description: 'The id of courier',
  })
  @IsNotEmpty()
  courierId: string;

  @ApiProperty({
    description: 'The latitude of courier location',
  })
  @IsNotEmpty()
  latitude: number;

  @ApiProperty({
    description: 'The longitude of courier location',
  })
  @IsNotEmpty()
  longitude: number;
}
