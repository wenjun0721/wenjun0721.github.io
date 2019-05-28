// pages/other/other.js
const app =  getApp().globalData;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    moveTrue:true,
    changeImgBtn:'detailShare'
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.sharerUserId) {
      this.setData({
        sharerUserId:options.sharerUserId,
      })
    }
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
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 500
    })
    app.BMGMUSIC.stop();//关闭音乐的
    this.sharerUserList();
  },


  sharerUserList:function(){
    var that = this;
    let obj = {
      sharerUserId: that.data.sharerUserId,
    }
    app.util.request(app.api.SharerUserList, 'POST', obj).then((res) => {
      if (res.status && res.status == 1) {
        that.setData({
          sharerUserList:res.data
        })
      }else{
        that.setData({
          sharerUserList: [],
        })
        wx.showToast({
         title: res.msg,
         icon: 'none',
         duration: 2000
        })
      }
    })
  },


  


  detailShare:function(e){
    var sharerid = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: './sharerImg?sharerId=' +sharerid+'&sharerUser=1',
    })
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
    var title = '点点爱分享'
    return {
      title: title,
      // path: '/pages/other/sharerUser?sharerUserId='+wx.getStorageSync('userId'),
      path: '/pages/index/index?scene=other.'+this.data.sharerUserId,
      success: (res) => {
        console.log("转发成功");
      },
      fail: (res) => {
        console.log("转发失败", res);
      }
    }
  },

  fh:function(){
    wx.navigateBack({
      delta: 1
    })
  }
})