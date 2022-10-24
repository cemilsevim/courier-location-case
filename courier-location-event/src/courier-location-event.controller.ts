import { Body, Controller, Get, Logger } from '@nestjs/common';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { CourierLocationEventService } from './courier-location-event.service';
import { SaveCourierLocationDto } from './dto/save-courier-location.dto';

@Controller()
export class CourierLocationEventController {
  constructor(
    private readonly courierLocationEventService: CourierLocationEventService,
  ) {}

  @MessagePattern('save_location')
  async saveLocation(
    @Payload() saveCourierLocationDto: SaveCourierLocationDto,
    @Ctx() context: RmqContext,
  ) {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();
    await this.courierLocationEventService.saveLocation(saveCourierLocationDto);
    channel.ack(originalMsg);
  }
}
