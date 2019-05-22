const app = getApp()

Page({
  data: {
    time:1,
    webViewUrl:app.webViewUrl,
  },
  onLoad: function () {
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
})