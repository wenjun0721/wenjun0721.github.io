const app = getApp().globalData;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    catesData:[],
    catesDataStatus:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
    onLoad: function(options) {
      let shopId = options.shopId || 112;
      const that = this;
      // let shopId = 34;
      that.setData({
        shopId: shopId
      })
      let userId = wx.getStorageSync('userId');
      // let userId = 1566;
      if (!userId) {
        wx.navigateTo({
          url: '/pages/login',
        })
      }
      let obj = {
        shopId: shopId,
        userId: userId
      };
      app.util.request(app.api.getShopCats, 'GET', obj).then((res) => {
        if (res.status && res.status == 1) {
          console.log(res.data)
          that.setData({
            catesData: res.data,
            catesDataStatus:true
          })
        }
      }).catch((error) => {
        console.log(error)
      });
    },
    
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  },
  goSearch:function(e){
    var cId1 = e.currentTarget.dataset.cid1;
    var cId2 = e.currentTarget.dataset.cid2;
    wx.redirectTo({
      url: '/pages/cat-store/cat-store?shopId=' + this.data.shopId + "&cId1=" + cId1 + "&cId2=" + cId2,
    })
  }
})