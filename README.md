# Chapter5

[How To Write Asynchronous Code in Node.js](https://www.digitalocean.com/community/tutorials/how-to-write-asynchronous-code-in-node-js)

## イベントループ

- コールスタックはスタック
- リストのようなデータ構造
- アイテムは一番上にのみ追加、削除可能
- LIFO：後入れ先出しモデル

## 非同期プログラミング:コールバック

[request](https://www.npmjs.com/package/request)

このパッケージは非推奨になりました

```shell
$ npm i request
```

```js
function asynchronousFunction([ Function Arguments ], [ Callback Function ]) {
    [ Action ]
}
```

```shell
$ npm i axios
```

>Promise based HTTP client for the browser and node.js

> ブラウザとnode.js用のPromiseベースのHTTPクライアント

[axios](https://www.npmjs.com/package/axios)

ファイルに保存するには`fs/promises`

```js
import fs from 'fs/promises';
```

## 非同期プログラミング:Promise

```js
promiseFunction()
    .then([ Callback Function for Fulfilled Promise ])
    .catch([ Callback Function for Rejected Promise ])
```

## 非同期プログラミング:async/await

```js
async function() {
    await [Asynchronous Action]
} catch (error) {
  [error Action]
}
```

ファイルに保存するには`fs/promises`

# Chapter6

[How To Test a Node.js Module with Mocha and Assert](https://www.digitalocean.com/community/tutorials/how-to-test-a-node-js-module-with-mocha-and-assert)

前回の非同期関係のファイル群は`asynchronous`フォルダに移動

```shell
$ npm init -y
$ npm i request --save-dev mocha
```

[mocha](https://www.npmjs.com/package/mocha)

> Simple, flexible, fun JavaScript test framework for Node.js & The Browser

> Node.jsとブラウザ用のシンプルで柔軟で楽しいJavaScriptテストフレームワーク

## 手動でテスト

```shell
$ node
> const Todos = require('./index')
Uncaught:
Error [ERR_REQUIRE_ESM]: Must use import to load ES Module: /home/yasuji/WorkSpace/really-large-application/index.js
```

```shell
$ node
> import Todos from './index';
import Todos from './index';
^^^^^^

Uncaught:
SyntaxError: Cannot use import statement inside the Node.js REPL, alternatively use dynamic import
```

```shell
$ node
> let Todos;
undefined
> import('./index.js').then(module => { Todos = module });
Promise { <pending> }

> const todos = new Todos();
Uncaught TypeError: Todos is not a constructor

> const todos = new Todos.default()
undefined
> todos.add('run code')
undefined
> todos.list()
[ { title: 'run code', completed: false } ]
> todos.add("test everything");
undefined
> todos.complete('run code')
undefined
> todos.list()
[
  { title: 'run code', completed: true },
  { title: 'test everything', completed: false }
```

## Step3 Mocha and Assertでテスト

**Moca**テストコードテンプレート

- `describe（）`関数は、テストをグループ化するために使用される
-- テストをグループ化すると、テストコードの保守が容易になる
- `it()`関数でモジュール関数を操作する

```js
describe([テストグループ名の文字列], function() {
    it([テスト名の文字列], function() {
        [Test Code]
    });
});
```

テストを行うには`package.json`を編集すること。

```json
"scripts": {
  "test": "mocha index.test.js"
},
```

```shell
$ npm test

> really-large-application@1.0.0 test
> mocha index.test.js


Error [ERR_MODULE_NOT_FOUND]: Cannot find module '/home/yasuji/WorkSpace/really-large-application/node_modules/assert/strict' imported from /home/yasuji/WorkSpace/really-large-application/index.test.js
    at finalizeResolution (internal/modules/esm/resolve.js:276:11)
    at moduleResolve (internal/modules/esm/resolve.js:699:10)
    at Loader.defaultResolve [as _resolve] (internal/modules/esm/resolve.js:810:11)
    at Loader.resolve (internal/modules/esm/loader.js:86:40)
    at Loader.getModuleJob (internal/modules/esm/loader.js:230:28)
    at ModuleWrap.<anonymous> (internal/modules/esm/module_job.js:56:40)
    at link (internal/modules/esm/module_job.js:55:36)
```

`strict`を無効化

```js
import assert from 'assert';
// import assert from 'assert/strict';
```

```shell
$ npm test

> really-large-application@1.0.0 test
> mocha index.test.js



  integration test
    ✓ should be able to add and complete TODos


  1 passing (5ms)
```

日本語も通る

```shell
$ npm test

> really-large-application@1.0.0 test
> mocha index.test.js



  統合テスト
    ✓ TODOsを追加して完了することができるはずです


  1 passing (5ms)
```

テストが失敗する場合

```shell
npm test

> really-large-application@1.0.0 test
> mocha index.test.js



  統合テスト
    ✓ TODOsを追加して完了することができるはずです
    1) TODOがまったくない場合にのみ完了すること


  1 passing (7ms)
  1 failing

  1) 統合テスト
       TODOがまったくない場合にのみ完了すること:

      AssertionError [ERR_ASSERTION]: Expected values to be strictly equal:

2 !== 0

      + expected - actual

      -2
      +0

      at Context.<anonymous> (file:///home/yasuji/WorkSpace/really-large-application/index.test.js:21:12)
      at processImmediate (internal/timers.js:461:21)
```

最初の**unit test**

```js
// テスト対象モジュールインポート
import Todos from './index.js';
// assertモジュールをstrictモードでインポート
import assert from 'assert';
// import assert from 'assert/strict';

describe('統合テスト', function () {
  // テストの名前をわかりやすく説明
  it('TODOsに最初はアイテムは存在しないはずです', function () {
    // 等価である
    assert.strictEqual(todos.list().length, 0);
  });
});
```

```shell
$ npm test

> really-large-application@1.0.0 test
> mocha index.test.js



  統合テスト
    ✓ TODOsに最初はアイテムは存在しないはずです


  1 passing (5ms)
```

初期化時、1つの目todo追加、2つの目todo追加、1つの目todo完了をテスト

```js
// テスト対象モジュールインポート
import Todos from './index.js';
// assertモジュールをstrictモードでインポート
import assert from 'assert';
// import assert from 'assert/strict';

// 統合テスト用のグループを作成
describe('統合テスト', function () {
  // テストの名前をわかりやすく説明
  it('TODOsに最初はアイテムは存在しないはずです', function () {
    // オブジェクトをインスタンス化
    let todos = new Todos();
    // assertモジュールを使用
    // 実際値, 期待値
    // 等価である
    assert.strictEqual(todos.list().length, 0);

    // 最初のtodoを登録
    todos.add('コードの実行');
    assert.strictEqual(todos.list().length, 1);
    // 期待されるオブジェクトと実際のオブジェクトが同値プロパティを持っているか？
    assert.deepStrictEqual(todos.list(), [{ title: 'コードの実行', completed: false }]);

    // 2つ目のtodo
    todos.add('すべてをテストする');
    assert.strictEqual(todos.list().length, 2);
    assert.deepStrictEqual(todos.list(), [
      { title: 'コードの実行', completed: false },
      { title: 'すべてをテストする', completed: false },
    ]);

    todos.complete('コードの実行');
    assert.deepStrictEqual(todos.list(), [
      { title: 'コードの実行', completed: true },
      { title: 'すべてをテストする', completed: false },
    ]);
  });
});
```


```shell
$ npm test

> really-large-application@1.0.0 test
> mocha index.test.js



  統合テスト
    ✓ TODOsに最初はアイテムは存在しないはずです


  1 passing (6ms)
```

TODOが存在しない場合、エラーを返すをテスト

```js
describe('complete()', function () {
  it('TODOがない場合は失敗するはずです', function () {
    let todos = new Todos();
    const expectedError = new Error('TODOは保存されていません。 最初に追加してみませんか？');

    assert.throws(() => {
      todos.complete('存在しません');
    }, expectedError);
  });
});
```

```shell
$ npm test

> really-large-application@1.0.0 test
> mocha index.test.js



  統合テスト
    ✓ TODOsに最初はアイテムは存在しないはずです

  complete()
    ✓ TODOがない場合は失敗するはずです


  2 passing (7ms)
```

## Step4 Testing Asynchronous Code

非同期コードのテスト

```js
import fs from 'fs'; // fsモジュール読み込み
...
  // ファイル保存
  saveToFile(callback) {
    // タイトルヘッダー設定
    let fileContents = 'Title,Completed\n';
    this.todos.forEach((todo) => {
      // 実データをカンマ区切り+改行で連結
      fileContents += `${todo.title},${todo.completed}\n`;
    });

    fs.writeFile('todos.csv', fileContents, callback);
  }
}
```

テストコード

```js
describe('saveToFile()', function () {
  // 非同期関数テストには`done`コールバックが必須
  it('単一のTODOを保存する必要があります', function (done) {
    let todos = new Todos();
    todos.add('CSVを保存する');
    todos.saveToFile((err) => {
      // 最初にファイルが存在することを確認
      assert.strictEqual(fs.existsSync('todos.csv'), true);
      // 期待値を変数に格納
      const expectedFileContents = 'Title,Completed\nCSVを保存する,false\n';
      // Bufferオブジェクトを文字列型に変換
      const content = fs.readFileSync('todos.csv').toString();
      assert.strictEqual(content, expectedFileContents);
      done(err);
    });
  });
});
```

```shell
$ npm test

> really-large-application@1.0.0 test
> mocha index.test.js



  統合テスト
    ✓ TODOsに最初はアイテムは存在しないはずです

  complete()
    ✓ TODOがない場合は失敗するはずです

  saveToFile()
    ✓ 単一のTODOを保存する必要があります


  3 passing (12ms)
```

Promises

- `Promises`では、`it（）`に`done（）`コールバックを含めない
- `then()`の内側に`assert`を記述
- テストする`Promise`で`return`する

```shell
$ npm test

> really-large-application@1.0.0 test
> mocha index.test.js



  統合テスト
    ✓ TODOsに最初はアイテムは存在しないはずです

  complete()
    ✓ TODOがない場合は失敗するはずです

  saveToFile()
    1) 単一のTODOを保存する必要があります


  2 passing (9ms)
  1 failing

  1) saveToFile()
       単一のTODOを保存する必要があります:
     TypeError: Cannot read property 'then' of undefined
      at Context.<anonymous> (file:///home/yasuji/WorkSpace/really-large-application/index.test.js:57:30)
      at processImmediate (internal/timers.js:461:21)
```

テストを通す方法がわかりません。

Async/awit

```js
import fs from 'fs';
...
describe('saveToFile()', function () {
  // 非同期関数テストには`done`コールバックが必須
  it('単一のTODOを保存する必要があります', async function () {
    let todos = new Todos();
    todos.add('CSVを保存する');
    await todos.saveToFile();

    // 最初にファイルが存在することを確認
    assert.strictEqual(fs.existsSync('todos.csv'), true);
    // 期待値を変数に格納
    const expectedFileContents = 'Title,Completed\nCSVを保存する,false\n';
    // Bufferオブジェクトを文字列型に変換
    const content = fs.readFileSync('todos.csv').toString();
    assert.strictEqual(content, expectedFileContents);
  });
});
```

```shell
$ npm test

  1 failing

  1) saveToFile()
       単一のTODOを保存する必要があります:

      AssertionError [ERR_ASSERTION]: Expected values to be strictly equal:
+ actual - expected

+ ''
- 'Title,Completed\nCSVを保存する,false\n'
      + expected - actual

      +Title,Completed
      +CSVを保存する,false

      at Context.<anonymous> (file:///home/yasuji/WorkSpace/really-large-application/index.test.js:65:12)
```

テストを通す方法がわかりません。

## Step5 Using Hooks

- `before`: 最初のテストが始まる前に1回実行
- `beforeEach`: すべてのテストケースの前に実行
- `after`: 最後のテストケースが完了した後に1回実行
- `afterEach`: すべてのテストケースの後に実行

```shell
$ npm test

> really-large-application@1.0.0 test
> mocha index.test.js



  統合テスト
    ✓ TODOsに最初はアイテムは存在しないはずです

  complete()
    ✓ TODOがない場合は失敗するはずです

  saveToFile()
    1) エラーなしで単一のTODOを保存する必要があります
    2) 完了した単一のTODOを保存する必要があります


  2 passing (15ms)
  2 failing
```
