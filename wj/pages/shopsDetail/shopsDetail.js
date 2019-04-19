// pages/cat-detail/cat-detail.js
const app = getApp().globalData;
var canBuy = false;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLike: true,
    showModalStatus: false,
    codeLayerStatus: false,
    animationData: false,
    exitNum: 1,
    isShowAddress: false,
    wxboxLayerStatus: false,
    areas: [],
    areaGrade: 0,
    preId: [{
        grade: 0,
        id: 0
      },
      {
        grade: 1,
        id: 0
      },
      {
        grade: 2,
        id: 0
      },
      {
        grade: 3,
        id: 0
      },
      {
        grade: 4,
        id: 0
      },
    ],
    hiddenLoading: true,
    modalHidden: true,
    tips: "数据加载失败",
    parentId: 0,
    parentText: '全国',
    isSelectOther: true,
    selectAreaData: {}, //选择收货地址或者选择区域
    isSelectFixed: false, //选择收货地址或者区域显示隐藏
    pageTitle: [{
      title: '商品详情',
      id: 0
    }, ],
    isBuyCart: false,
    isSelect: true,
    isCanBuy: true,
    initIndex: 1,
    bannerLists: [],
    getClipboardText: "此处是产品百科 根据商家提供的内容自适应高度此处是产品百科 根据商家提供的内容自适应高度此处是产品百科 根据商家提供的内容自适应高度此处是产品百科 根据商家提供的内容自适应高度此处是产品百科 根据商家提供的内容自适应高度此处是产品百科 根据商家提供的内容自适应高度此处是产品百科 根据商家提供的内容自适应高度",
    areaText: "湖南省邵阳市双清区五一湖南省邵阳市双清区五一",
    specificationInit: 0,
    cartNum: 1,
    preNum: 1,
    modalHidden: true,
    tips: '提示性文字',
    addCart: true,
    titleLocation: [],
    isShowRreas: false,
    selectSpecImg: 0,
    selectSpecImg2: 0,
    cartSelectId: '', //需要添加购物车的ID  为商品规格对应的ID
    selectSpec: [], //记录不同层数的select顺序
    cartPrice: '', //商品标记
    cartMarketPrice: '', //商品原价
    cartStock: '', //商品库存
    selectData: {}, //选中对应ID的saleSpec数据
    selectImgData: [], //储存有图片的一组数据
    selectImg: '', //选中的图片
    selectImgIndex: 0, //第几列选择数据是有图片的 
    userAddressList: [], //用户收货地址
    cartData: {
      img: '', //图片
      title: '', //名字
      shopPrice: '', //价格
      marketPrice: '', //标价
      spec: [], //规格
      goodsStock: '', //库存
      shareMoney: '',
      stock: '',
    },
    aloneBuy: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var keep =[];
    if (wx.getStorageSync('keep_ShopsId')){
      keep = wx.getStorageSync('keep_ShopsId') ;
    }
    if (options.goodsId != "" && options.goodsId != null){
      keep.push(options.goodsId);
    }
    keep = first(keep);
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

    console.log(wx.getStorageSync('keep_ShopsId'))

    // 获取屏幕的高度
    let userId = wx.getStorageSync('userId');
    let userInfo = wx.getStorageSync('userInfo');
    console.log(userId)
    if (!userId && userId != "" && !userInfo) {
      wx.navigateTo({
        url: '/pages/login',
      });
      return;
    }else{
      this.setData({
        userInfo: userInfo
      })
    }
    console.log(this.data.userInfo)
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
    app.util.request(app.api.areaList).then(function(res) {
      that.setData({
        areas: res.data
      })
    }).catch(function(err) {
      console.log(err)
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

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


  // 显示地址
  showAddress() {
    this.setData({
      isShowAddress: !this.data.isShowAddress
    });
  },
  //切换关注
  toggleAttension: function (e) {
    let attensionId = e.currentTarget.dataset.id;

    let userId = wx.getStorageSync('userId');
    if (!userId) {
      wx.navigateTo({
        url: '/pages/login',
      });
      return;
    }
    if (attensionId == 0) { //未关注
      let obj = {
        userId: userId,
        type: 0,
        id: this.data.goodsId
      }
      app.util.request(app.api.addFav, 'GET', obj).then((res) => {

        if (res.status && res.status == 1) {
          wx.showToast({
            title: res.msg,
          });
          this.setData({
            attensionId: res.data.fId
          })
        }
      }).catch((error) => {
        console.log(error)
      })
    } else {
      let obj = {
        userId: userId,
        type: 0,
        id: attensionId
      }
      app.util.request(app.api.cancelFav, 'GET', obj).then((res) => {
        if (res.status && res.status == 1) {
          this.setData({
            attensionId: 0
          })
          wx.showToast({
            title:  res.msg,
          });
        }
      }).catch((error) => {
        console.log(error)
      })
    }
  },
  //联系
  showtip: function(e) {
    var tel = e.currentTarget.dataset.tel;
   
    wx.makePhoneCall({
      phoneNumber: tel
    })
  },
  //显示对话框
  showModal: function() {
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
    setTimeout(function() {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export()
      })
    }.bind(this), 200)
  },
  //隐藏对话框
  hideModal: function() {
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
    setTimeout(function() {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export(),
        showModalStatus: false
      })
    }.bind(this), 200)
  },
  // 复制事件
  copyBtn: function(e) {
    var that = this;
    wx.setClipboardData({
      //准备复制的数据
      data: that.data.encyclopedias,
      success: function(res) {
        wx.showToast({
          title: '复制成功',
        });
      }
    });
  },






  //初始化数据
  getInitData(datas) {
    const that = this;
    //获取购物车初始化
    if(!datas.userId){
      wx.navigateTo({
        url: '/pages/login',
      })
    }
    let obj = {
      goodsId: datas.goodsId,
      userId: datas.userId
    };
    let cartData = {};
    //初始化详情页
    app.util.request(app.api.goodsDetail, 'GET', datas).then(function(data) {
      console.log(data)
      if (data.status && data.status == 1) {
        if (data.data.goods.groupons) {
          wx.redirectTo({
            url: '/pages/cat-list-assemble/cat-detail-assemble?goodsId=' + datas.goodsId,
            success: function(res) {},
            fail: function(res) {},
            complete: function(res) {},
          })
        }
        if (!data.data.goods) {
          this.setData({
            noGoods: true
          });
          return;
        } else {
          let goods = data.data.goods;
          let initSpecIds = [];
          goods.spec.map((val, index) => {
            val.list.map((val, index) => {
              if (val.inSpece == 1) {
                val.select = 'yes';
              } else {
                val.select = 'no'
              }
            })
          });
          console.log('-------------------')
          console.log(data.data.lines)
          cartData.lines = data.data.lines;
          cartData.spec = goods.spec;
          cartData.title = goods.goodsName;
          goods.shop.shareRank= app.common.getShopType(goods.shop.shareRank);
          var bannerLists = goods.gallery;
          if (bannerLists){
            bannerLists.push( goods.goodsImg);
          }
          var myShopShareRank="";
          var myshop = [];
          console.log(goods)
          if (goods.myShop) {
            myShopShareRank = app.common.getShopType(goods.myShop.shareRank);
            myshop = goods.myShop
          }
          that.setData({
            goodareaname: data.data.goodareaname,
            address: data.data.address,
            shop: goods.shop,
            myShop: myshop,
            myShopShareRank: myShopShareRank,
            cartData: cartData,
            bannerLists: bannerLists,
            isSelf: goods.isSale,
            isFrank: goods.isFreeShipping,
            goodsName: goods.goodsName,
            goodsImg: goods.goodsImg,
            goodsUnit: goods.goodsUnit || '',
            marketPrice: goods.marketPrice,
            shopsPrice: goods.shopPrice,
            shareMoney: goods.shareMoney,
            shareScore: goods.shareScore,
            visitNum: goods.visitNum,
            appraiseNum: goods.appraiseNum,
            saleNum: goods.saleNum,
            goodsWiki: goods.goodsWiki || '',
            goodsTips: goods.goodsTips,
            goodareaname: data.data.goodareaname,
            shopImg: goods.shop.shopImg,
            shopName: goods.shop.shopName,
            shopSelf: goods.shop.isSelf,
            shopId: goods.shop.shopId,
            shopCat: goods.shop.cat,
            goodsScore: goods.shop.goodsScore,
            serviceScore: goods.shop.serviceScore,
            timeScore: goods.shop.timeScore,
            whether: data.data.address.whether,
            goodsStock: goods.goodsStock,
            attensionId: goods.favGood,
            goodsDesc: goods.goodsDesc,
            type: goods.shop.type || 1,
            sharerId2: goods.sharerId,
            wxAppPoster: goods.wxAppPoster,
            wxAppCode: goods. wxAppCode,
            customQr: goods.shop.customQr,
            shopTel: goods.shop.shopTel,
            telephone: goods.shop.telephone,
          })
          let arr = [];
          let selectArr = [];
          let n = 0;
          let selectId;
          let selectImgData = [];
          let selectImgIndex = 0;
          that.findByStock(cartData.spec);
          wx.hideLoading();
        }
      } else {
        wx.hideLoading();
        wx.showModal({
          title: '请求数据失败',
          content: '下拉刷新',
        })
      }
    }).catch(function(err) {
      that.setData({
        noGoods: true
      });
      wx.hideLoading();
      console.log('请求失败' + err);
      return;
    });
    console.log(that.data)
  },
  //获取用户收货地址
  getUserAddress: function() {
    const that = this;
    let datas = {
      userId: wx.getStorageSync('userId')
    }
    app.util.request(app.api.getAddress, 'GET', datas).then(function(res) {
      if (res.data) {
        that.setData({
          userAddressList: res.data
        })
      }
    }).catch((error) => {
      console.log(error)
    })
  },


  //切换种类图片 改变样式
  toggleSpecImg: function(e) {
    const that = this;
    let index = e.target.dataset.index;
    let itemid = e.currentTarget.dataset.itemid;
    console.log(e)
    //将index 拆分 0-0  0为父级顺序  -0为子级顺序
    let parent = index.split('-')[0];
    let children = index.split('-')[1];
    let cartData = that.data.cartData;
    cartData.spec[parent].list.map((val, index) => {
      if (index == children) {
        val.select = 'yes'
      } else {
        val.select = 'no'
      }
    })
    that.setData({
      cartData: cartData,
      cartNum: 1,
      itemid: itemid
    });
    that.findByStock();
  },
  //切换种类文字 改变样式
  toggleSpecText: function(e) {
    const that = this;
    let index = e.target.dataset.index;
    let itemid = e.currentTarget.dataset.itemid;
    console.log(index)
    //将index 拆分 0-0  0为父级顺序  -0为子级顺序
    let parent = index.split('-')[0];
    let children = index.split('-')[1];
    let cartData = that.data.cartData;
    cartData.spec[parent].list.map((val, index) => {
      if (index == children) {
        val.select = 'yes'
      } else {
        val.select = 'no'
      }
    })
    that.setData({
      cartData: cartData,
      cartNum: 1,
      itemid: itemid
    });
    that.findByStock();
  },

  //根据点击的规格查询对应的商品信息
  findByStock: function() {
    const that = this;
    let aloneBuy = that.data.aloneBuy;
    //如果是单独购买
    if (aloneBuy) {
      let cartData = that.data.cartData;
      let ids = [];
      let goodsId = that.data.goodsId;
      let userId = wx.getStorageSync('userId');
      cartData.spec.map((val, index) => {
        val.list.map((val, index) => {
          if (val.select == 'yes') {
            ids.push(val.itemId);
          }
        })
      });
      let obj = {
        goodsId: goodsId,
        specIds: ids.join(','),
        userId: userId
      };
      app.util.request(app.api.checkGoods, 'GET', obj).then((res) => {
        console.log(res)
        if (res.status && res.status == 1) {
          cartData.img = res.data.goodsImg;
          cartData.shopPrice = res.data.goodsPrice;
          cartData.stock = res.data.stock;
          cartData.marketPrice = res.data.marketPrice;
          cartData.shareMoney = res.data.shareMoney;
          cartData.shopPrice = res.data.goodsPrice;
          cartData.specStr = res.data.specStr;
        }
        that.setData({
          cartData: cartData
        })
      }).catch((error) => {
        console.log(error)
      })
    } else {
      //如果是拼团购买
      let cartData = that.data.cartData;
      let ids = [];
      let goodsId = that.data.goodsId;
      let userId = wx.getStorageSync('userId');
      let num = that.data.groupNum;
      let grouponId = that.data.grouponId;
      cartData.spec.map((val, index) => {
        val.list.map((val, index) => {
          if (val.select == 'yes') {
            ids.push(val.itemId);
          }
        })
      });
      let obj = {
        goodsId: goodsId,
        specIds: ids.join(','),
        userId: userId,
        num: num,
        grouponId: grouponId
      };
      app.util.request(app.api.checkGoods, 'GET', obj).then((res) => {
        if (res.status && res.status == 1) {
          cartData.img = res.data.goodsImg;
          cartData.shopPrice = res.data.goodsPrice;
          cartData.stock = res.data.stock;
          cartData.marketPrice = res.data.marketPrice;
          cartData.shareMoney = res.data.shareMoney;
          cartData.shopPrice = res.data.goodsPrice;
          cartData.specStr = res.data.specStr;
        }
        that.setData({
          cartData: cartData
        })
      }).catch((error) => {
        console.log(error)
      })
    }

  },
  //减
  onReduce: function() {
    let num = parseInt(this.data.cartNum);
    num--;
    if (num < 1) {
      this.setData({
        tips: '所选数量不得小于1',
        modalHidden: false
      })
    } else {
      this.setData({
        cartNum: num
      })
    }
  },
  //增加
  onAdd: function() {
    let num = parseInt(this.data.cartNum);
    let maxNum = parseInt(this.data.cartData.stock);
    num++;
    if (num > maxNum) {
      this.setData({
        tips: '所选数量不得大于最大库存',
        modalHidden: false
      })
    } else {
      this.setData({
        cartNum: num
      })
    }
  },
  //输入完前
  onFocus: function(e) {
    this.setData({
      preNum: e.detail.value
    })
  },
  //输入完后
  onBlur: function(e) {
    let maxNum = parseInt(this.data.cartData.stock);
    let num = parseInt(e.detail.value);
    if (num < 1) {
      this.setData({
        tips: '所选数量不得小于1',
        modalHidden: false,
        cartNum: this.data.preNum
      })
    } else if (num > maxNum) {
      this.setData({
        tips: '所选数量不得大于最大库存',
        modalHidden: false,
        cartNum: this.data.preNum
      })
    } else {
      this.setData({
        cartNum: num
      })
    }
  },
  //添加购物车
  addCart: function() {
    this.showModal();
    let userId = wx.getStorageSync('userId');
    if (userId) {
      this.setData({
        cartNum: 1,
        addCart: false,
        isBuyCart: false
      })
    } else {
      wx.navigateTo({
        url: '/pages/login',
      })
    }

  },
  //立即购买
  buyCart: function() {
    this.showModal();
    let userId = wx.getStorageSync('userId');
    if (userId) {
      this.setData({
        cartNum: 1,
        addCart: false,
        isBuyCart: true
      })
    } else {
      wx.navigateTo({
        url: '/pages/login',
      })
    }

  },
  //确定添加
  addCartOk: function() {
    const that = this;
    let aloneBuy = that.data.aloneBuy;
    let isBuyCart = that.data.isBuyCart;
    console.log(11111111)

    //如果是单独购买
    if (aloneBuy) {
      let stock = that.data.cartData.stock;
      let cartData = that.data.cartData;
      let ids = [];
      cartData.spec.map((val, index) => {
        val.list.map((val, index) => {
          if (val.select == 'yes') {
            ids.push(val.itemId);
          }
        })
      });

      console.log(ids)
      console.log(ids.join(','))
      let datas = {
        userId: wx.getStorageSync('userId'),
        goodsId: that.data.goodsId,
        goodsSpecId: ids.join(':'),
        buyNum: that.data.cartNum
      }
      
      if (stock > 0) {
        wx.request({
          url: app.api.addCart,
          data: datas,
          header: {
            'content-type': 'application/json' // 默认值
          },
          method: "GET",
          success(res) {
            var data = res.data
            if (data && data.status == 1) {
              wx.showToast({
                title: '添加购物车成功',
                icon: 'success'
              })
              if (isBuyCart) {
                wx.reLaunch({
                  url: '/pages/shoppingcart/shoppingcart',
                })
              } else {
                that.hideModal();
                that.setData({
                  cartNum: 1
                });
              }
            }
            that.setData({
              addCart: true
            });
            canBuy = true;
          }
        })
        // app.util.request(app.api.addCart, 'GET', datas).then(function(data) {
        //   console.log(data)
     
        // }).catch((error) => {
        //   console.log("error")
        //   console.log(error);
        //   canBuy = true;
        // })
      } else {
        wx.showModal({
          title: '失败',
          content: '所选商品库存为0',
        })
      }
    } else {
      let cartData = that.data.cartData;
      let stock = that.data.cartData.stock;
      let ids = [];
      cartData.spec.map((val, index) => {
        val.list.map((val, index) => {
          if (val.select == 'yes') {
            ids.push(val.itemId);
          }
        })
      });
      let datas = {
        userId: wx.getStorageSync('userId'),
        buyNum: that.data.cartNum,
        goodsId: that.data.goodsId,
        grouponid: that.data.grouponId,
        grouponNum: that.data.groupNum,
        specstring: ids.join(':'),
        groupNo: that.data.groupNo || '',
      }
      if (stock > 0) {
        app.util.request(app.api.groupSettlement, 'GET', datas).then((res) => {
          if (res.carts && res.carts != '') {
            res.groupInfo = datas;
            wx.setStorageSync('groupList', res);


            wx.showToast({
              title: '添加购物车成功',
              icon: 'success'
            })

            if (isBuyCart) {
              wx.reLaunch({
                url: '/pages/shoppingcart/shoppingcart',
              })
            } else {
              that.hideModal();
              that.setData({
                cartNum: 1
              });
            }
          }
        }).catch((error) => {
          console.log(error)
        })
      } else {
        wx.showModal({
          title: '失败',
          content: '所选商品库存为0',
        })
      }

    }
  },
  goCatStore: function(e) {
    var sId = e.target.dataset.shopid;
    console.log(e)
    let obj = {
        shopId:sId
    }
    //wenjun 2019/3/11 判断跳转页面
    app.util.request(app.api.wxappGetRank, 'GET',obj).then((res) => {
      console.log(res)
      if (res == 99) { // isp联盟旗靓店
        var url = "../cat-store/cat-store?shopId=" + sId;
      }else{
        var url = "../cat-store/cat-store-o?shopId=" + sId;
      }
      wx.navigateTo({
        url: url,
      })
    }).catch((error) => {
      console.log(error)
    })
    // wx.navigateTo({
    //   url: '../cat-store/cat-store?shopId=' + sId
    // })
  },
  //去店铺
  toShop: function (e) {
    let shopId = e.currentTarget.dataset.shopid;

    let obj = {
        shopId:shopId
    }
    //wenjun 2019/3/11 判断跳转页面
    app.util.request(app.api.wxappGetRank, 'GET',obj).then((res) => {
      console.log(res)
      if (res == 99) { // isp联盟旗靓店
        var url = "../cat-store/cat-store?shopId=" + shopId;
      }else{
        var url = "../cat-store/cat-store-o?shopId=" + shopId;
      }
      wx.navigateTo({
        url: url,
      })
    }).catch((error) => {
      console.log(error)
    })
    // wx.navigateTo({
    //   url: '/pages/cat-store/cat-store?shopId=' + shopId,
    // })
  },

  onShareAppMessage(e) {
    var that = this;
    var name = that.data.cartData.title;
    var sId = that.options.goodsId;
    // var sId = e.target.dataset.id;
    // var name = e.target.dataset.name;
    // console.log(sId)
    // console.log(sId)
    return {
      title: name,
      path: '/pages/shopsDetail/shopsDetail?goodsId=' + sId
    }
  } ,
  //点击图片放大
  ImgEnlarge: function (e) {
    var type = e.currentTarget.dataset.type;
    var src = e.currentTarget.dataset.src;
    var obj = [src];
    if (type=="head"){
     var bannerLists = this.data.bannerLists;
   }else{
      var bannerLists = this.data.goodsDesc;
   }


    console.log("============")
    console.log(e)
    console.log("============")
    wx.previewImage({
      current: src, //当前图片地址
      urls: bannerLists,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  getCode(){
    
    this.setData({
     codeLayerStatus: true
    });
  },
  showLayer: function (e) {
    this.setData({
      codeLayerStatus: false
    });
  },
  saveWxAppPoster:function(e){
    let that = this;
    var imgSrc = e.currentTarget.dataset.url;
    that.setData({ imgSrc: imgSrc});
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
        if (res.authSetting['scope.writePhotosAlbum'] == false){
          console.log(res.authSetting['scope.writePhotosAlbum'])
          that.openConfirm()
        }
        if (res.authSetting['scope.writePhotosAlbum'] == true){
          that.downloadFileWxAppPoster(imgSrc)
        }
      }
    })
  },
  downloadFileWxAppPoster: function (imgSrc){
    let that = this;
    console.log("保存圖：" + imgSrc)
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
                that.setData({ codeLayerStatus: false, wxboxLayerStatus: false })
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
  }
  ,openConfirm: function () {
    let that = this;
    wx.showModal({
      content: '检测到您没打开Isp的相冊权限，是否去设置打开？',
      confirmText: "确认",
      cancelText: "取消",
      success: function (res) {
        console.log(res);
        //点击“确认”时打开设置页面
        if (res.confirm) {
          wx.openSetting({
            success: (res) => {
              that.downloadFileWxAppPoster(that.data.imgSrc)
             }
          })
        } else {
          console.log('用户点击取消')
        }
      }
    });
  },
  goWx: function () {
    this.setData({
      wxboxLayerStatus: true
    });
  },
  hideLayer: function (e) {
    this.setData({
      wxboxLayerStatus: false
    });
  },
  goCard:function(e){
    wx.reLaunch({
      url: '/pages/shoppingcart/shoppingcart',
    })
  },
  //点击图片放大
  qRImg: function (e) {
        var url = e.currentTarget.dataset.url;
    var photos = [];
    photos.push(url)
    wx.previewImage({
      current: url,
      urls: photos,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
})
function first(args) {
  var arr = [];
  for (var i = 0; i < args.length; i++) {
    if (arr.indexOf(args[i]) < 0 && args[i]!=null) {
      arr.push(args[i])
    }
  }
  return arr;
}