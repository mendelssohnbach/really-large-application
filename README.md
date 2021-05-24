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

```
$ npm i request
```

```js
function asynchronousFunction([ Function Arguments ], [ Callback Function ]) {
    [ Action ]
}
```

```
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

