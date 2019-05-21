const app =  getApp().globalData;
Page({
  data: {
  
  },
  onShow: function() {
    app.BMGMUSIC.stop();//关闭音乐的
  },
  /* 
   *  跳转到我的消息页面
   */
  tomyNews:function(e) {
    wx.navigateTo({
      url:'news/news'
    })
  },
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '个人中心'
    })
    // app.util.request(app.api.Minece, 'POST').then((rs) => {
    //   console.log(rs)
    // }).catch((error) => {
    //   console.log(error)
    // })
  },

  tomyXp:function(e) {
    wx.navigateTo({
      url:'xp/xp'
    })
  },


  tomyShare:function(e) {
    wx.navigateTo({
      url:'sharer/sharer'
    })
  },

  tomyBackground:function(e) {
    wx.navigateTo({
      url:'background/background'
    })
  },

  tomyMusic:function(e) {
    wx.navigateTo({
      url:'music/music'
    })
  },

  // lookShare:function(e) {
  //   wx.navigateTo({
  //     url:'/pages/index/look?sharerId=0&sharerUserId='+wx.getStorageSync('userId')
  //   })
  // },

  lookShare:function(e) {
    wx.navigateTo({
      url:'one/other'
    })
  },

})