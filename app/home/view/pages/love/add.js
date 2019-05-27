const app = getApp().globalData;
Page({
  data: {
    webViewUrl:app.webViewUrl,
    backShow:false,
    indexShow:true,
    multiIndex:[0,0],
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
    setUpText:'高级设置',
    loveCatId:0,
    setUpShow:false,
    setUpArr:['请选择文字摆放位置','系统摆放','自定义摆放'],
    setUpArrIndex:0,
    setUpStyle:'width: 80%;margin:  0 auto;margin-top: 2rem;',
    setUpSubArr:['左上角','上居中','右上角','左居中','居中','右居中','左下角','下居中','右下角'],
    setUpSubArrIndex:0,
    setUpShowSub:false,
    setUpUserSelf:false,
    setUpType:0,
    setUpFontType:0,
    setUpFontArrIndex:0,
    setUpFontStyle:'width: 80%;margin:  0 auto;margin-top: 1rem;',
    setUpFontArr:['请选择您喜欢的字体','楷体','方正北魏楷书简体','方正行楷','方正行楷繁体','方正行楷简体','方正黄草','方正瘦金书简体','方正硬笔行书简体','方正徐静蕾体','方正黄草简体','方正流行体简体','方正启体简体','方正舒体简体','方正魏碑繁体','方正新舒体简体'],
    fontW:28,
    fontStype:66,
    fontX:0,
    setUpFontColorArr:['黑色','白色','粉红色','灰色','天蓝色','碧绿色','淡紫色','浅灰蓝色','淡黄色','乌贼墨棕','孔雀蓝','土耳其玉色'],
    setUpFontColorArrIndex:0
  },
  onShow: function() {
    var that = this;
    this.setData({
      backShow: false,
      indexShow:true,
      myLoveShow:false,
      page:0,
      imageList:[],
      userId:0,
      type:0,
      catId:0
    })
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 500
    })
    // setTimeout(function () {
    //   wx.hideToast()
    // }, 500);
    
    this.initDate();
    app.BMGMUSIC.stop();//关闭音乐的
  },

  onLoad: function () {
    wx.setNavigationBarTitle({
      title: '编译回忆'
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


  // //改变逻辑 原逻辑 5-15
  // doubleTap:function(e){
  //   var index = e.currentTarget.dataset.index;
  //   var uploadedImages = this.data.imageList;
  //   this.setData({  
  //     modalHidden: true,
  //     lookImage: uploadedImages[index],
  //     lookindex: index,
  //     uploadedImages:uploadedImages,
  //   })
  // },

  //改变逻辑 5-15
  doubleTap:function(e){
    var index = e.currentTarget.dataset.index;
    var uploadedImages = this.data.imageList;
    this.setData({
      backShow: false,
      indexShow:true,
      modalHidden: false,
      backgroundImg: uploadedImages[index],
      selectindex:index*1+1,
      backgroundText:'已选择您喜欢的背景图，再次点击可更改哦',
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
    // console.log(uploadedImages)
    wx.previewImage({
      current: uploadedImages[index], //当前图片地址
      urls: uploadedImages, //所有要预览的图片的地址集合 数组形式
    })
  },


  //userId 用户ID，type：0代表选择的分类，catId：分类ID
  initDate:function(){
      var that = this;
      var catId  = that.data.catId;
      var type   = that.data.type;
      var userId = that.data.userId;
      if (catId == 0 && type != 0) {
        var is_new = 1;
      }else{
        var is_new = 0;
      }
      let page = that.data.page;
      let imageList = that.data.imageList;
      page++;
      let obj = {
        userId: userId,
        is_new: is_new,
        catId: catId,
        page: page,
      }
      app.util.request(app.api.Love_backGround, 'POST', obj).then((res) => {
        if (res.status && res.status == 1) {
          if (res.data.imgs.length>0) {
            that.setData({
              backGround: res.data,
              imageList: imageList.concat(res.data.imgs),
              page:page
            })
          }else{
            wx.showToast({
              title: '没有更多啦',
              icon: 'none',
              duration: 1000
            })
          }
        }
      }).catch((error) => {
        console.log(error)
      })
  },


  //改变分类，获取2级分类
  bindMultiPickerColumnChange: function (e) {
    // console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
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
      // console.log(xiaoqu_id)
      app.util.request(app.api.Love_backGround_cat, 'POST',obj).then((res) => {　
        // console.log(res.data.arr)
        var classList = res.data.arr;
        var classArr = classList.map(item => {
          return item.catName;
        })
        var xiaoquArr = this.data.xiaoquArr;
        that.setData({
          multiArray: [xiaoquArr, classArr],
          classArr,
          classList,
          backgroundImg: '',
          selectindex:0,
          backgroundText:'请选择一张您喜欢的背景图哦',
        })
      })
      
      
      
    }
  },



  bindMultiPickerChange: function (e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value,)
    var column = e.detail.value[0];
    var classList =this.data.classList;
    var select_key = e.detail.value[1];
    
    if (column == 0) {
      this.setData({
        page:0,
        imageList:[],
        catId:0,
        type:0,
        userId:0
      })
     return this.initDate();
    }else if (column == 1) {
      var catId=classList[select_key]['catId'];
      this.setData({
        page:0,
        imageList:[],
        catId:catId,
        type:column,
        userId:0
      })
      return this.initDate();
    }else{
      var catId=classList[select_key]['catId'];
      var userId = wx.getStorageSync('userId');
      this.setData({
        page:0,
        imageList:[],
        catId:catId,
        type:column,
        userId:userId
      })
      return this.initDate();
    }
  },


  //监听输入内容并且赋值
  listenerInput: function (e) {
    let role = e.currentTarget.dataset.role;
    let val = e.detail.value;
    if (role == 'widthW') {  //自定义宽度
      if (val*1 > 300*1) {
        val = 300
      }
    }
    if (role == 'heightW') {  //自定义高度
      if (val*1 > 400*1) {
        val = 400
      }
    }
    if (role == 'fontW') {  //字体大小
      if (val*1 > 36*1) {
        val = 36
      }
    }
    if (role == 'fontX') {  //字体倾斜度
      if (val*1 > 90*1) {
        val = 90
      }
    }
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
    let fontW = that.data.fontW;
    let setUpFontType = that.data.setUpFontType;
    let fontX = that.data.fontX;
    let setUpArrIndex = that.data.setUpArrIndex;
    let setUpSubArrIndex = that.data.setUpSubArrIndex;
    let widthW = that.data.widthW;
    let heightW = that.data.heightW;
    let setUpFontColorArrIndex = that.data.setUpFontColorArrIndex;
    if (typeof(backgroundImg) == 'undefined' || backgroundImg == '') {
      wx.showToast({
       title: '亲，请选择背景图哦，么么哒',
       icon: 'none',
       duration: 2000
      })
      return false
    }
    if (typeof(loveTetx) == 'undefined' || loveTetx == '') {
      wx.showToast({
       title: '亲，请填写你想说的话哦，么么哒',
       icon: 'none',
       duration: 2000
      })
      return false
    }
    //生成图片
    let obj = {
      userId: wx.getStorageSync('userId'),
      toName: toName,
      fromName: fromName,
      loveTetx: loveTetx,
      backgroundImg: backgroundImg,
      fontW: fontW,
      setUpFontType: setUpFontType,
      fontX: fontX,
      setUpArrIndex: setUpArrIndex,
      setUpSubArrIndex: setUpSubArrIndex,
      widthW: widthW,
      heightW: heightW,
      setUpFontColorArrIndex: setUpFontColorArrIndex,
    }
    app.util.request(app.api.Love_add, 'POST', obj).then((res) => {
      if (res.status && res.status == 1) {
        that.setData({
          love: res.data,
          myLoveShow:true,
          indexShow:false
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
  // getStrLength: function(str) {
  //     return str.replace(/[\u0391-\uFFE5]/g,"aa").length;   //先把中文替换成两个字节的英文，在计算长度
  // },


  //取消预览
  tpCandel:function(){
    let love = this.data.love;
    let obj = {
      love: love
    }
    app.util.request(app.api.Love_delImg, 'POST',obj).then((res) => {　
      this.setData({
        myLoveShow: false,
        indexShow:true
      })
      // this.onShow()
    })
  },

  //确定选中
  tpConfirm:function(){
    let love = this.data.love;
    let obj = {
      userId: wx.getStorageSync('userId'),
      img: this.data.love,
      loveCatId: this.data.loveCatId,
      toUser: this.data.toName,
      fromUser: this.data.fromName,
      text: this.data.loveTetx,
    }
    app.util.request(app.api.Love_addImg, 'POST',obj).then((res) => {　
      this.setData({
        myLoveShow: false,
        indexShow:true,
        toName:'',
        fromName:'',
        backgroundImg:'',
        loveTetx:'',
        backgroundText:'请选择一张您喜欢的背景图哦',
      })
      wx.showToast({
       title: '确定成功,已收藏在我的回忆中了哦',
       icon: 'none',
       duration: 1000
      })
      this.reset();
    })
  },

  setup:function(){
    this.setData({
      indexShow: false,
      setUpShow:true,
    })
  },

  bindPickerChange(e) {
    if (e.detail.value == 1) {
      this.setData({
        setUpArrIndex: e.detail.value,
        setUpStyle:'width: 42%;margin-left:1rem;margin-right:1rem;float:left',
        setUpShowSub:true,
        setUpSubStyle:'width: 42%;float:right;margin-right:1rem;',
        setUpUserSelf:false,
        setUpType:1,
        fontStype:0
      })
    }else if (e.detail.value == 2) {
      this.setData({
          setUpArrIndex: e.detail.value,
          setUpStyle:'width: 80%;margin:  0 auto;margin-top: 2rem;',
          setUpShowSub:false,
          setUpSubStyle:'',
          setUpUserSelf:true,
          setUpType:2,
          fontStype:66
        })  
    }else{
        this.setData({
          setUpArrIndex: e.detail.value,
          setUpStyle:'width: 80%;margin:  0 auto;margin-top: 2rem;',
          setUpShowSub:false,
          setUpSubStyle:'',
          setUpUserSelf:false,
          setUpType:0,
          fontStype:66
        })
    }
    
  },

  bindPickerChangeSub:function(e){
    this.setData({
      setUpSubArrIndex:e.detail.value,
    })
  },

  bindPickerFontChange:function(e){
    this.setData({
      setUpFontArrIndex:e.detail.value,
      setUpFontType:e.detail.value,
    })
  },

  bindPickerFontColorChange:function(e){
    this.setData({
      setUpFontColorArrIndex:e.detail.value,
    })
  },

  //定义规则，防止以后忘记
  // setUpFontType = 0 用默认字体 zt0.ttf  ，大于0 就代表用对应的字体
  // fontW 字体大小，默认为28
  // fontX 字体倾斜度，默认为0
  // setUpArrIndex = 0 随机排序，等于1就是系统排序，取值为setUpSubArrIndex 等于2时，就是自定义排序 取值为widthW，heightW

  reset:function(){
    this.setData({
      setUpFontArrIndex:0,
      setUpFontType:0,
      fontW:28,
      fontX:0,
      setUpArrIndex:0,
      setUpSubArrIndex:0,
      widthW:'',
      heightW:'',
      setUpUserSelf:false,
      setUpShowSub:false,
      setUpStyle:'width: 80%;margin:  0 auto;margin-top: 2rem;',
      fontStype:66,
      setUpFontColorArrIndex:0
    })
  },
  submit:function(){
    this.setData({
      indexShow: true,
      setUpShow:false,
    })
  },

  onReachBottom: function () {
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 1000
    })
    this.initDate();
  },


})