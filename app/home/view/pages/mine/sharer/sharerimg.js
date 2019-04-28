const app =  getApp().globalData;

Page({
  data: {
    webViewUrl:"http://www.tplm.com/",
    changeText:'管理',
    changeBtn:'Run',
    changeImgBtn:'previewImage',
    delModal:false,
  },
  onShow: function() {
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 1000
    })
    setTimeout(function () {
      wx.hideToast()
    }, 1000);
    app.BMGMUSIC.stop();//关闭音乐的
    this.xpModal();
  },

  onLoad: function (options) {
    this.setData({
      sharerId:options.sharerId
    })
  },
  xpModal:function(e){
    var that = this;
    let userId = wx.getStorageSync('userId');
    let obj = {
      userId: userId, //系统的
      sharerId:that.data.sharerId,
    }
    app.util.request(app.api.LookLove, 'POST', obj).then((res) => {
      if (res.status && res.status == 1) {
        var sharerImgArr = res.data.map(item => {
          return item.img;
        })
        that.setData({
          sharerImgList: res.data,
          sharerImgArr,
        })
      }else{
        wx.showToast({
         title: res.msg,
         icon: 'none',
         duration: 4000
        })
      }
    }).catch((error) => {
      console.log(error)
    })
  },

  hideXpModal:function(){
    wx.navigateTo({
      url: './sharer',
    })
  },

  previewImage:function(e){
    var src = e.currentTarget.dataset.src;
    var index = e.currentTarget.dataset.index;
    var uploadedImages = this.data.sharerImgArr;
    wx.previewImage({
      current: uploadedImages[index], //当前图片地址
      urls: uploadedImages, //所有要预览的图片的地址集合 数组形式
    })  
  },
  Run:function(){
    this.setData({
      changeText:'完成',
      changeBtn:'Ok',
      changeImgBtn:'checkImg',
      delModal:true,
    })
  },

  Ok:function(){
    this.setData({
      changeText:'管理',
      changeBtn:'Run',
      changeImgBtn:'previewImage',
      delModal:false,
    })
  },

  


})