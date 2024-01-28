import { SendNotification } from './sendNotificationUseCase';
import { InMemoryNotificationsRepository } from '../../../test/repositories/inMemoryNotificationsRepository';

describe('Send Notification', () => {
  it('should be able to send a notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const sendNotification = new SendNotification(notificationsRepository);

    const { notification } = await sendNotification.execute({
      content: 'this is a notification',
      category: 'social',
      recipientId: 'example-recipient-id',
    });

    expect(notificationsRepository.notifications[0]).toEqual(notification);
  });
});
