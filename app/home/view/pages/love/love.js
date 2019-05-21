const app =  getApp().globalData;

Page({
  data: {
    webViewUrl:"http://www.tplm.com/",
    sharerId:0,
    sharerIndex:0,
    sharerName:'我的锦集'
  },
  onShow: function(options) {
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 500
    })
    this.getxp();
    this.getsharerCat();
  },

  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '编译回忆'
    })
    if (options.sharerId) {
      this.setData({
        sharerId:options.sharerId,
        sharerIndex:options.sharerIndex
      })
    }
  },


  getxp:function(){
    app.BMGMUSIC.stop();//关闭音乐的
    var that = this;
    let userId = wx.getStorageSync('userId');
    let obj = {
      userId: userId, //系统的
      sharerId:that.data.sharerId
    }
    app.util.request(app.api.LookLove, 'POST', obj).then((res) => {
      if (res.status && res.status == 1) {
        that.setData({
          loves: res.data.xp,
          video: res.data.video,
          current:0,
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

  getsharerCat:function(){
    var that = this;
    let userId = wx.getStorageSync('userId');
    let obj = {
      userId: userId,
    }
    app.util.request(app.api.LookLoveSharerCat, 'POST', obj).then((res) => {
      if (res.status && res.status == 1) {
        var sharerList = res.data.arr;
        var sharerArr = sharerList.map(item => {
          return item.name;
        })
        that.setData({
          sharerArr: sharerArr,
          sharerList: sharerList,
          sharerIndex:that.data.sharerIndex,
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
      sharerIndex:select_key,
      sharerName:sharerList[select_key]['name'],
    })
    this.getxp();
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 500
    })
  },

  /**
   * 用户点击右上角分享s
   */
  onShareAppMessage: function () {
    var that = this;
    var sharerId = that.data.sharerId;
    var sharerName =that.data.sharerName;
    var title = '我分享的锦集：'+sharerName+'，为我打call一下哦，么么哒。'
    return {
      title: title,
      path: '/pages/index/look?sharerId=' + sharerId+'&sharerUserId='+wx.getStorageSync('userId'),
      success: (res) => {
        //修改数据库
        if (sharerId != 0) {
          app.util.request(app.api.LookLoveSharer, 'POST', {'sharerId':sharerId}).then((rs) => {
            console.log("转发成功");
          }).catch((error) => {
            console.log(error)
          })
        }
      },
      fail: (res) => {
        console.log("转发失败", res);
      }
    }
  }

})