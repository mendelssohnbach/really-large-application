# Chapter8

[Using Buffers in Node.js](https://www.digitalocean.com/community/tutorials/using-buffers-in-node-js)

## Step1 Creating a Buffer

バッファの作成

```shell
> const firstBuf = Buffer.alloc(1024); // 1KB割当,0で埋める
> const filledBuf = Buffer.alloc(1024, 1); // 1KB割当,1で埋める
> firstBuf
<Buffer 00 00 00 ... 974 more bytes>
> filledBuf
<Buffer 01 01 01 ... 974 more bytes>
// 5バイト長、ASCII文字のみを格納するバッファを作成
> const asciiBuf = Buffer.alloc(5, 'a', 'ascii');
undefined
> asciiBuf
<Buffer 61 61 61 61 61>
# 文字列からバッファを作成する
> const stringBuf = Buffer.from('My name is Paul');
undefined
> stringBuf
<Buffer 4d 79 20 6e 61 6d 65 20 69 73 20 50 61 75 6c>
// 既存のバッファをコピー
> const asciiCopy = Buffer.from(asciiBuf);
undefined
> asciiCopy
<Buffer 61 61 61 61 61>
> asciiBuf === asciiCopy
false
> asciiBuf == asciiCopy
false
```

## Step2 Reading from a Buffer

バッファからの読み取り

```shell
> const hiBuf = Buffer.from('Hi!');
undefined
> hiBuf[0];
72
> hiBuf[1];
105
> hiBuf[2];
33
> hiBuf[3];
undefined
// バイト列を文字列に変換
> hiBuf.toString();
'Hi!'
// 0バイトの大きさの新しい空のバッファを作成
> const tenZeroes = Buffer.alloc(10);
> tenZeroes.toString();
'\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00'
// 16進に変換
> hiBuf.toString('hex');
'486921'
// JSONオブジェクトに変換
> hiBuf.toJSON();
{ type: 'Buffer', data: [ 72, 105, 33 ] }
> tenZeroes.toJSON();
{ type: 'Buffer', data: [
    0, 0, 0, 0, 0,
    0, 0, 0, 0, 0
  ] }
```

## Step3 Modifying a Buffer

バッファの変更

```shell
> hiBuf[1] = 'e';
'e'
> hiBuf.toString();
'H\x00!'
> hiBuf[1] = 101;
101
> hiBuf.toString();
'He!'
> hiBuf[2] = 121;
121
> hiBuf.toString();
'Hey'
// バッファの範囲外に書き込む
> hiBuf[3] = 111;
111
> hiBuf.toString();
'Hey'
// `write()`で全バッファ書き換え
> hiBuf.write('Hi!');
3
> hiBuf.toString();
'Hi!'
// 確保したバッファより長いシーケンスを書き込む
> const petBuf = Buffer.alloc(3);
undefined
> petBuf.write('Cats');
3
> petBuf.toString();
'Cat'
// 確保したバッファより短いシーケンスを書き込む
> const petBuf2 = Buffer.alloc(4);
undefined
> petBuf2.write('Cats');
4
> petBuf2.write('Hi');
2
> petBuf2.toString();
'Hits'
> const wordsBuf = Buffer.from('Banana Nananana');
undefined
> const catchphraseBuf = Buffer.from('Not sure Turtle!');
undefined
> wordsBuf.copy(catchphraseBuf);
15
> catchphraseBuf.toString();
'Banana Nananana!'
> catchphraseBuf.write('Not sure Turtle!');
16
> wordsBuf.copy(catchphraseBuf, 0, 7, wordsBuf.length);
8
> catchphraseBuf.toString();
'Nananana Turtle!'
```
