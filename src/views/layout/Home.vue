<template>
  <div class="home-container">
    <LeftMenu />
    <div class="main-app" :class="{ collapsed: $store.state.collapse }">
        <NavBar />
        <RouterView />
    </div>
  </div>
</template>

<script>
import LeftMenu from './components/menu.vue';
import NavBar from './components/navBar.vue';

export default {
  components: {
    LeftMenu,
    NavBar,
  },
};
</script>
<style lang="less">
@import "~@/assets/css/home.less";
</style>
