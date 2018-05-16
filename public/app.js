const { assign } = require('./utils/object');
const { init } = require('./app_requests');
const locale = require('./locale');

let _app = null;

App({
  
  locale,
  requesting: false,

  globalData: {
    todos: [],
    userInfo: null
  },

  onLaunch(launchParams) {
    console.log('app.js onLaunch', launchParams);

    _app = this;

    assign(_app.globalData, launchParams);

    init(launchParams, rst=>{
      assign(_app.globalData, rst);
    });
  },

  onShow(launchParams) {
    console.log('app onShow', launchParams, getCurrentPages().map(p=>p.route));

    if (_app && _app.globalData) {
      assign(_app.globalData, launchParams);
    }

    //此处根据自己需要决定每次如何重置路由
    if (getCurrentPages().length > 1) {
      my.reLaunch({
        url: '/pages/todos/todos',
        complete() {
          console.log('reLaunch in app_onShow ok');
        }
      });
    }
  },

  alert(msg, callback=null) {
    my.alert({
      title: '',
      content: String(msg),
      success(res) {
        if (callback) {
          callback();
        }
      }
    })
  },

  showMessagePage(errcode=0, errmsg='', buttons=[], iconUrl=null) {
    const c = parseInt(errcode);
    if (isNaN(c)) throw new Error('wrong errcode', errcode);
    const m = encodeURIComponent(errmsg);
    if (buttons 
      && (typeof buttons === 'object') 
      && !Array.isArray(buttons) ) {
      buttons = [buttons];
    }
    if (buttons && buttons.length && !buttons[0].hasOwnProperty('label'))
      throw new Error('wrong buttons', buttons);
    let url = `/pages/msg/msg?code=${c}&message=${m}`;
    if (buttons && buttons.length) {
      url += `&buttons=${ encodeURIComponent(JSON.stringify(buttons)) }`;
    }
    if (iconUrl) {
      url += `&icon=${iconUrl}`;
    }
    my.navigateTo({url});
  },
  
  getUserInfo() {
    return new Promise((resolve, reject) => {
      const {userInfo} = _app.globalData;

      if (userInfo) resolve(userInfo);

      my.getAuthCode({
        scopes: ['auth_user'],
        success: (authcode) => {
          console.info('[app.js] getUserInfo', authcode);

          my.getAuthUserInfo({
            success: (res) => {
              _app.globalData.userInfo = res;
              resolve(_app.globalData.userInfo);
            },
            fail: () => {
              reject({});
            },
          });
        },
        fail: () => {
          reject({});
        },
      });
    });
  },
});
