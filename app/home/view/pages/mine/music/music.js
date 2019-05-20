const app =  getApp().globalData;

Page({
  data: {
    myVideoName:'点击上传你喜欢的音乐',
    videoSc:'',
    video_namesc:'',
    showModal:false
  },
  onShow: function() {
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 500
    })
    this.music();
    app.BMGMUSIC.stop();//关闭音乐的
  },

  onLoad: function () {
    wx.setNavigationBarTitle({
      title: '我的音乐'
    })
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
    app.BMGMUSIC.stop();//关闭音乐的
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
      video:musicList[index]['video']
    })
    if (musicList[index].select == true) {
      this.listenerMusic();
    }
  },

  listenerMusic:function(){
    //播放音乐
    var video = this.data.video
    const innerAudioContext = app.BMGMUSIC
    innerAudioContext.autoplay = true
    innerAudioContext.loop = true
    innerAudioContext.src = app.webViewUrl+video
    innerAudioContext.play();
  },

  delBtn:function(e){
    const that = this
    var index = e.currentTarget.dataset.index;
    var name = e.currentTarget.dataset.name;
    let musicList = that.data.musicList;
    let id = musicList[index]['id'];
    wx.showModal({
      title: '确定删除歌曲:'+name+'吗？',
      content: '',
      success: function (res) {
        if (res.cancel) {
          //点击取消,默认隐藏弹框
        } else {
          let obj = {
            userId: wx.getStorageSync('userId'),
            id: id
          }
          app.util.request(app.api.MineUserMusicDel, 'GET', obj).then((res) => {
            if (res.status && res.status == 1) {
              wx.showToast({
                title: '删除成功',
              });
              that.music()
              app.BMGMUSIC.stop();//关闭音乐的
            } else {
              wx.showToast({
                title: res.msg,
                icon: 'none'
              })
            }
          })
        }
      }
    })
  },
  //监听输入内容并且赋值
  listenerInput: function (e) {
    let role = e.currentTarget.dataset.role;
    let val = e.detail.value;
    this.setData({ [role] : val});
  },
  chooseVideo:function(){
    var that = this;
    //每次选择的时候都要清除没上传的
    var videoSc = that.data.videoSc;
    if (videoSc != '') {
      app.util.request(app.api.MineUserVideoDel, 'GET', {'videoSc':videoSc}).then((res) => {
          that.setData({
            videoSc: '',
            myVideoName:'点击上传你喜欢的音乐',
          })
      })
    }
    
     wx.chooseVideo({
      sourceType: ['album', 'camera'],
      maxDuration: 360,
      camera: 'back',
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePath = res.tempFilePath
        if (tempFilePath) {
          that.setData({
            url: tempFilePath
          })
          wx.uploadFile({
            url: app.api.MindeUpVideoFile, //仅为示例，非真实的接口地址
            filePath: tempFilePath,
            name: 'file',
            formData: {
              'userId': wx.getStorageSync('userId')
            },
            success: function (rss) {
              var data = JSON.parse(rss.data);
              console.log(data)
              if (data.status && data.status == 1) {
                wx.showToast({
                 title: data.msg,
                 duration: 2000
                })
                that.setData({
                  myVideoName: '上传成功，请保存',
                  videoSc:data.data
                })
              }else{
                wx.showToast({
                 title: data.msg,
                 icon: 'none',
                 duration: 2000
                })
                that.setData({
                  myVideoName: '点击上传你喜欢的音乐',
                  videoSc:''
                })
              }
            }
          })
        }
      }
    })
  },

  saveVideo:function(){
    var that = this;
    var videoSc = that.data.videoSc;
    var video_namesc = that.data.video_namesc;
    if (video_namesc == '') {
      wx.showToast({
       title: '请填写音乐名称',
       icon: 'none',
       duration: 2000
      })
      return false;
    }
    if (videoSc == '') {
      wx.showToast({
       title: '请先点击上传音乐',
       icon: 'none',
       duration: 2000
      })
    }else{
      var userId = wx.getStorageSync('userId');
      app.util.request(app.api.MindeSaveVideo, 'POST', {'videoSc':videoSc,'userId':userId,'video_namesc':video_namesc}).then((res) => {
        wx.showToast({
         title: res.msg,
         duration: 2000
        })
        that.setData({
          video_namesc: '',
          videoSc:'',
          myVideoName:'点击上传你喜欢的音乐',
        })
      })
    }
    
  },

  hideModal:function(){
    var that = this;
    //每次选择的时候都要清除没上传的
    var videoSc = that.data.videoSc;
    if (videoSc != '') {
      app.util.request(app.api.MineUserVideoDel, 'GET', {'videoSc':videoSc}).then((res) => {
          that.setData({
            videoSc: '',
            myVideoName:'点击上传你喜欢的音乐',
            video_namesc: '',
          })
      })
    }

    that.setData({
      videoSc: '',
      myVideoName:'点击上传你喜欢的音乐',
      video_namesc: '',
      showModal:false
    })
  },

  showModal:function(){
    var that = this;
    that.setData({
      myVideoName:'点击上传你喜欢的音乐',
      video_namesc: '',
      showModal:true
    })
  },
 
})

