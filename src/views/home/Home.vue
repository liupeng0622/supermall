<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control
      :titles="['流行','新款','精选']"
      @tabClick="tabClick"
      ref="tabControl1"
      class="tab-control"
      v-show="isTabFixed"
    ></tab-control>
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="contentScroll"
      :pull-up-load="true"
      @pullingUp="loadMore"
    >
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view></feature-view>
      <tab-control :titles="['流行','新款','精选']" @tabClick="tabClick" ref="tabControl2"></tab-control>
      <goods-list :goods="showGoods"></goods-list>
    </scroll>
    <!-- 组件不能直接监听点击，button、div等元素可以直接监听 -->
    <!-- .native 监听组件根元素的原生事件 -->
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
// 子组件放到一块
import HomeSwiper from "./childComps/HomeSwiper";
import RecommendView from "./childComps/RecommendView";
import FeatureView from "./childComps/FeatureView";

// 公共的组件放到一块
import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/content/tabControl/TabControl";
import GoodsList from "components/content/goods/GoodsList";
import Scroll from "components/common/scroll/Scroll";
import BackTop from "components/content/backTop/BackTop";

// 一些方法，放到一块
// 用default导出的，导入时才可以不加大括号{}
import { getHomeMultidata, getHomeGoods } from "network/home";
import { debounce } from "common/utils.js";

export default {
  name: "Home",
  components: {
    HomeSwiper,
    RecommendView,
    FeatureView,

    NavBar,
    TabControl,
    GoodsList,
    Scroll,
    BackTop
  },
  data() {
    return {
      // result: null
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] }
      },
      currentType: "pop",
      isShowBackTop: false,
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY: 0
    };
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    }
  },
  destroyed() {
    console.log("home destroyed");
  },
  activated() {
    this.$refs.scroll.scrollTo(0, this.saveY, 0);
    this.$refs.scroll.refresh();
    console.log("进来");
  },
  deactivated() {
    console.log("出去");

    this.saveY = this.$refs.scroll.getScrollY();
  },
  // 在组件创建好的时候发送请求，调用生命周期函数
  created() {
    // 1.请求多个数据
    this.getHomeMultidata();
    // 2.请求商品数据
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },

  mounted() {
    // 1. 监听图片加载完成
    const refresh = debounce(this.$refs.scroll.refresh, 10);
    this.$bus.$on("itemImageLoad", () => {
      // this.$refs.scroll.refresh();
      refresh();
    });

    // 2. tabControl 吸顶，获取offsetTop
    // 所有组件都有一个属性 $el，用于获取组件中的元素
    this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
    console.log(this.$refs.tabControl2.$el.offsetTop);
  },

  methods: {
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
      }
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },

    backClick() {
      // 先拿到scroll组件，再拿到组件的scroll属性，再调用属性的scrollTo方法
      this.$refs.scroll.scrollTo(0, 0);
    },

    contentScroll(position) {
      // 1. 判断 BackTop 是否显示
      // this.isShowBackTop = -position.y > 1000 ? true : false;
      this.isShowBackTop = -position.y > 1000;

      // 2. 决定 tabControl 是否吸顶（position: fixed）
      this.isTabFixed = -position.y > this.tabOffsetTop;
    },

    loadMore() {
      this.getHomeGoods(this.currentType);
    },

    swiperImageLoad() {
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
    },

    // 网络请求相关方法
    getHomeMultidata() {
      // 1.请求多个数据。既包含轮播图的数据，也包含小圆圈的数据
      getHomeMultidata().then(res => {
        // console.log(res);
        // console.log(this);
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
        // 把变量保存起来
        // 箭头函数的this向上找作用域，找到created的this
        // created的this，就是当前的组件对象
        this.result = res;
      });
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, 1).then(res => {
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;
        this.$refs.scroll.finishPullUp();
      });
    }
  }
};
</script>

<style scoped>
#home {
  position: relative;
  /* padding-top: 44px; */
  height: 100vh;
}

.home-nav {
  background-color: var(--color-tint);
  color: #fff;
  /* position: fixed; */
  /* left: 0; */
  /* right: 0; */
  /* top: 0; */
  /* z-index: 9; */
}

.content {
  /* 减号两边加空格 */
  /* height: calc(100% - 93px); */
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}

.tab-control {
  position: relative;
  z-index: 9;
}
</style>
