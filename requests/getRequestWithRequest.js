import https from 'https';

const options = {
  method: 'GET',
};

const request = https.request(
  'https://jsonplaceholder.typicode.com/users?_limit=2',
  options,
  (res) => {
    if (res.statusCode !== 200) {
      console.error(`Did not get an OK from the server. Code: ${res.statusCode}`);
      res.resume();
      return;
    }

    let data = '';

    res.on('data', (chunk) => {
      data += chunk;
    });

    res.on('close', () => {
      console.log('Retrieved all data');
      console.log(JSON.parse(data));
    });
  }
);

request.end();
