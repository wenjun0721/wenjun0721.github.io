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
    
  },

  tomyShare:function(e) {
    wx.navigateTo({
      url:'sharer/sharer'
    })
  },

  lookShare:function(e) {
    wx.navigateTo({
      url:'/pages/index/look?sharerId=0&sharerUserId='+wx.getStorageSync('userId')
    })
  },

})