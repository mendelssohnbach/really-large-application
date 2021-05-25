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



