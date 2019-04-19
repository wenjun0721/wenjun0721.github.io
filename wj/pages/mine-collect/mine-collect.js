// pages/mine-collect/mine-collect.js

const app = getApp().globalData;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selectedAllStatus: false,
    showCheckbox: false,
    showGoods: true,
    datas: {
      goods: [{
          image: '../../static/shopping_cart_card_1.png',
          num: '1',
          price: '198.0',
          selected: false,
          model: 'SKU/其他',
          title: '1韩国JAYJUN保加利亚亮白保湿补水红玫瑰水光针面膜'
        },
        {
          image: '../../static/shopping_cart_card_1.png',
          num: '1',
          price: '198.0',
          selected: false,
          model: 'SKU/其他',
          title: '2韩国JAYJUN保加利亚亮白保湿补水红玫瑰水光针面膜'
        },
        {
          image: '../../static/shopping_cart_card_1.png',
          num: '1',
          price: '198.0',
          selected: false,
          model: 'SKU/其他',
          title: '3韩国JAYJUN保加利亚亮白保湿补水红玫瑰水光针面膜'
        },
        {
          image: '../../static/shopping_cart_card_1.png',
          price: '198.0',
          selected: false,
          model: 'SKU/其他',
          title: '4韩国JAYJUN保加利亚亮白保湿补水红玫瑰水光针面膜'
        },
        {
          image: '../../static/shopping_cart_card_1.png',
          num: '1',
          price: '198.0',
          selected: false,
          model: 'SKU/其他',
          title: '5韩国JAYJUN保加利亚亮白保湿补水红玫瑰水光针面膜'
        }
      ],
      store: [{
          name: '1KAMEN旗舰店',
          lable: '旗舰',
          heard: '../../static/heard.png',
          selected: false,
        },
        {
          name: '2KAMEN旗舰店',
          lable: '旗舰',
          heard: '../../static/heard.png',
          selected: false,
        },
        {
          name: '3KAMEN旗舰店',
          lable: '旗舰',
          heard: '../../static/heard.png',
          selected: false,
        },
        {
          name: '4KAMEN旗舰店',
          lable: '旗舰',
          heard: '../../static/heard.png',
          selected: false,
        }
      ]
    },



    pageToolText: '编辑',
    pageTitle: [
      { title: '关注商品', id: 0 },
      { title: '关注店铺', id: 1 }
    ],
    modalHidden: true,
    searchLoading: true,
    initIndex: 0,
    isEdit: true,
    selectedIds: [],
    page: 1,
    pageSize: 20,
    browseHistoryLists: [
    ],
    page: 1,
    pageSize: 20,
    type: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
    this.getInitData();
  },
  getInitData: function () {
    let obj = {
      userId: wx.getStorageSync('userId'),
      page: this.data.page,
      pageSize: this.data.pageSize,
      type: this.data.type
    };
    app.util.request(app.api.noticeList, 'GET', obj).then((res) => {
      if (res.status && res.status == 1) {
        let arr = res.list.Rows;
        arr.map((val, index) => {
          val.isSelect = false
        });
        this.setData({
          browseHistoryLists: arr
        })
      } else {
        this.setData({
          browseHistoryLists: [],
          searchLoading: false
        })
      }
    }).catch((error) => {
      console.log(error)
    })
  },





  onPullDownRefresh: function () {
    //wx.showNavigationBarLoading() //在标题栏中显示加载

    //模拟加载
    setTimeout(function () {
      // complete
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh() //停止下拉刷新
    }, 1500);
  },
  //删除数组中的某个元素
  deleteArray(initArray, obj) {
    let initIndex = -1;
    initArray.map(function (value, index) {
      if (value == obj) {
        initIndex = index;
      }
    })
    if (initIndex != -1) {
      initArray.splice(initIndex, 1);
    }
    return initArray;
  },
  //判断数组中是否存在某个元素
  containArray(initArray, obj) {
    let initIndex = -1;
    for (let n = 0; n < initArray.length; n++) {
      if (initArray[n] == obj) {
        initIndex = n;
        break;
      }
    };
    return initIndex;
  },
  //切换编辑完成
  pageToolFn: function () {
    let text = this.data.pageToolText;
    if (text.trim() == '编辑') {
      this.setData({
        pageToolText: '完成',
        isEdit: !this.data.isEdit
      })
    } else {
      this.setData({
        pageToolText: '编辑',
        isEdit: !this.data.isEdit
      })
    }
  },
  //切换当个选中
  toggleSelect: function (obj) {
    let e = obj.detail.myEventDetail.val;
    const that = this;
    let shopId = e.currentTarget.dataset.id;
    let selfIndex = e.currentTarget.dataset.selfindex;
    let arr = this.data.browseHistoryLists;
    let selectedIds = this.data.selectedIds;
    arr[selfIndex].isSelect = !arr[selfIndex].isSelect;
    this.setData({
      browseHistoryLists: arr
    });
    //判断是否全部选中，显示全选按钮是否选中
    let isAll = true;
    arr.map(function (value, index) {
      //如果没被选中
      if (!value.isSelect) {
        that.setData({
          isSelectAll: false
        });
        isAll = false;
        //删除数组中的某个元素
        selectedIds = that.deleteArray(selectedIds, value.favoriteId);
        // console.log(selectedIds)
        return;
      } else {
        //如果不存在则添加这个ID
        if (that.containArray(selectedIds, value.favoriteId) == -1) {
          //如果被选中添加ID
          selectedIds.push(value.favoriteId);
        }
      }
    });
    if (isAll) {
      that.setData({
        isSelectAll: true,
      });
      //console.log('is All')
    }
    this.setData({
      selectedIds: selectedIds
    })
  },
  //切换全选
  selectAll: function () {
    let arr = this.data.browseHistoryLists;
    let selectedIds = [];
    if (this.data.isSelectAll) {
      arr.map(function (value, index) {
        value.isSelect = false;
      });
    } else {
      arr.map(function (value, index) {
        value.isSelect = true;
        selectedIds.push(value.favoriteId);
      })
    };
    this.setData({
      browseHistoryLists: arr,
      isSelectAll: !this.data.isSelectAll,
      selectedIds: selectedIds
    });
    console.log(this.data.selectedIds)
  },
  //删除选中的元素
  removeSelect: function () {
    let selectIds = this.data.selectedIds || [];
    console.log(selectIds);
    this.setData({
      modalHidden: true
    });
    if (selectIds && selectIds.length < 1) {
      wx.showToast({
        title: '请选择店铺',
        icon: 'none'
      })
    } else {
      let argu = {
        id: selectIds.join(','),
        type: this.data.type,
        userId: wx.getStorageSync('userId')
      };
      app.util.request(app.api.cancelFav, 'GET', argu).then((res) => {
        if (res.status && res.status == 1) {
          wx.showToast({
            title: res.msg,
            icon: 'success'
          });
          this.getInitData();
        }
      }).catch((error) => {

      })
    }
  },
  //取消对话框
  modalBindcancel: function () {
    this.setData({
      modalHidden: true
    })
  },
  //确定对话框
  modalBindaconfirm: function () {
    this.setData({
      modalHidden: true
    })
  },
  //滚动到底部下载更多
  loadmore: function () {
    console.log('loadmore')
  },
  getList: function (page) {
    let obj = {
      userId: wx.getStorageSync('userId'),
      page: page,
      pageSize: this.data.pageSize,
      type: this.data.type
    };
    app.util.request(app.api.noticeList, 'GET', obj).then((res) => {
      if (res.status && res.status == 1) {
        let arr = res.list.Rows || [];
        if (arr.length == 0) {
          searchLoading: false
        } else {
          arr.map((val, index) => {
            val.isSelect = false
          })
          this.setData({
            browseHistoryLists: browseHistoryLists.concat(arr),
            page: page,
            searchLoading: true
          })
        }

      } else {
        this.setData({
          browseHistoryLists: [],
          searchLoading: false
        })
      }
    }).catch((error) => {
      console.log(error)
    })
  },
  //上拉触底
  onReachBottom: function () {
    const that = this;
    let page = that.data.page;
    page++;
    that.getList(page);

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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  bindCheckbox: function(e) {
    var category = this.data.showGoods ? 'goods' : 'store';
    var index = parseInt(e.currentTarget.dataset.index);
    var datas = this.data.datas;
    var selected = datas[category][index].selected;
    datas[category][index].selected = !selected;
    var allSelect = true;
    for (var i = 0; i < datas[category].length; i++) {

      if (!datas[category][i].selected) {
        allSelect = false;
      }
    }
    this.setData({
      datas: datas,
      selectedAllStatus: allSelect
    });
  },
  bindSelectAll: function() {
    var selectedAllStatus = this.data.selectedAllStatus ? false : true;
    var datas = this.data.datas;
    var category = this.data.showGoods ? 'goods' : 'store';
    for (var i = 0; i < datas[category].length; i++) {
      datas[category][i].selected = selectedAllStatus;
    }
    this.setData({
      selectedAllStatus: selectedAllStatus,
      datas: datas
    });
  },
  goShoppingCartDetail() {
    wx.navigateTo({
      url: '../shopping-cart-detail/shopping-cart-detail',
    })
  },
  changeGoods: function(e) {
    if (!this.data.showGoods) {
      this.setData({
        showGoods: true,
        showCheckbox: false,
      });
    }
  },
  changeStore: function(e) {
    if (this.data.showGoods) {
      this.setData({
        showGoods: false,
        showCheckbox: false,
      });
    }
  },
  changeCheckbox: function(e) {
    var datas = this.data.datas;
    var category = this.data.showGoods ? 'goods' : 'store';
    for (var i = 0; i < datas[category].length; i++) {
      datas[category][i].selected = false;
    }
    this.setData({
      datas: datas,
      showCheckbox: !this.data.showCheckbox,
      selectedAllStatus: false,
    });
  },
  delete: function(e) {
    var datas = this.data.datas;
    var category = this.data.showGoods ? 'goods' : 'store';
    var delJson = [];
    delJson = datas[category].filter(item => {
      if (item.selected) {
        return item;
      }
    });
    datas[category] = datas[category].filter(item => {
      if (!item.selected) {
        return item;
      }
    });
    if (delJson.length < 1) {
      wx.showToast({
        icon:'none',
        title: '您未选择删除内容喔',
      })
    } else {
      this.setData({
        datas: datas
      });
      wx.showToast({
        title: '删除成功',
      })
    }
  }
})