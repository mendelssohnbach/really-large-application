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
  console.error(`エラーを適切に処理する: ${error}`);
});

ticketManager.buy('test@email.com', 10);
ticketManager.buy('test@email.com', 10);
ticketManager.buy('test@email.com', 10);
ticketManager.buy('test@email.com', 10);
