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
    moveTrue:true
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
      sharerId:options.sharerId
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
        var sharerImgArr = res.data.map(item => {
          return item.img;
        })
        that.setData({
          sharerImgList: res.data,
          sharerImgArr,
        })
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
      changeImgBtn:'checkImg',
      delModal:true,
    })
  },

  Ok:function(){
    this.setData({
      changeText:'管理',
      changeBtn:'Run',
      changeImgBtn:'previewImage',
      delModal:false,
    })
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

