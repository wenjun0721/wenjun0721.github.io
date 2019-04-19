// pages/cat-store/cat-store.js
const app = getApp().globalData;
Page({

  data: {
    webViewUrl:"https://uat.isp-cn.com",
    searchBody: '热门搜索',
    searchHistory: '搜索历史',
    placeholder: '品质水果 自然新鲜',
    searchWord: '',
    hotWords: [],
    localWords: [],
    shopLists: [],
    imgUrls:[1,2,3],
    wxboxLayerStatus: false,
    wxAppCodeLayerStatus:false,
    condiNavs: [{
      text: '人气',
      imgs: [

      ],
      index: 0
    }, {
      text: '价格',
      imgs: [
        '../../images/condiNav.png',
        '../../images/condiNav_up.png',
        '../../images/condiNav_down.png',
      ],
      select: 0,
      index: 1
    }, {
      text: '上架时间',
      imgs: [
        '../../images/condiNav.png',
        '../../images/condiNav_up.png',
        '../../images/condiNav_down.png',
      ],
      select: 0,
      index: 2
    }],
    condiNavIndex: 0,
    page: 1,
    pageSize: 20,
    loadingText: '正在加载...',
    actionSheetHidden: true,
    actionSheetItems: [
      { bindtap: 'Menu1', txt: '店铺首页' },
      { bindtap: 'Menu2', txt: '商品分类' },
      { bindtap: 'Menu3', txt: '客服' }
    ],
    menu: ''
  },
  onLoad: function(e) {
    let cId1 = e.cId1 || '';
    let cId2 = e.cId2 || '';
    let shopId = e.shopId || 112;
    // let shopId = 118;
    // this.setData({
    //   webViewUrl: "https://uat.isp-cn.com/wechat/shops/home_app.html?shopId=" + shopId
    // })
    // let sharerId = wx.getStorageSync('sharerId'); //如果本地sharerId!=0 则是店长
    // if (sharerId != 0) {
    //   wx.redirectTo({
    //     url: '/pages/shop/sharerShop?sharerId=' + sharerId,
    //   })
    // }
    this.setData({
      shopId: shopId,
      cId1: cId1,
      cId2: cId2,
    })
    this.getInitData();
  },
  getInitData: function() {
    const that = this;
    let shopId = this.data.shopId;
    let cId1 = this.data.cId1 || '';
    let cId2 = this.data.cId2 || '';
    let userId = wx.getStorageSync('userId');
    let obj = {
      shopId: shopId,
      userId: userId
    };
    let obj2 = {
      sortType: 1,
      sort: 1,
      page: 1,
      pageSize: 20,
      shopId: shopId,
    }
    if (cId1 != '' && cId1 != null && cId1 != "undefined"){
      obj2.cId1=cId1;
    }
    if (cId2 != '' && cId2 != null && cId2 != "undefined") {
      obj2.cId2 = cId2;
    }
    app.util.request(app.api.selfShop, 'GET', obj).then((res) => {
      if (res.status && res.status == 1) {
        console.log(res.data.shop)
        console.log(123)
        console.log(res)
        var shopType = app.common.getShopType(res.data.shop.shareRank);
        let arr = [];
        let times = [];
        arr = res.data.groupons;
        if (arr){
          arr.map((val, index) => {
            val.redNum = val.groupNum - val.innerNum;
            let nowTime = parseInt(new Date().getTime() / 1000);
            let time = parseInt(new Date(val.endTime.replace(/-/g, '/')).getTime() / 1000);
            let redTime = time - nowTime;
            let over = 'no';
            if (redTime < 0) {
              redTime = 1;
              over = 'true';
            } else {
              over = 'no';
            }
            times.push({
              redTime: redTime,
              over: over
            })
          });
        }
        this.setData({
          groupons: arr,
          tCoupons: res.data.tCoupons,
          ShopImgs: res.data.ShopImgs,
          Bargains: res.data.Bargains,
          show_video: res.data.show_video,
          reward: res.data.reward,
          shopmarker: res.data.shopmarker,
          times: times,
          shopInfo: res.data.shop,
          shopType: shopType,
          rec: res.data.rec,
          isFavor: res.data.isFavor
        })
        if (arr) {
        that.timerNoday();
        }
      }
    }).catch((error) => {
      console.log(error)
    });
    app.util.request(app.api.virtualShops, 'GET', obj2).then((res) => {
      if (res.status && res.status == 1) {
        if (res.goods.Rows.length == 0) {
          this.setData({
            shopLists: [],
            loadingText: '没有商品',
          })
        } else {
          if (res.goods.Rows.length < that.data.pageSize) {
            this.setData({
              shopLists: res.goods.Rows,
              loadingText: '全部加载完成'
            })
          } else {
            this.setData({
              shopLists: res.goods.Rows,
              loadingText: '正在加载...'
            })
          }

        }

      }
    }).catch((error) => {

    })
  },
  getShopList: function() {
    let condiNavs = this.data.condiNavs;
    let condiNavIndex = this.data.condiNavIndex;
    let shopLists = this.data.shopLists;
    let keyword = this.data.keyword || '';
    let sortType = condiNavIndex + 1; //1人气  2价格  3时间
    let sort;
    if (condiNavIndex == 0) {
      sort = 0
    } else {
      sort = condiNavs[condiNavIndex].select - 1;
    }
    let page = this.data.page;
    ++page;
    let pageSize = this.data.pageSize;
    let obj = {
      sortType: sortType,
      sort: sort,
      page: page,
      pageSize: pageSize,
      shopId: this.data.shopId
    };
    if (keyword != '') {
      obj.keyword = keyword;
    }
    app.util.request(app.api.virtualShops, 'GET', obj).then((res) => {
      if (res.status && res.status == 1) {
        if (res.goods.Rows.length == 0) {
          this.setData({
            loadingText: '全部加载完成',
            page: page
          })
        } else {
          this.setData({
            shopLists: shopLists.concat(res.goods.Rows),
            loadingText: '正在加载...',
            page: page
          })
        }

      }
    }).catch((error) => {

    })
  },
  bindViewEvent: function(e) {
    app.process(this, e);
  },
  //绑定下拉框选择事件
  bindSelect(e) {
    this.setData({
      index: e.detail.value
    })
  },
  isPopularity() {
    this.setData({
      popularity: !this.data.popularity
    })
  },
  isPrice() {
    this.setData({
      price: !this.data.price
    })
  },
  isShelfTime() {
    this.setData({
      shelfTime: !this.data.shelfTime
    })
  },
  Getgoods: function(e) {
    wx.navigateTo({
      url: '/pages/shopsDetail/shopsDetail?goodsId=' + e.currentTarget.dataset.goodsid
    })
  },
  onReachBottom: function() {
    this.getShopList();
  },
  noticeShop: function() {
    let shopId = this.data.shopInfo.shopId;
    let userId = wx.getStorageSync('userId');
    let type = 1;
    let obj = {
      id: shopId,
      userId: userId,
      type: type
    }
    app.util.request(app.api.addFav, 'GET', obj).then((res) => {
      if (res.status == 1) {
        this.setData({
          isFavor: 1
        });
        wx.showToast({
          title: res.msg,
        })
      } else {
        wx.showToast({
          title: res.msg,
        })
      }
    }).catch((error) => {

    })
  },


   onShareAppMessage: function (event) {
    var that = this;
    var name = that.data.shopInfo.shopName;
    var sId = that.data.shopInfo.shopId;
    return {
      title: name,
      path: '/pages/cat-store/cat-store?shopId=' + sId
    }
      
  },

  cancelNotice: function() {
    let shopId = this.data.shopInfo.shopId;
    let userId = wx.getStorageSync('userId');
    let type = 1;
    let obj = {
      id: shopId,
      userId: userId,
      type: type
    }
    app.util.request(app.api.cancelFav, 'GET', obj).then((res) => {
      if (res.status == 1) {
        this.setData({
          isFavor: 0
        });
        wx.showToast({
          title: res.msg,
        })
      } else {
        wx.showToast({
          title: res.msg,
        })
      }
    }).catch((error) => {

    })
  },
  //触发条件导航点击事件 并且修改对应的样式图标
  _condiNav: function (e) {
    console.log(e)
    const that = this;
    that.setData({
      page: 0, //分页清0
    })
    let condiIndex = e.currentTarget.dataset.id;//选中的是第几个
    let index = e.currentTarget.dataset.id; //点击的是第几个
    //如果点击是销量或者价格，修改对应数据的select，0：位初始，1：up 2：down 切换样式
    if (index == 1 || index == 2) {
      let selectIndex = that.data.condiNavs[index].select;
      let arr = that.data.condiNavs;
      if (selectIndex == 0) {
        arr[index].select = 1;
        that.setData({
          condiNavs: arr
        })
      } else if (selectIndex == 1) {
        arr[index].select = 2;
        that.setData({
          condiNavs: arr
        })
      } else if (selectIndex == 2) {
        arr[index].select = 1;
        that.setData({
          condiNavs: arr
        })
      }
    };

    let condiNavs = that.data.condiNavs;
    //销量价格样式默认 如果是筛选则不清样式
    condiNavs.map((val, index) => {
      if (index != condiIndex) {
        condiNavs[index].select = 0;
      }
    })
    that.setData({
      condiNavIndex: condiIndex,
      condiNavs: condiNavs
    })

    let condiNavIndex = this.data.condiNavIndex;
    let userId = wx.getStorageSync('userId');
    let shopLists = this.data.shopLists;
    let keyword = this.data.keyword || '';
    let sortType = condiNavIndex + 1; //1人气  2价格  3时间
    let sort;
    if (condiNavIndex == 0) {
      sort = 0
    } else {
      sort = condiNavs[condiNavIndex].select - 1;
    }
    let page = this.data.page;
    ++page;
    let pageSize = this.data.pageSize;
    let obj2 = {
      sortType: sortType,
      sort: sort,
      page: page,
      pageSize: pageSize,
      shopId: that.data.shopId
    };
    if (sortType == 1) {//如果点击的是第一个人气 sort为1降序
      obj2.sort = 1;
    }
    if (keyword != '') {
      obj2.keyword = keyword;
    }
    app.util.request(app.api.virtualShops, 'GET', obj2).then((res) => {
      console.log(res)
      if (res.status && res.status == 1) {
        if (res.goods.Rows.length == 0) {
          this.setData({
            loadingText: '没有商品',
            page: page
          })
        } else {
          this.setData({
            shopLists: res.goods.Rows,
            loadingText: '正在加载...',
            page: page
          })
        }

      }
    }).catch((error) => {

    })


    wx.hideLoading();

  },




  //点击图片放大
  ImgEnlarge: function (e) {
    
    var src = e.currentTarget.dataset.src;
    var obj = [src];

    console.log(src)
    wx.previewImage({
      current: src, //当前图片地址
      urls: obj,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  //获取输入内容
  searchWord: function (e) {
    this.setData({
      searchWord: e.detail.value
    })
  },
  //搜索
  search: function () {
    const that = this;
    let keyword = this.data.searchWord || '';
    let cId = this.data.cId || '';
    let sharerId = this.data.sharerId;
    let obj = {
      page: 1,
      pageSize: 20,
      shopId: that.data.shopId
    };
    if (cId != '') {
      obj.cId = cId;
    };
    if (keyword != '') {
      obj.keyword = keyword;
    };
    that.setData({
      keyword: keyword
    })
    console.log(obj);
    app.util.request(app.api.virtualShops, 'GET', obj).then((res) => {
      console.log(res);
      if (res.status && res.status == 1) {
        if (res.goods.Rows.length == 0) {
          this.setData({
            shopLists: [],
            loadingText: '没有商品',
          })
        } else {
          this.setData({
            shopLists: res.goods.Rows,
            loadingText: '正在加载...'
          })
        }
      }
    }).catch((error) => {

    })
  },
  goIndex:function(e){
    wx.switchTab({
      url: '/pages/index/index'
    })
  },
  goWx:function(){
    this.setData({
      wxboxLayerStatus: true
    });
  },
  hideLayer: function (e) {
    this.setData({
      wxboxLayerStatus: false,
      wxAppCodeLayerStatus:false
    });
  },
  copyWxbox: function (e) {
    var shopWx = e.currentTarget.dataset.val;
    var that = this;
    wx.setClipboardData({
      data: shopWx,
      success: function (res) {
        // self.setData({copyTip:true}),
        wx.showToast({
          title: '复制成功',
          success: function (res) {
            that.setData({
              wxboxLayerStatus: false
            });
          }
        })
      }
    });
  },
  goStoreC:function(e){
    var shopId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/cat-store/cat-store-c?shopId=' + shopId,
    })
  },
  actionSheetTap: function () {
    this.setData({
      actionSheetHidden: !this.data.actionSheetHidden
    })
  },
  actionSheetbindchange: function () {
    this.setData({
      actionSheetHidden: !this.data.actionSheetHidden
    })
  },
  bindMenu1: function () {
    this.setData({
      menu: 1,
      actionSheetHidden: !this.data.actionSheetHidden
    })
  },
  bindMenu2: function () {
    this.setData({
      menu: 2,
      actionSheetHidden: !this.data.actionSheetHidden
    })
  },
  bindMenu3: function () {
    this.setData({
      menu: 3,
      actionSheetHidden: !this.data.actionSheetHidden
    })
  },
  getDrouponsEnd:function(){
    //商品团购剩余时间
   
  },
  timer: function (timeArgu) {
    let time = timeArgu;
    let pan = true;
    --time;
    if (time < 0) {
      pan = false
    } else {
      let day = parseInt(time / 3600 / 24);
      let hour = parseInt(time / 3600 % 24);
      if (hour < 10) {
        hour = '0' + hour;
      }
      let min = parseInt((time - hour * 3600 - day * 24 * 3600) / 60);
      if (min < 10) {
        min = '0' + min;
      }
      let second = parseInt((time - hour * 3600 - day * 24 * 3600) % 60);
      if (second < 10) {
        second = '0' + second;
      }
      let obj = {
        day: day,
        hour: hour,
        min: min,
        second: second
      }
      this.setData({
        goodsTime: obj
      })
    }
    const that = this;
    if (pan) {
      setTimeout(function () {
        that.timer(time)
      }, 1000)
    }

  },
  timerNoday: function () {
    const that = this;
    let times = that.data.times;
    let pan = true;
    if (times.length > 0) {
      times.map((val, index) => {
        let time = val.redTime;
        time--;
        if (time > -1) {
          let date = parseInt(time / 86400);
          if (date < 1) {
            date = '0' + date;
          }
          let hour = parseInt((time - 86400 * date) / 3600);
          if (hour < 10) {
            hour = '0' + hour;
          }
          let min = parseInt((time - hour * 3600 -  86400 * date) / 60);
          if (min < 10) {
            min = '0' + min;
          }
          let second = (time - 86400 * date) % 60;
          if (second < 10) {
            second = '0' + second;
          }
          val.date = date;
          val.hour = hour;
          val.min = min;
          val.second = second;
          val.redTime = time;
        } else {
          val.over = 'yes';
          pan = false;
        }
      })
      that.setData({
        times: times
      })
    }
     setTimeout(function () {
      that.timerNoday()
    }, 1000)


  },
  getWebView: function (e) {
    var urlData = e.currentTarget.dataset.url;
    var valData = e.currentTarget.dataset.val;

    var nameData = e.currentTarget.dataset.name;
    wx.navigateTo({
      url: '/pages/index/web?&url=' + urlData + "&" + valData
    })
  },
  // 获取滚动条当前位置
  onPageScroll: function (e) {
    console.log(e)
    if (e.scrollTop > 100) {
      this.setData({
        floorstatus: true
      });
    } else {
      this.setData({
        floorstatus: false
      });
    }
  },

  //回到顶部
  goTop: function (e) { 
    if (wx.pageScrollTo) {
      wx.pageScrollTo({
        scrollTop: 0
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
      })
    }
  },
  GetWebView: function (e) {
    var urlData = e.currentTarget.dataset.url;
    var valData = e.currentTarget.dataset.val;
    var nameData = e.currentTarget.dataset.name;

    wx.navigateTo({
      url: '/pages/index/web?url=' + urlData + "&areaId=" + valData
    })
  },
  goMyShops:function(e){
    wx.navigateTo({
      url: '/pages/cat-store/cat-store?shopId=' + e.currentTarget.dataset.id,
    })
  },
  goWx: function () {
    this.setData({
      wxboxLayerStatus: true
    });
  },
  getIndex:function(e){
    wx.reLaunch({
      url: '/pages/index/index',
    })
  },
  saveWxAppPoster: function (e) {
    let that = this;
    var imgSrc = e.currentTarget.dataset.url;
    that.setData({ imgSrc: imgSrc });
    //获取相册授权
    wx.getSetting({
      success(res) {
        console.log(res)
        if (!res.authSetting['scope.writePhotosAlbum']) {
          wx.authorize({
            scope: 'scope.writePhotosAlbum',
            success() {
              that.downloadFileWxAppPoster(imgSrc)
            }
          })
        }
        if (res.authSetting['scope.writePhotosAlbum'] == false) {
          console.log(res.authSetting['scope.writePhotosAlbum'])
          that.openConfirm()
        }
        if (res.authSetting['scope.writePhotosAlbum'] == true) {
          that.downloadFileWxAppPoster(imgSrc)
        }
      }
    })
  },
  downloadFileWxAppPoster: function (imgSrc) {
    let that = this;
    console.log("保存图片：" + imgSrc)
    wx.downloadFile({
      url: imgSrc,
      success: function (res) {
        console.log(res);
        //图片保存到本地
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success: function (data) {
            wx.showToast({
              title: '保存成功',
              icon: 'success',
              duration: 2000
            })
            // that.showLayer();
            that.setData({ 
              codeLayerStatus: false, 
              wxboxLayerStatus: false ,
              wxAppCodeLayerStatus:false
            })
          },
          fail: function (err) {
            console.log(err);
            if (err.errMsg === "saveImageToPhotosAlbum:fail auth deny") {
              console.log("当初用户拒绝，再次发起授权")
              wx.openSetting({
                success(settingdata) {
                  console.log(settingdata)
                  if (settingdata.authSetting['scope.writePhotosAlbum']) {
                    console.log('获取权限成功，给出再次点击图片保存到相册的提示。')
                  } else {
                    console.log('获取权限失败，给出不给权限就无法正常使用的提示')
                  }
                }
              })
            }
          },
          complete(res) {
            console.log(res);
          }
        })
      }
    })
  },
  //点击图片放大
  qRImg: function (e) {
    console.log(e)
    var url = e.currentTarget.dataset.url;
    var photos = [];
    photos.push(url)
    console.log(photos)
    wx.previewImage({
      current: url,
      urls: photos,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  //联系
  showtip: function (e) {
    var tel = e.currentTarget.dataset.tel;

    wx.makePhoneCall({
      phoneNumber: tel
    })
  },

  wxAppCode:function(){
    this.setData({
      wxAppCodeLayerStatus: true
    });
  },

  //wenjun 领优惠券的按钮
  GetCounp: function (e) {
    const that = this;  
    let couponId = e.currentTarget.dataset.val;
    let userId = wx.getStorageSync('userId');
    let obj = {
      couponId:couponId,
      userId : userId
    };
    
    console.log(obj);
    app.util.request(app.api.wxappGetCounp, 'GET', obj).then((res) => {
      console.log(res);
      
      if (res.status && res.status == 1) {
          wx.showModal({
            title: '领取成功',
            content: res.msg,
            showCancel:false,
            success: function (res) {
                if (res.confirm) {
                    console.log('用户点击确定')
                }else{
                   console.log('用户点击取消')
                }

            }
          })
      }else{
          wx.showModal({
            title: '领取失败',
            content: res.msg,
            showCancel:false,
            success: function (res) {
                if (res.confirm) {
                    console.log('用户点击确定')
                }else{
                   console.log('用户点击取消')
                }

            }
          })
      }
    }).catch((error) => {

    })
  }
})