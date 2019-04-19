const app = getApp().globalData;

Page({
  data: {
    webViewUrl:"http://www.tplm.com/",
    backShow:false,
  },
  onShow: function() {
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 500
    })
    setTimeout(function () {
      wx.hideToast()
    }, 500);
  },

  onLoad: function () {
    var that = this;
    let obj = {
      userId: 0, //系统的
    }

    app.util.request(app.api.Love_backGround, 'POST', obj).then((res) => {
      
      if (res.status && res.status == 1) {
        console.log(res.data)
        that.setData({
          backGround: res.data,
          imageList: res.data.imgs,
          backShow : true
        })
      }
    }).catch((error) => {
      console.log(error)
    })

  },

  background: function() {
    this.setData({
      backShow: true
    })
  },

  previewImg: function (e) {
    var src = e.currentTarget.dataset.src;
    var index = e.currentTarget.dataset.index;
    var uploadedImages = this.data.imageList;
    wx.previewImage({
      current: uploadedImages[index], //当前图片地址
      urls: uploadedImages, //所有要预览的图片的地址集合 数组形式
    })
  },




})