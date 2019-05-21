const app =  getApp().globalData;

Page({
  data: {
    addStyle:'width:40%;left:5%',
    addStyle1:'width:40%;left:53%',
    images: '',
  },
  onShow: function() {
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 500
    })
 
  },

  onLoad: function () {
    wx.setNavigationBarTitle({
      title: '上传音乐'
    })
    this.upfile();
  },
  
  hideXpModal:function(){
    //删除没有上传的图片
    var images = this.data.images;
    if (images != '') {
      this.del()
    }
    wx.navigateBack({
      delta: 1
    })
  },


  upfile: function () {
    var that = this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths
        if (tempFilePaths.length > 0) {
          that.setData({
            img: tempFilePaths[0]
          })
          wx.uploadFile({
            url: app.api.MindeUpFile, //仅为示例，非真实的接口地址
            filePath: tempFilePaths[0],
            name: 'file',
            formData: {
              'userId': wx.getStorageSync('userId')
            },
            success: function (rss) {
              var data = JSON.parse(rss.data);
              if (data.status && data.status == 1) {
                that.del()
                wx.showToast({
                 title: data.msg,
                 duration: 2000
                })
                that.setData({
                  images: data.data
                })
              }else{
                wx.showToast({
                 title: data.msg,
                 icon: 'none',
                 duration: 2000
                })
                that.setData({
                  images: ''
                })
              }
            }
          })
        }
      }
    })
  },

  del:function(){
    var images = this.data.images;
    app.util.request(app.api.MineDelBN, 'POST', {'images':images}).then((res) => {
    })
  },

  baocun:function(){
    var that = this;
    var images = this.data.images;
    if (images == '') {
      wx.showToast({
       title: '请先上传图片',
       icon: 'none',
       duration: 2000
      })
    }else{
      var userId = wx.getStorageSync('userId');
      app.util.request(app.api.MineSaveB, 'POST', {'images':images,'userId':userId}).then((res) => {
        wx.showToast({
         title: res.msg,
         duration: 2000
        })
        that.setData({
          images: ''
        })
      })
    }
    
  },

})

