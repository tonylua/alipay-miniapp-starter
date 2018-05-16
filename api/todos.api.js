const { random } = require('lodash');
const { mock_host, mock_port } = require('../dev.config');

const HOST = `http://${mock_host}:${mock_port}`; //小程序规定引用的图片等必须为https完整绝对路径

/*主页*/
module.exports = (app, prefix)=>{

  /**
   * 获得todos数据
   */
  app.get(`${prefix}/todos`, function(req, res) {

    const {
      query,
      _scene
    } = req.query;

    console.log('get /todos', query, _scene, global.todos);

    res.json({
      errcode: 0, //random(0, 1),
      errmsg: '很抱歉发生了某些错误',
      errlevel: 'default',
      result: {
        todos: global.todos || [
          { text: 'Learning Javascript', completed: true },
          { text: 'Learning ES2016', completed: true },
          { text: 'Learning 支付宝,小程序', completed: false },
        ],

        weapp_iconUrl: 'http://p1.ifengimg.com/cmpp/2018/05/15/41ec1a605a3a337a201058cdd198a488_size39_w170_h100.png'
      }
    });
  });

  /**
   * 提交todos数据
   */
  app.post(`${prefix}/todos`, function(req, res) {

    const {
      query,
      _scene,
      todos
    } = req.body;

    console.log('post /todos', todos);
    global.todos = todos;

    res.json({
      errcode: 0,
      errmsg: '很抱歉发生了某些错误',
      errlevel: 'default',
      result: {
      }
    });
  });

}