const app = getApp().globalData;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageTitle: "支付订单",
    orderLists: [],
    isHide: true,
    value: '',
    payType: 0,
    showModal: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      payType: options.payType || 1
    })

    console.log(options)
    let userId = wx.getStorageSync('userId');
    if (!userId) {
      wx.navigateTo({
        url: '/pages/login',
      })
    }
    console.log(options)
    const that = this;
    let orderNum = options.orderNum || '153441152246769496'; //153397162352404560
    let obj = {
      userId: wx.getStorageSync('userId'),
      orderNum: orderNum
    };
    that.setData({
      orderNum: orderNum
    })
    app.util.request(app.api.goodsPreOrder, 'GET', obj).then((res) => {
      if (res.status && res.status == 1) {
        let isBatch = 0;
        if (res.data.length > 1) {
          isBatch = 1;
        }
        console.log(res.data)
        
        that.setData({
          orderLists: res.data,
          realTotalMoney: res.realTotalMoney,
          sharerToMoney: res.sharerToMoney,
          allaimipay: res.allaimipay,
          isBatch: isBatch
        })
      }
      console.log(res)
    })

  },
  onUnload: function() {
    //如果页面被卸载时被执行
    wx.showToast({
      title: '订单未支付,请在我的订单查看',
    });
  },
  getData: function() {
    const that = this;
    let userId = wx.getStorageSync('userId');
    if (!userId) {
      wx.navigateTo({
        url: '/pages/login',
      })
    }

  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },
  //返回按钮
  goBack: function() {
    wx.navigateBack({
      delta: 1
    })
  },
  payPwd: function() {
    this.setData({
      showModal: true,
      value: ""
    })
  },
  //付款
  pay: function() {
    const that = this;
    that.hideModal()
    let payType = that.data.payType; //0微信支付 1余额支付
    if (payType == 1) {
      console.log(that.data);
      let obj = {
        isBatch: that.data.isBatch,
      };
      let orderNo;
      if (that.data.isBatch == 1) {
        orderNo = that.data.orderNum;
      } else {
        orderNo = that.data.orderLists[0].orderNo;
      }
      obj.orderNo = orderNo;
      app.util.request(app.api.getPayKey, 'GET', obj).then((res) => {
        if (res.status && res.status == 1) {
          let payKey = res.data;
          let payObj = {
            key: payKey,
            userId: wx.getStorageSync('userId'),
            payPwd: that.data.value,
            isBatch: that.data.isBatch,
            orderNo: orderNo
          };
          app.util.request(app.api.balancePay, 'GET', payObj).then((res) => {
         
            if (res.status && res.status == 1) {
              if (res.data.status != 1) {
                wx.showToast({
                  title: res.data.msg,
                  icon: 'none'
                })
                if (res.data.data === undefined) {
                  setTimeout(function () {
                    wx.redirectTo({
                      url: '/pages/mine-order/mine-order?status=1',
                    })
                  }, 1000);
                }else{

                  that.payPwd();
                  return false;
                }
              }else{
                wx.showToast({
                  title: res.data.data.msg,
                  icon: 'success',
                })
                setTimeout(function () {
                  wx.redirectTo({
                    url: '/pages/mine-order/mine-order?status=3',
                  })
                },2000);
              }
            }
          }).catch((error) => {
            wx.showToast({
              title: error,
              icon: 'none',
            })
          });
        }
      }).catch((error) => {
        console.log(error)
      })
    } else {
      wx.showLoading({
        title: '',
      })
      let obj = {
        openid: wx.getStorageSync('openId'),
        total_fee: that.data.realTotalMoney,
        userId: wx.getStorageSync('userId'),
        isBatch: that.data.isBatch,
      };
      if (that.data.isBatch == 1) {
        obj.orderNo = that.data.orderNum;
      } else {
        obj.orderNo = that.data.orderLists[0].orderNo;
      }
      app.util.request(app.api.goPay, 'GET', obj).then((res) => {
        console.log('---------------');
        console.log(res);
        if (res.status && res.status == 1) {
          let payData = res.data;
          wx.requestPayment({
            'timeStamp': payData.timeStamp,
            'nonceStr': payData.nonceStr,
            'package': payData.package,
            'signType': 'MD5',
            'paySign': payData.paySign,
            'success': function(res) {
              wx.hideLoading();
              wx.showToast({
                title: '付款成功',
                icon: 'none'
              });
              wx.navigateTo({
                url: '/pages/me/me',
              })
            },
            'fail': function(res) {
              wx.hideLoading();
              wx.showToast({
                title: '付款失败',
                icon: 'none'
              })
            }
          })
        }else{
          //wenjun 返回错误信息 2019/2/22
          wx.showToast({
            title: res.msg,
            icon: 'none',
          })
        }
      }).catch((error) => {
        console.log(error)
        
      })
    }

  },
  //切换显示隐藏密码
  togglePassword: function() {
    this.setData({
      isHide: !this.data.isHide
    })
  },
  listenerInput: function(e) {
    console.log(e)
    this.setData({
      value: e.detail.value
    })
  },
  hideModal: function(e) {
    this.setData({
      showModal: false
    })
  },

})