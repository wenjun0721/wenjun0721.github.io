// pages/mine-account/mine-account.js
const app = getApp().globalData;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    headerImg: "",
    tipsText: "图片上传成功",
    modalHidden: true,
    array: ['保密', '男', '女'],
    index: 0,

    genderIndex:0,
  
    showModal:false,
    wechatModal: false,
    avatar:'',
    upAvatar:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '账户管理'
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  //输入框内容绑定
  listenerInput: function (e) {
    let role = e.currentTarget.dataset.role;
    let val = e.detail.value;
    let obj = [];
    obj[role] = val;
    this.setData({ [role]: val });
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    const that = this;
    let openId = wx.getStorageSync('openId');
    if (openId) {
      //如果存在opendId 先获取用户微信信息 再获取小程序里面信息 如果有则覆盖
      app.util.request(app.api.getUsers, 'GET', { openid: openId }).then((res) => {
        console.log(res)
        if (res.status && res.status == 1) {
          if (res.data.usersinfo.userId) {
            wx.setStorageSync('userId', res.data.usersinfo.userId);
            wx.setStorageSync('userPhone', res.data.usersinfo.userPhone);
            let usersinfo = res.data.usersinfo;
            wx.setStorageSync('userPhoto', res.data.usersinfo.userPhoto);
            this.setData({
              headerImg: usersinfo.userPhoto,
              loginName: usersinfo.loginName,
              userName: usersinfo.userName,
              userWechat: usersinfo.userWechat,
              index: usersinfo.userSex
            })
          };
          if (res.data.sharerId != 0) {
            wx.setStorageSync('sharerId', res.data.sharerId);
          }
        }
        console.log(res.data.usersinfo.userId)
      }).catch((error) => {
        console.log('通过getUsers获取用户信息失败' + error)
      })
    }
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
  //绑定下拉框选择事件
  bindSelect(e) {
    this.setData({
      genderIndex: e.detail.value
    })
  },
  showModal: function (e) {
    this.setData({
      showModal: true
    })
  },
  hideModal: function (e) {
    this.setData({
      showModal: false,
      wechatModal: false
    })
  },
  wechatModal: function (e) {
    this.setData({
      wechatModal: true
    })
  },

  input: function (e) {
    let val = e.detail.value;
    this.setData({
      val: val
    })
  },

  // 昵称
  require: function () {
    let val = this.data.val || '';
    if (val == '') {
      wx.showToast({
        title: '请输入昵称',
        icon: 'none'
      });
      return;
    }
    let obj = {
      userId: wx.getStorageSync('userId'),
      userName: val
    }
    app.util.request(app.api.upUserName, 'GET', obj).then((res) => {


      console.log(res)
      if (res.status && res.status == 1) {
        if (res.data.status == 1) {
          wx.showToast({
            title: '修改成功',
          });
          this.onShow();
          this.hideModal();
          // wx.navigateBack({
          //   delta: 1
          // })
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none'
          });
        }
      }
    }).catch((error) => {
      console.log(error)
    })
  },
  // 昵称
  requireWechat: function () {
    let userWechat = this.data.userWechat || '';
    if (userWechat == '') {
      wx.showToast({
        title: '请输入微信号',
        icon: 'none'
      });
      return;
    }
    let obj = {
      userId: wx.getStorageSync('userId'),
      userWechat: userWechat
    }
    app.util.request(app.api.upUserWechat, 'GET', obj).then((res) => {


      console.log(res)
      if (res.status && res.status == 1) {
        if (res.data.status == 1) {
          wx.showToast({
            title: '修改成功',
          });
          this.onShow();
          this.hideModal();
          // wx.navigateBack({
          //   delta: 1
          // })
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none'
          });
        }
      }
    }).catch((error) => {
      console.log(error)
    })
  },
  //返回按钮
  goBack: function () {
    wx.navigateBack({
      delta: 1
    })
  },
  bindPickerChange: function (e) {
    let value = e.detail.value; //0男  1女
    let obj = {
      userId: wx.getStorageSync('userId'),
      userSex: value
    }
    app.util.request(app.api.upSex, 'GET', obj).then((res) => {
      if (res.status && res.status == 1) {
        if (res.data.status == 1) {
          wx.showToast({
            title: '修改成功',
          });
          this.setData({
            index: value
          })
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none'
          });
        }
      }
    }).catch((error) => {
      console.log(error);
    })
  }
  
})