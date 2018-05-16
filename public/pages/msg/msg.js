Page({
    data: {
    },
    onLoad(opts) {
        const { code, message, buttons, icon } = opts;
        this.setData({
            message,
            code,
            icon: icon ? decodeURIComponent(icon) : 'initial',
            buttons: buttons ? JSON.parse(decodeURIComponent(buttons)) : []
        });
    },
    onButtonClick(e) {
      const { route } = e.currentTarget.dataset;

      console.log("trying to jump to ", route);

      my.redirectTo({
        url: route,
        fail() {
          my.alert({
            title: '提示',
            content: `无法跳转到 ${route}`
          })
        }
      });
    }
});