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

## Step2 Listening for Events

イベントのリッスン

イベントのリスナーを追加する

`event_name`は`emit`名と対となる

```js
// events.on(emitter, eventName[, options])
eventEmitter.on(event_name, callback_function) {
    action
}
```

[events.on()](https://nodejs.org/api/events.html#events_events_on_emitter_eventname_options)

```js
import TicketManager from './ticketManager.js';

// チケット枚数は10限定
const ticketManager = new TicketManager(10);
ticketManager.on('buy', () => {
  // 最初のイベントを受信したときに簡単なメッセージをログに記録
  console.log('誰かがチケットを買った！');
});

ticketManager.buy('test@email.com', 20);
```

```shell
$ node firstListener.js
誰かがチケットを買った！
```

複数のチケットを購入

```js
ticketManager.buy('test@email.com', 20);
ticketManager.buy('test@email.com', 20);
```

```shell
$ node firstListener.js
誰かがチケットを買った！
誰かがチケットを買った！
```

```js
ticketManager.on('buy', () => {
  // 最初のイベントを受信したときに簡単なメッセージをログに記録
  console.log('誰かがチケットを買った！');
});

ticketManager.buy('test@email.com', 20);
ticketManager.buy('test@email.com', 20);

ticketManager.once('buy', () => {
  console.log('これは一度だけ呼び出されます');
});
```

```shell
$ node firstListener.js
誰かがチケットを買った！
誰かがチケットを買った！
```

`once()`を後に追加したので、`once()`イベントは発火しない

```js
ticketManager.on('buy', () => {
  // 最初のイベントを受信したときに簡単なメッセージをログに記録
  console.log('誰かがチケットを買った！');
});

ticketManager.once('buy', () => {
  console.log('これは一度だけ呼び出されます');
});

ticketManager.buy('test@email.com', 20);
ticketManager.buy('test@email.com', 20);
```

```shell
$ node firstListener.js
誰かがチケットを買った！
これは一度だけ呼び出されます
誰かがチケットを買った！
```

