const app =  getApp().globalData;

Page({
  data: {
    webViewUrl:"http://www.tplm.com/",
    showModal: false,
    sharerName: '新增锦集',
    delModal:false,
    xpModal:false,
    indexShow:true
  },
  onShow: function() {
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 500
    })
    setTimeout(function () {
      wx.hideToast()
    }, 500);
    this.getsharerCat();
    app.BMGMUSIC.stop();//关闭音乐的
  },

  onLoad: function () {
    
  },
  getsharerCat:function(){
    var that = this;
    let userId = wx.getStorageSync('userId');
    let obj = {
      userId: userId,
    }
    app.util.request(app.api.MineSharerCat, 'POST', obj).then((res) => {
      console.log(res)
      if (res.status && res.status == 1) {
        that.setData({
          sharerList: res.data,
        })
      }
    }).catch((error) => {
      console.log(error)
    })
  },

  //监听输入内容并且赋值
  listenerInput: function (e) {
    let role = e.currentTarget.dataset.role;
    let val = e.detail.value;
    this.setData({ [role] : val});
  },
 
  showModal:function(e) {
    let name = e.currentTarget.dataset.name;
    let id = e.currentTarget.dataset.id;
    if (typeof(name) == 'undefined') {
      var kn = '';
      var ki = 0;
      var tips = '新增锦集';
      var del = false;
    }else{
      var tips = '修改锦集';
      var kn = name;
      var ki = id;
      var del = true;
    }
    this.setData({
      showModal:true,
      name:kn,
      id:ki,
      sharerName:tips,
      delModal:del
    })
  },
  hideModal:function() {
    this.setData({
      showModal:false,
    })
  },

  saveSharer:function(){
    var that = this;
    let userId = wx.getStorageSync('userId');
    let obj = {
      userId: userId,
      name:that.data.name,
      id:that.data.id
    }
    app.util.request(app.api.MineAddSharerCat, 'POST', obj).then((res) => {
      if (res.status && res.status == 1) {
        wx.showToast({
         title: res.msg,
         icon: 'success',
         duration: 2000,
         success:function(){
          that.setData({
            showModal:false,
            name:'',
            delModal:false
          })
          that.onShow();
         }
        });
        
      }else{
        wx.showToast({
         title: res.msg,
         icon: 'none',
         duration: 2000
        })
      }
    }).catch((error) => {
      console.log(error)
    })
  },

  delModal:function(){
    var that = this;
    let userId = wx.getStorageSync('userId');
    let obj = {
      userId: userId,
      id:that.data.id
    }
    app.util.request(app.api.MineDelSharerCat, 'POST', obj).then((res) => {
      if (res.status && res.status == 1) {
        wx.showToast({
         title: res.msg,
         icon: 'success',
         duration: 2000,
         success:function(){
          that.setData({
            showModal:false,
            name:'',
            delModal:false
          })
          that.onShow();
         }
        });
        
      }else{
        wx.showToast({
         title: res.msg,
         icon: 'none',
         duration: 2000
        })
      }
    }).catch((error) => {
      console.log(error)
    })
  },

  xpModal:function(e){
    wx.navigateTo({
      url: './sharerimg?sharerId=' + e.currentTarget.dataset.sharerid
    })
  },


})