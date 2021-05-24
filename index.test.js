// テスト対象モジュールインポート
import Todos from './index.js';
// assertモジュールをstrictモードでインポート
import assert from 'assert';
// import assert from 'assert/strict';

// 統合テスト用のグループを作成
describe('統合テスト', function () {
  // テストの名前をわかりやすく説明
  it('TODOsを追加して完了することができるはずです', function () {
    // オブジェクトをインスタンス化
    let todos = new Todos();
    // assertモジュールを使用
    // 実際値, 期待値
    assert.notStrictEqual(todos.list().length, 1);
  });
  it('TODOがまったくない場合にのみ完了すること', function () {
    let todos = new Todos();
    todos.add('ベッドから起き上がる');
    todos.add('ベッドを整える');
    assert.strictEqual(todos.list().length, 0);
  });
});
