// pages/mine-history/mine-history.js
const app = getApp().globalData;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchLoading: "正在载入更多...",




    selectedAllStatus: false,
    showCheckbox: false,
    showGoods: true,
    goodsDatas: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this;
    var ShopIdArr = wx.getStorageSync('keep_ShopsId');
    let areaId = wx.getStorageSync('selectArea').id;
    let userId = wx.getStorageSync('userId');
  var datas = {
    ids: ShopIdArr
  };
  app.util.request(app.api.historyQuery, 'POST', datas).then(function(res) {
    if(res.status == 1){
      if (0 < res.data.Rows.length)
      {
        that.setData({
          goodsDatasC: true,
          goodsDatas:res.data.Rows
        })
      }else{
        that.setData({
          goodsDatasC:false
        })
      }
    }
  }).catch((error) => {
    console.log(error)
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

/**
 * 用户点击右上角分享
 */
onShareAppMessage: function() {

},
bindCheckbox: function(e) {
  var index = parseInt(e.currentTarget.dataset.index);
  var datas = this.data.datas;
  var selected = datas[index].selected;
  datas[index].selected = !selected;
  var allSelect = true;
  for (var i = 0; i < datas.length; i++) {

    if (!datas[i].selected) {
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
  for (var i = 0; i < datas.length; i++) {
    datas[i].selected = selectedAllStatus;
  }
  this.setData({
    selectedAllStatus: selectedAllStatus,
    datas: datas
  });
},
changeCheckbox: function(e) {
  var datas = this.data.goodsDatas;
  for (var i = 0; i < datas.length; i++) {
    datas[i].selected = false;
  }
  this.setData({
    datas: datas,
    showCheckbox: !this.data.showCheckbox,
    selectedAllStatus: false,
  });
},
delete: function(e) {
  var datas = this.data.datas;
  var delJson = [];
  delJson = datas.filter(item => {
    if (item.selected) {
      return item;
    }
  });
  datas = datas.filter(item => {
    if (!item.selected) {
      return item;
    }
  });
  if (delJson.length < 1) {
    wx.showToast({
      icon: 'none',
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
},
  goGoodsDetail: function(e) {
    var url = '../shopsDetail/shopsDetail?goodsId=' + e.currentTarget.dataset.goodsid;
  wx.navigateTo({
    url: url,
  })
},
goCatStore: function(e) {
  var url = '../cat-store/cat-store';
  wx.navigateTo({
    url: url,
  })
},
goCatList: function(e) {
  //  type=product 产品list
  //  type=brand 品牌list
  var url = '../cat-list/cat-list?type=' + e.currentTarget.dataset.type + '&id=' + e.currentTarget.id;
  wx.navigateTo({
    url: url,
  })
},
})