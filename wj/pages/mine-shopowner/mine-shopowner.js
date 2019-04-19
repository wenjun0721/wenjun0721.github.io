// pages/mine-shopowner/mine-shopowner.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    datas: [{
      image: '../../static/shopping_cart_card_1.png',
      selected: true,
      title: '1韩国JAYJUN保加利亚亮白保湿补水红玫瑰水光针面膜'
    },
    {
      image: '../../static/shopping_cart_card_1.png',
      selected: false,
      title: '2韩国JAYJUN保加利亚亮白保湿补水红玫瑰水光针面膜'
    },
    {
      image: '../../static/shopping_cart_card_1.png',
      selected: false,
      title: '3韩国JAYJUN保加利亚亮白保湿补水红玫瑰水光针面膜'
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '成为店长'
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
  bindChoice: function (e) {
    var index = parseInt(e.currentTarget.dataset.index);
    var datas = this.data.datas;
    // var selected = datas[index].selected;
    for (var i = 0; i < datas.length; i++) {
      if (datas[i].selected) {
        datas[i].selected = false;
      }
    }
    datas[index].selected = true;
    this.setData({
      datas: datas
    });
  },
})