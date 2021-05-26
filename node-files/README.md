# Using the fs Module

fsモジュールを使用

[How To Work with Files using the fs Module in Node.js](https://www.digitalocean.com/community/tutorials/how-to-work-with-files-using-the-fs-module-in-node-js)

## Reading Files readFile()

`readFile（）`ファイルの読み取り

```shell
echo "hello, hola, bonjour, hallo" > greetings.txt
```

`readFile.js`

```js
import fs from 'fs/promises';

async function readFile(filePath) {
  try {
    const data = await fs.readFile(filePath);
    console.log(data.toLocaleString());
  } catch (error) {
    console.error(`Got an error trying to read the file: ${error.message}`);
  }
}

readFile('greetings.txt');
```

```shell
$ node readFile.js
hello, hola, bonjour, hallo
```



