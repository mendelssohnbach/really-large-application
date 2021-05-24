import axios from 'axios';
import fs from 'fs/promises';

axios
  .get('https://ghibliapi.herokuapp.com/films')
  .then((response) => {
    console.log('映画のリストを正常に取得しました');
    let movieList = '';
    response.data.forEach((movie) => {
      movieList += `${movie['title']}, ${movie['release_date']}\n`;
    });

    return fs.writeFile('promiseMovies.csv', movieList);
  })
  .then(() => {
    console.log('映画のリストをに保存しました: promiseMovies.csv');
  })
  .catch((error) => {
    console.error(`ジブリの映画をファイルに保存できませんでした: ${error}`);
  });
