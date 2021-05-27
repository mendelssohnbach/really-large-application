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


