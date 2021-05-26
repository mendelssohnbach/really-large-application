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

## Step2  Writing Files writeFile()

`writeFile（）`ファイルの書き込み

`writeFile.js`

```js
import fs from 'fs/promises';

async function openFile() {
  try {
    const csvHeaders = 'name,quantity,price';
    await fs.writeFile('groceries.csv', csvHeaders);
  } catch (error) {
    console.error(`Got an error trying to write to a file: ${error.message}`);
  }
}

async function addGroceryItem(name, quantity, price) {
  try {
    const csvLine = `\n${name},${quantity},${price}`;
    await fs.writeFile('groceries.csv', csvLine, { flag: 'a' });
  } catch (error) {
    console.error(`Got an error trying to write to a file: ${error.message}`);
  }
}

// 匿名関数式
(async function () {
  // awaitをグローバルスコープから使用できない。
  // 非同期関数でラップする
  await openFile();
  await addGroceryItem('eggs', 12, 1.5);
  await addGroceryItem('nutella', 1, 4);
})();
```

```shell
$ node writeFile.js
$ cat groceries.csv
name,quantity,price
eggs,12,1.5
nutella,1,4
```

## Step3 Deleting Files with unlink()

`unlink（）`でファイルを削除する

`deleteFile.js`

```js
import fs from 'fs/promises';

async function deleteFile(filePath) {
  try {
    await fs.unlink(filePath);
    console.log(`Deleted ${filePath}`);
  } catch (error) {
    console.error(`Got an error trying to delete the file: ${error.message}`);
  }
}

deleteFile('groceries.csv');
```

```shell
$ node deleteFile.js
Deleted groceries.csv
```

## Step4 Moving Files rename()

`rename（）`ファイルの移動

`moveFile.js`

```js
import fs from 'fs/promises';

async function moveFile(source, destination) {
  try {
    await fs.rename(source, destination);
    console.log(`Moved file from ${source} to ${destination}`);
  } catch (error) {
    console.error(`Got an error trying to move the file: ${error.message}`);
  }
}

moveFile('greetings-2.txt', 'test-data/salutations.txt');
```


```shell
$ ls -la greetings-2.txt
-rw-rw-r-- 1 yasuji yasuji 28  5月 27 07:58 greetings-2.txt
$ node moveFile.js
Moved file from greetings-2.txt to test-data/salutations.txt
$ ls -la test-data/
合計 16
drwxrwxr-x 2 yasuji yasuji 4096  5月 27 08:05 .
drwxrwxr-x 3 yasuji yasuji 4096  5月 27 08:05 ..
-rw-rw-r-- 1 yasuji yasuji   28  5月 27 07:56 greetings.txt
-rw-rw-r-- 1 yasuji yasuji   28  5月 27 08:00 salutations.tx
```


