import http from 'http';

const host = 'localhost';
const port = '8000';

const requestListener = (req, res) => {
  res.setHeader('content-type', 'text/csv');
  res.setHeader('Content-Disposition', 'attachment;filename=over40club.csv');
  res.writeHead(200);
  res.end('id,name,email\n1,Suzuki,suzuki@tekitou.com');
};

const server = http.createServer(requestListener);
server.listen(port, host, () => {
  console.log(`サーバーはhttpで実行されています http://${host}:${port}`);
});
