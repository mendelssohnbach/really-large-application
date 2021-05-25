# Chapter9 Emitting Events

## Step1 Emitting Events

イベントの発行

```js
import EventEmitter from 'events';

const firstEmitter = new EventEmitter();

// 空のイベントを発生させる
firstEmitter.emit('My first event');
```

```shell
$ node firstEventEmitter.js
$
```
購入可能なチケットの初期供給を管理

```js
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
```
