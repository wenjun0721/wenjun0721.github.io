//app.js
var common = require('utils/common')
 var util = require("utils/util.js");
 var api = require("config/api.js");

App({
  
  onLaunch: function () {
    const that = this;

    // get abc status
    util.request(api.getSysConfig, 'GET').then((res) => {
      if (res.status && res.status == 1) {
        // that.setData({
        //   sysConfig: res.data,
        // })
        that.globalData.abc = res.data.region;
        //由于这里是网络请求，可能会在 Page.onLoad 之后才返回
        // 所以此处加入 callback 以防止这种情况
        if (this.abcCallback) {
          // this.approvalCallback(res.data.region);
          this.abcCallback(res.data.region);
        }
      }
    }).catch((error) => {
      console.log(error)
    })

    //发起网络请求
    let openId = wx.getStorageSync('openId');
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo'] && openId) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function (res) {
              let data = res.userInfo;
              wx.setStorageSync("nickName", data.nickName);
              wx.setStorageSync("gender", data.gender);
              wx.setStorageSync("avatarUrl", data.avatarUrl);

              //console.log(res.userInfo)
            }
          });
        } else {
           wx.reLaunch({
            url: '/pages/login',
          });
        }
      }
    })
    //判断本地是否有openId
    if (openId) {
      //如果存在opendId 先获取用户微信信息 再获取小程序里面信息 如果有则覆盖
      util.request(api.getUsers, 'GET', { openid: openId }).then((res) => {
        if (res.status && res.status == 1) {
          wx.setStorageSync('openid', res.data.usersinfo.wxOpenid);
          wx.setStorageSync('userId', res.data.usersinfo.userId);
          wx.setStorageSync('userPhone', res.data.usersinfo.loginName);
          wx.setStorageSync('userPhoto', res.data.usersinfo.userPhoto);
          wx.setStorageSync('userType', res.data.usersinfo.userType);
          wx.setStorageSync('sharerId', res.data.sharerId);
          wx.setStorageSync('isSharer', res.data.usersinfo.isSharer)
        }
      }).catch((error) => {
        console.log('通过getUsers获取用户信息失败' + error)
      })
    } else {
      console.log('获取用户信息失败 本地未拥有openId');
      wx.login({
        success: function (res) {
          let code = res.code;
          console.log(code)
          util.request(api.getOpenId, 'GET', { code: code }).then((res) => {
            wx.setStorageSync('openId', res.data.wxOpenid);
            wx.setStorageSync('unionId', res.data.unionId);
            util.request(api.getUsers, 'GET', { openid: res.data.openid }).then((res) => {
              if (res.status && res.status == 1) {
                wx.setStorageSync('userId', res.data.usersinfo.userId);
                wx.setStorageSync('userPhone', res.data.usersinfo.loginName);
                wx.setStorageSync('userPhoto', res.data.usersinfo.userPhoto);
                wx.setStorageSync('userType', res.data.usersinfo.userType);
                wx.setStorageSync('sharerId', res.data.sharerId);
              }
            }).catch((error) => {
              console.log('通过getUsers获取用户信息失败' + error)
            })
          }).catch((error) => {
            console.log(error)
          })
        },
        fail: function (error) {
          console.log(error)
        }
      })
      //如果没有直接跳到登录页面 登录成功后把openId储存到本地
      // wx.reLaunch({
      //   url: '/pages/login',
      // });
    }
    //获取openId
    // wx.login({
    //   success: function (res) {
    //     if (res.code) {
    //       console.log('res.code:'+res.code)
    //       //发起网络请求
    //       util.request(api.getOpenId+'?code='+res.code,'GET').then((res)=>{
    //         console.log(res)
    //         wx.setStorageSync("openId", res.openid);
    //         wx.setStorageSync("session_key", res.session_key);
    //       }).catch((error)=>{
    //           console.log('获取用户openId失败')
    //       })
    //     } else {
    //       console.log('获取wx.login res.code失败' + res.errMsg)
    //     }
    //   }
    // });
  },
  globalData: {
    userInfo: null,
    util:util,
    common: common,
    api:api,
    abc: ''
  },
})
