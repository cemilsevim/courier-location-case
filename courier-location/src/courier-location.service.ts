import { Injectable, Logger } from '@nestjs/common';
import { SaveCourierLocationDto } from './dto/save-courier-location.dto';
import { CourierLocationEntity } from './entities/courier-location.entity';
import { ObjectId } from 'mongodb';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class CourierLocationService {
  constructor(
    @InjectModel(CourierLocationEntity.name)
    private courierLocationModel: Model<CourierLocationEntity>,
  ) {}

  async saveCourierLocation(
    saveCourierLocationDto: SaveCourierLocationDto,
  ): Promise<CourierLocationEntity> {
    const courierLocationEntity: CourierLocationEntity = {
      _id: new ObjectId().toString(),
      ...saveCourierLocationDto,
    };
    const createdCourierLocationModel = new this.courierLocationModel(
      courierLocationEntity,
    );
    const createdCourierLocationEntity =
      await createdCourierLocationModel.save();

    Logger.log('Saved courier location.', createdCourierLocationEntity);

    return createdCourierLocationEntity;
  }

  async getCourierLastLocation(
    courierId: string,
  ): Promise<CourierLocationEntity> {
    const courierLastLocation = await this.courierLocationModel.findOne(
      {
        courierId,
      },
      null,
      {
        sort: {
          createdAt: 'desc',
        },
      },
    );

    return courierLastLocation;
  }

  async getAllCouriersLastLocation(): Promise<CourierLocationService[]> {
    const courierLastLocations = await this.courierLocationModel
      .aggregate([
        {
          $sort: {
            createdAt: -1,
          },
        },
        {
          $group: {
            _id: '$courierId',
            data: { $first: '$$ROOT' },
          },
        },
      ])
      .exec();

    return courierLastLocations;
  }
}
