const app =  getApp().globalData;

Page({
  data: {
    webViewUrl:app.webViewUrl,
    
  },
  onShow: function(options) {
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 500
    })
    this.setData({
      loveCatId:0,
      sharerIndex:0,
      page:0,
      loves: [],
      showModal:false,
      hiddenModal:true,
      name:''
    })
    this.getsharerCat();
    app.BMGMUSIC.stop();//关闭音乐的
  },

  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '编译回忆'
    })
  },


  getxp:function(){
    var that = this;
    let userId = wx.getStorageSync('userId');
    let page = that.data.page;
    let loves = that.data.loves;
    page++;
    let obj = {
      userId: userId, //系统的
      loveCatId:that.data.loveCatId,
      page:page
    }
    app.util.request(app.api.LookLoveMine, 'POST', obj).then((res) => {
      if (res.status && res.status == 1) {
        let rows = res.data.data || [];
        if (rows.length>0) {
          var lovesList = loves.concat(rows);
          var lovesImgArr = lovesList.map(item => {
            return item.img;
          })
          that.setData({
            loves: lovesList,
            page: page,
            lovesImgArr
          })
        }else{
          wx.showToast({
            title: '没有更多啦',
            icon: 'none',
            duration: 1000
          })
        }
        
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
  getsharerCat:function(){
    var that = this;
    let userId = wx.getStorageSync('userId');
    let obj = {
      userId: userId,
    }
    app.util.request(app.api.LookLoveCat, 'POST', obj).then((res) => {
      if (res.status && res.status == 1) {
        var sharerList = res.data.arr;
        var sharerArr = sharerList.map(item => {
          return item.name;
        })
        that.setData({
          sharerArr: sharerArr,
          sharerList: sharerList,
          sharerIndex:that.data.sharerIndex,
        })
        that.getxp();
      }
    }).catch((error) => {
      console.log(error)
    })
  },


  bindPickerChange:function(e){
    var sharerList =this.data.sharerList;
    var select_key = e.detail.value;
    this.setData({
      loveCatId:sharerList[select_key]['id'],
      sharerIndex:select_key,
      loves:[],
      page:0
    })
    this.getxp();
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 500
    })
  },
  onReachBottom: function () {
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 1000
    })
    this.getxp();
  },

  sharer:function(){
    const that = this;
    that.setData({
      showModal:true,
      hiddenModal:false,
    })
    // const that = this;
    // var loveCatId = that.data.loveCatId;
    // if (loveCatId == 0) {
    //   that.setData({
    //     showModal:true,
    //     hiddenModal:false,
    //   })
    // }else{
    //   var sharerIndex = that.data.sharerIndex;
    //   var index = sharerIndex -1;
    //   wx.navigateTo({
    //     url: '../mine/sharer/sharerimg?sharerId=' + loveCatId +'&index='+index
    //   })
    // }
  },
  //监听输入内容并且赋值
  listenerInput: function (e) {
    let role = e.currentTarget.dataset.role;
    let val = e.detail.value;
    this.setData({ [role] : val});
  },

  hideModal:function() {
    this.setData({
      showModal:false,
      hiddenModal:true
    })
  },

  saveSharer:function(){
    var that = this;
    let userId = wx.getStorageSync('userId');
    var loveCatId = that.data.loveCatId;
    if (that.data.name == '') {
      wx.showToast({
        title: '请先填写锦集名称',
        icon: 'none',
        duration: 500
      })
      return false;
    }
    let obj = {
      userId: userId,
      name:that.data.name,
      id:0,
      loveCatId:loveCatId,
      loveMine:1
    }
    //添加5张相片去到新的锦集里面
    app.util.request(app.api.MineAddSharerCat, 'POST', obj).then((res) => {
      if (res.status && res.status == 1) {
        wx.showToast({
         title: res.msg,
         icon: 'success',
         duration: 2000,
         success:function(){
            wx.navigateTo({
              url: '../mine/sharer/sharerimg?sharerId=' + res.data +'&index=0'
            })
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

  previewImage:function(e){
    var src = e.currentTarget.dataset.src;
    var index = e.currentTarget.dataset.index;
    var uploadedImages = this.data.lovesImgArr;
    wx.previewImage({
      current: uploadedImages[index], //当前图片地址
      urls: uploadedImages, //所有要预览的图片的地址集合 数组形式
    })  
  },
  // /**
  //  * 用户点击右上角分享s
  //  */
  // onShareAppMessage: function () {
  //   var that = this;
  //   var loveCatId = that.data.loveCatId;
  //   var sharerName =that.data.sharerName;
  //   var title = '我分享的锦集：'+sharerName+'，为我打call一下哦，么么哒。'
  //   return {
  //     title: title,
  //     path: '/pages/index/look?loveCatId=' + loveCatId+'&sharerUserId='+wx.getStorageSync('userId'),
  //     success: (res) => {
  //       //修改数据库
  //       if (loveCatId != 0) {
  //         app.util.request(app.api.LookLoveSharer, 'POST', {'sharerId':sharerId}).then((rs) => {
  //           console.log("转发成功");
  //         }).catch((error) => {
  //           console.log(error)
  //         })
  //       }
  //     },
  //     fail: (res) => {
  //       console.log("转发失败", res);
  //     }
  //   }
  // }

})