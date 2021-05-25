import http from 'http';

const host = 'localhost';
const port = '8000';

const requestListener = (req, res) => {};

const server = http.createServer(requestListener);
server.listen(port, host, () => {
  console.log(`サーバーはhttpで実行されています http://${host}:${port}`);
});
