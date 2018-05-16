const { updateTodos } = require('../../app_requests');


const app = getApp();

Page({
  data: {
    inputValue: '',
  },
  onBlur(e) {
    this.setData({
      inputValue: e.detail.value,
    });
  },
  add() {
    app.globalData.todos = app.globalData.todos.concat([{
      text: this.data.inputValue,
      compeleted: false,
    }]);

    updateTodos(app.globalData.todos, ()=>{
      app.alert(app.locale.todos.update_succ);
    })

    my.navigateBack();
  },
});
