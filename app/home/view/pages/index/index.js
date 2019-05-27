const app = getApp().globalData

Page({
  data: {
    time:1,
    webViewUrl:app.webViewUrl,
  },
  onLoad: function (e) {
    console.log("=========================")
    console.log(e)
    console.log("=========================") 
    if (e.scene){
      const scene = decodeURIComponent(e.scene)
      var sharerUserId = scene.split(".")[0] ;
      var sharerId = scene.split(".")[1] ;
      var count = setInterval(()=>{   
      this.setData({
        time : this.data.time -1
      });
      if(this.data.time == 0) {  
        wx.navigateTo({
          url:"/pages/index/look?sharerId=" + sharerId+'&sharerUserId='+sharerUserId,
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