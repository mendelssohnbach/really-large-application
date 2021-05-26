import http from 'http';

const host = 'localhost';
const port = '8000';

const greetings = ['Hello world', 'Hola mundo', 'Bonjour le monde', 'Hallo Welt', 'Salve mundi'];

const getGreeting = () => {
  const greeting = greetings[Math.floor(Math.random() * greetings.length)];
  return greeting;
};

const requestListener = (res, req) => {
  let message = getGreeting();
  res.setHeader('Content-Type', 'application/json');
  res.writeHead(200);
  res.end(`{"message": "${message}"}`);
};

const server = http.createServer(requestListener);
server.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});
