const app =  getApp().globalData;

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

    var that = this;
    let userId = wx.getStorageSync('userId');
    let obj = {
      userId: userId, //系统的
    }

    app.util.request(app.api.Love, 'POST', obj).then((res) => {
      
      if (res.status && res.status == 1) {
        console.log(res.data)
        that.setData({
          loves: res.data,
        })
      }
    }).catch((error) => {
      console.log(error)
    })
    // wx.request({
    //   url: 'http://www.tplm.com/home/Looklove/index',
    //   success: function (res) {
    //     console.log(res);
    //     that.setData({
    //       loves: res.data.data,
    //     })
    //   }
    // })
    const back=wx.getBackgroundAudioManager();
    back.src ="http://www.tplm.com/upload/video/renxi.mp3";
    back.title="天天音乐";
    back.coverImgUrl ="http://www.tplm.com/upload/video/renxi.mp3";
    back.play();
    back.onPlay(()=>{
    console.log("音乐播放开始");
    })
    back.onEnded(()=>{
    console.log("音乐播放结束");
    })
  },

  onLoad: function () {
    // const innerAudioContext = wx.createInnerAudioContext()
    // innerAudioContext.autoplay = true
    // innerAudioContext.src = 'http://www.tplm.com/upload/video/renxi.mp3'
    // innerAudioContext.onPlay(() => {
    //     console.log('开始播放')
    // })
    // innerAudioContext.onError((res) => {
    //     console.log(res.errMsg)
    //     console.log(res.errCode)
    // })


    
  },


})