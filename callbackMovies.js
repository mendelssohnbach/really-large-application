import request from 'request';
import fs from 'fs';

request('https://ghibliapi.herokuapp.com/films', (error, response, body) => {
  if (error) {
    console.error(`APIにリクエストを送信できませんでした: ${error.message}`);
    return;
  }

  if (response.statusCode !== 200) {
    console.error(`ステータスコード200が必要ですが、受信しました ${response.statusCode}.`);
    return;
  }

  console.log('映画のリストを処理しています');
  const movies = JSON.parse(body);

  let movieList = '';
  movies.forEach((movie) => {
    movieList += `${movie['title']}, ${movie['release_date']}\n`;
  });

  fs.writeFile('callbackMovies.csv', movieList, (error) => {
    if (error) {
      console.error(`ジブリ映画をフィルに保存できませんでした: ${error}`);
      return;
    }

    console.log('映画のリストをに保存しました: callbackMovies.csv');
  });
});
