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

