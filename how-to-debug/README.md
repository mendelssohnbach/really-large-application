# How To Debug

[How To Debug Node.js with the Built-In Debugger and Chrome DevTools](https://www.digitalocean.com/community/tutorials/how-to-debug-node-js-with-the-built-in-debugger-and-chrome-devtools)

デバッグする方法

## Step1 Using Watchers

ウォッチャーの使用

```js
const orders = [341, 454, 198, 264, 307];
let totalOrders = 0;

for (let i = 0; i < orders.length; i++) {
  totalOrders += orders[i];
}

console.log(totalOrders);
```

```shell
$ node badLoop.js
NaN
```

```shell
$ node inspect badLoop.js
< Debugger listening on ws://127.0.0.1:9229/703087e2-7956-4465-8e4c-b1c3d5c3479f
< For help, see: https://nodejs.org/en/docs/inspector
< Debugger attached.
Break on start in badLoop.js:1
> 1 const orders = [341, 454, 198, 264, 307]; // 先頭行で停止
  2 let totalOrders = 0;
  3
debug>
```

- `c` or `cont`: 次のブレークポイントまたはプログラムの最後まで実行を続行
- `n` or `next`: 次の行に移動
- `s` or `step`: ステップイン
- `o`: ステップアウト
- `pause`: 一時停止

```shell
  1 const orders = [341, 454, 198, 264, 307];
> 2 let totalOrders = 0; // `n`で移動
  3
```

```shell
  3
> 4 for (let i = 0; i <= orders.length; i++) { // `n`で移動,0ハイライト
  5   totalOrders += orders[i];
  6 }
debug> watch('totalOrders') // ウォッチ追加
debug> watch('i') // ウォッチ追加
```

```shell
break in badLoop.js:4
Watchers:
  0: totalOrders = 0 // ウォッチの値
  1: i = 0 // ウォッチの値

  2 let totalOrders = 0;
  3
> 4 for (let i = 0; i <= orders.length; i++) {
```

```shell
debug> n
break in badLoop.js:4
Watchers:
  0: totalOrders = 341 //forループを一度抜けた結果
  1: i = 0

  2 let totalOrders = 0;
  3
> 4 for (let i = 0; i <= orders.length; i++) {
  5   totalOrders += orders[i];
  6 }
```

```shell
  0: totalOrders = 1564 // `n`にてデバッグを進める
  1: i = 5

  2 let totalOrders = 0;
  3
> 4 for (let i = 0; i <= orders.length; i++) {
  5   totalOrders += orders[i];
  6 }
```

```shell
  0: totalOrders = NaN
  1: i = 6 // 6回ループしている

  2 let totalOrders = 0;
  3
> 4 for (let i = 0; i <= orders.length; i++) {
  5   totalOrders += orders[i];
  6 }
debug> `Ctrl+D`でデバッグ終了
```

```js
// ループ需要権見直し
for (let i = 0; i < orders.length; i++) {
```

```shell
$ node badLoop.js
1564 // 正しい結果
```
