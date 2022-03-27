<template>
  <div class="navbar">
    <a-button type="primary" @click="toggleCollapsed">
      <a-icon
        :type="$store.state.operation.collapsed ? 'menu-unfold' : 'menu-fold'"
      />
    </a-button>

    <!-- 面包屑 -->
    <div class="breadcrumb">
      <a-breadcrumb v-if="currentRoute.length > 1">
        <a-breadcrumb-item>{{
          currentRoute[0] ? currentRoute[0].meta.title : ""
        }}</a-breadcrumb-item>
        <a-breadcrumb-item
          ><a href="">{{
            currentRoute[1] ? currentRoute[1].meta.title : ""
          }}</a></a-breadcrumb-item
        >
      </a-breadcrumb>
    </div>

    <!-- 用户操作 -->
    <ul class="userinfo">
      <li>{{ $store.state.user.username }}</li>
      <li @click="handleLoginOut">退出</li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentRoute: this.$router.currentRoute.matched,
    };
  },
  watch: {
    $route() {
      this.currentRoute = this.$router.currentRoute.matched;
    },
  },
  methods: {
    toggleCollapsed() {
      this.$store.commit('operation/changeCollapse');
    },
    handleLoginOut() {
      this.$store.dispatch('user/loginOut').then(() => {
        this.$router.push('/login');
      });
    },
  },
};
</script>

<style>
</style>
