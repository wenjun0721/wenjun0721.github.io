// pages/shopsDetail/shopsDetail.js
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
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this;
    wx.showLoading({
      title: '',
    })
    let goodsId = options.goodsId || 1959;
    that.getGroup(goodsId);
    let sharerId = options.sharerId || 0;
    //let goodsId = 283; //1835 283 998
    let areaText = wx.getStorageSync('selectArea').text;
    let areaId = wx.getStorageSync('selectArea').id;
    //如果有groupNo传递过来
    if (options.groupNo) {
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
  //获取拼团列表
  getGroup(id) {
    const that = this;
    app.util.request(app.api.getGroupList, 'GET', { goodsId: id }).then((res) => {
      if (res.status && res.status == 1) {
        let arr = [];
        let times = [];
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
        that.setData({
          groupLists: arr,
          times: times,
        });
        that.timerNoday();
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
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    wx.showLoading({
      title: '',
    })
    const that = this;
    let data = {
      goodsId: that.data.goodsId,
      userId: wx.getStorageSync('userId'),
      areaId: that.data.areaId
    }
    this.getInitData(data);
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },
  //显示拼单列表
  showModal: function () {
    this.setData({
      modelShow: true
    })
  },
  hideModal: function () {
    this.setData({
      modelShow: false
    })
  },
  //切换可显示区域
  toggleShowAreas: function () {
    console.log('111')
    this.setData({
      isShowRreas: !this.data.isShowRreas
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    var that = this;
    let path;
    let sharerId = wx.getStorageSync('sharerId');
    if (sharerId) {
      path = '/pages/shopsDetail/shopsDetail?goodsId=' + that.data.goodsId + '&sharerId=' + sharerId;
    } else {
      path = '/pages/shopsDetail/shopsDetail?goodsId=' + that.data.goodsId;
    }
    　　// 设置菜单中的转发按钮触发转发事件时的转发内容
    var shareObj = {
      title: "爱搜品IShopping",
      imageUrl: that.data.bannerLists[0],
      path: path,
      success: function (res) {
        // 转发成功之后的回调
        if (res.errMsg == 'shareAppMessage:ok') {
        }
      },
      fail: function () {
        // 转发失败之后的回调
        if (res.errMsg == 'shareAppMessage:fail cancel') {
          // 用户取消转发
        } else if (res.errMsg == 'shareAppMessage:fail') {
          // 转发失败，其中 detail message 为详细失败信息
        }
      },
      complete: function () {
        // 转发结束之后的回调（转发成不成功都会执行）
      }
    };
    　　// 返回shareObj
    　　return shareObj;
  },
  //点击分享
  pageToolFn: function () {
    console.log(111)
    this.onShareAppMessage()
  },
  //切换标题 锚点跳转
  toggleTitle: function (e) {
    let locations = this.data.titleLocation;
    //如果点击标题不等于推荐则不锚点跳转
    if (e.detail.obj.val.target.id != 3) {
      wx.pageScrollTo({
        scrollTop: locations[e.detail.obj.val.target.id] - 50,
        duration: 100
      })
    }
    // this.setData({
    //   initIndex: e.detail.obj.val.target.id
    // })

  },
  //记录锚点位置
  queryMultipleNodes: function (id) {
    let arr = this.data.titleLocation;
    var query = wx.createSelectorQuery();
    query.select('#' + id).boundingClientRect();
    let location;
    query.exec(function (res) {
      arr.push(res[0].top);
    });
    this.setData({
      titleLocation: arr
    })
  },
  //复制文字
  setClipboard: function () {
    let text = this.data.goodsWiki;
    wx.setClipboardData({
      data: text,
      success: function (res) {
        wx.getClipboardData({
          success: function (res) {
            console.log(res.data) // data
          }
        })
      }
    })
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
        }
      }).catch((error) => {
        console.log(error)
      })
    }
  },
  //后退
  goBack: function () {
    wx.navigateBack({
      delta: 1
    })
  },
  //隐藏对话框
  modalBindcancel: function () {
    this.setData({
      modalHidden: true
    })
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
    const that = this;
    let userId = wx.getStorageSync('userId');
    let groupNo = that.data.groupNo;
    let groupLists = that.data.groupLists;
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
        if (canBuy == true) {
          canBuy = false;
          app.util.request(app.api.addCart, 'GET', datas).then(function (data) {
            if (data && data.status == 1) {
              wx.showToast({
                title: '添加购物车成功',
                icon: 'success'
              })
              if (isBuyCart) {
                wx.reLaunch({
                  url: '/pages/cart/cart',
                })
              }
            }
            that.setData({
              addCart: true
            });
            canBuy = true;
          }).catch((error) => {
            console.log(error);
            canBuy = true;
          })
        }
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
            wx.navigateTo({
              url: '/pages/group/requireOrder',
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
  //点击空地方隐藏购物车
  addCartBody: function (e) {
    this.setData({
      addCart: true
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
          that.setData({
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
            goodsDesc: goods.goodsDesc,
            type: goods.shop.type || 1,
            sharerId2: goods.sharerId
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

  //地区选择
  areaSelect: function (e) {
    this.setData({
      hiddenLoading: false
    })
    const that = this;
    let gradeArr = that.data.preId;
    let id = e.target.id;
    let parentId = e.target.dataset.parentid;
    let text = e.target.dataset.val;
    let data = {
      parentId: id
    }
    this.setData({
      parentId: id,
      parentText: text
    })
    app.util.request(app.api.areaList + "/?parentId=" + id).then(function (res) {
      console.log(res)
      if (res.status == 1 && res.status) {
        that.setData({
          hiddenLoading: true
        });
        if (res.data && res.data.length > 0) {
          that.setData({
            areas: res.data,
            areaGrade: that.data.areaGrade + 1
          });
          gradeArr.forEach(function (val, index) {
            if (val.grade == that.data.areaGrade) {
              gradeArr[index].id = id;
            }
          });
          that.setData({
            preId: gradeArr,
          });
        } else {
          //选择区域到底
          let datas = {
            areaId: id,
            goodsId: that.data.goodsId
          }
          app.util.request(app.api.judgeDeliveryTwo, 'GET', datas).then(function (res) {
            if (res.status) {
              that.setData({
                whether: res.status,
                isSelectFixed: false
              })
            }
          })
          //复位
          app.util.request(app.api.areaList).then(function (res) {
            that.setData({
              areas: res.data,
              areaGrade: 0
            })
          }).catch(function (err) {
            console.log(err)
          })
        }
      }

    }).catch(function (err) {
      that.setData({
        hiddenLoading: true,
        modalHidden: false
      })
      console.log(err)
    })
  },
  //返回上一级
  backGrade: function () {
    const that = this;
    this.setData({
      areaGrade: this.data.areaGrade - 1
    });
    app.util.request(app.api.areaList + "/?parentId=" + this.data.preId[this.data.areaGrade].id).then(function (res) {
      if (res.data && res.data.length > 0) {
        that.setData({
          areas: res.data,
        });
      }
    }).catch(function (err) {
      console.log(err)
    })
  },
  //隐藏对话框
  modalBindcancel: function () {
    this.setData({
      modalHidden: true
    })
  },
  //显示收货地址或选择区域
  showSelectFixed: function () {
    this.setData({
      isSelectFixed: true
    })
  },
  //选取所有区域
  selectAllArea: function () {
    const that = this;
    let datas = {
      areaId: this.data.parentId,
      goodsId: this.data.goodsId
    }
    app.util.request(app.api.judgeDeliveryTwo, 'GET', datas).then(function (res) {
      if (res.status) {
        that.setData({
          whether: res.status,
          isSelectFixed: false
        })
      }
    });
    //复位
    app.util.request(app.api.areaList).then(function (res) {
      that.setData({
        areas: res.data,
        areaGrade: 0
      })
    }).catch(function (err) {
      console.log(err)
    })

    //wx.setStorageSync('selectArea', address);
    // wx.switchTab({
    //   url: '/pages/index/index',
    // });
  },
  //切换选择区域和收货地址
  toggleSelectArea: function () {
    if (this.data.isSelectOther == true) {
      this.setData({
        isSelectFixed: false
      })
    }
    this.setData({
      isSelectOther: true
    });


  },
  //选择别的区域
  selectOtherArea: function () {
    this.setData({
      isSelectOther: false
    })
  },
  //选择收货地址
  selectAddressArea: function (e) {
    const that = this;
    let datas = {
      addressId: e.target.dataset.id,
      goodsId: this.data.goodsId
    }
    app.util.request(app.api.judgeDelivery, 'GET', datas).then(function (res) {
      if (res.status) {
        that.setData({
          whether: res.status,
          isSelectFixed: false
        })
      }
    })
  },
  //去店铺
  goShop: function () {
    let type = this.data.type; //1实体  2虚拟
    if (type == 1) {
      wx.navigateTo({
        url: '/pages/shop/shop?shopId=' + this.data.shopId,
      })
    } else {
      wx.navigateTo({
        url: '/pages/shop/sharerShop?sharerId=' + this.data.sharerId2,
      })
    }
  },
  //发送消息
  bindGetMsg: function (e) {
    console.log(e.detail)
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
  }
})

