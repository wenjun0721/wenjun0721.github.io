
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
    let orderId = options.orderId;
    let orderunique = options.orderunique;
    let shopId = options.shopId;
    console.log(options)
    this.setData({
      orderId: orderId,
      orderunique: orderunique,
      shopId: shopId
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
  //微信支付
  wxPay: function () {
    let orderId = this.data.orderId;
    let orderunique = this.data.orderunique;
    let shopId = this.data.shopId;
    wx.navigateTo({
      url: '/pages/shopping-cart-payment/shopping-cart-payment?orderNum=' + orderunique + '&' + 'payType=' + 0, 
    })
  },
  //余额支付
  moneyPay: function () {
    let orderId = this.data.orderId;
    let orderunique = this.data.orderunique;
    let shopId = this.data.shopId;
    wx.navigateTo({
      url: '/pages/shopping-cart-payment/shopping-cart-payment?orderNum=' + orderunique + '&' + 'payType=' + 1, 
    })
  },
})