import EventEmitter from 'events';

// EventEmitterクラスを拡張
class TicketManager extends EventEmitter {
  constructor(supply) {
    super();
    this.supply = supply;
  }

  buy(email, price) {
    // チケットが売れたら-1減らす
    this.supply--;
    this.emit('buy', email, price, Date.now());
  }
}

export default TicketManager;
