// pages/cat-list-bargain/cat-detail-bargain.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    pageType: 0,
    countDownDay: 0,
    countDownHour: 0,
    countDownMinute: 0,
    countDownSecond: 0,
    showAssembleModal: false,
    imgUrls: [
      'http://img15.3lian.com/2015/h1/280/d/8.jpg',
      'http://img15.3lian.com/2015/h1/280/d/8.jpg',
      'http://img15.3lian.com/2015/h1/280/d/8.jpg'
    ],
    isLike: true,
    detailImg: [
      "http://img15.3lian.com/2015/h1/280/d/8.jpg",
      "http://img15.3lian.com/2015/h1/280/d/8.jpg",
      "http://img15.3lian.com/2015/h1/280/d/8.jpg",
      "http://img15.3lian.com/2015/h1/280/d/8.jpg"
    ],
    showModalStatus: false,
    animationData: false,
    stockNum: 6,//库存
    exitNum: 1,
    isShowAddress: false,
    encyclopedias: "鞋子有着悠久的发展史。大约在5000多年前的仰韶文化时期，就出现了兽皮缝制的最原始的鞋。鞋子是人们保护脚不受伤的一种工具。最早人们为了克服特殊情况，不让脚难受或者受伤，就发明了毛皮鞋子。鞋子发展到现在，就形成了现在这个样子。各种样式功能的鞋子随处可见。",//产品百科
    friends: [
      {
        image: 'http://img15.3lian.com/2015/h1/280/d/8.jpg',
        time: '2018-12-24 15:22:07',
        price: '35.5',
        name: 'aa'
      },
      {
        image: 'http://img15.3lian.com/2015/h1/280/d/8.jpg',
        time: '2018-12-24 15:22:07',
        price: '35.5',
        name: 'bb'
      }
    ],

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取屏幕的高度
    var sysInfo = wx.getSystemInfoSync();
    var winHeight = sysInfo.windowHeight;
    var winWidth = sysInfo.windowWidth;
    this.setData({
      winHeight: winHeight,
      winWidth: winWidth
    })

    var keep = [];
    if (wx.getStorageSync('keep_ShopsId')) {
      keep = wx.getStorageSync('keep_ShopsId');
    }
    if (options.goodsId != "") {
      keep.push(options.goodsId);
    }
    // var removeDupList = new Array();
    // removeDupList =keep.split(',');
    // removeDupList = first(removeDupList);
    // var keepStr = "";
    // for (var i = 0; i < removeDupList.length ; i++){
    //   keepStr += removeDupList[i] + ",";
    // }
    // 浏览记录
    wx.setStorage({
      key: 'keep_ShopsId',
      data: keep
    })




    console.log(wx.getStorageSync('keep_ShopsId'))

    // 获取屏幕的高度
    let userId = wx.getStorageSync('userId');
    if (!userId) {
      wx.navigateTo({
        url: '/pages/login',
      });
      return;
    }
    var sysInfo = wx.getSystemInfoSync();
    var winHeight = sysInfo.windowHeight;
    var winWidth = sysInfo.windowWidth;
    this.setData({
      winHeight: winHeight,
      winWidth: winWidth
    })

    const that = this;
    wx.showLoading({
      title: '',
    })
    let goodsId = options.goodsId || 1143; // 1599; //1487
    let sharerId = options.sharerId || 0;
    //let goodsId = 283; //1835 283 998

    // let areaText = wx.getStorageSync('selectArea').text;
    //let areaId = wx.getStorageSync('selectArea').id;
    this.setData({
      goodsId: goodsId,
      isSharer: wx.getStorageSync('isSharer')
    })
    let data = {
      goodsId: goodsId,
      userId: userId,
      sharerId: sharerId
    }
    this.getInitData(data);
    // this.queryMultipleNodes('data-0');
    // this.queryMultipleNodes('data-1');
    // this.queryMultipleNodes('data-2');
    this.getUserAddress();
    app.util.request(app.api.areaList).then(function (res) {
      that.setData({
        areas: res.data
      })
    }).catch(function (err) {
      console.log(err)
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.countDown(6)
  },

  // 显示地址
  showAddress() {
    this.setData({
      isShowAddress: !this.data.isShowAddress
    });
  },

  //显示拼团弹出框
  showAssembleModal() {
    this.setData({
      showAssembleModal: true
    })
  },
  //隐藏拼团弹出框
  hideAssembleModal() {
    this.setData({
      showAssembleModal: false
    })
  },

  // 收藏
  addLike() {
    this.setData({
      isLike: !this.data.isLike
    });
  },
  //联系
  showtip: function () {
    wx.showModal({
      title: '提示',
      content: '确定拨打电话：13242169821？',
      confirmText: '拨打电话',
      cancelText: '取消',
      success: function (res) {
        if (res.confirm) {
          console.log('拨打电话')
        } else {
          console.log('取消')
        }
      }
    })
  },
  //显示对话框
  showModal: function () {
    // 显示遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
      showModalStatus: true
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export()
      })
    }.bind(this), 200)
  },
  //隐藏对话框
  hideModal: function () {
    // 隐藏遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export(),
        showModalStatus: false
      })
    }.bind(this), 200)
  },
  jian: function () {
    if (this.data.exitNum > 1) {
      var num = this.data.exitNum;
      num--;
      this.setData({
        exitNum: num
      })
    }
  },
  jia: function () {
    if (this.data.exitNum < this.data.stockNum) {
      var num = this.data.exitNum;
      num++;
      this.setData({
        exitNum: num
      })
    }
  },
  inputNum: function (event) {
    if (event.detail.value < 1) {
      this.setData({
        exitNum: 1
      })
    } else if (event.detail.value > this.data.stockNum) {
      this.setData({
        exitNum: this.data.stockNum
      })
    }
  },
  // 复制事件
  copyBtn: function (e) {
    var that = this;
    wx.setClipboardData({
      //准备复制的数据
      data: that.data.encyclopedias,
      success: function (res) {
        wx.showToast({
          title: '复制成功',
        });
      }
    });
  },
  goCatStore: function (e) {
    wx.navigateTo({
      url: '../cat-store/cat-store'
    })
  },
  goIndex() {
    wx.switchTab({
      url: '../index/index'
    })
  },
  //倒计时
  countDown: function (val) {
    var totalSecond = val;
    var interval = setInterval(function () {
      // 秒数
      var second = totalSecond;

      // 天数位
      var day = Math.floor(second / 3600 / 24);
      var dayStr = day.toString();
      if (dayStr.length == 1) dayStr = dayStr;

      // 小时位
      var hr = Math.floor((second - day * 3600 * 24) / 3600);
      var hrStr = hr.toString();
      if (hrStr.length == 1) hrStr = hrStr;

      // 分钟位
      var min = Math.floor((second - day * 3600 * 24 - hr * 3600) / 60);
      var minStr = min.toString();
      if (minStr.length == 1) minStr = minStr;

      // 秒位
      var sec = second - day * 3600 * 24 - hr * 3600 - min * 60;
      var secStr = sec.toString();
      if (secStr.length == 1) secStr = secStr;

      this.setData({
        countDownDay: dayStr,
        countDownHour: hrStr,
        countDownMinute: minStr,
        countDownSecond: secStr,
      });
      totalSecond--;
      if (totalSecond < 0) {
        clearInterval(interval);
        this.setData({
          countDownDay: '0',
          countDownHour: '0',
          countDownMinute: '0',
          countDownSecond: '0',
        });
      }
    }.bind(this), 1000);
  }
})