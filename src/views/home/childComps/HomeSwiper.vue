<template></template>

<script>
export default {
  name: "HomeSwiper",
  props: {
    banners: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      isLoad: false
    };
  },
  components: {},
  methods: {}
};
</script>

<style scoped>
</style>
