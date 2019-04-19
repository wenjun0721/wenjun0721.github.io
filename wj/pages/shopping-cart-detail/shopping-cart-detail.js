// pages/shopping-cart-detail/shopping-cart-detail.js
const app = getApp().globalData;
Page({
  data: {
    pageTitle:"确认订单",
    payIndex:0,
    payArray: ['微信支付', '余额支付'],
    payObjectArray: [
      {
        id: 0,
        name: '微信支付'
      },
      {
        id: 1,
        name: '余额支付'
      }
    ],
    distributionIndex: 0,
    distributionArray: ['快递运输', '自提'],
    distributionObjectArray: [
      {
        id: 0,
        name: '快递运输'
      },
      {
        id: 1,
        name: '自提'
      }
    ],
    idName:'',
    idCard:'',
    leaveArr:[],
    isAlone:false,
    empty:true
  },






  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this;
    let orderId = options.orderId;
    let orderNo = options.orderNo;
    let shopId = options.shopId;
    console.log(options)
    that.setData({
      orderId: orderId,
      orderNo: orderNo,
      shopId: shopId
    })
    this.getData().then((res) => {
      let goodsId = that.data.goodsId;
      if (options.order) {
        let item = wx.getStorageSync('orderAddress');
        this.setData({
          userName: item.userName,
          userPhone: item.userPhone,
          labels: item.labels,
          areaName: item.pathName + item.userAddress,
          addressId: item.addressId
        });
        that.goodsIsArea(goodsId, item.addressId);
      } else {
        let obj = {
          userId: wx.getStorageSync('userId')
        }
        //获取默认地址
        app.util.request(app.api.getDefaultAddress, 'GET', obj).then((res) => {
          if (res.status && res.status == 1) {
            that.setData({
              userName: res.data.userName,
              userPhone: res.data.userPhone,
              labels: res.data.labels,
              areaName: res.data.areaName + res.data.userAddress,
              addressId: res.data.addressId
            })
          };
          that.goodsIsArea(goodsId, res.data.addressId);
        }).catch((error) => {
          reject(error);
        })

      }
    });
    wx.getSystemInfo({
      success: function (res) {
        let index = res.system.indexOf('iOS');
        if (index != -1) {
          //安卓
          that.setData({
            orderSrc: 'android'
          })
        } else {
          //ios
          that.setData({
            orderSrc: 'ios'
          })
        }
      },
      fail: function () {
        console.log('获取用户信息失败')
        return;
      }
    });
  },
  onShow: function () {
    app.util.request(app.api.getCartMoney, 'GET', { userId: wx.getStorageSync('userId') }).then((res) => {
      if (res.carts.length == 0) {
        this.setData({
          empty: false
        })
      }
    }).catch((error) => {
      console.log(error)
    })
  },
  getData: function () {
    const that = this;
    let userId = wx.getStorageSync('userId');
    if (!userId) {
      wx.navigateTo({
        url: '/pages/login',
      })
    }
    let arr = [];
    let goodsId = [];
    let obj = {
      userId: userId
    }
    return new Promise((resolve, reject) => {
      app.util.request(app.api.getCartMoney, 'GET', obj).then((res) => {
        if (res.carts && res.carts.length!=0) {
          let carts = res.carts;
          for (let n in carts) {
            arr.push({
              shopId: n,
              datas: carts[n]
            })
            carts[n].list.map((val, index) => {
              goodsId.push(val.goodsId);
              if (val.isDirectMail == 1) {
                that.setData({
                  isDirectMail: 1
                });
              }
            })
          };
          let isAlone = false;
          if (arr.length > 1 || arr[0].datas.list.length > 1) {
            isAlone = true;
          }
          that.setData({
            isAlone: isAlone,
            carts: arr,
            allFreight: res.allFreight,
            totalGoodsMoney: res.totalGoodsMoney,
            totalMoney: res.totalMoney,
            goodsId: goodsId
          });
          resolve();
        }
      }).catch((error) => {
        console.log(error);
        reject(error)
      })
    })

  },
  //遍历goodsId查看是否在所在区域中
  goodsIsArea: function (goodsId = [], addRessId = '') {
    const that = this;
    if (goodsId && goodsId.length < 1) {
      return;
    }
    let obj = {
      userId: wx.getStorageSync('userId'),
      goodsId: goodsId.join(","),
      addRessId: addRessId
    }
    app.util.request(app.api.goodsIsArea, 'GET', obj).then((res) => {
      let carts = that.data.carts;
      if (res.status && res.status == 1) {
        let datas = res.data.data;
        carts.map((val, index1) => {
          val.datas.list.map((val, index2) => {
            let goodsId = val.goodsId;
            datas.map((val, index3) => {
              if (goodsId == val.goodsid) {
                carts[index1].datas.list[index2].isSelect = val.isSelect;
              }
            })
          })
        })
        that.setData({
          carts: carts,
          isSelectGoodsId: res.data.data
        })
      } else {
        return
      }

    }).catch((error) => {

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
  //返回按钮
  goBack: function () {
    wx.navigateBack({
      delta: 1
    })
  },
  //切换订单收货地址
  toggleAddress: function () {
    wx.redirectTo({
      url: "/pages/mine-address/mine-address?order=" + 'true',
    })
  },
  bindPickerChange: function (e) {
    let index = e.detail.value;
    let role = e.currentTarget.dataset.role;//pay  distribution
    if (role == 'pay') {
      this.setData({
        payIndex: e.detail.value
      })
      console.log(this.data.payIndex)
    } else {
      this.setData({
        distributionIndex: e.detail.value
      })
      console.log(this.data.distributionIndex)
    }

  },
  //身份证
  idcardInput: function (e) {
    const that = this;
    let value = e.detail.value;
    let role = e.currentTarget.dataset.role;
    if (role == 'idName') {
      that.setData({
        idName: value
      })
    } else {
      that.setData({
        idCard: value
      });
    }
  },
  //提交订单
  submitOrder: function () {
    let userType = wx.getStorageSync('userType');
    // userType =  -1
    console.log(userType);
    // if (userType == "") {
    if (userType == "" && userType != 0) {
      console.log(122222222);
      wx.navigateTo({
        url: '/pages/login',
      });
      return;
    }
    wx.showLoading({
      title: '',
    })
    const that = this;
    let idCard = that.data.idCard;//身份证号码
    let idName = that.data.idName;//身份证姓名
    let orderSrc = that.data.orderSrc;
    let userId = wx.getStorageSync('userId');
    let isDirectMail = that.data.isDirectMail;
    let distributionIndex = that.data.distributionIndex;
    let isSelectGoodsId = that.data.isSelectGoodsId;
    let leaveArr = that.data.leaveArr;//买家留言
    let newArr = [];
    let obj = {};
    //首先判断商品是否在下单区域内
    if (isSelectGoodsId) {
      isSelectGoodsId.map((val, index) => {
        if (val.isSelect != 1) {
          //"商品部在下单区域内"
          wx.hideLoading();
          wx.showToast({
            title: '商品不在下单区域',
            icon: 'none'
          })
        } else {
          //如果订单含有跨境商品
          if (isDirectMail == 1) {
            let regName = /^[\u4e00-\u9fa5]{2,4}$/i;
            if (!regName.test(idName)) {
              //"身份证输入不合法"
              wx.hideLoading();
              wx.showToast({
                title: '只能是2-4个汉字',
                icon: 'none'
              })
              return;
            }
            let reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
            if (reg.test(idCard) === false) {
              //"身份证输入不合法"
              wx.hideLoading();
              wx.showToast({
                title: '身份证输入不合法',
                icon: 'none'
              })
              return;
            }
          }
          obj = {
            orderSrc: orderSrc,
            userId: userId,
            isDirectMail: isDirectMail || 0,//是否跨境
            trueName: idName || '',//身份证姓名
            identityNum: idCard || '',//身份证号码
            adDressId: that.data.addressId || '',//收货地址
            deliverType: distributionIndex || 0,//运输方式
            isInvoice: that.data.isInvoice || 0,//发票
            invoiceClient: that.data.invoiceClient || 0,//发票抬头
            payType: 1,//支付方式 0货到付款 1在线付款
          };
          let sharerId = wx.getStorageSync('sharerId');
          if (sharerId && sharerId != 0) {
            obj.sharerId = sharerId;
          }
          //遍历留言店铺ID
          leaveArr.map((val, index) => {
            for (let n in val) {
              obj[n] = val[n]
            }
          })
        }
      })
    }

    app.util.request(app.api.submitOrder, 'GET', obj).then((res) => {
      if (res.status && res.status == 1) {
        let orderNumber = res.data;
        wx.redirectTo({
          url: '/pages/shopping-cart-payment/shopping-cart-payment?orderNum=' + orderNumber + '&' + 'payType' + '=' + that.data.payIndex,
        })
      };
      wx.hideLoading();
    }).catch((error) => {
      wx.hideLoading();
      console.log(error)
    })
  },
  _goBack: function () {
    wx.navigateBack({
      delta: 1
    })
  },
  inputLeave: function (e) {
    let shopId = e.currentTarget.dataset.shopid;
    shopId = 'remark_' + shopId;
    let value = e.detail.value;
    let leaveArr = this.data.leaveArr;
    let obj = {};
    if (leaveArr.length < 1) {
      obj[shopId] = value;
      leaveArr.push(obj)
    } else {
      let pan = true;
      leaveArr.map((val, index) => {
        if (val[shopId]) {
          val[shopId] = value;
          pan = false;
        }
      })
      if (pan) {
        obj[shopId] = value;
        leaveArr.push(obj)
      }
    }
    this.setData({
      leaveArr: leaveArr
    })
  },





  bindViewEvent: function (e) {
    app.process(this, e);
  },
  //绑定下拉框选择事件
  bindSelect(e) {
    this.setData({
      index: e.detail.value
    })
  },
 
  
})