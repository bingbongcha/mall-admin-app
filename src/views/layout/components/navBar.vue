<template>
  <div class="navbar">
        <a-button type="primary" @click="toggleCollapsed">
          <a-icon :type="$store.state.operation.collapsed ? 'menu-unfold' : 'menu-fold'" />
        </a-button>

        <!-- 面包屑 -->
        <div class="breadcrumb">
          <a-breadcrumb>
            <a-breadcrumb-item>Home</a-breadcrumb-item>
            <a-breadcrumb-item
              ><a href="">Application Center</a></a-breadcrumb-item
            >
            <a-breadcrumb-item
              ><a href="">Application List</a></a-breadcrumb-item
            >
            <a-breadcrumb-item>An Application</a-breadcrumb-item>
          </a-breadcrumb>
        </div>

        <!-- 用户操作 -->
        <ul class="userinfo">
          <li>{{$store.state.user.username}}</li>
          <li @click="handleLoginOut">退出</li>
        </ul>
      </div>
</template>

<script>
export default {
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
