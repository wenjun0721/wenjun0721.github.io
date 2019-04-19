// pages/cat/cat.js
const app = getApp().globalData;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    classify:true,
    goodsCats:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let goodsCats = [];
    var that = this
    app.util.request(app.api.goodsClassify, 'GET').then(function (data) {
      
      if (data.status && data.status == 1) {
        for (let n in data.data) {
          goodsCats.push(data.data[n]);
        }
        console.log("---------")
        console.log(goodsCats[0])
        console.log("---------")
        that.setData({
          goodsCats: goodsCats, 
          classifySliderIndex: goodsCats[0].catId, //分类左侧导航初始显示的ID
          classifyRight: goodsCats[0],//分类右侧初始数据
        })
      } else {

      }
    })
    //品牌初始化数据
    app.util.request(app.api.goodsBrands, 'GET').then(function (data) {
      console.log(data)
      if (data.status && data.status == 1) {
        that.setData({
          brandLists: data.data
        })
      } else {

      }
    }).catch(function (err) {
      console.log('请求失败' + err)
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

  changeClassify: function (e) {
    this.setData({
      classify: this.data.classify?false:true
    })
  },
  //左侧
  classifySlider: function (e) {
    let goodsCats = this.data.goodsCats;
    let id = e.target.id;
    let classifyRight;
    goodsCats.map((val, index) => {
      if (val.catId == id) {
        classifyRight = val;
        return;
      }
    })
    this.setData({
      classifySliderIndex: e.currentTarget.id,
      classifyRight: classifyRight,
      scrollTop: 0
    })
  }, 
  //品牌导航锚点跳转
  goGrandTitle: function (e) {
    let locations = this.data.brandListLocation;
    let index = e.currentTarget.dataset.index;
    console.log(locations)
    wx.pageScrollTo({
      scrollTop: locations[index] + 50,
      duration: 100
    })
  },
  //brand 点击品牌
  brand: function (e) {
    let brandId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/cat-list/cat-list?brandId=' + brandId,
    });
    wx.setStorageSync('otherPageUrl', {
      url: '/pages/cat/cat',
      openType: 'relaunch'
    })
  },
  //catId 点击分类
  catId: function (e) {
    let catId = e.currentTarget.dataset.id;
    console.log(catId)
    wx.navigateTo({
      url: '/pages/cat-list/cat-list?catId=' + catId,
    });
    wx.setStorageSync('otherPageUrl', {
      url: '/pages/cat/cat',
      openType: 'relaunch'
    })
  }
})