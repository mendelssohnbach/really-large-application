import http from 'http';
import fs from 'fs/promises';

const host = 'localhost';
const port = '8000';

// 変数はHTMLファイルの内容を保持する
let indexFile;

const requestListener = function (req, res) {
  res.setHeader('Content-Type', 'text/html');
  res.writeHead(200);
  res.end(indexFile);
};

const server = http.createServer(requestListener);

fs.readFile('./index.html')
  .then((contents) => {
    // ファイルが正常に読み取られたら、グローバルindexFile変数
    indexFile = contents;
    // グローバル変数に割当後、サーバを起動
    server.listen(port, host, () => {
      console.log(`サーバーはhttpで実行されています http://${host}:${port}`);
    });
  })
  .catch((err) => {
    console.error(`index.htmlファイルを読み取れませんでした: ${err}`);
    process.exit(1);
  });
