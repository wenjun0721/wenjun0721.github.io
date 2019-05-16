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
    sharerName:'新增分类',
    changeBCBtn:'showModal'
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
          selectIds:[],
        })
      }else{
        that.setData({
          sharerImgList: [],
          selectIds:[],
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
      addStyle:'width:43%;left:2%',
      addStyle1:'width:43%;left:50%',
      addModal:true
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
      delShow:false,
      addStyle:'',
      addModal:false
    })
  },

  checkimg:function (e) {
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
        title: '请点击选中要删除的背景图',
        icon: 'none'
      })
    } else {
      wx.showModal({
        title: '确定删除选中的背景图吗？',
        content: '',
        success: function (res) {
          if (res.cancel) {
            //点击取消,默认隐藏弹框
          } else {
            let obj = {
              userId: wx.getStorageSync('userId'),
              Ids: selectIds.join(',')
            }
            app.util.request(app.api.MineUserBCDel, 'GET', obj).then((res) => {
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
      wx.navigateTo({
        url: './upfile'
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
  },

  showModal:function(e) {
    var multiList = this.data.multiList
    var multiIndex = this.data.multiIndex
    if (multiIndex == 0) {
      var delModal = false;
      var buttonStyle = 'width:80%;margin-left:10%;margin-top:5%';
      var catName = ''
    }else{
      var delModal = true;
      var buttonStyle = 'width:44%';
      var catName = multiList[multiIndex]['catName']
    }
    this.setData({
      showModal:true,
      showModalName:catName,
      delModal:delModal,
      buttonStyle:buttonStyle
    })
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
    })
  },
  save:function(){
    var that = this;
    let userId = wx.getStorageSync('userId');
    let obj = {
      userId: userId, //系统的
      showModalName:that.data.showModalName
    }
    app.util.request(app.api.MineUserAddBC, 'POST', obj).then((res) => {
      if (res.status && res.status == 1) {
        wx.showToast({
          title: res.msg,
        });
        that.setData({
          showModal:false,
        })
        that.userBC();
      }else{
        wx.showToast({
          title: res.msg,
          icon: 'none'
        });
      }
      
    }).catch((error) => {
      console.log(error)
    })
  },

  update:function(){
    var that = this;
    let userId = wx.getStorageSync('userId');
    let obj = {
      userId: userId, //系统的
      showModalName:that.data.showModalName,
      catId:that.data.catId
    }
    app.util.request(app.api.MineUserAddBC, 'POST', obj).then((res) => {
      if (res.status && res.status == 1) {
        wx.showToast({
          title: res.msg,
        });
        that.setData({
          showModal:false,
        })
        that.userBC();
      }else{
        wx.showToast({
          title: res.msg,
          icon: 'none'
        });
      }
      
    }).catch((error) => {
      console.log(error)
    })
  },

  delModal:function(){
    var that = this;
    let userId = wx.getStorageSync('userId');
    let obj = {
      userId: userId, //系统的
      catId:that.data.catId
    }
    wx.showModal({
        title: '确定删除该分类吗？',
        content: '',
        success: function (res) {
          app.util.request(app.api.MineUserDelBC, 'POST', obj).then((res) => {
          if (res.status && res.status == 1) {
            wx.showToast({
              title: res.msg,
            });
            that.setData({
              showModal:false,
            })
            that.userBC();
          }else{
            wx.showToast({
              title: res.msg,
              icon: 'none'
            });
          }
          
        }).catch((error) => {
          console.log(error)
        })
        }
    })
  },

  moveBC:function(){
    const that = this;
    let selectIds = this.data.selectIds || [];
    if (selectIds.length == 0) {
      wx.showToast({
        title: '请点击选中要移动的背景图',
        icon: 'none'
      })
    } else {
      that.setData({
        catModal:true,
        moveCatIndex:0,
        moveCatArr:that.data.multiArray
      })
    }
  },
  hideCatModal:function() {
    this.setData({
      catModal:false,
    })
  },

  saveCat:function(e){
    const that = this;
    var moveCatIndex = that.data.moveCatIndex
    var moveValList = that.data.multiList
    var multiIndex = that.data.multiIndex
    if (moveCatIndex == multiIndex) {
      wx.showToast({
        title: '亲，请选择移动至的分类',
        icon: 'none'
      })
    } else {
      var moveCatId = moveValList[moveCatIndex]['catId']
      let selectIds = that.data.selectIds || [];
      let obj = {
        userId: wx.getStorageSync('userId'),
        Ids: selectIds.join(','),
        moveCatId:moveCatId
      }
      app.util.request(app.api.MineUserBM, 'POST', obj).then((res) => {
        if (res.status && res.status == 1) {
          wx.showToast({
            title: '移动成功',
          });
          that.setData({
            catModal:false,
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
  bindPickerCatChange:function(e){
    var moveCatIndex = e.detail.value
    this.setData({
      moveCatIndex: moveCatIndex,
    })
  }

})

