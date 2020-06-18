<template>
  <div id="app">
    <!-- <h2>老袁工</h2> -->
    <!-- <img src="~assets/img/common/20200618.jpg" style="width: 800px" /> -->
    <router-view></router-view>
    <main-tab-bar></main-tab-bar>
  </div>
</template>

<script>
// import MainTabBar from "components/content/MainTabBar/MainTabBar";
import MainTabBar from "components/content/mainTabbar/MainTabBar";

export default {
  name: "App",
  components: {
    MainTabBar
  }
};
</script>

<style>
@import "assets/css/base.css";
</style>
