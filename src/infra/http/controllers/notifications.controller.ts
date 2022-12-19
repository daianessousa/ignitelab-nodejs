import { CancelNotification } from '@app/useCases/cancelNotificationUseCase';
import { CountRecipientNotification } from '@app/useCases/countRecipientNotificationsUseCase';
import { GetRecipientNotification } from '@app/useCases/getRecipientNotificationUseCase';
import { ReadNotification } from '@app/useCases/readNotificationUseCase';
import { UnreadNotification } from '@app/useCases/unreadNotificationUseCase';
import { Controller, Post, Body, Patch, Param, Get } from '@nestjs/common';
import { SendNotification } from 'src/app/useCases/sendNotificationUseCase';
import { CreateNotificationBodyDTO } from '../../dtos/createNotificationBodyDTO';
import { notificationViewModel } from '../view-models/notificationViewModel';

@Controller('notifications')
export class NotificationsController {
  constructor(
    private sendNotification: SendNotification,
    private cancelNotification: CancelNotification,
    private readNotification: ReadNotification,
    private unreadNotification: UnreadNotification,
    private countRecipientNotifications: CountRecipientNotification,
    private getRecipientNotifications: GetRecipientNotification,
  ) {}

  @Patch(':id/cancel')
  async cancel(@Param('id') id: string) {
    await this.cancelNotification.execute({
      notificationId: id,
    });
  }

  @Get('from/:recipientId')
  async countFromRecipient(@Param('recipientId') recipientId: string) {
    const { notifications } = await this.getRecipientNotifications.execute({
      recipientId,
    });

    return {
      notifications: notifications.map(notificationViewModel.toHTTP),
    };
  }

  @Get('count/from/:recipientId')
  async getFromRecipient(@Param('recipientId') recipientId: string) {
    const { count } = await this.countRecipientNotifications.execute({
      recipientId,
    });

    return {
      count,
    };
  }

  @Patch(':id/read')
  async read(@Param('id') id: string) {
    await this.readNotification.execute({
      notificationId: id,
    });
  }

  @Patch(':id/unread')
  async unread(@Param('id') id: string) {
    await this.unreadNotification.execute({
      notificationId: id,
    });
  }

  @Post()
  async create(@Body() body: CreateNotificationBodyDTO) {
    const { recipientId, content, category } = body;

    const { notification } = await this.sendNotification.execute({
      recipientId,
      content,
      category,
    });

    return {
      notification: notificationViewModel.toHTTP(notification),
    };
  }
}
