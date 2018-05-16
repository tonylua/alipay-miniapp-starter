const show_loading = (msg='loading')=>{
  if (my.showLoading) {
    my.showLoading({
      title: msg,
    })
  } else {
    my.showToast({
      title: msg,
    })
  }
};

const hide_loading = () => {
  if (my.hideLoading) {
    my.hideLoading()
  } else {
    my.hideToast()
  }
};

module.exports = {
  show_loading,
  hide_loading
};