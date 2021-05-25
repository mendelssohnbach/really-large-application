# Chapter7

[How To Create a Web Server](https://www.digitalocean.com/community/tutorials/how-to-create-a-web-server-in-node-js-with-the-http-module)

## Step1 Creating a Basic HTTP Server

基本的なHTTPサーバーの作成

```shell
$ mkdir first-servers
$ cd first-servers
```

```js
import http from 'http';

const host = 'localhost';
const port = '8000';

const requestListener = function (req, res) {
  res.writeHead(200, {
    'Content-Type': 'text/plain;charset=utf-8',
  });
  res.end('ハローワールド⚠');
};

const server = http.createServer(requestListener);
server.listen(port, host, () => {
  console.log(`サーバーはhttpで実行されています: ${host}:${port}`);
});
```

```shell
$ node hello.js
サーバーはhttpで実行されています: localhost:8000

$ curl http://localhost:8000
ハローワールド⚠
```

## Step2 eturning Different Types of Content

さまざまな種類のコンテンツを返す

JSONを返す

```js
const requestListener = (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.writeHead(200);
  res.end(`{"message": "This is JSON response"}`);
};
```

```shell
$ curl http://localhost:8000
{"message": "This is JSON response"}
```

CSVを返す

```js
const requestListener = (req, res) => {
  res.setHeader('content-type', 'text/csv');
  res.setHeader('Content-Disposition', 'attachment;filename=over40club.csv');
  res.writeHead(200);
  res.end('id,name,email\n1,Suzuki,suzuki@tekitou.com');
};
```

```shell
$ curl http://localhost:8000
id,name,email
1,Suzuki,suzuki@tekitou.com
```

HTMLを返す

```js
const requestListener = (req, res) => {
  res.setHeader('Content-Type', 'text/html');
  res.writeHead(200);
  res.end('<html><body><h1>This is HTML</h1></body></html>');
};
```

```shell
$ curl http://localhost:8000
<html><body><h1>This is HTML</h1></body></html>
```


