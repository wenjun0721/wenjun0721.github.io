const app =  getApp().globalData;

Page({
  data: {
    webViewUrl:app.webViewUrl,
    sharerId:0,
    sharerIndex:0,
    co:0
  },
  onShow: function(options) {
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 500
    })
    this.getxp();
  },

  onLoad: function (options) {
    if (options.sharerId) {
      this.setData({
        sharerId:options.sharerId,
        sharerUser:options.sharerUser,
      })
    }
  },


  getxp:function(){
    app.BMGMUSIC.stop();//关闭音乐的
    var that = this;
    let obj = {
      sharerId:that.data.sharerId
    }
    app.util.request(app.api.CollectRead, 'POST', obj).then((res) => {
      console.log(res)
      if (res.status && res.status == 1) {
        that.setData({
          loves: res.data.xp,
          video: res.data.video,
          current:0,
          co: res.data.co,
          sharerUserId: res.data.sharerUserId,
        })
        this.music();
      }else{
        wx.showToast({
         title: res.msg,
         icon: 'none',
         duration: 2000
        })
        that.setData({
          loves: [],
        })
      }
    }).catch((error) => {
      console.log(error)
    })
  },

  music:function(){
    //播放音乐
    var video = this.data.video
    const innerAudioContext = app.BMGMUSIC
    innerAudioContext.autoplay = true
    innerAudioContext.loop = true
    innerAudioContext.src = app.webViewUrl+video
    innerAudioContext.play();
  },
 
  sc:function(){
    var that = this;
    let obj = {
      sharerId:that.data.sharerId,
      userId: wx.getStorageSync('userId'),
      co:that.data.co,
    }
    app.util.request(app.api.CollectOne, 'POST', obj).then((res) => {
      if (res.data == -1) {
        res.data = 0
      }
      that.setData({
        co: res.data,
      })
      wx.showToast({
       title: res.msg,
       icon: 'none',
       duration: 2000
      })
      
    })
  },

  sy:function(){
    wx.reLaunch({
      url: '/pages/index/index',
    })
  },

  zy:function(){
    var sharerUserId = this.data.sharerUserId;
    wx.navigateTo({
      url: './sharerUser?sharerUserId=' +sharerUserId,
    })
  },
  fh:function(){
    wx.navigateBack({
      delta: 1
    })
  }


})