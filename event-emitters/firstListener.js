import TicketManager from './ticketManager.js';

// チケット枚数は10限定
const ticketManager = new TicketManager(10);

ticketManager.on('buy', () => {
  // 最初のイベントを受信したときに簡単なメッセージをログに記録
  console.log('誰かがチケットを買った！');
});

ticketManager.once('buy', () => {
  console.log('これは一度だけ呼び出されます');
});

ticketManager.buy('test@email.com', 20);
ticketManager.buy('test@email.com', 20);
