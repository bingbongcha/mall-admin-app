<template>
  <div class="home-container">
    <LeftMenu :key="key" />
    <div
      class="main-app"
      :class="{ collapsed: $store.state.operation.collapse }"
    >
      <NavBar />
      <RouterView />
    </div>
  </div>
</template>

<script>
import LeftMenu from './components/menu.vue';
import NavBar from './components/navBar.vue';

export default {
  data() {
    return {
      key: new Date().getTime(),
    };
  },
  watch: {
    $route() {
      this.key = new Date().getTime();
    },
  },
  components: {
    LeftMenu,
    NavBar,
  },
};
</script>
<style lang="less">
@import "~@/assets/css/home.less";
</style>
