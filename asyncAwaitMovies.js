import axios from 'axios';
import fs from 'fs/promises';

async function saveMovies() {
  try {
    const response = await axios.get('https://ghibliapi.herokuapp.com/films');
    let movieList = '';
    response.data.forEach((movie) => {
      movieList += `${movie['title']}, ${movie['release_date']}\n`;
    });
    await fs.writeFile('asyncAwaitMovies.csv', movieList);
  } catch (error) {
    console.error(`ジブリの映画をファイルに保存できませんでした: ${error}`);
  }
}

saveMovies();
