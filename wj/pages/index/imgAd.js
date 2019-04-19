const app = getApp().globalData;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgAdTitle: '首页广告',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let type = options.type || 1;
    if (type == 2) {
      this.setData({
        imgAdTitle: '早餐'
      })
    } else {
      this.setData({
        imgAdTitle: '汽车'
      })
    }
    app.util.request(app.api.indexAd, 'GET', { type: type }).then((res) => {
      if (res.status && res.status == 1) {
        this.setData({
          adLists: res.data
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
  goBack: function () {
    wx.navigateBack({
      delta: 1
    })
  }


})