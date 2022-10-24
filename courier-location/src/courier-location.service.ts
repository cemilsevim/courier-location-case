import { CACHE_MANAGER, Inject, Injectable, Logger } from '@nestjs/common';
import { SaveCourierLocationDto } from './dto/save-courier-location.dto';
import { CourierLocationEntity } from './entities/courier-location.entity';
import { ObjectId } from 'mongodb';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cache } from 'cache-manager';
@Injectable()
export class CourierLocationService {
  constructor(
    @InjectModel(CourierLocationEntity.name)
    private courierLocationModel: Model<CourierLocationEntity>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
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
  ): Promise<CourierLocationEntity | null> {
    // get from cache
    const courierLastLocationCache: CourierLocationEntity | null =
      await this.cacheManager.get(`courier:lastLocation:${courierId}`);
    if (courierLastLocationCache) {
      return courierLastLocationCache;
    }

    const courierLastLocation: CourierLocationEntity | null =
      await this.courierLocationModel.findOne(
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

    if (courierLastLocation) {
      // set to cache
      await this.cacheManager.set(
        `courier:lastLocation:${courierId}`,
        courierLastLocation,
        30,
      );
    }

    return courierLastLocation;
  }

  async getAllCouriersLastLocation(): Promise<CourierLocationService[] | null> {
    // get from cache
    const allCouriersLastLocationCache: CourierLocationService[] | null =
      await this.cacheManager.get(`courier:allCouriersLastLocation`);
    if (allCouriersLastLocationCache) {
      return allCouriersLastLocationCache;
    }

    const courierLastLocations: CourierLocationService[] | null =
      await this.courierLocationModel
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

    if (courierLastLocations) {
      // set to cache
      await this.cacheManager.set(
        `courier:allCouriersLastLocation`,
        courierLastLocations,
        30,
      );
    }

    return courierLastLocations;
  }
}
