// pages/mine-order/mine-order.js
const app = getApp().globalData;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    toView:'0',
    scrollLeft:'',
    reason: ['下错单', '配送地址有误', '我有更好的商品要买', '商品信息与商家描述不一致'],
    index:0,

    cancelIndex: 0,
    cancelArray: [],
    cancelObjectArray: [],
    cancelModalShow: false,
    indicatorDots: false,
    autoplay: false,
    interval: 5000,
    duration: 1,
    current: 0,
    swiperHeight: 1000,
    cartLists: [],
    orderLists: [],
    dai: false,
    pagesize: 10,
    page: 1,
    isLoading: false,
    isLoadingText: '正在加载'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      toView: options.status
    })
    let status = options.status || 0;
    let obj = {
      detail: {
        current: status
      }
    };
    this.swiperChange(obj)
    // this.getData();
    this.getReason(1);


    //check whether got the abc value
    if (app.abc != '') {
      this.setData({
        abc: app.abc
      })
      console.log("check abc", app.abc);
    } else {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      getApp().abcCallback = abc => {
        console.log("check abc", abc);
        if (abc != '') {
          this.setData({
            abc: abc
          })
        }
      }
    }
  },
  slideMenu: function (e) {
   
    this.setData({
      toView: e.currentTarget.dataset.status,
      scrollLeft: e.currentTarget.offsetLeft-100,
      current: e.currentTarget.dataset.status
    })
    let obj = {
      detail: {
        current: e.currentTarget.dataset.status
      }
    };
    this.swiperChange(obj)
  },

  goCatDetail: function (e) {
    var url = '/pages/shopsDetail/shopsDetail?goodsId=' + e.currentTarget.dataset.goodid;
    wx.navigateTo({
      url: url,
    })
  },
  goCatStore: function (e) {
    var url = '../cat-store/cat-store?shopId=' + e.currentTarget.dataset.shopid;
    wx.navigateTo({
      url: url,
    })
  },
  goCatList: function (e) {
    //  type=product 产品list
    //  type=brand 品牌list
    var url = '../cat-list/cat-list?type=' + e.currentTarget.dataset.type + '&id=' + e.currentTarget.id;
    wx.navigateTo({
      url: url,
    })
  },
  goMineCatPayment:function(e) {
    var url = '../shopping-cart-payment/shopping-cart-payment';
    wx.navigateTo({
      url: url,
    })
  },


  //初始化
  getData: function () {
    wx.showLoading({
      title: '',
    })
    const that = this;
    let userId = wx.getStorageSync('userId');
    let pagesize = that.data.pagesize;
    let datas = {
      userId: userId,
      pagesize: that.data.pagesize,
      page: 1,
    };
    app.util.request(app.api.getOrderList, 'GET', datas).then((res) => {
     
      if (res.status && res.status == 1) {
        that.setData({
          orderLists: res.data.Rows,
        })
        if (res.data.Rows.length < 1) {
          this.setData({
            isLoading: true,
            isLoadingText: ''
          })
        }
      } else {
        this.setData({
          isLoading: true,
          isLoadingText: res.msg
        })
      };
      wx.hideLoading();
    }).catch((error) => {
      console.log(error);
      wx.hideLoading();
    });

  },
  // type 1:取消 2:拒收 3:退款
  getReason: function (type) {
    const that = this;
    let obj = {
      type: type
    }
    app.util.request(app.api.getOrderReason, 'GET', obj).then((res) => {
      // cancelIndex: 0,
      //   cancelArray:[],
      //     cancelObjectArray:[],
      if (res.status && res.status == 1) {
        let cancelArray = [];
        let cancelObjectArray = [];
        let data = res.data;
        for (let n in data) {
          let datas = data[n];
          cancelArray.push(datas.dataName);
          cancelObjectArray.push(datas);
        }
        that.setData({
          cancelArray: cancelArray,
          cancelObjectArray: cancelObjectArray
        })
      }
    }).catch((error) => {

    })
  },

  //获取订单列表
  getOrderList: function (type) { //userId type orderNo shopName isRefund pagesize page   ;

    const that = this;
    let userId = wx.getStorageSync('userId');
    let pagesize = that.data.pagesize;
    let datas = {
      userId: userId,
      pagesize: that.data.pagesize,
      page: that.data.page,
      type: type,
    };

    if (that.data.isLoadingText == '') return;
    app.util.request(app.api.getOrderList, 'GET', datas).then((res) => {
      console.log( '----------------')
      console.log( that.data.orderLists.concat(res.data.Rows))
      if (res.status && res.status == 1) {
        //如果加载长度小于pagesize 则说明加载完毕
        if (res.data.Rows.length < pagesize) {
          that.setData({
            orderLists: that.data.orderLists.concat(res.data.Rows),
            isLoadingText: ''
          })
        } else {
          that.setData({
            orderLists: that.data.orderLists.concat(res.data.Rows),
            page: ++that.data.page,
            isLoading: false,
          })
        }
        wx.hideLoading();
      } else { //status=-1 没有相关订单
        that.setData({
          isLoadingText: res.msg
        })
        wx.hideLoading();
      }
    }).catch((error) => {
      console.log(error);
      wx.hideLoading();
    })
  },
  //swiper滑动时
  swiperChange: function (e) {
    wx.showLoading({
      title: '',
    });
    let current = e.detail.current; //0全部 1待付款 2拼团中 3待发货 4待收货 5已完成 6售后中 7未评价

    this.setData({
      orderLists: [], //先清空
      page: 1, //页数
      isLoadingText: '正在加载',
      isLoading: true,
      current: current
    });
    switch (parseInt(current)) {
      case 0:
        this.getOrderList();
        break;
      case 1:
        this.getOrderList('waitPay');
        break;
      case 2:
        this.getOrderList('waitShare');
        break;
      case 3:
        this.getOrderList('waitDelivery');
        break;
      case 4:
        this.getOrderList('waitReceive');
        break;
      case 5:
        this.getOrderList('finish');
        break;
      case 6:
        this.getOrderList('abnormal');
        break;
      case 7:
        this.getOrderList('waitAppraise');
        break;
      default:
        ;

    }


  },
  //订单导航点击事件
  condiNav: function (e) {
    this.setData({
      current: e.currentTarget.dataset.index
    })
  },
  //去订单搜索页面
  goSearch: function () {
    console.log(111)
    wx.navigateTo({
      url: '/pages/myOrder/orderSearch',
    })
  },
  //查看详情
  lookDetail: function () {
    wx.navigateTo({
      url: '/pages/myOrder/orderAfter',
    })
  },
  //返回我的
  goBack: function () {
    wx.navigateBack({
      delta: 1
    })
  },
  onReachBottom: function () {
    const that = this;
    that.setData({
      isLoading: true
    })
    let current = this.data.current;
    setTimeout(function () {
      switch (current) {
        case 0:
          that.getOrderList();
          break;
        case 1:
          that.getOrderList('waitPay');
          break;
        case 2:
          that.getOrderList('waitShare');
          break;
        case 3:
          that.getOrderList('waitDelivery');
          break;
        case 4:
          that.getOrderList('waitReceive');
          break;
        case 5:
          that.getOrderList('finish');
          break;
        case 6:
          that.getOrderList('abnormal');
          break;
        case 7:
          that.getOrderList('waitAppraise');
          break;
        default:
          ;
      }
    }, 100)
  },
  //取消  取消订单
  cancelModal: function () {
    const that = this;
    that.setData({
      cancelIndex: 0,
      cancelModalShow: false
    })
  },
  //确定  取消订单
  requireCancel: function () {
    const that = this;
    //获取取消订单理由
    let cancelIndex = that.data.cancelIndex;
    let reasonId = that.data.cancelObjectArray[cancelIndex].id;
    let obj = {
      userId: wx.getStorageSync('userId'),
      orderId: that.data.cancelOrderId,
      reasonId: reasonId
    }
    app.util.request(app.api.cancellation, 'GET', obj).then((res) => {
      if (res.status && res.status == 1) {
        wx.showToast({
          title: '取消成功',
        });
        that.setData({
          cancelModalShow: false
        });
        that.getData();
      }else{
        wx.showToast({
          title: res.msg,
          icon: 'none'
        });
      }
    }).catch((error) => {
      wx.showToast({
        title: '取消失败',
      })
      console.log(error)
    })
  },
  //选择取消订单理由
  bindPickerChange: function (e) {
    const that = this;
    let index = e.detail.index;
    that.setData({
      cancelIndex: index
    })
  },
  //取消订单
  cancelOrder: function (e) {
    const that = this;
    let orderId = e.currentTarget.dataset.orderid;
    //调出弹窗 先复位取消订单Index
    that.setData({
      cancelIndex: 0,
      cancelModalShow: true,
      cancelOrderId: orderId
    })
    wx.showModal({
      title: '提示',
      content: '确定要取消吗？',
      success: function (sm) {
        if (sm.confirm) {
          that.requireCancel();
          
          // 用户点击了确定 可以调用删除方法了
        }
      }
    })
    
  },
  //立即付款
  payRightNow: function (e) {
    let orderId = e.currentTarget.dataset.orderid;
    let orderunique = e.currentTarget.dataset.orderunique;
    let shopId = e.currentTarget.dataset.shopid;
    let obj = {
      orderId: orderId
    }
    wx.navigateTo({
      url: '/pages/shopping-cart-detail/selectOrderType?orderId=' + orderId + '&orderunique=' + orderunique + '&shopId=' + shopId,
    })
  },
  //查看订单详情
  lookOrderDetail: function (e) {
    let shopId = e.currentTarget.dataset.shopid;
    let orderId = e.currentTarget.dataset.orderid;

    console.log(e)
    wx.navigateTo({
      url: '/pages/mine-order-detail/mine-order-detail?orderId=' + orderId + '&shopId=' + shopId,
    })
  },
  //邀请好友
  inviteGroup: function (e) {

    let goodsId = e.currentTarget.dataset.goodsid;
    let groupNo = e.currentTarget.dataset.groupno;
    wx.navigateTo({
      url: '/pages/group/joinGroup?groupNo=' + groupNo,
    })
  },
  //查看商品
  goGoods: function (e) {
    let goodsId = e.detail.goodsId;
    let groupId = e.detail.groupId;
    if (groupId == 0) {
      wx.navigateTo({
        url: '/pages/shopsDetail/shopsDetail?goodsId=' + goodsId,
      })
    } else {
      wx.navigateTo({
        url: '/pages/group/groupDetail?goodsId=' + goodsId,
      })

    }
  },
  //查看店铺
  goShop: function (e) {
    let shopId = e.detail.shopId;
    wx.navigateTo({
      url: '/pages/shop/shop?shopId=' + shopId,
    })
  },
  //查看物流
  checkLogistics: function (e) {
    console.log(e)
    let orderId = e.currentTarget.dataset.orderid;
    wx.navigateTo({
      url: 'express?orderId=' + orderId,
    })
  },
  //确认收货
  requireOrder: function (e) {
    let that =  this;
    let orderId = e.currentTarget.dataset.orderid;
    let userId = wx.getStorageSync('userId');
    let obj = {
      orderId: orderId,
      userId: userId
    }
    wx.showModal({
      title: '订单',
      content: '是否确认收货?',
      success: function (res) {
        if (res.confirm) {
          app.util.request(app.api.receive, 'GET', obj).then((res) => {
            if (res.status == 1) {
              wx.showToast({
                title: '确认成功',
              });
              setTimeout(function () {
                that.getData();
              }, 1000);
              let current = that.data.status;
              switch (current) {
                case 0:
                  that.getOrderList();
                  break;
                case 1:
                  that.getOrderList('waitPay');
                  break;
                case 2:
                  that.getOrderList('waitShare');
                  break;
                case 3:
                  that.getOrderList('waitDelivery');
                  break;
                case 4:
                  that.getOrderList('waitReceive');
                  break;
                case 5:
                  that.getOrderList('finish');
                  break;
                case 6:
                  that.getOrderList('abnormal');
                  break;
                default:
                  ;
              }
            } else {
              wx.showToast({
                title: '操作失败',
                icon: 'none'
              })
            }
          }).catch((error) => [
            console.log(error)
          ])
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }

    })
  },
  //评价
  appraise: function (e) {
    let orderId = e.currentTarget.dataset.orderid;
    wx.navigateTo({
      url: 'appraise?orderId=' + orderId,
    })
  },
  //提醒发货
  remind: function (e) {
    let that = this;
    let orderId = e.currentTarget.dataset.orderid;
    let obj = {
      orderId: orderId,
      userId: wx.getStorageSync('userId')
    }
    app.util.request(app.api.noticeDeliver, 'GET', obj).then((res) => {
      if (res.status && res.status == 1) {
        wx.showToast({
          title: res.msg,
        })
        setTimeout(function () {
          that.getData();
        }, 1000);
      } else {
        wx.showToast({
          title: res.msg || '提醒失败',
          icon: 'none'
        })
      }
    }).catch((error) => {
      console.log(error)
    })
  },
  //申请售后
  saleAfter:function(e){
    // wx.navigateTo({
    //   url: '/pages/mine-order/saleAfter?ordId=' + e.currentTarget.dataset.orderid,
    // })
    var urlData = "/wechat/Orders/service1_app.html"
    wx.navigateTo({
      url: '/pages/index/web?url=' + urlData + "&ordId=" + e.currentTarget.dataset.orderid+'&type=all',
    })
  }
})