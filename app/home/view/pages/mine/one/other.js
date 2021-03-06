// pages/other/other.js
const app =  getApp().globalData;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    changeText:'管理',
    changeBtn:'Run',
    changeImgBtn:'detailShare',
    moveTrue:true,
    delShow:false,
    selectIds:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    this.one();
  },


  one:function(){
    var that = this;
    let userId = wx.getStorageSync('userId');
    let obj = {
      userId: userId,
    }
    app.util.request(app.api.MineSharerOne, 'POST', obj).then((res) => {
      console.log(res)
      if (res.status && res.status == 1) {
        that.setData({
          collectList:res.data
        })
      }else{
        that.setData({
          collectList: [],
        })
        wx.showToast({
         title: res.msg,
         icon: 'none',
         duration: 2000
        })
      }
    })
  },


  Run:function(){
    this.setData({
      changeText:'完成',
      changeBtn:'Ok',
      moveTrue:false,
      changeImgBtn:'checkimg',
      delShow:true,
    })
  },
  Ok:function(){
    this.setData({
      changeText:'管理',
      changeBtn:'Run',
      moveTrue:true,
      delShow:false,
      changeImgBtn:'detailShare',
    })
  },
  checkimg:function (e) {
    var index = e.currentTarget.dataset.index;
    var id = e.currentTarget.dataset.id;
    let selectIds = this.data.selectIds;
    let collectList = this.data.collectList;
    let isSelect = collectList[index].select;
    if (isSelect == false) {
      collectList[index].select = true;
      selectIds.push(id);
    } else {
      collectList[index].select = false;
      selectIds = app.util.arrayDelete(selectIds, id);
    };
    this.setData({
      collectList:collectList,
    })
  },

  delSharerImg:function(){
    const that = this;
    let selectIds = this.data.selectIds || [];
    if (selectIds.length == 0) {
      wx.showToast({
        title: '请点击选中要删除的分享',
        icon: 'none'
      })
    } else {
      wx.showModal({
        title: '确定删除选中的分享吗？',
        content: '',
        success: function (res) {
          if (res.cancel) {
            //点击取消,默认隐藏弹框
          } else {
            let obj = {
              userId: wx.getStorageSync('userId'),
              Ids: selectIds.join(',')
            }
            app.util.request(app.api.MineSharerOneDel, 'POST', obj).then((res) => {
              if (res.status && res.status == 1) {
                wx.showToast({
                  title: '删除成功',
                });
              } else {
                wx.showToast({
                  title: res.msg,
                  icon: 'none'
                })
              }
              that.setData({
                changeText:'管理',
                changeBtn:'Run',
                moveTrue:true,
                changeImgBtn:'detailShare',
                selectIds:[],
                delShow:false
              })
              that.one()
            })
          }
        },
        fail: function (res) { },
        complete: function (res) { },
      })
    }
  },


  detailShare:function(e){
    var sharerid = e.currentTarget.dataset.sharerid;
    wx.navigateTo({
      url: './sharerImg?sharerId=' +sharerid,
    })
  },

  fh:function(){
    wx.navigateBack({
      delta: 1
    })
  },

  /**
   * 用户点击右上角分享s
   */
  onShareAppMessage: function () {
    var that = this;
    var title = '为我打call一下哦，么么哒。'
    return {
      title: title,
      // path: '/pages/other/sharerUser?sharerUserId='+wx.getStorageSync('userId'),
      path: '/pages/index/index?scene=other.'+wx.getStorageSync('userId'),
      success: (res) => {
        console.log("转发成功", res);
      },
      fail: (res) => {
        console.log("转发失败", res);
      }
    }
  },
})