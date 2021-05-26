import fs from 'fs/promises';

async function openFile() {
  try {
    const csvHeaders = 'name,quantity,price';
    await fs.writeFile('groceries.csv', csvHeaders);
  } catch (error) {
    console.error(`Got an error trying to write to a file: ${error.message}`);
  }
}

async function addGroceryItem(name, quantity, price) {
  try {
    const csvLine = `\n${name},${quantity},${price}`;
    await fs.writeFile('groceries.csv', csvLine, { flag: 'a' });
  } catch (error) {
    console.error(`Got an error trying to write to a file: ${error.message}`);
  }
}

// 匿名関数式
(async function () {
  // awaitをグローバルスコープから使用できない。
  // 非同期関数でラップする
  await openFile();
  await addGroceryItem('eggs', 12, 1.5);
  await addGroceryItem('nutella', 1, 4);
})();
