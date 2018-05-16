const { assign } = require('./utils/object');
const { request, configUtil } = require('./utils/request');
const { mock_prefix } = require('./app.config');

//应用初始化
const initApp = (paramsWithCode, callback) => request(
  'GET', `${mock_prefix}/`,
  paramsWithCode,
  callback
);

//业务请求：获得todos数据
const getTodos = callback => request('GET', `${mock_prefix}/todos`, {}, callback);

//业务请求：提交todos数据
const updateTodos = (todos, callback) => request('POST', `${mock_prefix}/todos`, {todos}, callback);

module.exports = {
  init(app, paramsWithCode, callback) {
    configUtil(app);
    assign(app.globalData, paramsWithCode);
    initApp(paramsWithCode, callback);
    return this;
  },
  getTodos,
  updateTodos
}