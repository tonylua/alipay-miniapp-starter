const { assign, pick } = require('./object');
const { show_loading, hide_loading } = require('./api');
const { mock_host, mock_port, mock_protocal } = require('../app.config');

const _isValidCode = code=>{
	let c = parseInt(code); 
    return (!isNaN(c)) && (c == 0)
};

let _globalData = {};

const _paramsToQuery = params => '?' + Object.keys(params).reduce((arr, key)=>{
  if (!!params[key])
    arr.push(`${key}=${ JSON.stringify(params[key]) }`);
  return arr;
}, []).join('&');

const _request = function(method, url, data, success, onfail=null) {
    //console.log(_globalData)
    show_loading();

    getApp().requesting = true;

    let reqData = assign(
      {_from_alipay: 1}, 
      pick(
        getApp().globalData,
        'encryptedData',
        'rawData',
        'iv',
        'path',
        'query',
        '_scene',
        'signature',
        'userInfo',
        'code',
        'extConfig',
        'login_state'
      ), 
      data
    );

    method = method.toUpperCase();

    if ('GET' === method) {
      url += _paramsToQuery(reqData);
      reqData = null;
    }

    console.log(method, url, reqData);

    my.httpRequest({
      url: `${mock_protocal}://${mock_host}:${mock_port}${url}`,
      data: reqData,
      dataType: 'json',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method,
      success(res){
        const logicResponse = res.data;
        const {errcode, errlevel, errmsg, result} = logicResponse;
        //自动更新标题
        try {
          const {alipay_pagetitle} = result;
          if (alipay_pagetitle) {

            setTimeout(function () {
              my.setNavigationBar({
                title: alipay_pagetitle
              });
            }, 500);
          }
        } catch(ex) {
          console.log(ex);
        }
        //报错页面
        if (!_isValidCode(errcode)) {
          if (onfail !== null) { //自定义
            onfail(logicResponse);
          } else if (errlevel && errlevel === 'alert') {
            getApp().alert(errmsg, ()=>{
              if (result.hasOwnProperty('routeAfterAlert')) {
                my.navigateTo({url: result.routeAfterAlert});
              }
            });
          } else { //默认
            let url = `/pages/msg/msg?code=${ errcode }&message=${ errmsg }`;
            if (result && 'alipay_buttons' in result) {
              url += `&buttons=${ encodeURIComponent(JSON.stringify(result.alipay_buttons)) }`;
            }
            if (result && 'alipay_iconUrl' in result) {
              url += `&icon=${ encodeURIComponent(result.alipay_iconUrl) }`;
            }
            my.navigateTo({url});
          }
          return;
        }
        //成功回调
        if (typeof success === 'function') {
          success(result);
        }
      },
      fail(res) {
        console.log(res);
      },
      complete(res) {
        getApp().requesting = false;
        hide_loading();
      }
    })
}

module.exports = {
    configUtil(app) {
        _globalData = app.globalData;
    },
    request: _request
}
