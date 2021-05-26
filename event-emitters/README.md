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

## Step3 Capturing Event Data

イベントデータのキャプチャ

`emailService.js`

```js
class EmailService {
  send(email) {
    console.log(`Sending email to ${email}`);
  }
}

export default EmailService;
```

`databaseService.js`

```js
class DatabaseService {
  save(email, price, timestamp) {
    console.log(
      `Running query: INSERT INTO orders VALUES (email, price, created) VALUES (${email}, ${price}, ${timestamp})`
    );
  }
}

export default DatabaseService;
```

`index.js`

`import`には拡張子が必要

```js
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

ticketManager.buy('test@email.com', 10)
```

```js
$ node index.js
Sending email to test@email.com
Running query: INSERT INTO orders VALUES (email, price, created) VALUES (test@email.com, 10, 1621989571779)
```
