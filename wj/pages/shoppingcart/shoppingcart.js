// pages/shoppingcart/shoppingcart.js
const app = getApp().globalData;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    webUrl: app.api.webUrl,
    allShopsMoney: 0,
    allShopsNum: 0,
    pageTitle: "购物车",
    pageToolText: "编辑",
    noCart: false,
    cartLists: [],
    isSelectAll: false,
    selectedId: [],
    isEdit: false,
    modalHidden: true,
    hideGoback: false,
    cartNum: 1,
    cartsId:null,
    stock:1,
    getWechatStatus:false,




    selectedAllStatus: false,
    carts: [{
        name: 'KAMEN旗舰店',
        lable: '旗舰',
        heard: '../../static/heard.png',
        selected: false,
        product: [{
          image: '../../static/shopping_cart_card_1.png',
          num: '1',
          price: '198.0',
          selected: false,
          model: 'SKU/其他',
          title: '1韩国JAYJUN保加利亚亮白保湿补水红玫瑰水光针面膜'
        }, {
          image: '../../static/shopping_cart_card_1.png',
          num: '1',
          price: '198.0',
          selected: false,
          model: 'SKU/其他',
          title: '2韩国JAYJUN保加利亚亮白保湿补水红玫瑰水光针面膜'
        }],
      },
      {
        name: 'KAMEN旗舰店',
        lable: '旗舰',
        selected: false,
        heard: '../../static/heard.png',
        product: [{
          image: '../../static/shopping_cart_card_1.png',
          num: '1',
          price: '198.0',
          selected: false,
          model: 'SKU/其他',
          title: '3韩国JAYJUN保加利亚亮白保湿补水红玫瑰水光针面膜'
        }],
      }
    ],
    labelModalStatus: false,
    animationData: false,
    stockNum: 6, //库存
    exitNum: 1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    // 获取屏幕的高度
    // var sysInfo = wx.getSystemInfoSync();
    // var winHeight = sysInfo.windowHeight;
    // var winWidth = sysInfo.windowWidth;
    // this.setData({
    //   winHeight: winHeight,
    //   winWidth: winWidth
    // })
    // let userId = wx.getStorageSync('userId');
    // if (!userId) {
    //   wx.navigateTo({
    //     url: '/pages/login',
    //   })
    // }
    // let arr = [1, 2, 3, 4, 5];
    // let a = "5";
    // this.getData();
    wx.showLoading({
      title: '',
    })
    this.setData({
      getWechatStatus: true,
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
    // this.getData()
    wx.setStorageSync('aaa',1);
    wx.hideLoading();
  },
  onShow: function() {
    // this.onLoad();
    var aaa = wx.getStorageSync('aaa');
    if (aaa == 1) {
        wx.setStorageSync('aaa',2);
    }else{
        wx.setStorageSync('aaa',1);
    }
    var aaa = wx.getStorageSync('aaa');
    console.log(aaa)
    if (aaa == 1) {
      wx.reLaunch({
        url: '/pages/shoppingcart/shoppingcart',
      })
      
    }

    this.setData({
      getWechatStatus: true,
    })
  },

  //获取数据
  getData() {
    wx.showLoading({
      title: '',
    })
    const that = this;
    that.setData({
      cartLists: []
    })
    let userId = wx.getStorageSync('userId') || '';
    let datas = {
      userId: userId
    }
    app.util.request(app.api.getCartLists, 'GET', datas).then(function(res) {
  
      if (res.status && res.status == 1) {
        let obj = res.data.carts;
        let arr = [];
        for (let key in obj) {
          obj[key].list.map((val, index) => {
            val.isEdit = false;
          });
          arr.push(obj[key]);
        }
        //遍历对应如果 子为全选则父加上一个全选
        arr.map((val, index) => {
          let check = true;
          val.list.map((val, index) => {
            if (val.isCheck == false) {
              check = false;
            }
          })
          //如果子级全选则父级全选
          if (check) {
            val.isCheck = 1
          } else {
            val.isCheck = 0
          }
        });
        //编辑所有父级
        let checkAll = 1;
        arr.map((val, index) => {
          if (val.isCheck == false) {
            checkAll = 0
          }
        });
        for (var i = 0; i < arr.length; i++) {
          arr[i]["shopType"] = app.common.getShopType(arr[i]["shareRank"]);
        }
        that.setData({
          cartLists: arr,
          noCart: false,
          isSelectAll: checkAll,
          allShopsMoney: parseFloat(res.data.goodsTotalMoney).toFixed(2),
          allShopsNum: parseFloat(res.data.goodsTotalNum)
        });
        wx.hideLoading();
      } else {
        that.setData({
          noCart: true
        })
        wx.hideLoading();
      }
    }).catch(function(err) {
      console.log(err)
    })
  },

  //编辑事件
  pageToolFn: function() {
    let isEdit = this.data.isEdit;
    if (isEdit == false) {
      this.setData({
        isEdit: !this.data.isEdit,
        pageToolText: '完成'
      })
    } else {
      this.setData({
        isEdit: !this.data.isEdit,
        pageToolText: '编辑'
      })
    }
    console.log(isEdit)
  },
  //点击非全选按钮时，判断每个店铺的全选按钮是否全选
  isSelectAll() {
    let arr = this.data.cartLists;
    let pan = true;
    arr.map(function(val, index) {
      if (val.isCheck == 0) {
        pan = false;
      }
    })
    if (pan) {
      this.setData({
        isSelectAll: 1
      })
    } else {
      this.setData({
        isSelectAll: 0
      })
    }
  },
  //单个修改购物车状态
  changeCartGoods: function(obj) {
    let userId = wx.getStorageSync('userId');
    obj.userId = userId;
    return new Promise(function(resolve, reject) {
      app.util.request(app.api.changeCartGoods, 'GET', obj).then((res) => {
        resolve(res);
      }).catch((error) => {
        reject(error)
      })
    })

  },
  //批量修改购物车状态
  batchSetIsCheck: function(obj) {
    let userId = wx.getStorageSync('userId');
    obj.userId = userId;
    return new Promise(function(resolve, reject) {
      app.util.request(app.api.batchSetIsCheck, 'GET', obj).then((res) => {
        resolve(res);
      }).catch((error) => {
        reject(error)
      })
    })

  },
  //切换选中按钮
  toggleSelect: function(e) {
    const that = this;
    let arr = that.data.cartLists; //购物车数据
    let parentId = e.currentTarget.dataset.parent;
    let selfIndex = e.currentTarget.dataset.index; //子顺序
    let parentIndex = e.currentTarget.dataset.parentindex; //父顺序
    let selectedId = this.data.selectedId;
    let cartId = e.currentTarget.dataset.id; //cartId


    let isCheck = arr[parentIndex].list[selfIndex].isCheck; //是否选中
    let buyNum = arr[parentIndex].list[selfIndex].cartNum; //购物车数量
    let allShopsMoney = this.data.allShopsMoney; //总价格
    if (isCheck == 1) {
      let obj = {
        isCheck: 0,
        id: cartId,
        buyNum: buyNum
      }
      //如果单个选中点击按钮就是取消父级全选
      arr[parentIndex].isCheck = 0;
      this.changeCartGoods(obj).then((res) => {
        if (res && res.status == 1) {
          arr[parentIndex].list[selfIndex].isCheck = 0;
          allShopsMoney = res.data.goodsTotalMoney
        }
        that.setData({
          cartLists: arr,
          allShopsMoney: parseFloat(allShopsMoney).toFixed(2),
          isSelectAll: 0
        })
      }).catch((error) => {
        
        wx.showToast({
          icon: 'none',
          title: '修改失败',
        })
      })
    } else {
      let obj = {
        isCheck: 1,
        id: cartId,
        buyNum: buyNum
      }
      this.changeCartGoods(obj).then((res) => {
        if (res && res.status == 1) {
          arr[parentIndex].list[selfIndex].isCheck = 1;
          allShopsMoney = res.data.goodsTotalMoney
        };
        let check = true;
        arr[parentIndex].list.map((val, index) => {
          if (val.isCheck == 0) {
            check = false;
          }
        });
        if (check) {
          arr[parentIndex].isCheck = 1;
        } else {
          arr[parentIndex].isCheck = 0;
        }
        that.setData({
          cartLists: arr,
          allShopsMoney: parseFloat(allShopsMoney).toFixed(2)
        });
        that.isSelectAll();
      }).catch((error) => {
      
        wx.showToast({
          icon: 'none',
          title: '修改失败',
        })
      })
    };

  },
  //切换店铺全选按钮
  toggleSelectAll: function(e) {
    const that = this;
    let selfIndex = parseInt(e.currentTarget.dataset.index);
    let arr = that.data.cartLists; //购物车数据
    let childArr = []; //存放子级 cartId
    that.data.cartLists[selfIndex].list.map((val, index) => {
      childArr.push(val.cartId);
    });
    if (arr[selfIndex].isCheck == 1) {

      let obj = {
        isCheck: 0,
        id: childArr.join(',')
      }
      that.batchSetIsCheck(obj).then((res) => {
        if (res && res.status == 1) {
          arr[selfIndex].isCheck = 0; //改变父级选中样式
          that.data.cartLists[selfIndex].list.map((val, index) => {
            val.isCheck = 0;
          }); //改变子级选中样式
          that.setData({
            cartLists: arr,
            allShopsMoney: parseFloat(res.data.goodsTotalMoney).toFixed(2),
            isSelectAll: 0
          });
        }
      }).catch((error) => {
        wx.showToast({
          icon: 'none',
          title: '修改失败',
        })
      })
    } else {
      let obj = {
        isCheck: 1,
        id: childArr.join(',')
      }
      that.batchSetIsCheck(obj).then((res) => {
        if (res && res.status == 1) {
          arr[selfIndex].isCheck = 1; //改变父级选中样式
          that.data.cartLists[selfIndex].list.map((val, index) => {
            val.isCheck = 1;
          }); //改变子级选中样式
          that.setData({
            cartLists: arr,
            allShopsMoney: parseFloat(res.data.goodsTotalMoney).toFixed(2)
          });
          that.isSelectAll();
        }
      }).catch((error) => {
        wx.showToast({
          icon: 'none',
          title: '修改失败',
        })
      })
    };

  },
  //切换全选
  toggleSelectAllShops: function() {
    const that = this;
    let arr = that.data.cartLists;
    let isAll = that.data.isSelectAll;
    let childArr = []; //存放子级 cartId
    arr.map((val, index) => {
      val.list.map((childV, childI) => {
        childArr.push(childV.cartId);
      })
    });
    if (isAll == 1) {
      let obj = {
        isCheck: 0,
        id: childArr.join(',')
      }
      that.batchSetIsCheck(obj).then((res) => {
        if (res.status && res.status == 1) {
          arr.map((val, index) => {
            val.isCheck = 0;
            val.list.map((childV, childI) => {
              childV.isCheck = 0;
            })
          });
          that.setData({
            cartLists: arr,
            allShopsMoney: parseFloat(res.data.goodsTotalMoney).toFixed(2),
            isSelectAll: 0
          });
        }
      }).catch((error) => {
        wx.showToast({
          icon: 'none',
          title: '操作失败',
        })
      })
    } else {
      let obj = {
        isCheck: 1,
        id: childArr.join(',')
      }
      that.batchSetIsCheck(obj).then((res) => {
        if (res.status && res.status == 1) {
          arr.map((val, index) => {
            val.isCheck = 1;
            val.list.map((childV, childI) => {
              childV.isCheck = 1;
            })
          });
          that.setData({
            cartLists: arr,
            allShopsMoney: parseFloat(res.data.goodsTotalMoney).toFixed(2),
            isSelectAll: 1
          });
        }
      }).catch((error) => {
        wx.showToast({
          icon: 'none',
          title: '操作失败',
        })
      })
    }


  },
  //结算或删除事件
  selectOrDelete: function() {
    let isEdit = this.data.isEdit;
    //如果是删除
    if (isEdit) {
      this.setData({
        modalHidden: false
      })
    } else {
      let arr = this.data.cartLists;
      let pan = true;
      arr.map((val, index) => {
        val.list.map((val, index) => {
          if (val.isCheck == 1) {
            pan = false;
            return;
          }
        })
      })
      if (pan) {
        wx.showToast({
          icon: 'none',
          title: '请选择商品',
        })
      } else {
        wx.navigateTo({
          url: '/pages/shopping-cart-detail/shopping-cart-detail',
        })
      }

    }
  },
  //取消对话框
  modalBindcancel: function() {
    this.setData({
      modalHidden: true
    })
  },
  //确定对话框
  modalBindconfirm: function() {
    const that = this;
    let cartIds = [];
    let arr = that.data.cartLists;
    arr.map((val, index) => {
      val.list.map((childV, childI) => {
        if (childV.isCheck == 1) {
          cartIds.push(childV.cartId);
        }
      })
    });
    let datas = {
      userId: wx.getStorageSync('userId'),
      cartId: cartIds.join(",")
    }
    if (cartIds && cartIds.length > 0) {
      app.util.request(app.api.delCart, 'GET', datas).then((res) => {
        if (res.status && res.status == 1) {
          this.setData({
            modalHidden: true
          });
          wx.showToast({
            title: '删除成功',
          });
          this.getData();
        }
      }).catch((error) => {
        this.setData({
          modalHidden: true
        });
        wx.showToast({
          title: '删除失败',
          icon: 'none'
        })
      })
    } else {
      this.setData({
        modalHidden: true
      });
      wx.showToast({
        title: '请选择商品',
        icon: 'none'
      })
    }


  },
  //减
  onReduce: function(e) {
    const that = this;
    let parentIndex = e.currentTarget.dataset.parentindex;
    let selfIndex = e.currentTarget.dataset.selfindex;
    let cartLists = that.data.cartLists;
    let maxNum = cartLists[parentIndex].list[selfIndex].allowBuy;
    let nowNum = cartLists[parentIndex].list[selfIndex].cartNum;
    let cartId = e.currentTarget.dataset.id;
    let isCheck = cartLists[parentIndex].list[selfIndex].isCheck;
    nowNum--;
    //如果增加的数量大于允许购买的最大数量
    if (nowNum < 1) {
      wx.showToast({
        title: '数量必须大于1',
        icon: 'none'
      })
    } else {
      let obj = {
        isCheck: isCheck,
        id: cartId,
        buyNum: nowNum
      }

      that.changeCartGoods(obj).then((res) => {
        if (res && res.status == 1) {
          cartLists[parentIndex].list[selfIndex].cartNum = nowNum;
          that.setData({
            cartLists: cartLists,
            allShopsMoney: parseFloat(res.data.goodsTotalMoney).toFixed(2),
          })
        }
      }).catch((error) => {
        wx.showToast({
          title: '删减失败',
        })
      });

    }
  },
  //增加
  onAdd: function(e) {
    const that = this;
    let parentIndex = e.currentTarget.dataset.parentindex;
    let selfIndex = e.currentTarget.dataset.selfindex;
    let cartLists = that.data.cartLists;
    let maxNum = cartLists[parentIndex].list[selfIndex].allowBuy;
    let nowNum = cartLists[parentIndex].list[selfIndex].cartNum;
    let cartId = e.currentTarget.dataset.id;
    let isCheck = cartLists[parentIndex].list[selfIndex].isCheck;
    nowNum++;
    //如果增加的数量大于允许购买的最大数量
    if (nowNum > maxNum) {
      wx.showToast({
        title: '超过允许购买的最大数量',
        icon: 'none'
      })
    } else {
      let obj = {
        isCheck: isCheck,
        id: cartId,
        buyNum: nowNum
      }
      that.changeCartGoods(obj).then((res) => {
        if (res && res.status == 1) {
          cartLists[parentIndex].list[selfIndex].cartNum = nowNum;
          that.setData({
            cartLists: cartLists,
            allShopsMoney: parseFloat(res.data.goodsTotalMoney).toFixed(2),
          })
        }
      }).catch((error) => {
        wx.showToast({
          title: '增加失败',
        })
      });
    }
  },
  //输入完后
  onBlur: function(e) {
    const that = this;
    let parentIndex = e.currentTarget.dataset.parentindex;
    let selfIndex = e.currentTarget.dataset.selfindex;
    let cartLists = that.data.cartLists;
    let maxNum = cartLists[parentIndex].list[selfIndex].allowBuy;
    let oldNum = cartLists[parentIndex].list[selfIndex].cartNum;
    let nowNum = e.detail.value;
    let cartId = e.currentTarget.dataset.id;
    let isCheck = cartLists[parentIndex].list[selfIndex].isCheck;
    // if(parseInt(nowNum)==NaN){
    //   that.setData({
    //     cartLists: cartLists
    //   })
    //   return;
    // }
    //如果增加的数量大于允许购买的最大数量

    var string = String(nowNum).indexOf(".") + 1;
    //判断小数点
    if (string > 0) {
      wx.showToast({
        title: '不允许有小数点',
        icon: 'none'
      });
      nowNum = parseInt(nowNum);
      that.setData({
        cartLists: cartLists
      })

    }


    if (nowNum < 1) {
      wx.showToast({
        title: '数量必须大于1',
        icon: 'none'
      });
      that.setData({
        cartLists: cartLists
      })
    } else if (nowNum > maxNum) {
      wx.showToast({
        title: '超过允许购买的最大数量',
        icon: 'none'
      });
      that.setData({
        cartLists: cartLists
      })
    } else {
      let obj = {
        isCheck: isCheck,
        id: cartId,
        buyNum: nowNum
      }
      that.changeCartGoods(obj).then((res) => {
        if (res && res.status == 1) {
          cartLists[parentIndex].list[selfIndex].cartNum = nowNum;
          that.setData({
            cartLists: cartLists,
            allShopsMoney: parseFloat(res.data.goodsTotalMoney).toFixed(2)
          })
        }
      }).catch((error) => {
        wx.showToast({
          title: '输入失败',
          icon: 'none'
        })
      });
    }
  },
  //增加
  jia: function () {
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
  //减
  jian: function () {
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
  //输入完前
  onFocus_a: function (e) {
    this.setData({
      preNum: e.detail.value
    })
  },
  //输入完后
  onBlur_a: function (e) {
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
  //确定添加
  editCartOk: function (e) {
    const that = this;
    let aloneBuy = that.data.aloneBuy;
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
      cartsId: that.data.cartsId,
      userId: wx.getStorageSync('userId'),
      goodsId: that.data.goodsId,
      goodsSpecId: ids.join(':'),
      buyNum: that.data.cartNum
    }
    app.util.request(app.api.editCart, 'GET', datas).then(function (data) {
      if (data && data.status == 1) {
        wx.showToast({
          title: '修改成功',
          icon: 'success'
        })
        that.hideModal();
        setTimeout(function () {
          that.getData();
        }.bind(this), 1500)
      }
    }).catch((error) => {
    })
  },
  //编辑单个商品数量
  goodsEdit: function(e) {
    const that = this;
    let parentIndex = e.currentTarget.dataset.parentindex;
    let selfIndex = e.currentTarget.dataset.selfindex;
    let cartLists = that.data.cartLists;
    cartLists[parentIndex].list[selfIndex].isEdit = !cartLists[parentIndex].list[selfIndex].isEdit;
    that.setData({
      cartLists: cartLists
    })
  },
  //去商品详情
  goGoods: function(e) {
    let goodsId = e.currentTarget.dataset.goodsid;
    wx.navigateTo({
      url: '/pages/shopsDetail/shopsDetail?goodsId=' + goodsId,
    })
  },

  //去店铺
  toShop: function(e) {
    let shopId = e.currentTarget.dataset.shopid;
    wx.navigateTo({
      url: '/pages/cat-store/cat-store?shopId=' + shopId,
    })
  },
  goBack: function() {
    wx.navigateBack({
      delta: 1
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {
    this.setData({
      getWechatStatus: false,
    })
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  bindCheckbox: function(e) {
    var index = parseInt(e.currentTarget.dataset.index);
    var selected = this.data.cartLists[index].selected;
    var carts = this.data.carts;
    var allSelect = true;
    carts[index].selected = !selected;
    for (var a = 0; a < carts[index].product.length; a++) {
      carts[index].product[a].selected = !selected;
    }
    for (var i = 0; i < carts.length; i++) {
      if (!carts[i].selected) {
        allSelect = false;
      }
    }
    this.setData({
      carts: carts,
      selectedAllStatus: allSelect
    });
  },




  bindSubsetCheckbox: function(e) {
    var index = parseInt(e.currentTarget.dataset.index);
    var father_index = parseInt(e.currentTarget.dataset.father_index);
    var carts = this.data.carts;
    var selected = carts[father_index].product[index].selected;
    var allSelect = true;
    carts[father_index].selected = true;
    carts[father_index].product[index].selected = !selected;
    for (var a = 0; a < carts[father_index].product.length; a++) {
      if (!carts[father_index].product[a].selected) {
        carts[father_index].selected = false;
      }
    }
    for (var i = 0; i < carts.length; i++) {
      if (!carts[i].selected) {
        allSelect = false;
      }
    }
    this.setData({
      carts: carts,
      selectedAllStatus: allSelect
    });
  },
  bindSelectAll: function() {
    var selectedAllStatus = this.data.selectedAllStatus ? false : true;
    var carts = this.data.carts;
    for (var i = 0; i < carts.length; i++) {
      carts[i].selected = selectedAllStatus;
    }
    this.setData({
      selectedAllStatus: selectedAllStatus,
      carts: carts
    });
  },
  goShoppingCartDetail() {
    wx.navigateTo({
      url: '../shopping-cart-detail/shopping-cart-detail',
    })
  },
  //显示对话框
  labelModal: function(e) {
    let goodsId = e.currentTarget.dataset.goodsid
    let num = e.currentTarget.dataset.num
    let userId = wx.getStorageSync('userId');
    let cartsId = e.currentTarget.dataset.cartsid;
    const that = this;
    that.setData({
      goodsId: goodsId,
      cartNum: num,
      cartsId: cartsId
    });
    //获取购物车初始化
    let obj = {
      goodsId: goodsId
    };
    let cartData = {};
    //初始化详情页
    app.util.request(app.api.goodsDetail, 'GET', obj).then(function(data) {
      if (data.status && data.status == 1) {
        // if (data.data.goods.groupons) {
        //   wx.redirectTo({
        //     url: '/pages/group/groupDetail?goodsId=' + goodsId,
        //     success: function(res) {},
        //     fail: function(res) {},
        //     complete: function(res) {},
        //   })
        // }
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
          cartData.spec = goods.spec;
          cartData.title = goods.goodsName;
          that.setData({
            cartData: cartData,
            bannerLists: goods.gallery,
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
            cartsId:cartsId
          })


          let arr = [];
          let selectArr = [];
          let n = 0;
          let selectId;
          let selectImgData = [];
          let selectImgIndex = 0;

          that.getLabelData();
          
          wx.hideLoading();
          //规格
         
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
      labelModalStatus: true
    })
    setTimeout(function() {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export()
      })
    }.bind(this), 200)
    
  },

  getLabelData:function(){
    const that = this;
    let cartData = that.data.cartData;
    console.log(cartData)
 
    let goodsId = that.data.goodsId;
    let userId = wx.getStorageSync('userId');

   
    var cartId = that.data.cartsId;
    var datas = {
      cartId: cartId,
      userId: userId
    };
    app.util.request(app.api.goodDesc, 'GET', datas).then(function (res) {
      let ids = [];
      cartData.spec.map((val, index) => {
        val.list.map((val, index) => {
          var specIds =  res.data.specIds.split(":");
          val.inSpece = 0;
          val.select = 'no';
          for (var i = 0; i < specIds.length;i++ ) {
            if (val.itemId.toString() == specIds[i].toString()) {
              val.inSpece = 1;
              val.select = "yes";
            }
          }
        })
      });
      console.log(cartData)
      if (res.status == 1) {
        that.setData({
          cartData: cartData,
          goodsName: res.data.goodsName,
          goodsImg: res.data.goodsImg,
          goodsUnit: res.data.goodsUnit || '',
          shopsPrice: res.data.specPrice,
          shareMoney: res.data.shareMoney,
        })
      }
    }).catch(function (err) {
      wx.hideLoading();
      console.log('请求失败' + err);
      return;
    });

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
        labelModalStatus: false
      })
    }.bind(this), 200)
  },
  
  
  delete: function(e) {
    var carts = this.data.carts;
    var delJson = [];
    var data1 = [],
      data2 = [],
      data3 = [],
      noJson = false;
    delJson = carts.filter(item => {
      if (item.selected) {
        return item;
      }
    });
    carts = carts.filter(item => {
      if (!item.selected) {
        return item;
      }
    });
    if (delJson.length < 1) {
      for (var i = 0; i < carts.length; i++) {
        data1[i] = carts[i].product.filter(item => {
          if (!item.selected) {
            return item;
          }
        });
        data3[i] = carts[i].product.filter(item => {
          if (item.selected) {
            return 'fasle';
          }
        });
        if (data3[i].length > 0) {
          noJson = true
        }
        carts[i].product = data1[i]
      }
      if (noJson) {
        data2 = carts.filter(item => {
          if (item.product.length > 0) {
            return item;
          }
        });
        this.setData({
          carts: data2
        });
      } else {
        wx.showToast({
          icon: 'none',
          title: '您未选择删除内容喔',
        })
      }

    } else {
      this.setData({
        carts: carts
      });
      wx.showToast({
        title: '删除成功',
      })
    }
  },
  //切换种类文字
  toggleSpecImg: function (e) {
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
  toggleSpecText: function (e) {
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
  findByStock: function () {
    const that = this;
    let aloneBuy = that.data.aloneBuy;
    //如果是单独购买
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
   
      that.setData({
        goodsName: res.data.specStr,
        goodsImg: res.data.goodsImg,
        goodsUnit: res.data.goodsUnit || '',
        shopsPrice: res.data.goodsPrice,
        shareMoney: res.data.shareMoney
      })
      }
    }).catch((error) => {
      console.log(error)
    })
  },
  //减
  defauleOnReduce: function () {
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
  defauleOnAdd: function () {
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
  defauleOnFocus: function (e) {
    this.setData({
      preNum: e.detail.value
    })
  },
  //输入完后
  defauleOnBlur: function (e) {
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
})