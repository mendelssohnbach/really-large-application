// テスト対象モジュールインポート
import Todos from './index.js';
// assertモジュールをstrictモードでインポート
import assert from 'assert/strict';

// 統合テスト用のグループを作成
describe('integration test', function () {
  // テストの名前をわかりやすく説明
  it('should be able to add and complete TODos', function () {
    // オブジェクトをインスタンス化
    let todos = new Todos();
    // assertモジュールを使用
    // 実際値, 期待値
    assert.notStrictEqual(todos.list().length, 1);
  });
});
