// pages/cat-list-spike/cat-list-spike.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    datas: {
      robbing: [{
        image: '../../static/shopping_cart_card_1.png',
        price: '198.0',
        costPrice: '198.0',
        soldOut: false,
        sold: '2000',
        title: '1韩国JAYJUN保加利亚亮白保湿补水红玫瑰水光针面膜'
      },
      {
        image: '../../static/shopping_cart_card_1.png',
        price: '198.0',
        costPrice: '198.0',
        soldOut: false,
        sold: '2000',
        title: '1韩国JAYJUN保加利亚亮白保湿补水红玫瑰水光针面膜'
      },
      {
        image: '../../static/shopping_cart_card_1.png',
        price: '198.0',
        costPrice: '198.0',
        soldOut: false,
        sold: '2000',
        title: '1韩国JAYJUN保加利亚亮白保湿补水红玫瑰水光针面膜'
      },
      {
        image: '../../static/shopping_cart_card_1.png',
        price: '198.0',
        costPrice: '198.0',
        soldOut: true,
        sold: '2000',
        title: '1韩国JAYJUN保加利亚亮白保湿补水红玫瑰水光针面膜'
      }
      ],
      remind: [{
        image: '../../static/shopping_cart_card_1.png',
        price: '198.0',
        costPrice: '198.0',
        soldOut: true,
        time:'今天19点',
        follow: '2000',
        title: '1韩国JAYJUN保加利亚亮白保湿补水红玫瑰水光针面膜'
      },
      {
        image: '../../static/shopping_cart_card_1.png',
        price: '198.0',
        costPrice: '198.0',
        soldOut: true,
        time: '今天19点',
        follow: '2000',
        title: '1韩国JAYJUN保加利亚亮白保湿补水红玫瑰水光针面膜'
      },
      {
        image: '../../static/shopping_cart_card_1.png',
        price: '198.0',
        costPrice: '198.0',
        soldOut: true,
        time: '今天19点',
        follow: '2000',
        title: '1韩国JAYJUN保加利亚亮白保湿补水红玫瑰水光针面膜'
      },
      {
        image: '../../static/shopping_cart_card_1.png',
        price: '198.0',
        costPrice: '198.0',
        soldOut: true,
        time: '今天19点',
        follow: '2000',
        title: '1韩国JAYJUN保加利亚亮白保湿补水红玫瑰水光针面膜'
      }
      ]
    },
    remind:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  changeRobbing: function (e) {
    if (this.data.remind) {
      this.setData({
        remind: false,
      });
    }
  },
  changeRemind: function (e) {
    if (!this.data.remind) {
      this.setData({
        remind: true,
      });
    }
  },
  goCatDetail: function (e) {
    // type=spikeEnd 拼团结束
    // type=spikeStart 拼团即将开始
    // type=spikeing 拼团正在进行
    // console.log(e.currentTarget.dataset.type)
    var url = '../cat-detail/cat-detail?type=' + e.currentTarget.dataset.type;
    wx.navigateTo({
      url: url,
    })
  },

})