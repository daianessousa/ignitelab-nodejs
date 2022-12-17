import { Content } from './content';
import { Notification } from './notification';

describe('Notification content', () => {
  it('should be able to create a notification', () => {
    const notification = new Notification({
      content: new Content('Você recebeu uma solicitacao de amizade'),
      category: 'social',
      recipientId: 'example-recp-id',
      createdAt: new Date(),
    });

    expect(notification).toBeTruthy();
  });
});
