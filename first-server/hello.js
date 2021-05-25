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
