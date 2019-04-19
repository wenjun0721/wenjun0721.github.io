const app = getApp().globalData;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
      var orderId = options.ordId;
      this.setData({
        orderId: orderId
      })
      this.getData();
  },
  getData: function () {
    const that = this;
    let obj = {
      userId: wx.getStorageSync('userId'),
      oId: that.data.orderId
    }
    app.util.request(app.api.saleAfter, 'GET', obj).then((res) => {
      if (res.status && res.status == 1) {
        that.setData({
          data: res.data
        })
      }
    }).catch((error) => {
      console.log(error)
    })

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
  goSaleAfter: function (e) {
    var type = e.currentTarget.dataset.type
    var ordId = e.currentTarget.dataset.ordid
    wx.navigateTo({
      url: 'saleAfter_Detail?ordId=' + ordId + "&type=" + type,
    })
    console.log(e)
  }
})