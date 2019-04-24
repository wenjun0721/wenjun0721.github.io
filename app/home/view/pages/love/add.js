const app = getApp().globalData;
Page({
  data: {
    webViewUrl:"http://www.tplm.com/",
    backShow:false,
    indexShow:true,
    multiIndex:[0,0],
    // multiArray:[['热门推荐','官方分类','个人分类'],[]],
    result:[
      {
            "backGroundDefault_id": "0",　　//值为模拟 加密数据
            "backGroundDefault_name": "热门推荐"
        },
        {
            "backGroundDefault_id": "1",
            "backGroundDefault_name": "官方分类"
        },
        {
            "backGroundDefault_id": "2",
            "backGroundDefault_name": "个人分类"
        },
    ],
    backgroundCatShow:false,
    lastTapTime:0,
    selectindex:0,
    modalHidden: false,
    backgroundImgTrue:true,
    myLoveShow: false,
    backgroundText:'请选择一张您喜欢的背景图哦',
    loveCatId:0,
  },
  onShow: function() {
    var that = this;
    this.setData({
      backShow: false,
      indexShow:true,
      myLoveShow:false,
    })
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 500
    })
    setTimeout(function () {
      wx.hideToast()
    }, 500);
    
    this.initDate();
    app.BMGMUSIC.stop()
  },

  onLoad: function () {
    
    wx.setNavigationBarTitle({
      title: '背景图管理'
    })
    var xiaoquList = this.data.result;
    var xiaoquArr = xiaoquList.map(item => {　　　　// 此方法将校区名称区分到一个新数组中
      return item.backGroundDefault_name;
    });
    this.setData({
      multiArray: [xiaoquArr, []],　　
      xiaoquList,
      xiaoquArr
    })
  },

  background: function() {
    this.setData({
      backShow: true,
      indexShow:false,
    })
  },

  hideModal: function() {
    this.setData({
      backShow: false,
      indexShow:true,
    })
  },


  //双击事件
  doubleTap:function(e){
    // var curTime = e.timeStamp  
    // var lastTime = e.currentTarget.dataset.time 
    // if (curTime - lastTime > 0) {  
    //   if (curTime - lastTime < 300) {  
    //     console.log("挺快的双击，用了：" + (curTime - lastTime));
    //     var src = e.currentTarget.dataset.src;
    //     var index = e.currentTarget.dataset.index;
    //     var uploadedImages = this.data.imageList;
    //     wx.previewImage({
    //       current: uploadedImages[index], //当前图片地址
    //       urls: uploadedImages, //所有要预览的图片的地址集合 数组形式
    //     })  
    //   } 
    // } 
    // //单击/长按都是选中
    // this.setData({  
    //   lastTapTime: curTime,
    //   selectindex:(e.currentTarget.dataset.index)*1+1,
    // })
    var index = e.currentTarget.dataset.index;
    var uploadedImages = this.data.imageList;
    this.setData({  
      modalHidden: true,
      lookImage: uploadedImages[index],
      lookindex: index,
      uploadedImages:uploadedImages,
    })
  },

  modalCandel: function () {
    this.setData({
      modalHidden: false,
    })
  },
  

  modalConfirm:function () {
    this.setData({
      backShow: false,
      indexShow:true,
      modalHidden: false,
      backgroundImg: this.data.lookImage,
      selectindex:(this.data.lookindex)*1+1,
      backgroundText:'已选择您喜欢的背景图，再次点击可更改哦',
    })
  },

  previewImg: function () {
    var src = this.data.lookImage;
    var index = this.data.index;
    var uploadedImages = this.data.uploadedImages;
    console.log(uploadedImages)
    wx.previewImage({
      current: uploadedImages[index], //当前图片地址
      urls: uploadedImages, //所有要预览的图片的地址集合 数组形式
    })
  },


  //userId 用户ID，type：0代表选择的分类，catId：分类ID
  initDate:function(userId=0,type=0,catId=0){
      var that = this;
      if (catId == 0 && type != 0) {
        var is_new = 1;
      }else{
        var is_new = 0;
      }
      let obj = {
        userId: userId,
        is_new: is_new,
        catId: catId,
      }
      app.util.request(app.api.Love_backGround, 'POST', obj).then((res) => {
        if (res.status && res.status == 1) {
          console.log(res.data)
          that.setData({
            backGround: res.data,
            imageList: res.data.imgs,
          })
        }
      }).catch((error) => {
        console.log(error)
      })
  },


  //改变分类，获取2级分类
  bindMultiPickerColumnChange: function (e) {
    console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
    var data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    };
    data.multiIndex[e.detail.column] = e.detail.value;
    var backGroundDefault_id_session = this.data.backGroundDefault_id;　　　// 保持之前的校区id 与新选择的id 做对比，如果改变则重新请求数据
    switch (e.detail.column) {
      case 0:
        var xiaoquList = this.data.xiaoquList;
        var backGroundDefault_id = xiaoquList[e.detail.value]['backGroundDefault_id'];
        if (backGroundDefault_id_session != backGroundDefault_id) {　　　　// 与之前保持的校区id做对比，如果不一致则重新请求并赋新值
          this.searchClassInfo(backGroundDefault_id);　　　　　　
        }
        if (e.detail.value == 0) {
          data.left = '5rem';
        }else{
          data.left = '3.85rem';
        }
        data.multiIndex[1] = 0;
        
        break;
    }
    this.setData(data);
  },

  searchClassInfo(xiaoqu_id){
    
    var that = this;
    if (xiaoqu_id) {
      this.setData({
        backGroundDefault_id: xiaoqu_id
      })
      let obj = {
        value: xiaoqu_id, 
        userId: wx.getStorageSync('userId')
      }
      console.log(xiaoqu_id)
      app.util.request(app.api.Love_backGround_cat, 'POST',obj).then((res) => {　
        console.log(res.data.arr)
        var classList = res.data.arr;
        var classArr = classList.map(item => {
          return item.catName;
        })
        var xiaoquArr = this.data.xiaoquArr;
        that.setData({
          multiArray: [xiaoquArr, classArr],
          classArr,
          classList
        })
      })
      
      
      
    }
  },



  bindMultiPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value,)
    var column = e.detail.value[0];
    var classList =this.data.classList;
    var select_key = e.detail.value[1];
    if (column == 0) {
     return this.initDate();
    }else if (column == 1) {
      var catId=classList[select_key]['catId'];
      return this.initDate(0,column,catId);
    }else{
      var catId=classList[select_key]['catId'];
      var userId = wx.getStorageSync('userId');
      return this.initDate(userId,column,catId);
    }
  },


  //监听输入内容并且赋值
  listenerInput: function (e) {
    let role = e.currentTarget.dataset.role;
    let val = e.detail.value;
    var len = this.getStrLength(val);
    let obj = [];
    obj[role] = val;
    this.setData({ [role] : val});
  },
  lookMyLove: function() {
    const that = this;
    let toName = that.data.toName;
    let fromName = that.data.fromName;
    let loveTetx = that.data.loveTetx;
    let backgroundImg = that.data.backgroundImg;
    let loveCatId = that.data.loveCatId;

    //生成图片
    let obj = {
      userId: wx.getStorageSync('userId'),
      toName: toName,
      fromName: fromName,
      loveTetx: loveTetx,
      backgroundImg: backgroundImg,
      loveCatId: loveCatId
    }
    app.util.request(app.api.Love_add, 'POST', obj).then((res) => {
      if (res.status && res.status == 1) {
        console.log(res.data)
        that.setData({
          love: res.data,
          myLoveShow:true,
        })
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
  getStrLength: function(str) {
      return str.replace(/[\u0391-\uFFE5]/g,"aa").length;   //先把中文替换成两个字节的英文，在计算长度
  },


  //取消预览
  tpCandel:function(){
    let love = this.data.love;
    let obj = {
      love: love
    }
    app.util.request(app.api.Love_delImg, 'POST',obj).then((res) => {　
      console.log('取消成功')
      this.setData({
        myLoveShow: false,
      })
    })
  },

  //确定选中
  tpConfirm:function(){
    let love = this.data.love;
    let obj = {
      img: this.data.love,
      loveCatId: this.data.loveCatId,
      toUser: this.data.toName,
      fromUser: this.data.fromName,
      text: this.data.loveTetx,
    }
    app.util.request(app.api.Love_addImg, 'POST',obj).then((res) => {　
      console.log('确定成功')
      this.setData({
        myLoveShow: false,
      })
      wx.showToast({
       title: '确定成功',
       icon: 'success',
       duration: 1000
      })
      this.onLoad();
    })
  },

})