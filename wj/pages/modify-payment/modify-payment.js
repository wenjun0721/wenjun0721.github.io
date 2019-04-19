// pages/address/getAddress.js
const app = getApp().globalData;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isPassword: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '设置支付密码'
    })
    const that = this;
    if (!wx.getStorageSync('userId')) {
      wx.navigateTo({
        url: '/pages/login',
      })
    }
    app.util.request(app.api.isReset, 'GET', { userId: wx.getStorageSync('userId') }).then((res) => {
      if (res.status && res.status == 1) {
        if (res.data.data[1].status != 1) {//没有支付密码
          that.setData({
            isPassword: 0
          })
        } else {
          that.setData({
            isPassword: 1
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
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  //返回按钮
  goBack: function () {
    wx.navigateBack({
      delta: 1
    })
  },
  //输入框内容绑定
  listenerInput: function (e) {
    let role = e.currentTarget.dataset.role;
    let val = e.detail.value;
    let obj = [];
    obj[role] = val;
    this.setData({ [role]: val });

  },
  //切换显示隐藏密码
  togglePassword: function (e) {
    let role = e.currentTarget.dataset.role;
    let obj = [];
    obj[role] = !this.data[role];
    this.setData(obj);
  },
  //确认修改
  require: function () {
    let secretPast = this.data.oldPassword || '';
    let secretNew = this.data.newPassword || '';
    let secretNew2 = this.data.requirePassword || '';
    if (secretNew != secretNew2) {
      wx.showToast({
        title: '两次密码输入不一样',
        icon: 'none'
      });
      return;
    }
    let obj = {
      userId: wx.getStorageSync('userId') || '',
      type: 2,
      secretNew: secretNew,
      secretNew2: secretNew2,
    };
    if (secretPast != '') {
      obj.secretPast = secretPast;
    }
    app.util.request(app.api.upSecret, 'GET', obj).then((res) => {

      if (res.status && res.status == 1) {
        if (res.data.status == 1) {
          wx.showToast({
            title: '修改成功',
          });
          setTimeout(function () {
            wx.navigateBack({
              delta: 1
            })
           }, 2000);
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none'
          })
        }
      }
    }).catch((res) => {
      console.log(res)
    })
  }
})