// Todosクラスを定義
class Todos {
  constructor() {
    this.todos = [];
  }

  // 保存したtodoの配列を返す関数
  list() {
    return [...this.todos];
  }

  // 新しいTODOアイテムを追加するadd関数
  add(title) {
    let todo = {
      title,
      completed: false,
    };

    this.todos.push(todo);
  }

  // todo完了関数
  complete(title) {
    // TODOが空の場合、エラーを投げる
    if (this.todos.length == 0) {
      throw new Error('TODOは保存されていません。 最初に追加してみませんか？');
    }

    let todoFound = false;
    this.todos.forEach((todo) => {
      if (todo.title === title) {
        todo.completed = true;
        todoFound = true;
        return;
      }
    });

    if (!todoFound) {
      throw new Error(`タイトルのTODOが見つかりません: ${title}`);
    }
  }
}

export default Todos;
