const app =  getApp().globalData;

Page({
  data: {
    modalHidden:false
  },
  onShow: function(options) {
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 500
    })
    this.getxp();
  },

  onLoad: function (options) {
    
    if (options.sharerId) {
      this.setData({
        sharerId:options.sharerId,
      })
    }
  },

  getxp:function(){
    app.BMGMUSIC.stop();//关闭音乐的
    var that = this;
    let obj = {
      sharerId:that.data.sharerId
    }
    app.util.request(app.api.MineSharerOneRead, 'POST', obj).then((res) => {
      if (res.status && res.status == 1) {
        that.setData({
          loves: res.data.xp,
          video: res.data.video,
          current:0,
        })
        this.music();
      }else{
        wx.showToast({
         title: res.msg,
         icon: 'none',
         duration: 2000
        })
        that.setData({
          loves: [],
        })
      }
    }).catch((error) => {
      console.log(error)
    })
  },

  music:function(){
    //播放音乐
    var video = this.data.video
    const innerAudioContext = app.BMGMUSIC
    innerAudioContext.autoplay = true
    innerAudioContext.loop = true
    innerAudioContext.src = app.webViewUrl+video
    innerAudioContext.play();
  },
  haibo:function(e){
    let that = this;
    var src = e.currentTarget.dataset.src;
    var sharerId = that.data.sharerId
    app.util.request(app.api.MineSharerHb, 'POST', {'src':src,'sharerId':sharerId}).then((rs) => {
      that.setData({
        modalHidden: true,
        lookImage: rs.data,
      })
    }).catch((error) => {
      console.log(error)
    })
  },

  modalConfirm:function(){
    let that = this;
    //获取相册授权
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.writePhotosAlbum']) {
          wx.authorize({
            scope: 'scope.writePhotosAlbum',
            success() {
              that.downloadFileWxAppPoster()
            }
          })
        } 
        if (res.authSetting['scope.writePhotosAlbum'] == false){
          console.log(res.authSetting['scope.writePhotosAlbum'])
          that.openConfirm()
        }
        if (res.authSetting['scope.writePhotosAlbum'] == true){
          that.downloadFileWxAppPoster()
        }
      }
    })
  },


  downloadFileWxAppPoster: function (){
    let that = this;
    var imgSrc = that.data.lookImage;
    console.log("保存圖片：" + imgSrc)
    wx.downloadFile({
      url: imgSrc,
      success: function (res) {
        //图片保存到本地
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success: function (data) {
            wx.showToast({
              title: '保存成功',
              icon: 'success',
              duration: 2000
            })
            // that.showLayer();
            that.setData({
              modalHidden: false,
            })
          },
          fail: function (err) {
            if (err.errMsg === "saveImageToPhotosAlbum:fail auth deny") {
              console.log("当初用户拒绝，再次发起授权")
              wx.openSetting({
                success(settingdata) {
                  if (settingdata.authSetting['scope.writePhotosAlbum']) {
                    console.log('获取权限成功，给出再次点击图片保存到相册的提示。')
                  } else {
                    console.log('获取权限失败，给出不给权限就无法正常使用的提示')
                  }
                }
              })
            }
          },
          complete(res) {
            console.log(res);
          }
        })
      }
    })
  },
  openConfirm: function () {
    let that = this;
    wx.showModal({
      content: '检测到您没打开Isp的相冊权限，是否去设置打开？',
      confirmText: "确认",
      cancelText: "取消",
      success: function (res) {
        //点击“确认”时打开设置页面
        if (res.confirm) {
          wx.openSetting({
            success: (res) => {
              that.downloadFileWxAppPoster()
             }
          })
        } else {
          console.log('用户点击取消')
        }
      }
    });
  },




})