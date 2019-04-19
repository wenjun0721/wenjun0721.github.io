const app = getApp().globalData;
Page({
  data: {
    img: [],
    images: [],
    idx: "",
    refundReason: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var ordId = options.ordId;
    var type = options.type;
    console.log(ordId)
    this.setData({
      ordId: ordId,
      type: type
    })
    this.getData()
  },
  getData: function() {
    const that = this;
    let obj = {
      userId: wx.getStorageSync('userId'),
      oId: that.data.ordId
    }
    app.util.request(app.api.saleAfter, 'GET', obj).then((res) => {
      if (res.status && res.status == 1) {
        console.log(res.data.refundReason)
        var refundReason = res.data.refundReason
        var nArr = [];
        for (var i in refundReason) {
          nArr.push(refundReason[i]);
        }
        that.setData({
          refundReason: nArr,
          data: res.data
        })
      }
    }).catch((error) => {
      console.log(error)
    })

  },
  //活动类型选择
  bindPickerType(e) {
    console.log(e)
    var value = e.detail.value
    this.setData({
      idx: value
    })
  },
  upfile: function() {
    var that = this;
    let img = that.data.img;
    console.log(img.length)
    if (img.length > 4) {
      wx.showToast({
        title: '最多5张',
        icon: 'none'
      });
      return;
    }
    wx.chooseImage({
      count: 5, // 默认9
      sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function(res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths;
        let maxLength = img.length; //最大长度 不超过5
        if (tempFilePaths.length > 0) {
          tempFilePaths.map((val, index) => {
            if (maxLength > 4) {
              return;
            } else {
              img.push(val);
              maxLength++;
            }

          })
          that.setData({
            img: img
          })
          wx.uploadFile({
            url: app.api.uploadPic, //仅为示例，非真实的接口地址
            filePath: tempFilePaths[0],
            name: 'file',
            formData: {
              'dir': 'users',
              'isTumb': 1
            },
            success: function(res) {
              if (res.statusCode == 200) {
                var data = JSON.parse(res.data);
                let images = that.data.images;
                images.push(data.path);
                that.setData({
                  images: images
                })
              }
            }
          })
        }
      }
    })
  },
  updata: function() {
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
      success: function(res) {
        if (res.data.status && res.data.status == 1) {
          if (res.data.data.status == 1) {
            wx.showToast({
              title: res.data.data.msg,
            });
            wx.navigateBack({
              delta: 1
            })
          } else {
            wx.showToast({
              title: '上传失败',
              icon: 'none'
            })
          }
        }
      }
    })
  },
  //点击图片放大
  ImgEnlarge: function(e) {
    console.log(e.currentTarget.dataset.index);
    var index = e.currentTarget.dataset.index;
    var uploadedImages = this.data.uploadedImages;
    wx.previewImage({
      current: uploadedImages[index], //当前图片地址
      urls: uploadedImages, //所有要预览的图片的地址集合 数组形式
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  //删除图片
  ImgDelete: function(e) {
    var that = this;
    var uploadedImages = this.data.uploadedImages;
    var index = e.currentTarget.dataset.index;
    uploadedImages.splice(index, 1);
    that.setData({
      uploadedImages: uploadedImages
    });
    uploadedCount = 9 - uploadedImages.length;
    if (uploadedImages.length < 9) {
      that.setData({
        uploadedImagesLength: true,
      });
    }
  },
  //输入框内容绑定
  listenerInput: function (e) {
    let role = e.currentTarget.dataset.role;
    let val = e.detail.value;
    let obj = [];
    obj[role] = val;
    this.setData({ [role]: val });
  },
  refund: function(e) {
    let that = this;
    console.log(that.data)
    var idx = that.data.idx;
    var refundReason = that.data.refundReason
    var reason = refundReason[idx].id
    var refundType = that.data.type
    var money = that.data.money
    var content = that.data.remarks
    var expressId = that.data.expressId||null;
    var expressOrder = that.data.expressOrder || null;
    var images = that.data.images;
    if (reason == '') {
      wx.showToast({
        title: "请选择退款原因^~^",
        icon: 'none'
      })
      return;
    }

    if (refundType == '') {
      wx.showToast({
        title: "请选择申请类型^~^",
        icon: 'none'
      })
      return;
    }
    if (money < 0 || money == '') {
      wx.showToast({
        title: "无效的退款金额",
        icon: 'none'
      })
      return;
    }
    var datas = {
      order: that.data.ordId,
      reason: reason,
      refundType: refundType,
      money: money,
      images: images,
      content: content,
      expressId: expressId,
      expressOrder: expressOrder
    };
    app.util.request(app.api.saleAfterSub, 'GET', datas).then((res) => {
      if (res.status && res.status == 1) {
        wx.showToast({
          title: res.data.msg,
        });
        setTimeout(function () {
          wx.navigateTo({
            url: '/pages/myOrder/myOrder',
          })
        }, 1000)

      } else {
        wx.showToast({
          title: res.data.msg,
          icon: 'none'
        })
      }
    }).catch((error) => {
      console.log(error)
    })
  }
})