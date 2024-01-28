import { Content } from '@app/entities/content';
import { Notification } from '@app/entities/notification';
import { InMemoryNotificationsRepository } from '../../../test/repositories/inMemoryNotificationsRepository';
import { CancelNotification } from './cancelNotificationUseCase';
import { NotificationNotFound } from './errors/NotificationNotFound';

describe('Cancel Notification', () => {
  it('should not be cancelled a notification when it does not exist', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const cancelNotification = new CancelNotification(notificationsRepository);

    expect(() => {
      return cancelNotification.execute({
        notificationId: 'notification.id-fake',
      });
    }).rejects.toThrow(NotificationNotFound);
  });
});
