//app.js
var util = require("utils/util.js");
var api = require("config/api.js");
App({
  onLaunch: function (e) {
    // 展示本地存储能力
    // var logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)
    if (typeof(e.query.scene) != 'undefined') {
      var url = '/pages/login?scene='+e.query.scene;
    }else{
      var url = '/pages/login';
    }
    //发起网络请求
    let openId = wx.getStorageSync('openId');
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo'] && openId) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }else{
          wx.reLaunch({
            url: url,
          });
        }
      }
    })
    
     //判断本地是否有openId
    // if (!openId) {
    //   //如果没有直接跳到登录页面 登录成功后把openId储存到本地
    //   wx.reLaunch({
    //     url: url,
    //   });
    // }
  },
  globalData: {
    userInfo: null,
    util:util,
    api:api,
    webViewUrl:api.webViewUrl,
    BMGMUSIC:wx.createInnerAudioContext(), //内置音乐播放器
  },
})