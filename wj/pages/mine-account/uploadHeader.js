const app = getApp().globalData;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    img: '../images/123.jpg',
    images: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.upfile();
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
            url: app.api.uploadPic, //仅为示例，非真实的接口地址
            filePath: tempFilePaths[0],
            name: 'file',
            formData: {
              'dir': 'users',
              'isTumb': 1
            },
            success: function (res) {
              if (res.statusCode == 200) {
                var data = JSON.parse(res.data);
                that.setData({
                  images: data.path
                })
              }
            }
          })
        }
      }
    })
  },
  updata: function () {
    var that = this;
    var images = this.data.images;
    wx.request({
      url: app.api.upUserPhoto,
      method: 'POST',
      data: {
        userId: wx.getStorageSync('userId'),
        userPhoto: images
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function (res) {
        if (res.data.status && res.data.status == 1) {
          if (res.data.data.status == 1) {
            wx.showToast({
              title: res.data.data.msg,
            });
            setTimeout(function () {
              wx.navigateBack({
                delta: 1
              })
              }, 800)
           
          } else {
            wx.showToast({
              title: '上传失败',
              icon: 'none'
            })
          }
        }
      }
    })
  }
})