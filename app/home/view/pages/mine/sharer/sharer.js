const app =  getApp().globalData;

Page({
  data: {
    webViewUrl:"http://www.tplm.com/",
    sharerId:0,
    current:0,
    showDialog: false
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

    // this.getxp();
    // this.music();
    this.getsharerCat();
  },

  onLoad: function () {
    
  },


  getxp:function(){
    var that = this;
    let userId = wx.getStorageSync('userId');
    let obj = {
      userId: userId, //系统的
      sharerId:that.data.sharerId
    }
    app.util.request(app.api.LookLove, 'POST', obj).then((res) => {
      if (res.status && res.status == 1) {
        that.setData({
          loves: res.data,
        })
      }else{
        wx.showToast({
         title: res.msg,
         icon: 'none',
         duration: 2000
        })
      }
    }).catch((error) => {
      console.log(error)
    })
  },

  music:function(){
    //播放音乐
    // const innerAudioContext = app.BMGMUSIC
    // innerAudioContext.autoplay = true
    // innerAudioContext.src = 'http://www.tplm.com/upload/video/renxi.mp3'
    // innerAudioContext.play();
  },

  getsharerCat:function(){
    var that = this;
    let userId = wx.getStorageSync('userId');
    let obj = {
      userId: userId,
    }
    app.util.request(app.api.MineSharerCat, 'POST', obj).then((res) => {
      console.log(res)
      if (res.status && res.status == 1) {
        that.setData({
          sharerList: res.data,
        })
      }
    }).catch((error) => {
      console.log(error)
    })
  },


  bindPickerChange:function(e){
    var sharerList =this.data.sharerList;
    var select_key = e.detail.value;
    this.setData({
      setUpArrIndex: select_key,
      sharerId:sharerList[select_key]['id'],
      current:0,
    })
    app.BMGMUSIC.stop();
    this.getxp();
    this.music();
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 500
    })
    setTimeout(function () {
      wx.hideToast()
    }, 500);
  },

  toggleDialog() {
    this.setData({
      showDialog: !this.data.showDialog,
    })
  }
})