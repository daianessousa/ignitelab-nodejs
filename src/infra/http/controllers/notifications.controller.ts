import { Controller, Post, Body } from '@nestjs/common';
import { SendNotification } from 'src/app/useCases/sendNotificationUseCase';
import { CreateNotificationBodyDTO } from '../../dtos/createNotificationBodyDTO';

@Controller('notifications')
export class NotificationsController {
  constructor(private sendNotification: SendNotification) {}
  @Post()
  async create(@Body() body: CreateNotificationBodyDTO) {
    const { recipientId, content, category } = body;

    const { notification } = await this.sendNotification.execute({
      recipientId,
      content,
      category,
    });

    return { notification };
  }
}
