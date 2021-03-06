//index.js
//获取应用实例
const app = getApp().globalData;

Page({
  data: {
    lists: [],
    page:0,
    webViewUrl:app.webViewUrl
  },
  onShow: function() {
    // this.setData({
    //   lists: [],
    //   page: 0
    // })
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 500
    })
    
    app.BMGMUSIC.stop();//关闭音乐的
    this.sharerLsit();

  },
  onLoad: function () {
    
  },
 /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },
       /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
   
  },

  sharerLsit:function(){
    
    const that = this
    let page = that.data.page;
    let lists = that.data.lists;
    page++;
    let obj = {
      page: page,
    }
    app.util.request(app.api.IndexSharerLsit, 'POST',obj).then((res) => {
      let rows = res.data.data || [];
      if (rows.length>0) {
        that.setData({
          lists: lists.concat(rows),
          page: page,
          v:res.data.v
        })
      }else{
        wx.showToast({
          title: '没有更多的内容啦',
          icon: 'none',
          duration: 1000
        })
      }
      
    })
  },

  onReachBottom: function () {
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 1000
    })
    this.sharerLsit();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    var title = '点点爱分享'
    return {
      title: title,
      path: '/pages/index/index',
      imageUrl:app.webViewUrl+'upload/index/index.jpg',
      success: (res) => {
        console.log("转发成功");
      },
      fail: (res) => {
        console.log("转发失败", res);
      }
    }
  }
})