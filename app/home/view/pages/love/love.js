const app =  getApp().globalData;

Page({
  data: {
    webViewUrl:"http://www.tplm.com/",
    // setUpArr:['请选择相册','相册1','相册2'],
    // setUpArrIndex:0,
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

    var that = this;
    let userId = wx.getStorageSync('userId');
    let obj = {
      userId: userId, //系统的
    }
    app.util.request(app.api.Love, 'POST', obj).then((res) => {
      if (res.status && res.status == 1) {
        that.setData({
          loves: res.data,
        })
      }
    }).catch((error) => {
      console.log(error)
    })

    //播放音乐
    // const innerAudioContext = app.BMGMUSIC
    // innerAudioContext.autoplay = true
    // innerAudioContext.src = 'http://www.tplm.com/upload/video/renxi.mp3'
    // innerAudioContext.play();
  },

  onLoad: function () {
    
  },
})