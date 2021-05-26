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

# Step4 Handling Error Events

エラーイベントの処理

`ticketManager.js`

```js
buy(email, price) {
    if (this.supply > 0) {
        this.supply—;
        this.emit("buy", email, price, Date.now());
        return;
    }

    this.emit("error", new Error("There are no more tickets left to purchase"));
}
```

`index.js`

```js
ticketManager.buy("test@email.com", 10);
ticketManager.buy("test@email.com", 10);
ticketManager.buy("test@email.com", 10);
ticketManager.buy("test@email.com", 10);
```

```shell
$ node index.js
Sending email to test@email.com
Running query: INSERT INTO orders VALUES (email, price, created) VALUES (test@email.com, 10, 1621990304786)
Sending email to test@email.com
Running query: INSERT INTO orders VALUES (email, price, created) VALUES (test@email.com, 10, 1621990304792)
Sending email to test@email.com
Running query: INSERT INTO orders VALUES (email, price, created) VALUES (test@email.com, 10, 1621990304792)
file:///home/yasuji/WorkSpace/really-large-application/event-emitters/ticketManager.js:18
    this.emit('error', new Error('購入するチケットはもうありません'));
                       ^

Error: 購入するチケットはもうありません
    at TicketManager.buy (file:///home/yasuji/WorkSpace/really-large-application/event-emitters/ticketManager.js:18:24)
    ...
```

エラーを適切に処理

```js
ticketManager.on('error', (error) => {
  console.error(`エラーを適切に処理する: ${error}`);
});

ticketManager.buy('test@email.com', 10);
```

```shell
Running query: INSERT INTO orders VALUES (email, price, created) VALUES (test@email.com, 10, 1621990881299)
エラーを適切に処理する: Error: 購入するチケットはもうありません
```

## Step5 Managing Events Listeners

イベントリスナーの管理

```js
console.log(`We have ${ticketManager.listenerCount('buy')} listener(s) for the buy event`);
console.log(`We have ${ticketManager.listenerCount('error')} listener(s) for the error event`);
```

```shell
$ node index.js
We have 1 listener(s) for the buy event
We have 1 listener(s) for the error event
```

```js
const onBuy = () => {
  console.log('すぐに削除されます');
};

ticketManager.on('buy', onBuy);

console.log(
  `We added a new event listener bringing our total count for the buy event to: ${ticketManager.listenerCount(
    'buy'
  )}`
);
ticketManager.buy('test@email.com');
```

```js
$ node index.js
We have 1 listener(s) for the buy event
We have 1 listener(s) for the error event
We added a new event listener bringing our total count for the buy event to: 2
Sending email to test@email.com
Running query: INSERT INTO orders VALUES (email, price, created) VALUES (test@email.com, undefined, 1621996919870)
すぐに削除されます
```

```js
ticketManager.off("buy", onBuy);

console.log(`We now have: ${ticketManager.listenerCount("buy")} listener(s) for the buy event`);
ticketManager.buy("test@email", 20);
```

```shell
$ node index.js
We have 1 listener(s) for the buy event
We have 1 listener(s) for the error event
We added a new event listener bringing our total count for the buy event to: 2
Sending email to test@email.com
Running query: INSERT INTO orders VALUES (email, price, created) VALUES (test@email.com, undefined, 1621997209310)
すぐに削除されます
We now have: 1 listener(s) for the buy event
Sending email to test@email
Running query: INSERT INTO orders VALUES (email, price, created) VALUES (test@email, 20, 1621997209311)
```

```js
ticketManager.removeAllListeners('buy');
console.log(`購入イベントのリスナーは${ticketManager.listenerCount('buy')}人です。`);
ticketManager.buy('test@mail.com');
console.log('最後に購入したチケット');
```

```shell
$ node index.js
購入イベントには1のリスナーがいます。
エラーイベントのリスナーが('error')}人います。
新しいイベントリスナーを追加して、購入イベントの総数を次のようにしました。: 2
Sending email to test@email.com
Running query: INSERT INTO orders VALUES (email, price, created) VALUES (test@email.com, undefined, 1621997855483)
すぐに削除されます
現在、購入イベントのリスナーが1: 1人います。
Sending email to test@email
Running query: INSERT INTO orders VALUES (email, price, created) VALUES (test@email, 20, 1621997855483)
購入イベントのリスナーは0人です。
最後に購入したチケット
```

すべてのリスナーを削除した後、チケット購入のために電子メールを送信したり、データベースに保存したりすることはなくなりました。

