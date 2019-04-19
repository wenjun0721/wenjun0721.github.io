// pages/cat-list-assemble/cat-detail-assemble.js

const app = getApp().globalData;
var canBuy = false;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    areas: [],
    areaGrade: 0,
    preId: [
      { grade: 0, id: 0 },
      { grade: 1, id: 0 },
      { grade: 2, id: 0 },
      { grade: 3, id: 0 },
      { grade: 4, id: 0 },
    ],
    wxboxLayerStatus:false,
    hiddenLoading: true,
    modalHidden: true,
    tips: "数据加载失败",
    parentId: 0,
    parentText: '全国',
    isSelectOther: true,
    selectAreaData: {},//选择收货地址或者选择区域
    isSelectFixed: false, //选择收货地址或者区域显示隐藏
    pageTitle: [
      { title: '商品详情', id: 0 },
    ],
    isBuyCart: true,
    isSelect: true,
    isCanBuy: true,
    initIndex: 1,
    codeLayerStatus: false,
    bannerLists: [
    ],
    getClipboardText: "此处是产品百科 根据商家提供的内容自适应高度此处是产品百科 根据商家提供的内容自适应高度此处是产品百科 根据商家提供的内容自适应高度此处是产品百科 根据商家提供的内容自适应高度此处是产品百科 根据商家提供的内容自适应高度此处是产品百科 根据商家提供的内容自适应高度此处是产品百科 根据商家提供的内容自适应高度",
    areaText: "湖南省邵阳市双清区五一湖南省邵阳市双清区五一",
    specificationInit: 0,
    cartNum: 1,
    preNum: 1,
    modalHidden: true,
    tips: '提示性文字',
    addCart: true,//显示隐藏购物车选择
    titleLocation: [],
    isShowRreas: false,
    selectSpecImg: 0,
    selectSpecImg2: 0,
    cartSelectId: '',//需要添加购物车的ID  为商品规格对应的ID
    selectSpec: [],//记录不同层数的select顺序
    cartPrice: '', //商品标记
    cartMarketPrice: '', //商品原价
    cartStock: '',//商品库存
    selectData: {},//选中对应ID的saleSpec数据
    selectImgData: [], //储存有图片的一组数据
    selectImg: '', //选中的图片
    selectImgIndex: 0,//第几列选择数据是有图片的 
    userAddressList: [],//用户收货地址
    goodsTime: {
      day: '00',
      hour: '00',
      min: '00',
      second: '00'
    },
    modelShow: false,
    times: [],
    cartData: {
      img: '',//图片
      title: '',//名字
      shopPrice: '',//价格
      marketPrice: '',//标价
      spec: [],//规格
      goodsStock: '',//库存
      shareMoney: '',
      stock: '',
    },
    aloneBuy: true,//是否单独购买
    groupBuyIndex: -1,//拼团购买顺序






    pageType: 0,
    showAssembleModal:false,
   
    isLike: true,
    detailImg: [
      "http://pic.58pic.com/58pic/17/22/66/83n58PICr3E_1024.jpg",
      "http://pic.58pic.com/58pic/17/22/66/83n58PICr3E_1024.jpg",
      "http://pic.58pic.com/58pic/17/22/66/83n58PICr3E_1024.jpg",
      "http://pic.58pic.com/58pic/17/22/66/83n58PICr3E_1024.jpg"
    ],
    showModalStatus: false,
    animationData: false,
    stockNum: 6,//库存
    exitNum: 1,
    isShowAddress: false,
    encyclopedias: "鞋子有着悠久的发展史。大约在5000多年前的仰韶文化时期，就出现了兽皮缝制的最原始的鞋。鞋子是人们保护脚不受伤的一种工具。最早人们为了克服特殊情况，不让脚难受或者受伤，就发明了毛皮鞋子。鞋子发展到现在，就形成了现在这个样子。各种样式功能的鞋子随处可见。",//产品百科
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // var options = {
    //   goodsId :4871,
    //   groupNo :90100643686,
    // };
    console.log("拼团")
    console.log(options)
    console.log("拼团")
    // 获取屏幕的高度
    var sysInfo = wx.getSystemInfoSync();
    var winHeight = sysInfo.windowHeight;
    var winWidth = sysInfo.windowWidth;
    this.setData({
      winHeight: winHeight,
      winWidth: winWidth
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


    const that = this;
    wx.showLoading({
      title: '',
    })
    let goodsId = options.goodsId || 1959;

    that.getGroup(goodsId);
    let sharerId = options.sharerId || 0;
    //let goodsId = 283; //1835 283 998
    // wx.getStorageSync('selectArea').text
    let areaText = "";
    //wx.getStorageSync('selectArea').id
    let areaId = "";
    //如果有groupNo传递过来
    if (options.groupNo) {
      console.log("如果有groupNo传递过来")
      this.setData({
        groupNo: options.groupNo
      })
    }
    this.setData({
      goodsId: goodsId,
      areaText: areaText,
      areaId: areaId,
      sharerId: sharerId,
      isSharer: wx.getStorageSync('isSharer')
    })
    let data = {
      goodsId: goodsId,
      userId: wx.getStorageSync('userId'),
      areaId: areaId,
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
  //初始化数据
  getInitData(datas) {
    const that = this;
    //获取购物车初始化
    let obj = {
      goodsId: datas.goodsId,
      userId: datas.userId
    };
    let cartData = {};
    // app.util.request(app.api.checkGoods, 'GET', obj).then((res) => {
    //   if (res.status && res.status == 1) {
    //     cartData.shopPrice = res.data.goodsPrice;
    //     cartData.stock = res.data.stock;
    //     cartData.marketPrice = res.data.marketPrice;
    //     cartData.shareMoney = res.data.shareMoney;
    //     cartData.shopPrice = res.data.goodsPrice;
    //     cartData.img = res.data.goodsImg;
    //     cartData.specStr = res.data.specStr;
    //   }
    //   that.setData({
    //     cartData: cartData
    //   });
    //   canBuy = true;
    // }).catch((error) => {
    //   console.log(error);
    //   canBuy = true;
    // })
    //初始化详情页
    app.util.request(app.api.goodsDetail, 'GET', datas).then(function (data) {
      if (data.status && data.status == 1) {
        let goods = data.data.goods;
        if (!goods) {
          that.setData({
            noGoods: true
          });
          wx.hideLoading();
          return;
        } else {
          goods.spec.map((val, index) => {
            val.list.map((val, index) => {
              if (val.inSpece == 1) {
                val.select = 'yes'
              } else {
                val.select = 'no'
              }
            })
          })
          cartData.spec = goods.spec;
          cartData.title = goods.goodsName;
          var myShopShareRank = "";

          var myshop = [];
          goods.shop.shareRank = app.common.getShopType(goods.shop.shareRank);
          console.log(goods)
          if (goods.myShop) {
            myShopShareRank= app.common.getShopType(goods.myShop.shareRank);
            myshop = goods.myShop
          }
          console.log(goods)
          that.setData({
            goodareaname: data.data.goodareaname,
            address: data.data.address,
            myShopShareRank: myShopShareRank,
            shop: goods.shop,
            myShop: myshop,
            cartData: cartData,
            bannerLists: goods.gallery,
            isSelf: goods.isSale,
            isFrank: goods.isFreeShipping,
            goodsName: goods.goodsName,
            goodsWiki: goods.goodsWiki || '',
            goodsImg: goods.goodsImg,
            goodsUnit: goods.goodsUnit || '',
            marketPrice: goods.marketPrice,
            shopsPrice: goods.shopPrice,
            shareMoney: goods.shareMoney,
            shareScore: goods.shareScore,
            visitNum: goods.visitNum,
            appraiseNum: goods.appraiseNum,
            saleNum: goods.saleNum,
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
            groupons: goods.groupons,
            goods: goods,
            goodsDesc: goods.goodsDesc,
            type: goods.shop.type || 1,
            sharerId2: goods.sharerId,
            lines: data.data.lines,
            wxAppPoster: goods.wxAppPoster,
          });
          //商品团购剩余时间
          if (goods.groupons) {
            let nowTime = parseInt(new Date().getTime() / 1000);
            let endTime = parseInt(new Date(goods.groupons.endTime.replace(/-/g, '/')).getTime() / 1000);
            that.timer(endTime - nowTime);
          }

          let arr = [];
          let selectArr = [];
          let n = 0;
          let selectId;
          let selectImgData = [];
          let selectImgIndex = 0;
          if (goods.saleSpec) {
            that.setData({
              saleSpec: goods.saleSpec,
            })
            for (let key in goods.spec) {
              arr.push(goods.spec[key]);
              //如果有图片 这导入自定义数据对象
              if (goods.spec[key].list[0].isAllowImg == 1) {
                selectImgData[n] = goods.spec[key];
                selectImgIndex = n;
              }
              selectArr[n] = {
                select: 0
              };
              //如果就一种选择条件则不拼接ID
              if (n == 0) {
                selectId = goods.spec[key].list[0].itemId;
              } else {
                selectId = selectId + ":" + goods.spec[key].list[0].itemId;
              }
              n++;
            };
            //如果有图片数据
            if (selectImgData.length > 0) {
              that.setData({
                selectImgData: selectImgData,
                selectImg: selectImgData[selectImgIndex].list[0].itemImg,
              })
            } else {
              that.setData({
                selectImg: goods.goodsImg,
              })
            }
          }
          that.findByStock(cartData.spec)
          wx.hideLoading();
        }
      } else {
        wx.hideLoading();
        wx.showModal({
          title: '请求数据失败',
          content: '下拉刷新',
        })
      }
    }).catch(function (err) {
      wx.hideLoading();
      wx.showModal({
        title: '请求数据失败',
        content: '尝试下拉刷新',
      })
      console.log('请求失败' + err)
    });
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
          let hour = parseInt(time / 3600);
          if (hour < 10) {
            hour = '0' + hour;
          }
          let min = parseInt((time - 3600 * hour) / 60);
          if (min < 10) {
            min = '0' + min;
          }
          let second = (time - 3600 * hour) % 60;
          if (second < 10) {
            second = '0' + second;
          }
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
    if (pan) {
      setTimeout(function () {
        that.timerNoday()
      }, 1000)

    }


  },
  //根据点击的规格查询对应的商品信息
  findByStock: function () {
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
  //单独购买
  aloneBuy: function () {
    const that = this;
    let cartData = that.data.cartData;
    that.setData({
      cartData: cartData,
      aloneBuy: true,
      groupBuyIndex: -1,
      cartNum: 1,
    });
    that.findByStock();
  },
  //拼团购买
  groupBuy: function (e) {
    const that = this;
    let num = e.currentTarget.dataset.num;
    let grouponId = e.currentTarget.dataset.grouponid;
    let specId = e.currentTarget.dataset.id;
    let index = e.currentTarget.dataset.index;
    that.setData({
      aloneBuy: false,
      groupBuyIndex: index,
      cartNum: 1,
      grouponId: grouponId,
      groupNum: num
    });
    that.findByStock();
  },
  //切换种类图片 改变样式
  toggleSpecImg: function (e) {
    const that = this;
    let index = e.target.dataset.index;
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
      cartNum: 1
    });
    that.findByStock();
  },
  //切换种类文字 改变样式
  toggleSpecText: function (e) {
    const that = this;
    let index = e.target.dataset.index;
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
      cartNum: 1
    });
    that.findByStock();
  },
  //获取用户收货地址
  getUserAddress: function () {
    const that = this;
    let datas = {
      userId: wx.getStorageSync('userId')
    }
    app.util.request(app.api.getAddress, 'GET', datas).then(function (res) {
      if (res.data) {
        that.setData({
          userAddressList: res.data
        })
      }
    }).catch((error) => {
      console.log(error)
    })
  },
  //获取拼团列表
  getGroup: function (id) {
    const that = this;
    console.log("获取拼团列表")
    app.util.request(app.api.getGroupList, 'GET', { goodsId: id }).then((res) => {
      if (res.status && res.status == 1) {
        let arr = [];
        let times = [];
        console.log("2222222222222")
        arr = res.data.data;
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
        console.log(arr)
        that.setData({
          groupLists: arr,
          times: times,
        });
        that.timerNoday();
      }
    }).catch((error) => {

    })
  },

  //切换关注
  toggleAttension: function (e) {
    let attensionId = e.currentTarget.dataset.id;

    console.log("-----------------");
    console.log(attensionId);
    console.log("-================-");
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
            title: res.msg,
          });
        }
      }).catch((error) => {
        console.log(error)
      })
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  },

  // 显示地址
  showAddress() {
    this.setData({
      isShowAddress: !this.data.isShowAddress
    });
  },

  //显示拼团弹出框
showAssembleModal(){
  this.setData({
    showAssembleModal: true
  })
},
//隐藏拼团弹出框
  hideAssembleModal(){
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
  showtip: function (e) {
    var tel = e.currentTarget.dataset.tel;

    wx.makePhoneCall({
      phoneNumber: tel
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
  //减
  onReduce: function () {
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
  onAdd: function () {
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
  onFocus: function (e) {
    this.setData({
      preNum: e.detail.value
    })
  },
  //输入完后
  onBlur: function (e) {
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
  addCart: function () {
    this.showModal();
    const that = this;
    let userId = wx.getStorageSync('userId');
    //初始化一下
    that.aloneBuy();
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
  //拼团购买
  buyCart: function () {
    this.showModal();
    const that = this;
    let userId = wx.getStorageSync('userId');
    let groupNo = that.data.groupNo;
    let groupLists = that.data.groupLists;
    console.log(groupLists)
    let e;
    //如果是加入拼团购买
    if (groupNo) {
      console.log('group')
      groupLists.map((val, index) => {
        if (val.groupNo == groupNo) {
          console.log(val)
          e = {
            currentTarget: {
              dataset: {
                num: val.groupNum,
                grouponid: val.grouponId,
                id: that.data.groupons.son[0].specId,
                index: 0,
              }
            }
          };
        }
      })
    } else {
      console.log('no group')
      //初始化一下
      e = {
        currentTarget: {
          dataset: {
            num: that.data.groupons.son[0].num,
            grouponid: that.data.groupons.son[0].grouponId,
            id: that.data.groupons.son[0].specId,
            index: 0,
          }
        }
      };
    }
    console.log(e)
    that.groupBuy(e);
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
  addCartOk: function () {
    const that = this;
    let aloneBuy = that.data.aloneBuy;
    let isBuyCart = that.data.isBuyCart;
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
      let datas = {
        userId: wx.getStorageSync('userId'),
        goodsId: that.data.goodsId,
        goodsSpecId: ids.join(','),
        buyNum: that.data.cartNum
      }

      if (stock > 0) {
        app.util.request(app.api.addCart, 'GET', datas).then(function (data) {
          console.log(data)
          if (data && data.status == 1) {
            wx.reLaunch({
              url: '/pages/shoppingcart/shoppingcart',
            })
          }else{
            wx.showModal({
              title: '失败',
            })
          }
        }).catch((error) => {
          console.log(error);
          canBuy = true;
        })
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
        specstring: ids.join(','),
        groupNo: that.data.groupNo || '',
      }
      if (stock > 0) {
        app.util.request(app.api.groupSettlement, 'GET', datas).then((res) => {



          if (res.carts && res.carts != '') {
            res.groupInfo = datas;
            wx.setStorageSync('groupList', res);
            console.log(11111111111111111111)
            wx.navigateTo({
              url: '/pages/cat-list-assemble/requireOrder',
            })
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
    let type = this.data.type; //1实体  2虚拟
    if (type == 1) {

      var sId = e.currentTarget.dataset.shopid;
      console.log(e)
      let obj = {
          shopId:sId
      }
      //wenjun 2019/3/11 判断跳转页面
      app.util.request(app.api.wxappGetRank, 'GET',obj).then((res) => {
        console.log(res)
        if (res == 99) { // isp联盟旗靓店
          var TXurl = "/pages/cat-store/cat-store?shopId=" + sId;
        }else{
          var TXurl = "/pages/cat-store/cat-store-o?shopId=" + sId;
        }
        console.log(TXurl)
        wx.navigateTo({
          url: TXurl,
        })
      }).catch((error) => {
        console.log(error)
      })
      
      // wx.navigateTo({
      //   url: '/pages/cat-store/cat-store?shopId=' + e.currentTarget.dataset.shopid,
      // })
    } 
  },
  goIndex() {
    wx.switchTab({
      url: '../index/index'
    })
  },
  goCard: function (e) {
    wx.reLaunch({
      url: '/pages/shoppingcart/shoppingcart',
    })
  },
  goWx: function () {
    console.log(11111)
    this.setData({
      wxboxLayerStatus: true
    });
  },
  hideLayer: function (e) {
    this.setData({
      wxboxLayerStatus: false
    });
  },
  getCode() {
    this.setData({
      codeLayerStatus: true
    });
  },
  showLayer: function (e) {
    this.setData({
      codeLayerStatus: false
    });
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
  //点击图片放大
  ImgEnlarge: function (e) {
    var type = e.currentTarget.dataset.type;
    var src = e.currentTarget.dataset.src;
    var obj = [src];
    if (type == "head") {
      var bannerLists = this.data.bannerLists;
    } else {
      var bannerLists = this.data.goodsDesc;
    }
    wx.previewImage({
      current: src, //当前图片地址
      urls: bannerLists,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  //去拼单
  goSpell: function (e) {
    let groupNo = e.currentTarget.dataset.id;
    let userId = wx.getStorageSync('userId');
    if (!userId) {
      wx.navigateTo({
        url: '/pages/login',
      })
    } else {
      wx.navigateTo({
        url: '/pages/group/joinGroup?groupNo=' + groupNo,
      })
    };

  },
})