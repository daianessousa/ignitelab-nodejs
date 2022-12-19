import { CancelNotification } from '@app/useCases/cancelNotificationUseCase';
import { CountRecipientNotification } from '@app/useCases/countRecipientNotificationsUseCase';
import { GetRecipientNotification } from '@app/useCases/getRecipientNotificationUseCase';
import { ReadNotification } from '@app/useCases/readNotificationUseCase';
import { UnreadNotification } from '@app/useCases/unreadNotificationUseCase';
import { Module } from '@nestjs/common';
import { SendNotification } from 'src/app/useCases/sendNotificationUseCase';
import { DatabaseModule } from '../database/database.module';
import { NotificationsController } from './controllers/notifications.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [NotificationsController],
  providers: [
    SendNotification,
    CancelNotification,
    CountRecipientNotification,
    GetRecipientNotification,
    ReadNotification,
    UnreadNotification,
  ],
})
export class HttpModule {}
