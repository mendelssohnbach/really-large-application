import TicketManager from './ticketManager.js';
import EmailService from './emailService.js';
import DatabaseService from './databaseService.js';

const ticketManager = new TicketManager(3);
const emailService = new EmailService();
const databaseService = new DatabaseService();

ticketManager.on('buy', (email, price, timestamp) => {
  emailService.send(email);
  databaseService.save(email, price, timestamp);
});

ticketManager.on('error', (error) => {
  console.error(`エラーを適切に処理する。: ${error}`);
});

console.log(`購入イベントには${ticketManager.listenerCount('buy')}のリスナーがいます。`);
console.log(`エラーイベントのリスナーが('error')}人います。`);

const onBuy = () => {
  console.log('すぐに削除されます');
};

ticketManager.on('buy', onBuy);

console.log(
  `新しいイベントリスナーを追加して、購入イベントの総数を次のようにしました。: ${ticketManager.listenerCount(
    'buy'
  )}`
);
ticketManager.buy('test@email.com');

ticketManager.off('buy', onBuy);

console.log(`現在、購入イベントのリスナーが1: ${ticketManager.listenerCount('buy')}人います。`);
ticketManager.buy('test@email', 20);

ticketManager.removeAllListeners('buy');
console.log(`購入イベントのリスナーは${ticketManager.listenerCount('buy')}人です。`);
ticketManager.buy('test@mail.com');
console.log('最後に購入したチケット');
