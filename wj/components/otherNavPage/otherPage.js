Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  /**
   * 组件的属性列表
   * 用于组件自定义设置
   */
  properties: {
    //banner图和导航
    bannerLists: {
      type: Array,
      value: [],

    },
    //二级导航
    secondNav: {
      type: Array
    },
    //轮播商品
    shopLists: {
      type: Array
    },
    loadingText:{
      type:String
    },
    condiNavs:{
      type:Array
    },
    condiNavIndex:{
      type:Number
    }
  },

  /**
   * 私有数据,组件的初始数据
   * 可用于模版渲染
   */
  data: {
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    sales:false,
    toggleLength:false,
  },

  /**
   * 组件的方法列表
   * 更新属性和数据的方法与更新页面数据的方法类似
   */
  methods: {

    /*
    * 内部私有方法建议以下划线开头
    * triggerEvent 用于触发事件
    */
    _cancelEvent() {
      //触发取消回调
      this.triggerEvent("cancelEvent")
    },
    _confirmEvent() {
      //触发成功回调
      this.triggerEvent("confirmEvent");
    },
    //触发条件导航点击事件 并且修改对应的样式图标
    _condiNav(e){
      let index = e.currentTarget.dataset.id
      let obj={
        index:index
      }
      //触发条件导航点击事件给父组件
      this.triggerEvent("condiNav",obj);
    },
    //点击切换二级导航隐藏显示部分
    toggleLength:function(){
      this.setData({
        toggleLength: !this.data.toggleLength
      })
    },
    //点击二级导航
    secondNav:function(e){
      let index = e.currentTarget.dataset.id;
      let keyword = e.currentTarget.dataset.keyword;
      let obj = {
        id: index,
        keyword: keyword
      }
      //触发条件导航点击事件给父组件
      this.triggerEvent("secondNav", obj);
    }
  }
})