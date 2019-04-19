// pages/cart/cart.js
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
    this.setData({
      orderId: options.orderId || 577,
    });
    this.getData();
  },
  getData: function () {
    const that = this;
    app.util.request(app.api.getLogistics, 'GET', { orderId: that.data.orderId }).then((res) => {
      if (res.status && res.status == 1) {
        this.setData({
          orderInfo: res.data.orderInfo,
          logisticInfo: res.data.logisticInfo
        })
      }
    }).catch((error) => {
      console.log(error)
    })

  },
  goGoods:function(e){
    var goodsId = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/shopsDetail/shopsDetail?goodsId=' + goodsId,
    })

  },
  copy: function (e) {
    var expressNo = e.currentTarget.dataset.val;
    var that = this;
    wx.setClipboardData({
      data: expressNo,
      success: function (res) {
        // self.setData({copyTip:true}),
        wx.showToast({
          title: '复制成功',
          icon:'none'
        })
      }
    });
  },

})