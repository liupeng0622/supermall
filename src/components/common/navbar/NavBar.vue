<template>
  <div class="nav-bar">
    <!-- tabbar左右页面都一样，只有一个，所以可以用id -->
    <!-- navbar每个页面不一样，id会重复，用class -->
    <div class="left">
      <slot name="left"></slot>
    </div>
    <div class="center">
      <slot name="center"></slot>
    </div>
    <div class="right">
      <slot name="right"></slot>
    </div>
    <!-- slot要进行布局。但是不要在slot里直接添加class。 -->
    <!-- 因为slot被vue编译后，会出现各种各样的问题。用div把slot包起来。 -->
  </div>
</template>

<script>
export default {};
</script>

<style>
.nav-bar {
  display: flex;
  line-height: 44px;
  height: 44px;
  box-shadow: 0 1px 1px rgba(100, 100, 100, 0.1);
}

.left,
.right {
  width: 60px;
}

.center {
  flex: 1;
  /* 其他部分有确定宽度，没有宽度的只剩一个 */
  /* flex: 1 就会把剩余部分占满 */
  text-align: center;
}
</style>