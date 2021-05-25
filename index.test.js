// テスト対象モジュールインポート
import Todos from './index.js';
// assertモジュールをstrictモードでインポート
import assert from 'assert';
// import assert from 'assert/strict';
import fs from 'fs';

// 統合テスト用のグループを作成
describe('統合テスト', function () {
  // テストの名前をわかりやすく説明
  it('TODOsに最初はアイテムは存在しないはずです', function () {
    // オブジェクトをインスタンス化
    let todos = new Todos();
    // assertモジュールを使用
    // 実際値, 期待値
    // 等価である
    assert.strictEqual(todos.list().length, 0);

    // 最初のtodoを登録
    todos.add('コードの実行');
    assert.strictEqual(todos.list().length, 1);
    // 期待されるオブジェクトと実際のオブジェクトが同値プロパティを持っているか？
    assert.deepStrictEqual(todos.list(), [{ title: 'コードの実行', completed: false }]);

    // 2つ目のtodo
    todos.add('すべてをテストする');
    assert.strictEqual(todos.list().length, 2);
    assert.deepStrictEqual(todos.list(), [
      { title: 'コードの実行', completed: false },
      { title: 'すべてをテストする', completed: false },
    ]);

    todos.complete('コードの実行');
    assert.deepStrictEqual(todos.list(), [
      { title: 'コードの実行', completed: true },
      { title: 'すべてをテストする', completed: false },
    ]);
  });
});

describe('complete()', function () {
  it('TODOがない場合は失敗するはずです', function () {
    let todos = new Todos();
    const expectedError = new Error('TODOは保存されていません。 最初に追加してみませんか？');

    assert.throws(() => {
      todos.complete('存在しません');
    }, expectedError);
  });
});

describe('saveToFile()', function () {
  beforeEach(function () {
    this.todos = new Todos();
    this.todos.add('CSVを保存する');
  });

  afterEach(function () {
    if (fs.existsSync('todos.csv')) {
      fs.unlinkSync('todos.csv');
    }
  });

  it('エラーなしで単一のTODOを保存する必要があります', async function () {
    await this.todos.saveToFile();

    assert.strictEqual(fs.existsSync('todos.csv'), true);
    let expectedFileContents = 'Title,Completed\nCSVを保存する,false\n';
    let content = fs.readFileSync('todos.csv').toString();
    assert.strictEqual(content, expectedFileContents);
  });

  it('完了した単一のTODOを保存する必要があります', async function () {
    this.todos.complete('CSVを保存する');
    await this.todos.saveToFile();

    assert.strictEqual(fs.existsSync('todos.csv'), true);
    let expectedFileContents = 'Title,Completed\nCSVを保存する,true\n';
    let content = fs.readFileSync('todos.csv').toString();
    assert.strictEqual(content, expectedFileContents);
  });
});
