const app = getApp().globalData;
Page({
  data: {
    remind: '加载中',
    angle: 0,
    year: 2018,
    userInfo: {},
    nickname: '',
    user_openid: '',
    avatarUrl: '',
    gender: ''
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 查看是否授权
    // wx.getSetting({
    //   success(res) {
    //     if (res.authSetting['scope.userInfo']) {
    //       wx.checkSession({
    //         success: function (res) {
    //           wx.login({
    //             success: function (res) {
    //               if (res.code) {
    //                 var code = res.code;
    //                 wx.getUserInfo({
    //                   success: function (res2) {
    //                     var encryptedData = encodeURIComponent(res2.encryptedData);
    //                     var iv = res2.iv;
    //                     //请求自己的服务器
    //                     console.log("请求自己的服务器")
    //                     Login(code, encryptedData, iv);
    //                   }
    //                 })
    //               } else {
    //                 console.log('获取用户登录态失败！' + res.errMsg)
    //               }
    //             }
    //           });
    //         },
    //         fail: function () {
    //           console.log("过期")
    //           //登录态过期，重新登录
    //         }
    //       })
    //     }
    //   }
    // })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var _this = this;
    setTimeout(function () {
      _this.setData({
        remind: ''
      });
    }, 1000);

  },
  Logins: function (e){
    var encryptedData = encodeURIComponent(e.detail.encryptedData);//一定要把加密串转成URI编码
    var iv = e.detail.iv;
    //请求自己的服务器
    console.log("请求自己的服务器")
    Login(e.detail.code, encryptedData, iv);
  }
});

function Login(code, encryptedData, iv) {
  wx.showLoading({
    title: '正在登录...',
  })

  //获取openId
  wx.login({
    success: function (res) {
      if (res.code) {
        var dataArr = {
          code: code,
          encryptedData: encryptedData,
          iv: iv,
          code:res.code,
          type:1
        };
        //发起网络请求
        app.util.request(app.api.getOpenId, 'GET', dataArr).then((res) => {
         
          if (res.data.status != -1) {
            try {
              console.log("22211111111111")
              wx.setStorageSync('openId', res.data.openid);
              wx.setStorageSync('userId', res.data.userId);
              wx.setStorageSync('userInfo', res.data);
              wx.setStorageSync('userType', res.data.userType);
            } catch (e) {
              console.log("获取用户登录状态失败!" + res.errMsg)
            }
            wx.showToast({
              title: '登录成功',
              icon: 'success',
            })
            //登录成功  将opendId存入本地
            setTimeout(function () {
              wx.reLaunch({
                url: '/pages/index/index'
              })
            }, 1500)
          } else {
             wx.showToast({
               title: '登录失败',
              icon: 'error',
            })
          }
        }).catch((error) => {
          console.log(error)
        })
      } else {

      }
    }
  });

}
