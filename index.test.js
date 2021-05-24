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
  });
});
