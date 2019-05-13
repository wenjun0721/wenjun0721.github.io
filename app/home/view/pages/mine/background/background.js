const app =  getApp().globalData;

Page({
  data: {
    webViewUrl:"http://www.tplm.com/",
    changeText:'管理',
    changeBtn:'Run',
    changeImgBtn:'previewImage',  
    moveTrue:true,
    selectIds:[],
    buttomModal:'addSharerImg',
    buttomModalText:'添加相片',
  },
  onShow: function() {
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 500
    })
    app.BMGMUSIC.stop();//关闭音乐的
    this.userBC();
  },

  onLoad: function () {
    
  },
  xpModal:function(e){
    var that = this;
    let userId = wx.getStorageSync('userId');
    let obj = {
      userId: userId, //系统的
      catId: that.data.catId, //系统的
    }
    app.util.request(app.api.MineUserBX, 'POST', obj).then((res) => {
      if (res.status && res.status == 1) {
        var sharerImgArr = res.data.map(item => {
          return item.img;
        })
        that.setData({
          sharerImgList: res.data,
          sharerImgArr,
        })
      }else{
        that.setData({
          sharerImgList: [],
        })
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

  hideXpModal:function(){
    wx.navigateBack({
      delta: 1
    })
  },

  previewImage:function(e){
    var src = e.currentTarget.dataset.src;
    var index = e.currentTarget.dataset.index;
    var uploadedImages = this.data.sharerImgArr;
    wx.previewImage({
      current: uploadedImages[index], //当前图片地址
      urls: uploadedImages, //所有要预览的图片的地址集合 数组形式
    })  
  },
  Run:function(){
    this.setData({
      changeText:'完成',
      changeBtn:'Ok',
      delModal:true,
      moveTrue:false,
      changeImgBtn:'checkimg',
      buttomModal:'delSharerImg',
      buttomModalText:'删除',
      delShow:false,
    })
  },
  Ok:function(){
    this.setData({
      changeText:'管理',
      changeBtn:'Run',
      delModal:false,
      moveTrue:true,
      changeImgBtn:'previewImage',
      buttomModal:'addSharerImg',
      buttomModalText:'添加相片',
      delShow:false
    })
  },

  checkimg:function (e) {
    console.log(e)
    var index = e.currentTarget.dataset.index;
    var id = e.currentTarget.dataset.id;
    let selectIds = this.data.selectIds;
    let sharerImgList = this.data.sharerImgList;
    let isSelect = sharerImgList[index].select;
    if (isSelect == false) {
      sharerImgList[index].select = true;
      selectIds.push(id);
    } else {
      sharerImgList[index].select = false;
      selectIds = app.util.arrayDelete(selectIds, id);
    };
    this.setData({
      sharerImgList:sharerImgList,
    })
  },

  delSharerImg:function(){
    const that = this;
    let selectIds = this.data.selectIds || [];
    if (selectIds.length == 0) {
      wx.showToast({
        title: '请点击选中要删除的图片',
        icon: 'none'
      })
    } else {
      wx.showModal({
        title: '确定删除选中的图片吗？',
        content: '',
        success: function (res) {
          if (res.cancel) {
            //点击取消,默认隐藏弹框
          } else {
            let obj = {
              userId: wx.getStorageSync('userId'),
              Ids: selectIds.join(',')
            }
            app.util.request(app.api.MineUserXpDel, 'GET', obj).then((res) => {
              if (res.status && res.status == 1) {
                wx.showToast({
                  title: '删除成功',
                });
                that.setData({
                  changeText:'管理',
                  changeBtn:'Run',
                  delModal:false,
                  moveTrue:true,
                  changeImgBtn:'previewImage',
                  selectIds:[],
                  buttomModal:'addSharerImg',
                  buttomModalText:'添加相片',
                  delShow:false
                })
                that.xpModal()
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

  addSharerImg:function(){
      wx.reLaunch({
        url: '/pages/love/add'
      })
  },
  

  userBC:function(){
    var that = this;
    let userId = wx.getStorageSync('userId');
    let obj = {
      userId: userId, //系统的
    }
    app.util.request(app.api.MineUserBC, 'POST', obj).then((res) => {
      var multiArray = res.data.map(item => {
        return item.catName;
      })
      that.setData({
        multiList: res.data,
        multiIndex: 0,
        catId: 0,
        multiArray,
      })
      that.xpModal();
    }).catch((error) => {
      console.log(error)
    })
  },
  
  bindPickerChange:function(e){
    var multiIndex = e.detail.value
    var multiList = this.data.multiList
    this.setData({
      multiIndex: multiIndex,
      catId: multiList[multiIndex]['catId']
    })
    this.xpModal();
  }

})

