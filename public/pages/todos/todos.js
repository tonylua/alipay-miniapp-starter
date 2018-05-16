const { getTodos } = require('../../app_requests');


const app = getApp();

Page({
  data: {},
  onLoad() {
    app.getUserInfo().then(
      user => this.setData({
        user,
        locale: app.locale
      }),
    );
  },
  onShow() {
    console.log('todos page onShow', app.globalData);

    const _me = this;

    getTodos(rst=>{
      _me.setData({ todos: rst.todos });
      app.globalData.todos = rst.todos;
    });

  },
  onTodoChanged(e) {
    const checkedTodos = e.detail.value;
    app.globalData.todos = app.globalData.todos.map(todo => ({
      ...todo,
      completed: checkedTodos.indexOf(todo.text) > -1,
    }));
    this.setData({ todos: app.globalData.todos });
  },
  addTodo() {
    my.navigateTo({ url: '../add-todo/add-todo' });
  },
  showMsg() {
    app.showMessagePage(0, "hello world!", [
      {
        label: "ok",
        route: "/pages/todos/todos"
      }
    ])
  }
});
