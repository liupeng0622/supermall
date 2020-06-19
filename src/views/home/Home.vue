<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <home-swiper :banners="banners"></home-swiper>
    <recommend-view :recommends="recommends"></recommend-view>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import HomeSwiper from "./childComps/HomeSwiper";
import RecommendView from "./childComps/RecommendView";
// 用default导出的，导入时才可以不加大括号{}
import { getHomeMultidata } from "network/home";

export default {
  name: "Home",
  components: {
    NavBar,
    HomeSwiper,
    RecommendView
  },
  data() {
    return {
      // result: null
      banners: [],
      recommends: []
    };
  },
  // 在组件创建好的时候发送请求，调用生命周期函数
  created() {
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
  }
};
</script>

<style scoped>
.home-nav {
  background-color: var(--color-tint);
  color: #fff;
}
</style>
