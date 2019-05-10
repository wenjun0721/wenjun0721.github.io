const app =  getApp().globalData;

Page({
  data: {
    sharerId:0,
    sharerIndex:0,
    co:2,
    cartNum:0,
  },
  onShow: function(options) {
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 500
    })
    this.getxp();
    // this.getsharerCat();
  },

  onLoad: function (options) {
    this.setData({
      sharerId:options.sharerId,
      sharerUserId:options.sharerUserId,
    })
    
  },


  getxp:function(){
    app.BMGMUSIC.stop();//关闭音乐的
    var that = this;
    let obj = {
      sharerId:that.data.sharerId,
      sharerUserId:that.data.sharerUserId
    }
    app.util.request(app.api.IndexLook, 'POST', obj).then((res) => {
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
      url: '../other/sharerUser?sharerUserId=' +sharerUserId,
    })
  },
  fh:function(){
    wx.navigateBack({
      delta: 1
    })
  },

  getsharerCat:function(){
    var that = this;
    let sharerUserId = that.data.sharerUserId;
    let obj = {
      sharerUserId: sharerUserId,
    }
    app.util.request(app.api.IndexSharerCat, 'POST', obj).then((res) => {
      if (res.status && res.status == 1) {
        var sharerList = res.data.arr;
        var cartNum = res.data.cartNum;
        var sharerArr = sharerList.map(item => {
          return item.name;
        })
        that.setData({
          sharerArr: sharerArr,
          sharerList: sharerList,
          sharerIndex:that.data.sharerIndex,
          cartNum: cartNum,
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
      sharerId:sharerList[select_key]['id'],
      current:0,
      sharerIndex:select_key
    })
    this.getxp();
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 500
    })
  },

})