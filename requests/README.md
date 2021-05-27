# Create an HTTP Client

HTTPクライアントを作成する

How To Create an HTTP Client with Core HTTP in Node.js

# GET Request

GETリクエスト

```js
https.get(URL_String, Callback_Function) {
    Action
}
```

`getRequestWithGet.js`

```js
import https from 'https';

const request = https.get('https://jsonplaceholder.typicode.com/users?_limit=2', (res) => {
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
});

request.on('error', (err) => {
  console.error(`Encountered an error trying to make a request: ${err.message}`);
});
```


```shell
$ node getRequestWithGet.js
Retrieved all data
[
  {
    id: 1,
    ...
    },
    phone: '1-770-736-8031 x56442',
    ...
  },
  {
    id: 2,
    ...
    },
    phone: '010-692-6593 x09125',
    ...
  }
]
```

`request（）`を使う

```js
https.request(URL_String, Options_Object, Callback_Function) {
    Action
}
```

`getRequestWithRequest.js`

```js
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
```

```shell
$ node getRequestWithRequest.js
Retrieved all data
[
  {
    id: 1,
    name: 'Leanne Graham',
      ...
      bs: 'synergize scalable supply-chains'
    }
  }
]
```

## Step2 request() Options

request（）オプション

```js
https.request(Options_Object, Callback_Function) {
    Action
}
```

```js
import https from 'https';

const options = {
  host: 'jsonplaceholder.typicode.com',
  path: '/users?_limit=2',
  method: 'GET',
  headers: {
    Accept: 'application/json',
  },
};

const request = https.request(options, (res) => {
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
});

request.end();
```

```shell
$ node getRequestWithRequest.js
Retrieved all data
[
  {
    id: 1,
    name: 'Leanne Graham',
    ...
      catchPhrase: 'Proactive didactic contingency',
      bs: 'synergize scalable supply-chains'
    }
  }
]
```

## Step POST Request

POSTリクエスト

` postRequest.js`

```js
import https from 'https';

const options = {
  host: 'jsonplaceholder.typicode.com',
  path: '/users',
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json; charset=UTF-8',
  },
};

const request = https.request(options, (res) => {
  if (res.statusCode !== 201) {
    console.error(`Did not get a Created from the server. Code: ${res.statusCode}`);
    res.resume();
    return;
  }

  let data = '';

  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('close', () => {
    console.log('Added new user');
    console.log(JSON.parse(data));
  });
});

const requestData = {
  name: 'New User',
  username: 'digitalocean',
  email: 'user@digitalocean.com',
  address: {
    street: 'North Pole',
    city: 'Murmansk',
    zipcode: '12345-6789',
  },
  phone: '555-1212',
  website: 'digitalocean.com',
  company: {
    name: 'DigitalOcean',
    catchPhrase: 'Welcome to the developer cloud',
    bs: 'cloud scale security',
  },
};

request.write(JSON.stringify(requestData));

request.end();

request.on('error', (err) => {
  console.error(`Encountered an error trying to make a request: ${err.message}`);
});
```

```shell
$ node postRequest.js
Added new user
{
  name: 'New User',
  username: 'digitalocean',
  email: 'user@digitalocean.com',
  address: { street: 'North Pole', city: 'Murmansk', zipcode: '12345-6789' },
  phone: '555-1212',
  website: 'digitalocean.com',
  company: {
    name: 'DigitalOcean',
    catchPhrase: 'Welcome to the developer cloud',
    bs: 'cloud scale security'
  },
  id: 11
}
```

## Step PUT Request

PUTリクエスト

`putRequest.js`

```js
import https from 'https';

const options = {
  host: 'jsonplaceholder.typicode.com',
  path: '/users/1',
  method: 'PUT',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json; charset=UTF-8',
  },
};

const request = https.request(options, (res) => {
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
    console.log('Updated data');
    console.log(JSON.parse(data));
  });
});

const requestData = {
  username: 'nakanishi',
  // username: 'digitalocean',
};

request.write(JSON.stringify(requestData));

request.end();

request.on('error', (err) => {
  console.error(`Encountered an error trying to make a request: ${err.message}`);
});
```

```shell
$ node putRequest.js
Updated data
{ username: 'nakanishi', id: 1 }
```





