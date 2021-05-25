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
  // 非同期関数テストには`done`コールバックが必須
  it('単一のTODOを保存する必要があります', async function () {
    let todos = new Todos();
    todos.add('CSVを保存する');
    await todos.saveToFile();

    // 最初にファイルが存在することを確認
    assert.strictEqual(fs.existsSync('todos.csv'), true);
    // 期待値を変数に格納
    const expectedFileContents = 'Title,Completed\nCSVを保存する,false\n';
    // Bufferオブジェクトを文字列型に変換
    const content = fs.readFileSync('todos.csv').toString();
    assert.strictEqual(content, expectedFileContents);
  });
});
