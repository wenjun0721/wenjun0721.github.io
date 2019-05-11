const app =  getApp().globalData;

Page({
  data: {
    webViewUrl:"http://www.tplm.com/",
    changeText:'管理',
    changeBtn:'Run',
    changeImgBtn:'previewImage',
    delModal:false,
    hidden:true,
    flag:false,
    x:0,
    y:0,
    disabled: true,
    elements:[],
    moveTrue:true,
    selectIds:[],
    buttomModal:'addSharerImg',
    buttomModalText:'添加相片',
    delShow:true,
    yu:false,
    videoIndex:0,
    showModal:false,
    countXp:0,
    limitCountXP:30,
  },
  onShow: function() {
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 500
    })
    // setTimeout(function () {
    //   wx.hideToast()
    // }, 1000);
    app.BMGMUSIC.stop();//关闭音乐的
    this.xpModal();
  },

  onLoad: function (options) {
    this.setData({
      sharerId:options.sharerId,
      index:options.index,
    })
  },
  xpModal:function(e){
    var that = this;
    let userId = wx.getStorageSync('userId');
    let obj = {
      userId: userId, //系统的
      sharerId:that.data.sharerId,
    }
    app.util.request(app.api.LookLove, 'POST', obj).then((res) => {
      if (res.status && res.status == 1) {
        var sharerImgArr = res.data.xp.map(item => {
          return item.img;
        })
        if (res.data.countXp >= that.data.limitCountXP) {
          that.setData({
            sharerImgList: res.data.xp,
            sharerImgArr,
            countXp:res.data.countXp,
            sharerName:res.data.sharerName,
            addStyle:'background: #ccc;border:1px solid #ccc;',
          })
        }else{
          that.setData({
            sharerImgList: res.data.xp,
            sharerImgArr,
            countXp:res.data.countXp,
            sharerName:res.data.sharerName,
            addStyle:'',
          })
        }
        
        //移动的代码 不知道怎么意思，搞懂告诉我一下
        var query = wx.createSelectorQuery();
        var nodesRef = query.selectAll(".item");
          nodesRef.fields({
          dataset: true,
          rect:true

        },(result)=>{
        this.setData({
          elements: result
        })
        }).exec()


      }else{
        that.setData({
          sharerImgList: [],
          addStyle:'',
          yu:true
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
    wx.navigateTo({
      url: './sharer',
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
      delShow:true
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
            app.util.request(app.api.MineSharerImgDel, 'GET', obj).then((res) => {
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
                  delShow:true
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
    var countXp = this.data.countXp;
    if (countXp >= this.data.limitCountXP) {
      wx.showToast({
        title: '一个锦集最多'+this.data.limitCountXP+'张相片哦，请删除一些再添加',
        icon: 'none'
      })
    }else{
      var index = (this.data.index)*1;
      wx.navigateTo({
        url: './sharerimgadd?sharerId=' +this.data.sharerId+'&index='+index+'&countXp='+this.data.countXp+'&limitCountXP='+this.data.limitCountXP
      })
    }
    
  },
  loveShow:function(){
    var sharerIndex = (this.data.index)*1+ 1;
    wx.reLaunch({
      url: '/pages/love/love?sharerId='+this.data.sharerId+'&sharerIndex='+sharerIndex
    })
  },

  videoList:function(){
    var that = this;
    let userId = wx.getStorageSync('userId');
    let obj = {
      userId: userId,
      sharerId:that.data.sharerId,
    }
    app.util.request(app.api.MineVideoList, 'POST', obj).then((res) => {
      var videoArr = res.data.arr.map(item => {
        return item.video_name;
      })
      var video = res.data.arr[res.data.index]['video'];
      var sessionVideoId = res.data.arr[res.data.index]['id'];
      that.setData({
        videoList: res.data.arr,
        videoArr,
        videoArrIndex:res.data.index,
        video:video,
        sessionVideoId:sessionVideoId,
      })
      this.music();
    }).catch((error) => {
      console.log(error)
    })
  },
  showModal:function(){
    this.videoList();
    this.setData({
      showModal:true,
    })
  },

  hideModal:function(){
    this.setData({
      showModal:false,
    })
    app.BMGMUSIC.stop();//关闭音乐的
  },

  bindPickerVideoChange:function(e){
    app.BMGMUSIC.stop();//关闭音乐的
    var select_key = e.detail.value;
    var that = this;
    var videoList = that.data.videoList;
    that.setData({
      videoArrIndex:select_key,
      video:videoList[select_key]['video'],
      videoId:videoList[select_key]['id'],
    })
    this.music();
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

  saveSharerVideo:function(){
    app.BMGMUSIC.stop();//关闭音乐的
    var that = this
    var videoId = that.data.videoId;
    var sessionVideoId = that.data.sessionVideoId;
    if (typeof(videoId) != 'undefined' && sessionVideoId != videoId) {
      let userId = wx.getStorageSync('userId');
      let obj = {
        userId: userId,
        sharerId:that.data.sharerId,
        videoId:that.data.videoId,
      }
      app.util.request(app.api.MineVideoChange, 'POST', obj).then((res) => {
        that.setData({
          showModal:false,
        })
      }).catch((error) => {
        console.log(error)
      })
    }else{
      that.setData({
        showModal:false,
      })
    }

  },
  /**
   * 用户点击右上角分享s
   */
  onShareAppMessage: function () {
    var that = this;
    var sharerId = that.data.sharerId;
    var sharerName =that.data.sharerName;
    var title = '我分享的锦集：'+sharerName+'，为我打call一下哦，么么哒。'
    return {
      title: title,
      path: '/pages/index/look?sharerId=' + sharerId+'&sharerUserId='+wx.getStorageSync('userId'),
      success: (res) => {
        //修改数据库
        if (sharerId != 0) {
          app.util.request(app.api.LookLoveSharer, 'POST', {'sharerId':sharerId}).then((rs) => {
            console.log("转发成功");
          }).catch((error) => {
            console.log(error)
          })
        }
      },
      fail: (res) => {
        console.log("转发失败", res);
      }
    }
  },


  //长按
  _longtap:function(e){
    const detail = e.detail;
    this.setData({
      x: e.currentTarget.offsetLeft,
      y: e.currentTarget.offsetTop
    })
    this.setData({
      hidden: false,
      flag:true,
    })

  },
  //触摸开始
  touchs:function(e){
    this.setData({
      beginIndex:e.currentTarget.dataset.index
    })
  },
  //触摸结束
  touchend:function(e){
    if (!this.data.flag) {
      return;
    }
    const x = e.changedTouches[0].pageX
    const y = e.changedTouches[0].pageY
    const list = this.data.elements;
    let data = this.data.sharerImgList
    for(var j = 0; j<list.length; j++){
      const item = list[j];
      if(x>item.left && x<item.right && y>item.top && y<item.bottom){
        const endIndex = item.dataset.index;
        const beginIndex = this.data.beginIndex;
        //向后移动
        if (beginIndex < endIndex) {
          let tem = data[beginIndex];
          for (let i = beginIndex; i < endIndex; i++) {
            data[i] = data[i + 1]
          }
          data[endIndex] = tem;
        }
        //向前移动
        if (beginIndex > endIndex) {
          let tem = data[beginIndex];
          for (let i = beginIndex; i > endIndex; i--) {
            data[i] = data[i - 1]
          }
          data[endIndex] = tem;
        }

        this.setData({
          sharerImgList: data
        })
      }
    }

    //移动后修改数据库
    let obj = {
      data:this.data.sharerImgList,
    }
    app.util.request(app.api.MineSharerImgMove, 'POST', obj).then((res) => {
      
    }).catch((error) => {
      console.log(error)
    })

    this.setData({
      hidden: true,
      flag: false
    })
  },
  //滑动
  touchm:function(e){
    if(this.data.flag){
      const x = e.touches[0].pageX
      const y = e.touches[0].pageY
      this.setData({
        x: x - 45,
        y: y - 70
      })
    }
  }


})

