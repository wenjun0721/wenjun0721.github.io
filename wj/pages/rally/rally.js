Page({
  data: {
    rallyBg:"https://www.isp-cn.com/wstmart/wechat/view/default/img/spellGroup/groupbuying_bg.png"

  },
  onLoad: function (e) {
    
    
  },
  /**
 * 生命周期函数--监听页面初次渲染完成
 */
  onReady: function () {
   

  },
  onShow: function () {


  },
  //监听页面滚动
  onPageScroll: function (e) {
    let scrollTop = e.scrollTop;
    if (scrollTop > 600) {
      this.setData({
        isGoTop: true
      })
    } else {
      this.setData({
        isGoTop: false
      })
    }
  },
  goTop: function () {
    wx.pageScrollTo({
      scrollTop: 0,
      duration: 100
    })
  },
})