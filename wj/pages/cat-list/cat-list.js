//index.js
const app = getApp().globalData;
Page({
  data: {
    position: "自动定位失败...",
    searchText: "品质水果",
    hiddenLoading: false,
    slideIndex: 0,
    CatBelongIndex:false,
    isHidden: false,
    isGoTop: false,
    firstNav: [{
      catName: '全部',
      catId: 0
    }],
    currPage: 1,
    pageSize: 20,
    bannerLists: [],
    screenFirstNavIndex: 0,
    screenBrandNavIndex: 0,
    isScreen: true,
    loadingText: '正在加载.....',
    belongIndex: true,
    otherSecondNav: [],
    condiNavIndex: 0,
    condiNavs: [
      {
        text: '全部',
        index: 0
      }, {
        text: '销量',
        select: 0,
        index: 1
      }, {
        text: '价格',
        select: 0,
        index: 2
      }
    ],
    initCondiNavs: [
      {
        text: '全部',
        imgs: [

        ],
        index: 0
      }, {
        text: '销量',
        select: 0,
        index: 1
      }, {
        text: '价格',
        select: 0,
        index: 2
      },
    ],
    screenFirstNavs: ['仅看自营', '仅看包邮', '仅看有货',],
    screenBrandNavs: [],
    isDefaultText: true,
    screenClick: false,
  },
  onLoad(e) {
    let keyword = e.keyword || '';//判断是什么传递过来的
    let catId = e.catId || '';
    let adId = e.adId || '';
    let brandId = e.brandId || '';
    let from = e.from || '';
    if (keyword != '' || catId != '' || adId != '' || brandId != '') {
      this.setData({
        belongIndex: false,
        slideIndex: catId
      })
    }

    this.setData({
      otherPageKeyword: keyword,
      otherPagecatId: catId,
      otherPageAdId: adId,
      otherPageBrandId: brandId,
      from: from
    })
    this.getInitData();

  },
  //初始化数据
  getInitData() {
    // 页面初次加载，请求第一页数据
    var that = this;
    let getDataOk = true;
    let belongIndex = that.data.belongIndex;
    app.util.request(app.api.index, 'GET').then(function(data) {
      if (data.status && data.status == 1) {
        that.setData({
          banTopAds: data.banTopAds, //三张广告图
          bannerLists: data.swiper, //banner图
          banBottomAds: data.banBottomAds, //下面广告图
          indexCats: data.indexCats, //首页二级分类
          buttonBottomAds: data.buttonBottomAds, //二级分类下面广告图
          w_index_cad_First: data.w_index_cad_1, //首页页面第一个广告位
          w_index_cad_Second: data.w_index_cad_2, //首页页面第二个广告位
          w_index_ads_two: data.w_index_ads_2 || [], //首页2个广告
        })
      } else {

      }
    })
    //首页一级分类
    app.util.request(app.api.indexNavs, 'GET').then(function(data) {
      if (data.status && data.status == 1) {
        that.setData({
          firstNav: that.data.firstNav.concat(data.data),
        })
      } else {

      }
    }).catch(function(err) {
      getDataOk = false;
      console.log('请求失败' + err)
    });
    if (!belongIndex) { 
      //传进来的页面
      if (that.data.otherPagecatId != "" && that.data.otherPagecatId!=null){
        that.setData({CatBelongIndex:true});
      }
      console.log(that.data.otherPagecatId)
      console.log(this.data.CatBelongIndex)


      let datas = {
        keyword: that.data.otherPageKeyword,
        catId: that.data.otherPagecatId,
        brandId: that.data.otherPageBrandId,
        userId: wx.getStorageSync('userId') || '',
        areaId: wx.getStorageSync('selectArea').id || '',
      }

      app.util.request(app.api.indexOtherPage, 'GET', datas).then((res) => {


        if (res.status && res.status == 1) {
          let data = res.data;

          console.log("------------------")
          console.log(data.goods.Rows)
          console.log("=====================")
          that.setData({
            secondNav: data.getGoodCatHot,
            bannerLists: data.banner,
            shopLists: data.goods.Rows,
          });
          if (data.goods.Rows.length < 1) {
            that.setData({
              loadingText: '没有商品'
            });
          };
          if (data.goods.Rows.length == [] ) {
            that.setData({
              loadingText: '没有商品'
            });
          }else{
            that.setData({
              loadingText: '正在加载中...'
            });
          }
        }
        wx.hideLoading();
      }).catch((error) => {
        wx.hideLoading();
      })
    } else {
      //获取首页数据
      app.util.request(app.api.index, 'GET').then(function(data) {
        if (data.status && data.status == 1) {
          that.setData({
            banTopAds: data.banTopAds, //三张广告图
            bannerLists: data.swiper, //banner图
            banBottomAds: data.banBottomAds, //下面广告图
            indexCats: data.indexCats, //首页二级分类
            buttonBottomAds: data.buttonBottomAds, //二级分类下面广告图
            w_index_cad_First: data.w_index_cad_1, //首页页面第一个广告位
            w_index_cad_Second: data.w_index_cad_2, //首页页面第二个广告位
            w_index_ads_two: data.w_index_ads_2 || [], //首页2个广告
          })
        } else {

        }
      }).catch(function(err) {
        getDataOk = false;
        console.log('请求失败' + err)
      })
      //获取中间20条拼团商品列表
      app.util.request(app.api.groupIndex, 'GET', {
        num: 20
      }).then(function(data) {
        if (data.status && data.status == 1) {
          that.setData({
            shopListsCenter: data.goods
          })
        } else {

        }
      }).catch(function(err) {
        getDataOk = false;
        console.log('请求失败' + err)
      })
      //获取底部商品列表
      app.util.request(app.api.indeShopLists, 'GET').then(function(data) {
        if (data.status && data.status == 1) {
          that.setData({
            shopLists: data.data
          })
        } else {

        }
      }).catch(function(err) {
        getDataOk = false;
        console.log('请求失败' + err)
      })
      return getDataOk;
    }
  },
  //点击导航时 复位一些基础数据
  resetNavArgu() {
    const that = this;
    let arr = that.data.condiNavs;
    arr.map((val, index) => {
      val.select = 0;
    })
    that.setData({
      condiNavs: arr, //条件导航栏 全部 价格什么的 图片归为
      condiNavIndex: 0, //条件导航 选取第一个
      currPage: 1, //分页为0
      keyword: '', //关键字清空
      loadingText: '正在加载...', //复位上拉加载
    });
    this.screenReset();
  },
  //一级滑动导航点击事件
  firstNav: function(e) {
    const that = this;
    that.setData({
      belongIndex: true
    });
    that.resetNavArgu();
    wx.showLoading({
      title: '',
    })
    let index = e.currentTarget.id;
    let catId = e.currentTarget.dataset.catid;
    if (catId ==0) {
      that.setData({ CatBelongIndex: false });
    }else{
      that.setData({ CatBelongIndex: true });
    }
    if (index == 0) {
      this.getInitData();
      this.setData({
        slideIndex: index,
        isHidden: false
      });
      wx.hideLoading();
    } else {
      let datas = {
        userId: wx.getStorageSync('userId') || '',
        areaId: wx.getStorageSync('selectArea').id || '',
        catId: catId
      }
      app.util.request(app.api.indexOtherPage, 'GET', datas).then((res) => {
        console.log(res)
        if (res.status && res.status == 1) {
          let data = res.data;
          that.setData({
            secondNav: data.getGoodCatHot,
            bannerLists: data.banner,
            shopLists: data.goods.Rows,
          });
          if (data.goods.Rows.length < 1) {
            that.setData({
              loadingText: '没有商品'
            })
          }
        }
        wx.hideLoading();
      }).catch((error) => {
        wx.hideLoading();
      })
      this.setData({
        slideIndex: index,
        isHidden: true,
        catId: catId,
        screenClick: false
      })
    }
    this.setData({
      currPage: 1
    })
  },
  //条件筛选重置按钮
  screenReset: function() {
    this.setData({
      screenFirstNavIndex: 0,
      screenBrandNavIndex: 0,
      lowerPrice: 0,
      higherPrice: 0
    })
  },

  //上拉
  onReachBottom: function() {
    let currPage = this.data.currPage;
    currPage++;
    this.setData({
      currPage: currPage
    })
    this.getShopsList(currPage);
  },
  //点击二级导航
  secondNav: function (e) {
    wx.showLoading({
      title: '',
    })
    console.log(e)
    const that = this;
    let belongIndex = that.data.belongIndex;
    that.resetNavArgu();
    let catId = e.id;
    let keyword = e.keyword;
    let obj = {
      catId: catId,
      keyword: keyword
    };
    if (belongIndex) {//如果是首頁的
      that.setData({
        catId: catId,
        keyword: keyword,
        screenClick: false,//点了二级导航就不能先用筛选 避免延续之前的效果
      });
    } else {
      obj.adId = that.data.otherPageAdId;
      that.setData({
        otherPageCatId: catId,
        otherPageKeyword: keyword,
        screenClick: false,//点了二级导航就不能先用筛选 避免延续之前的效果
      });
    }

    app.util.request(app.api.getIndexShopsList, 'GET', obj).then((res) => {
      if (res && res.status == 1) {
        that.setData({
          shopLists: res.data.Rows
        });
        if (res.data.Rows.length < 1) {
          that.setData({
            loadingText: '没有商品'
          })
        }
        wx.hideLoading();
      } else {
        wx.hideLoading();
        wx.showToast({
          title: '获取失败',
          icon: 'none'
        })
      }
    }).catch((error) => {
      wx.hideLoading();
      wx.showToast({
        title: '获取失败',
        icon: 'none'
      })
    })

  },
  _condiNav: function (e) {
    wx.showLoading({
      title: '',
    })
    const that = this;

    that.setData({
      currPage: 1, //分页清0
    })
    let obj = e.currentTarget.dataset;

    let condiIndex = obj.id;//选中的是第几个

    let index = obj.id; //点击的是第几个
    //如果点击是销量或者价格，修改对应数据的select，0：位初始，1：up 2：down 切换样式
    if (index == 1 || index == 2) {
      let selectIndex = that.data.condiNavs[index].select;
      console.log(selectIndex)
      let arr = that.data.condiNavs;
      if (selectIndex == 0) {
        arr[index].select = 1;
        that.setData({
          condiNavs: arr
        })
      } else if (selectIndex == 1) {
        arr[index].select = 2;
        that.setData({
          condiNavs: arr
        })
      } else if (selectIndex == 2) {
        arr[index].select = 1;
        that.setData({
          condiNavs: arr
        })
      }
    };

    let condiNavs = that.data.condiNavs;
    //销量价格样式默认 如果是筛选则不清样式
    condiNavs.map((val, index) => {
      if (index != condiIndex) {
        condiNavs[index].select = 0;
      }
    })
    that.setData({
      condiNavIndex: condiIndex,
      condiNavs: condiNavs
    })
    let select = parseInt(that.data.condiNavs[index].select || 0);


    let catId = that.data.catId || '';
    let keyword = that.data.keyword || '';
    let argu = {};
    let belongIndex = that.data.belongIndex;
    //如果选取的是筛选
    if (condiIndex == 3) {
      if (belongIndex) {//首页数据操作
        let obj = {
          id: that.data.catId
        }
        app.util.request(app.api.goodsBrands, 'GET', obj).then((res) => {
          let arr = [];
          for (let n in res.data) {
            arr.push(res.data[n])
          };
          this.setData({
            screenBrandNavs: arr
          })
        }).catch((error) => {
          console.log(error)
        })
        that.setData({
          isScreen: false
        })
      } else {
        let id = that.data.otherPagecatId;
        if (id && id != '') {
          let obj = {
            id: id
          }
          app.util.request(app.api.goodsBrands, 'GET', obj).then((res) => {
            let arr = [];
            for (let n in res.data) {
              arr.push(res.data[n])
            };
            this.setData({
              screenBrandNavs: arr
            })
          }).catch((error) => {
            console.log(error)
          })
        }
        that.setData({
          isScreen: false
        })
      }

    } else {
      this.condiNavFindShops();
    }
    wx.hideLoading();



  },
  //加载商品底部列表
  getShopsList(currPage) {
    const that = this;
    let belongIndex = that.data.belongIndex;
    if (belongIndex) { //首页数据操作
      let shopLists = this.data.shopLists; //商品数据
      let condiIndex = this.data.condiNavIndex; //条件导航第几个被选中了
      //一级滑动导航
      let catId = that.data.catId || '';
      //二级关键字导航
      let keyword = that.data.keyword || '';
      let isFirstPage = this.data.isHidden; //false 首页第一个页面
      let url = "";
      let obj = {};
      //如果是第一个页面
      if (!isFirstPage) {
        url = app.api.indeShopLists + "?currPage=" + currPage
      } else {
        url = app.api.getIndexShopsList;
        let select = parseInt(that.data.condiNavs[condiIndex].select || 0); //是升序还是降序
        obj = {
          catId: catId,
          keyword: keyword
        }
        //如果用户点了筛选的话则需要加上筛选的过滤
        let screenClick = this.data.screenClick;
        if (screenClick) { //如果点了
          let brandId = this.data.screenBrandNavs[this.data.screenBrandNavIndex].brandId || '';
          let screenFirstNavIndex = this.data.screenFirstNavIndex;
          obj.brandId = brandId;
          if (this.data.lowerPrice) {
            obj.strPrice = this.data.lowerPrice
          }
          if (this.data.higherPrice) {
            obj.endPrice = this.data.higherPrice
          }
          switch (screenFirstNavIndex) { //筛选里面的第一级
            case 0:
              obj.isShop = 1;
              break;
            case 1:
              obj.isFree = 1;
              break;
            case 2:
              obj.isStock = 1;
              break;
            default:
              ;
          }
        };
        //三级条件导航  价格 销量
        switch (condiIndex) {
          case 0:
            break;
          case 1:
            obj.isSale = select
            break;
          case 2:
            obj.isPrice = select
            break;
          default:
            ;
        };
        obj.page = currPage;
      }
      //如果是第一个页面
      if (!isFirstPage) {
        app.util.request(url, 'GET', obj).then(function(data) {
          if (data.status && data.status == 1) {
            if (data.data && data.data.length > 0) {
              if (currPage == 1) {
                shopLists = [];
              } else {
                shopLists = shopLists.concat(data.data);
              }
              that.setData({
                shopLists: shopLists
              })
            } else {
              if (currPage == 1) {
                that.setData({
                  shopLists: [],
                  loadingText: '没有商品'
                })
              } else {
                that.setData({
                  shopLists: [],
                  loadingText: '全部加载完毕'
                })
              }

            }
          } else {}
        }).catch(function(err) {
          console.log('请求失败' + err)
        })
      } else { //如果是别的页面
        app.util.request(url, 'GET', obj).then(function(data) {
          if (data.status && data.status == 1) {
            if (data.data.Rows && data.data.Rows.length > 0) {
              console.log(data)
              if (currPage == 1) {
                shopLists = [];
                shopLists = data.data.Rows;
              } else {
                shopLists = shopLists.concat(data.data.Rows);
              }
              that.setData({
                shopLists: shopLists
              })
            } else {
              if (currPage == 1) {
                that.setData({
                  shopLists: [],
                  loadingText: '没有商品'
                })
              } else {
                that.setData({
                  loadingText: '全部加载完毕'
                })
              }
            }
          } else {}
        }).catch(function(err) {
          console.log('请求失败' + err)
        })
      }
    } else {
      let shopLists = this.data.shopLists; //商品数据
      let condiIndex = this.data.condiNavIndex; //条件导航第几个被选中了
      //一级滑动导航
      let catId = that.data.otherPagecatId || '';
      //二级关键字导航
      let keyword = that.data.otherPageKeyword || '';
      //广告Id
      let adId = that.data.otherPageAdId || '';
      let brandId = that.data.otherPageBrandId || '';
      console.log(brandId)
      let isFirstPage = this.data.isHidden; //false 首页第一个页面
      let url = "";
      let obj = {};
      url = app.api.getIndexShopsList;

      let select = parseInt( 0); //是升序还是降序
      obj = {
        catId: catId,
        keyword: keyword,
        adId: adId,
        brandId: brandId
      }
      //如果用户点了筛选的话则需要加上筛选的过滤
      let screenClick = this.data.screenClick;
      if (screenClick) { //如果点了
        if (this.data.screenBrandNavs.length > 0) {
          brandId = this.data.screenBrandNavs[this.data.screenBrandNavIndex].brandId || '';
        }
        let screenFirstNavIndex = this.data.screenFirstNavIndex;
        obj.brandId = brandId;
        if (this.data.lowerPrice) {
          obj.strPrice = this.data.lowerPrice
        }
        if (this.data.higherPrice) {
          obj.endPrice = this.data.higherPrice
        }
        switch (screenFirstNavIndex) { //筛选里面的第一级
          case 0:
            obj.isShop = 1;
            break;
          case 1:
            obj.isFree = 1;
            break;
          case 2:
            obj.isStock = 1;
            break;
          default:
            ;
        }
      };
      //三级条件导航  价格 销量
      switch (condiIndex) {
        case 0:
          break;
        case 1:
          obj.isSale = select
          break;
        case 2:
          obj.isPrice = select
          break;
        default:
          ;
      };
      obj.page = currPage;

      app.util.request(url, 'GET', obj).then(function(data) {
        if (data.status && data.status == 1) {
          if (data.data.Rows && data.data.Rows.length > 0) {
            console.log(data)
            if (currPage == 1) {
              shopLists = [];
              shopLists = data.data.Rows;
            } else {
              shopLists = shopLists.concat(data.data.Rows);
            }
            that.setData({
              shopLists: shopLists
            })
          } else {
            if (currPage == 1) {
              that.setData({
                shopLists: [],
                loadingText: '没有商品'
              })
            } else {
              that.setData({
                loadingText: '全部加载完毕'
              })
            }
          }
        } else {}
      }).catch(function(err) {
        console.log('请求失败' + err)
      })
    }
  },
  //条件导航 查询对应的商品列表
  condiNavFindShops() {
    const that = this;
    let belongIndex = that.data.belongIndex;
    if (belongIndex) {//首页数据操作
      let shopLists = this.data.shopLists;//商品数据
      let condiIndex = this.data.condiNavIndex;//条件导航第几个被选中了
      //一级滑动导航
      let catId = that.data.catId || '';
      //二级关键字导航
      let keyword = that.data.keyword || '';
      let isFirstPage = this.data.isHidden; //false 首页第一个页面
      let url = "";//请求连接
      let obj = {};//请求参数
      url = app.api.getIndexShopsList;
      let select = parseInt(that.data.condiNavs[condiIndex].select || 0);//是升序还是降序
      obj = {
        catId: catId,
        keyword: keyword
      }
      //如果用户点了筛选的话则需要加上筛选的过滤
      let screenClick = this.data.screenClick;
      if (screenClick) {//如果点了
        let brandId = '';
        if (this.data.screenBrandNavs.length > 0) {
          brandId = this.data.screenBrandNavs[this.data.screenBrandNavIndex].brandId || '';//品牌ID
        }
        let screenFirstNavIndex = this.data.screenFirstNavIndex;
        obj.brandId = brandId;
        if (this.data.lowerPrice) {
          obj.strPrice = this.data.lowerPrice
        }
        if (this.data.higherPrice) {
          obj.endPrice = this.data.higherPrice
        }
        switch (screenFirstNavIndex) { //筛选里面的第一级
          case 0:
            obj.isShop = 1;
            break;
          case 1:
            obj.isFree = 1;
            break;
          case 2:
            obj.isStock = 1;
            break;
          default: ;
        }
      };
      //三级条件导航  价格 销量
      switch (condiIndex) {
        case 0:
          break;
        case 1:
          obj.isSale = select
          break;
        case 2:
          obj.isPrice = select
          break;
        default: ;
      };
      obj.page = 1;
      app.util.request(url, 'GET', obj).then(function (res) {
        if (res.status && res.status == 1) {
          if (res.data.Rows && res.data.Rows.length > 0) {
            that.setData({
              shopLists: res.data.Rows
            })
          } else {
            that.setData({
              loadingText: '没有商品'
            })
          }
        }
      }).catch(function (err) {
        console.log('请求失败' + err)
      })
    } else {//别的页面传过来的  catId keyword adId
      let shopLists = this.data.shopLists;//商品数据
      let condiIndex = this.data.condiNavIndex;//条件导航第几个被选中了
      //一级滑动导航
      let catId = that.data.otherPagecatId || '';
      //二级关键字导航
      let keyword = that.data.otherPageKeyword || '';
      //广告
      let adId = that.data.otherPageAdId || '';
      let brandId = that.data.otherPageBrandId || '';
      let url = "";//请求连接
      let obj = {};//请求参数
      url = app.api.getIndexShopsList;
      let select = parseInt(that.data.condiNavs[condiIndex].select || 0);//是升序还是降序
      obj = {
        catId: catId,
        keyword: keyword,
        adId: adId,
        brandId: brandId
      }
      //如果用户点了筛选的话则需要加上筛选的过滤
      let screenClick = this.data.screenClick;
      if (screenClick) {//如果点了
        let brandId = '';
        if (this.data.screenBrandNavs.length > 0) {
          brandId = this.data.screenBrandNavs[this.data.screenBrandNavIndex].brandId || '';//品牌ID
        }
        let screenFirstNavIndex = this.data.screenFirstNavIndex;
        obj.brandId = brandId;
        if (this.data.lowerPrice) {
          obj.strPrice = this.data.lowerPrice
        }
        if (this.data.higherPrice) {
          obj.endPrice = this.data.higherPrice
        }
        switch (screenFirstNavIndex) { //筛选里面的第一级
          case 0:
            obj.isShop = 1;
            break;
          case 1:
            obj.isFree = 1;
            break;
          case 2:
            obj.isStock = 1;
            break;
          default: ;
        }
      };
      //三级条件导航  价格 销量
      switch (condiIndex) {
        case 0:
          break;
        case 1:
          obj.isSale = select
          break;
        case 2:
          obj.isPrice = select
          break;
        default: ;
      };
      obj.page = 1;
      app.util.request(url, 'GET', obj).then(function (res) {
        if (res.status && res.status == 1) {
          if (res.data.Rows && res.data.Rows.length > 0) {
            that.setData({
              shopLists: res.data.Rows
            })
          } else {
            that.setData({
              loadingText: '没有商品'
            })
          }
        }
      }).catch(function (err) {
        console.log('请求失败' + err)
      })
    }


  }, 
  /**
  * 组件的方法列表
  * 更新属性和数据的方法与更新页面数据的方法类似
  */
  //点击二级导航
  secondNavTwo: function (e) {
    let index = e.currentTarget.dataset.id;
    let keyword = e.currentTarget.dataset.keyword;
    let obj = {
      id: index,
      keyword: keyword
    }
    //触发条件导航点击事件给父组件
    this.secondNav(obj)
  },
  // 获取滚动条当前位置
  onPageScroll: function (e) {
    console.log(e)
    if (e.scrollTop > 100) {
      this.setData({
        floorstatus: true
      });
    } else {
      this.setData({
        floorstatus: false
      });
    }
  },

  //回到顶部
  goTop: function (e) {
    if (wx.pageScrollTo) {
      wx.pageScrollTo({
        scrollTop: 0
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
      })
    }
  },
})