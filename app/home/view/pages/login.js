const app = getApp().globalData;
Page({
  data: {
    remind: '加载中',
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    if (e.scene){
      const scene = decodeURIComponent(e.scene)
      var sceneArr = scene.split(".");
      var type = sceneArr[0];
      if (type == 'code') {
        var sharerUserId = sceneArr[1];
        var sharerId = sceneArr[2];
        var url = "/pages/index/look?sharerId=" + sharerId+'&sharerUserId='+sharerUserId;
      }
      if (type == 'other') {
        var sharerUserId = sceneArr[1];
        var url = '/pages/other/sharerUser?sharerUserId='+sharerUserId;
      }
    }else{
      var url = '/pages/index/index';
    }
    this.setData({
      url: url,
    })
    console.log(url)
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
    var url = this.data.url;
    Login(e.detail.code, encryptedData, iv,url);
  }
});

function Login(code, encryptedData, iv,url) { 
  wx.showLoading({
    title: '正在登录...',
  })
  //获取openId
  wx.login({
    success: function (res) {
      if (res.code) {
        var obj = {
          encryptedData: encryptedData,
          iv: iv,
          code:res.code,
        };
        //发起网络请求
        app.util.request(app.api.IndexgetOpenId, 'GET', obj).then((res) => {
          if (res.data.status != -1) {
            try {
              wx.setStorageSync('openId', res.data.openid);
              wx.setStorageSync('userId', res.data.userId);
              wx.setStorageSync('userInfo', res.data);
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
                // url: '/pages/index/index'
                url: url
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
