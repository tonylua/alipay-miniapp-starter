const { assign, random } = require('lodash');

/*应用全局*/
module.exports = (app, prefix)=>{

  /**
   * 获得全局数据
   */
  app.get(`${prefix}/`, function(req, res) {

    //初始化请求中，会传入场景值等信息
    const {
      path,
      query,
      _scene
    } = req.query;
    
    console.log(`app init: _scene: ${_scene}, query: ${query}, path: ${path}`);

    // do sth. here ...
    
    //此次访问是否在有效登录态下
    // 根据首次的 code 等，或后续打开的 login_state 等决定
    const isLoginStateValid = 1; //random(0,1); 
    
    res.json({

      errcode: 0, //random(0, 1),
      errmsg: ':)',
      result: {
        foo1: 'bar2'
      }
    });
  });

};