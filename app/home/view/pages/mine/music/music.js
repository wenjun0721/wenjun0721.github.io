const app =  getApp().globalData;

Page({
  data: {
    
  },
  onShow: function() {
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 500
    })
    this.music()
  },

  onLoad: function () {
    
  },
  
  music:function(){
    const that = this
    let userId = wx.getStorageSync('userId');
    let obj = {
      userId: userId,
    }
    app.util.request(app.api.MineMyMusic, 'POST', obj).then((res) => {
      if (res.status && res.status == 1) {
        that.setData({
          musicList: res.data,
        })
      }else{
        wx.showToast({
         title: res.msg,
         icon: 'none',
         duration: 2000
        })
        that.setData({
          musicList: [],
        })
      }
    }).catch((error) => {
      console.log(error)
    })
  },

  Btn:function(e){
    var index = e.currentTarget.dataset.index;
    let musicList = this.data.musicList;
    let isSelect = musicList[index].select;
    if (isSelect == false) {
      musicList.map((val, index) => {
        if (val.select == true) {
          val.select = false;
        }
      });
      musicList[index].select = true;
    } else {
      musicList[index].select = false;
    };
    this.setData({
      musicList:musicList,
    })
    
  }

})

