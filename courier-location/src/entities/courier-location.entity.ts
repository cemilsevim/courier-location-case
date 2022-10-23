import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CourierLocationDocument = CourierLocationEntity & Document;

@Schema({
  collection: 'courierLocations',
  timestamps: true,
})
export class CourierLocationEntity {
  @Prop()
  _id: string;

  @Prop()
  courierId: string;

  @Prop()
  latitude: number;

  @Prop()
  longitude: number;

  constructor(courierLocationData: Partial<CourierLocationEntity>) {
    Object.assign(this, courierLocationData);
  }
}

export const CourierLocationSchema = SchemaFactory.createForClass(
  CourierLocationEntity,
);
