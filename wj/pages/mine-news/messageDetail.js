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
    let id = options.id;
    let obj = {
      userId: wx.getStorageSync('userId'),
      msgId: id
    };
    app.util.request(app.api.oneMyMess, 'GET', obj).then((res) => {
      if (res.status && res.status == 1) {
        this.setData({
          info: res.data
        })
      }
    }).catch((error) => {

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
})