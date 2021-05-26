import fs from 'fs/promises';

async function readFile(filePath) {
  try {
    const data = await fs.readFile(filePath);
    console.log(data.toLocaleString());
  } catch (error) {
    console.error(`Got an error trying to read the file: ${error.message}`);
  }
}

readFile('greetings.txt');
