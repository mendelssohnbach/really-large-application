# How To Launch Child

子プロセスを起動する

[How To Launch Child Processes in Node.js](https://www.digitalocean.com/community/tutorials/how-to-launch-child-processes-in-node-js)

## Step1  Creating a Child Process with exec()

`exec（）`を使用した子プロセスの作成

` listFiles.js`
```js
import { exec } from 'child_process';

exec('ls -lh', (error, stdout, stderr) => {
  if (error) {
    console.error(`error: ${error.message}`);
    return;
  }

  if (stderr) {
    console.error(`stderr: ${stderr}`);
    return;
  }

  console.log(`stdout:\n${stdout}`);
});
```

```shell
$ node listFiles.js
stdout:
合計 8.0K
-rw-rw-r-- 1 yasuji yasuji 290  5月 26 18:38 README.md
-rw-rw-r-- 1 yasuji yasuji 275  5月 26 18:47 listFiles.js
```

`processNodejsImage.sh`

```sh
#!/bin/bash
curl -s https://nodejs.org/static/images/logos/nodejs-new-pantone-black.svg > nodejs-logo.svg
base64 nodejs-logo.svg
$ chmod u+x processNodejsImage.sh
```

```js
import { execFile } from 'child_process';
import process from 'process';

execFile(process.cwd() + '/processNodejsImage.sh', (error, stdout, stderr) => {
  if (error) {
    console.error(`error: ${error.message}`);
    return;
  }

  if (stderr) {
    console.error(`stderr: ${stderr}`);
    return;
  }

  console.log(`stdout:\n${stdout}`);
});
```

```sh
$ node getNodejsImage.js
stdout:
PHN2Zy...wvZz48L3N2Zz4=
$ node listFiles.js
stdout:
合計 24K
-rw-rw-r-- 1 yasuji yasuji 1.4K  5月 26 19:11 README.md
-rw-rw-r-- 1 yasuji yasuji  346  5月 26 19:10 getNodejsImage.js
-rw-rw-r-- 1 yasuji yasuji  275  5月 26 18:47 listFiles.js
-rw-rw-r-- 1 yasuji yasuji 5.4K  5月 26 19:10 nodejs-logo.svg
-rwxrw-r-- 1 yasuji yasuji  129  5月 26 18:55 processNodejsImage.sh
```

## Step2 Creating a Child Process with spawn()

`spawn（）`を使用した子プロセスの作成

`findFiles.js`

```js
import { spawn } from 'child_process';

const child = spawn('find', ['.']);

child.stdout.on('data', (data) => {
  console.log(`stdout: \n${data}`);
});

child.stderr.on('data', (data) => {
  console.error(`stderr: \n${data}`);
});

child.on('error', (error) => {
  console.error(`error: ${error.message}`);
});

child.on('close', (code) => {
  console.log(`child process exited with code ${code}`);
});
```

```shell
$ node findFiles.js
stdout:
.
./processNodejsImage.sh
./findFiles.js
./README.md
./nodejs-logo.svg
./getNodejsImage.js
./listFiles.js

child process exited with code 0
```

## Step3  Creating a Child Process with fork()

`fork（）`を使用した子プロセスの作成

`httpServer.js`

```js
import http from 'http';

const host = 'localhost';
const port = 8000;

const slowFunction = () => {
  let counter = 0;
  while (counter < 500000) {
  // while (counter < 5000000000) {
    counter++;
  }

  return counter;
};

const requestListener = function (req, res) {
  if (req.url === '/total') {
    let slowResult = slowFunction()
    let message = = `{"totalCount: ${slowResult}}`

    console.log(`Returning /total results`)
    res.setHeader('Content-Type', 'application/json')
    res.writeHead(200)
    res.end(message)
  } else if (req.url === '/hello') {
    console.log(`Returning /hello results`)
    res.setHeader('Content-Type', 'application/json')
    res.writeHead(200)
    res.end(`{"message":"hello"}`);
  }
};

const server = http.createServer(requestListener);
server.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});
```

```shell
$ node httpServer.js
Server is running on http://localhost:8000
Returning /total results
Returning /total results
Returning /hello results

$ curl http://localhost:8000/total
{"totalCount: 500000}
$ curl http://localhost:8000/hello
{"message":"hello"}
```

`getCount.js`

```js
const slowFunction = () => {
  let counter = 0;
  while (counter < 5000000000) {
    counter++;
  }

  return counter;
};

process.on('message', (message) => {
  if (message === 'START') {
    console.log('Child process received START message');
    let slowResult = slowFunction();
    const message = `{"totalCount":${slowResult}}`;
    process.send(message);
  }
});
```

`httpServer.js`リファクタリング

```js
import fork from 'child_process';
...
const requestListener = function (req, res) {
  if (req.url === '/total') {
    const child = fork(process.cwd() + '/getCount');
    // const child = fork(__dirname + '/getCount');

    child.on('message', (message) => {
      console.log('Returning /total results');
      res.setHeader('Content-Type', 'application/json');
      res.writeHead(200);
      res.end(message);
    });

    child.send('START');
  } else if (req.url === '/hello') {
    console.log(`Returning /hello results`);
    res.setHeader('Content-Type', 'application/json');
    res.writeHead(200);
    res.end(`{"message":"hello"}`);
  }
};
...
```

```shell
$ node httpServer.js
Server is running on http://localhost:8000
file:///home/yasuji/WorkSpace/really-large-application/child-processes/httpServer.js:19
    const child = fork(process.cwd() + '/getCount');
                       ^

ReferenceError: __dirname is not defined
```

