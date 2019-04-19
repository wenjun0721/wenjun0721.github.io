// pages/cart/cart.js
const app = getApp().globalData;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    img: [],
    images: [],
    scoreList: [
      {
        'name': '商品评分',
        'score': 5
      },
      {
        'name': '服务态度',
        'score': 5
      },
      {
        'name': '物流服务',
        'score': 5
      }
    ],
    star: [1, 2, 3, 4, 5]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let oId = options.oId || 581;
    let orderId = options.orderId || 619;
    this.setData({
      oId: oId,
      orderId: orderId
    })
    this.getData();
  },
  getData: function () {
    const that = this;
    let obj = {
      userId: wx.getStorageSync('userId'),
      oId: that.data.oId,
      orderId: that.data.orderId
    }
    app.util.request(app.api.orderAppraise2, 'GET', obj).then((res) => {
      if (res.status && res.status == 1) {
        that.setData({
          shopsInfo: res.data.Rows[0]
        });
        if (res.data.Rows[0].appraise) {
          let scoreList = this.data.scoreList;
          scoreList[0].score = res.data.Rows[0].appraise.goodsScore;
          scoreList[1].score = res.data.Rows[0].appraise.timeScore;
          scoreList[2].score = res.data.Rows[0].appraise.serviceScore;
          this.setData({
            isAppraise: true,
            appraiseInfo: res.data.Rows[0].appraise,
            scoreList: scoreList
          })
        }
      }
    }).catch((error) => {
      console.log(error)
    })

  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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
  upfile: function () {
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
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths;
        let maxLength = img.length;//最大长度 不超过5
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
            success: function (res) {
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
  //填写评论
  appraiseText: function (e) {
    let value = e.detail.value;
    this.setData({
      appraiseText: value
    })
  },
  //取消图片
  cancel: function (e) {
    let index = e.currentTarget.dataset.index;
    let img = this.data.img;
    let images = this.data.images;
    img.splice(index, 1);
    images.splice(index, 1);
    this.setData({
      img: img,
      images: images
    });
    console.log(this.data.img)
    console.log(this.data.images)
  },
  //点击评分
  star: function (e) {
    let parentIndex = e.currentTarget.dataset.parentindex;
    let selfIndex = e.currentTarget.dataset.self;
    let scoreList = this.data.scoreList;
    scoreList[parentIndex].score = selfIndex + 1;
    this.setData({
      scoreList: scoreList
    })
  },
  submit: function () {
    let obj = {
      userId: wx.getStorageSync('userId'),
      orderGoodsId: this.data.orderId, 
        orderId:this.data.oId,
      goodsId: this.data.shopsInfo.goodsId,
      goodsSpecId: this.data.shopsInfo.goodsSpecId,
      goodsScore: this.data.scoreList[0].goodsScore,
      serviceScore: this.data.scoreList[0].serviceScore,
      timeScore: this.data.scoreList[0].score,
      content: this.data.appraiseText,
      images: this.data.images.join(',')
    }
    app.util.request(app.api.addEval, 'GET', obj).then((res) => {
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