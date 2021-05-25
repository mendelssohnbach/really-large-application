import http from 'http';

const host = 'localhost';
const port = '8000';

const requestListener = (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.writeHead(200);
  res.end(`{"message": "This is JSON response"}`);
};

const server = http.createServer(requestListener);
server.listen(port, host, () => {
  console.log(`サーバーはhttpで実行されています http://${host}:${port}`);
});
