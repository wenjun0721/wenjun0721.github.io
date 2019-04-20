const app = getApp().globalData;

Page({
  data: {
    webViewUrl:"http://www.tplm.com/",
    backShow:false,
    indexShow:true,
    backgroundCatArrindex:0,
    backgroundCatArr:['热门推荐','官方分类','个人分类'],
    backgroundCatShow:false,
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
    this.setData({
      backShow: false,
      indexShow:true,
    })
    this.initDate();
    //获取背景图分类
    // this.backgroundCatArr();

  },

  onLoad: function () {
    wx.setNavigationBarTitle({
      title: '背景图管理'
    })
  },

  background: function() {
    this.setData({
      backShow: true,
      indexShow:false,
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

  initDate:function(e){
      var that = this;
      let obj = {
        userId: 0, //打开页面都是读系统的背景图
      }
      app.util.request(app.api.Love_backGround, 'POST', obj).then((res) => {
        
        if (res.status && res.status == 1) {
          console.log(res.data)
          that.setData({
            backGround: res.data,
            imageList: res.data.imgs,
          })
        }
      }).catch((error) => {
        console.log(error)
      })
  },

  //改变分类，获取2级分类
  bindPickerChange: function (e) {
    var that = this;
    let value = e.detail.value;
    let obj = {
        value: value, 
        userId: wx.getStorageSync('userId')
      }
    if (value != 0) {
      app.util.request(app.api.Love_backGround_cat, 'POST', obj).then((res) => {
        if (res.status && res.status == 1) {
          console.log(res.data)
          that.setData({
            backgroundCatTwoArrindex:0,
            backgroundCatTwoArr:res.data.arr,
            backgroundCatShow: true,
          })
        }
      }).catch((error) => {
        console.log(error)
      })
    }
    this.setData({
      backgroundCatArrindex:value,
    })
  },

  //改变分类，获取2级分类
  bindPickerChangeTwo: function (e) {
    let value = e.detail.value;
    console.log(value)
    // let obj = {
    //     value: value, 
    //     userId: wx.getStorageSync('userId')
    //   }
    // if (value != 0) {
    //   app.util.request(app.api.Love_backGround_cat, 'POST', obj).then((res) => {
    //     if (res.status && res.status == 1) {
    //       console.log(res.data)
    //       that.setData({
    //         backgroundCatTwoArrindex:0,
    //         backgroundCatTwoArr:res.data,
    //         backgroundCatShow: true,
    //       })
    //     }
    //   }).catch((error) => {
    //     console.log(error)
    //   })
    // }
    this.setData({
      backgroundCatArrindex:value,
    })
  }



  // backgroundCatArr:function(e){
  //     var that = this;
  //     let obj = {
  //       userId: 0, //系统的
  //     }
  //     app.util.request(app.api.Love_backGround, 'POST', obj).then((res) => {
        
  //       if (res.status && res.status == 1) {
  //         console.log(res.data)
  //         that.setData({
  //           backGround: res.data,
  //           imageList: res.data.imgs,
  //         })
  //       }
  //     }).catch((error) => {
  //       console.log(error)
  //     })
  // }

})