# How To Write Asynchronous Code in Node.js

[URL](https://www.digitalocean.com/community/tutorials/how-to-write-asynchronous-code-in-node-js)

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

```
function asynchronousFunction([ Function Arguments ], [ Callback Function ]) {
    [ Action ]
}
```

