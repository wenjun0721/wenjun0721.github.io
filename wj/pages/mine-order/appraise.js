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
    let orderId = options.orderId || 581;
    this.setData({
      orderId: orderId
    })
    this.getData();

    //check whether got the abc value
    if (app.abc != '') {
      this.setData({
        abc: app.abc
      })
      console.log("check abc", app.abc);
    } else {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      getApp().abcCallback = abc => {
        console.log("check abc", abc);
        if (abc != '') {
          this.setData({
            abc: abc
          })
        }
      }
    }
  },
  getData: function () {
    const that = this;
    let obj = {
      userId: wx.getStorageSync('userId'),
      oId: that.data.orderId
    }
    app.util.request(app.api.orderAppraise, 'GET', obj).then((res) => {
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
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },
  goAppraise: function (e) {
    let orderId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/mine-order/appraiseDetail?oId=' + this.data.orderId + '&orderId=' + orderId,
    })
  }

})