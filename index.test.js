// テスト対象モジュールインポート
import Todos from './index.js';
// assertモジュールをstrictモードでインポート
import assert from 'assert';
// import assert from 'assert/strict';

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
