// pages/search/search.js
const app = getApp().globalData;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchBody: '热门搜索',
    searchHistory: '搜索历史',
    placeholder: '品质水果 自然新鲜',
    searchWord: '',
    hotWords: [],
    localWords: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this;
    that.getLocalWords();
    //console.log(getCurrentPages()[0].route)
    app.util.request(app.api.HotWords, 'GET').then((res) => {
      if (res.status && res.status == 1) {
        that.setData({
          hotWords: res.data
        })
        console.log(res.data)
      }
    }).catch({

    })
  },
  //获取本地搜索历史
  getLocalWords: function () {
    let localWords = wx.getStorageSync('localWords');
    this.setData({
      localWords: localWords
    })
  },
  //清除本地搜索历史
  clearLocalWords: function () {
    wx.setStorageSync('localWords', []);
    this.setData({
      localWords: []
    })
  },
  //设置本地历史
  setLocalWords: function (obj = {}) {
    let localWords = wx.getStorageSync('localWords');
    if (!localWords) {
      localWords = []
    }
    let pan = true;
    localWords.map((val, index) => {
      if (val.text == obj.text) {
        pan = false;
      }
    })
    if (pan) {
      localWords.push(obj);
      wx.setStorageSync('localWords', localWords);
      this.setData({
        localWords: localWords
      })
    }

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
  //返回上一页
  goBack: function () {
    wx.navigateBack({
      delta: 1
    })
  },
  //获取输入内容
  searchWord: function (e) {
    this.setData({
      searchWord: e.detail.value
    })
  },
  //搜索
  search: function () {
    const that = this;
    let keyword = this.data.searchWord;
    let obj = {
      keyword: keyword
    };
    app.util.request(app.api.goodsSearch, 'GET', obj).then((res) => {
      if (res.status && res.status == 1) {
        wx.navigateTo({
          url: '/pages/cat-list/cat-list?keyword=' + keyword,
        })
        wx.setStorageSync('otherPageUrl', {
          url: '/pages/search/search',
          openType: ''
        })
        that.setLocalWords({ text: keyword })
      }
    }).catch((error) => {
      console.log(error)
    })
  },
  //文字搜索
  searchText: function (e) {
    const that = this;
    let obj = {
      keyword: e.currentTarget.dataset.text
    };
    let keyword = e.currentTarget.dataset.text;
    wx.navigateTo({
      url: '/pages/cat-list/cat-list?keyword=' + keyword,
    });
    wx.setStorageSync('otherPageUrl', {
      url: '/pages/search/search',
      openType: ''
    })

    that.setLocalWords({ text: keyword })
  },

})