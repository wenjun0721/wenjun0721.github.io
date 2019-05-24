const app =  getApp().globalData;

Page({
  data: {
    webViewUrl:app.webViewUrl,
    changeText:'管理',
    changeBtn:'Run',
    changeImgBtn:'checkimg',
    buttomModal:'addSharerImg',
    buttomModalText:'确定添加'
  },
  onShow: function() {
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 500
    })
    this.setData({
      loveCatId:0,
      sharerIndex:0,
      page:0,
      userImgList: [],
    })
    // app.BMGMUSIC.stop();//关闭音乐的
    this.getsharerCat();
  },

  onLoad: function (options) {
    this.setData({
      sharerId:options.sharerId,
      index:options.index,
      countXp:options.countXp,
      limitCountXP:options.limitCountXP,
    })
  },
  // getUserXp:function(e){
  //   var that = this;
  //   let userId = wx.getStorageSync('userId');
  //   let obj = {
  //     userId: userId, //系统的
  //     sharerId:that.data.sharerId,
  //   }
  //   app.util.request(app.api.MineAllXp, 'POST', obj).then((res) => {
  //     if (res.status && res.status == 1) {
  //       that.setData({
  //         userImgList: res.data,
  //         selectIds:[],
  //       })
  //     }else{
  //        that.setData({
  //         userImgList: [],
  //       })
  //       wx.showToast({
  //        title: res.msg,
  //        icon: 'none',
  //        duration: 2000
  //       })
  //     }
  //   }).catch((error) => {
  //     console.log(error)
  //   })
  // },

  // hideXpModal:function(){
  //   var index = (this.data.index)*1;
  //   wx.navigateTo({
  //     url: './sharerimg?sharerId=' +this.data.sharerId+'&index='+index
  //   })
  // },
  // 
  getUserXp:function(){
    var that = this;
    let userId = wx.getStorageSync('userId');
    let page = that.data.page;
    let sharerId = that.data.sharerId;
    let userImgList = that.data.userImgList;
    page++;
    let obj = {
      userId: userId, //系统的
      loveCatId:that.data.loveCatId,
      page:page,
      pageSize:30,
      sharerId:sharerId
    }
    app.util.request(app.api.LookLoveMine, 'POST', obj).then((res) => {
      if (res.status && res.status == 1) {
        let rows = res.data.data || [];
        if (rows.length>0) {
          var loves = userImgList.concat(rows);
          that.setData({
            userImgList: loves,
            page: page,
            selectIds:[],
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
          userImgList: [],
        })
      }
    }).catch((error) => {
      console.log(error)
    })
  },
  hideXpModal:function(){
    wx.navigateBack({
      delta: 1
    })
  },
  checkimg:function (e) {
    var index = e.currentTarget.dataset.index;
    var id = e.currentTarget.dataset.id;
    let selectIds = this.data.selectIds;
    let userImgList = this.data.userImgList;
    let isSelect = userImgList[index].select;
    if (isSelect == false) {
      userImgList[index].select = true;
      selectIds.push(id);
    } else {
      userImgList[index].select = false;
      selectIds = app.util.arrayDelete(selectIds, id);
    };
    var countXp = this.data.countXp;
    var limitCountXP = this.data.limitCountXP;
    if( countXp*1+selectIds.length > limitCountXP){
      userImgList[index].select = false;
      selectIds = app.util.arrayDelete(selectIds, id);
      wx.showToast({
        title: '一个锦集最多'+this.data.limitCountXP+'张相片哦，请删除一些再添加',
        icon: 'none'
      })
    }
    this.setData({
      userImgList:userImgList,
    })
  },

  addSharerImg:function(){
    const that = this;
    let selectIds = this.data.selectIds || [];
    if (selectIds.length == 0) {
      wx.showToast({
        title: '请点击选中要添加的图片',
        icon: 'none'
      })
    } else {
      wx.showModal({
        title: '确定添加选中的图片在该锦集中吗？',
        content: '',
        success: function (res) {
          if (res.cancel) {
            //点击取消,默认隐藏弹框
          } else {
            let obj = {
              userId: wx.getStorageSync('userId'),
              Ids: selectIds.join(','),
              sharerId:that.data.sharerId,
            }
            app.util.request(app.api.MineSharerImgadd, 'POST', obj).then((res) => {
              if (res.status && res.status == 1) {
                that.setData({
                  countXp:that.data.countXp*1 + that.data.selectIds.length,
                  userImgList:[],
                  page:0
                })
                wx.showToast({
                  title: '添加成功',
                });
                that.getUserXp()
              } else {
                wx.showToast({
                  title: res.msg,
                  icon: 'none'
                })
              }
            })
          }
        },
        fail: function (res) { },
        complete: function (res) { },
      })
    }
  },
  _longtap:function(e){
    var index = e.currentTarget.dataset.lindex;
    var uploadedImages = this.data.userImgList.map(item => {
      return item.img;
    })
    wx.previewImage({
      current: uploadedImages[index], //当前图片地址
      urls: uploadedImages, //所有要预览的图片的地址集合 数组形式
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
        that.getUserXp();
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
      userImgList:[],
      page:0
    })
    this.getUserXp();
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
    this.getUserXp();
  },
})

