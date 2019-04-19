const app = getApp().globalData;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loadingText:"",
    firstNav: [{
      catName: '全部',
      catId: 0
    }],
    slideIndex: 0,
    Lists:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var catId = options.catId;
    var that = this
    let datas={
      catId: catId
    };
    app.util.request(app.api.coupons, 'GET',datas).then(function (data) {
      console.log(data)
      that.setData({
        firstNav: that.data.firstNav.concat(data.catList),
        Lists: data.couponPage.Rows
      })
    })
  },
  //一级滑动导航点击事件
  firstNav: function (e) {
    const that = this;
    
    let index = e.currentTarget.id;
    let catId = e.currentTarget.dataset.catid;
    if (catId == 0) {
      that.setData({ CatBelongIndex: false });
    } else {
      that.setData({ CatBelongIndex: true });
    }
    let datas={
      catId: catId
    };
      app.util.request(app.api.coupons, 'GET', datas).then((res) => {
        console.log(res)
        that.setData({
          Lists: res.couponPage.Rows,
          loadingText: ''
        });
        if (res.couponPage.Rows.length < 1) {
          that.setData({
            loadingText: '没有优惠劵'
          })
        }
      }).catch((error) => {
        wx.hideLoading();
      })
      this.setData({
        slideIndex: index,
        catId: catId,
      })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
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
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  },
  GetBtn:function(e){
    var couponId = e.currentTarget.dataset.couponid || '';
    let datas = {
      userId: wx.getStorageSync('userId') || '',
      couponId: couponId
    };
    app.util.request(app.api.wxappGetreceive, 'GET', datas).then((res) => {
      if (res.status && res.status == 1) {
        wx.showToast({
          title: res.msg,
        })
      }else{
        wx.showToast({
          title:res.msg,
          icon: 'none'
        })
      }
    })
  }
})