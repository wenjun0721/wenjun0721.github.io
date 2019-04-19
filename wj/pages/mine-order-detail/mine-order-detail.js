// pages/mine-order-detail/mine-order-detail.js
const app = getApp().globalData;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageTitle: "支付订单",
    orderLists: [],
    isHide: true,
    value: '',
    payType: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '订单详情'
    })
    this.setData({
      orderId: options.orderId || 540,
      shopId: options.shopId || 109,
    });
    this.getData();
  },
  getData: function () {
    const that = this;
    let userId = wx.getStorageSync('userId');
    if (!userId) {
      wx.navigateTo({
        url: '/pages/login',
      })
    };
    let as = {
      userId: wx.getStorageSync('userId'),
      ShopId: that.data.shopId,
      orderId: that.data.orderId
    };
    app.util.request(app.api.orderDetail, 'GET', as).then((res) => {

      console.log(res)
      this.setData({
        goods: res.data
      })
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

  }
})