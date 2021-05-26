import EventEmitter from 'events';

// EventEmitterクラスを拡張
class TicketManager extends EventEmitter {
  constructor(supply) {
    super();
    this.supply = supply;
  }

  buy(email, price) {
    if (this.supply > 0) {
      // チケットが売れたら-1減らす
      this.supply--;
      this.emit('buy', email, price, Date.now());
      return;
    }

    this.emit('error', new Error('購入するチケットはもうありません'));

    TicketManager.off('buy', onBuy);
  }
}

export default TicketManager;
