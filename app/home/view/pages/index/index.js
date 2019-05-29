const app = getApp().globalData

Page({
  data: {
    time:1,
    webViewUrl:app.webViewUrl,
  },
  onLoad: function (e) {
    app.BMGMUSIC.stop();//关闭音乐的
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
      var count = setInterval(()=>{   
      this.setData({
        time : this.data.time -1
      });
      if(this.data.time == 0) {  
        wx.navigateTo({
          url:url,
          complete:function(res) {
          }
        })
        clearInterval(count);
      }
      },1000);
    }else{
      var count = setInterval(()=>{   
      this.setData({
        time : this.data.time -1
      });
      if(this.data.time == 0) {  
        wx.switchTab({
          url:'../leader/leader',
          complete:function(res) {
          }
        })
        clearInterval(count);
      }
      },1000);
    }
    
  }
})