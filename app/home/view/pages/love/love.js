const app = getApp()

Page({
  data: {
    webViewUrl:"http://www.tplm.com/",
  },
  onShow: function() {
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 500
    })
    setTimeout(function () {
      wx.hideToast()
    }, 500);
  },

  onLoad: function () {
    var that = this;
    wx.request({
      url: 'http://www.tplm.com/home/Looklove/index',
      success: function (res) {
        console.log(res);
        that.setData({
          loves: res.data.data,
        })
      }
    })
  },


})