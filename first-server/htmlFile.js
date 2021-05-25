import http from 'http';
import fs from 'fs/promises';

const host = 'localhost';
const port = '8000';

const requestListener = function (req, res) {
  fs.readFile('./index.html')
    // fs.readFile(__dirname + '/index.html')
    .then((contents) => {
      res.setHeader('Content-Type', 'text/html');
      res.writeHead(200);
      res.end(contents);
    })
    .catch((err) => {
      res.writeHead(500);
      res.end(err);
      return;
    });
};

const server = http.createServer(requestListener);
server.listen(port, host, () => {
  console.log(`サーバーはhttpで実行されています http://${host}:${port}`);
});
