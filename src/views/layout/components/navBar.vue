<template>
  <div class="navbar">
        <a-button type="primary" @click="toggleCollapsed">
          <a-icon :type="$store.state.collapsed ? 'menu-unfold' : 'menu-fold'" />
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
          <li>欢迎xxx</li>
          <li>退出</li>
        </ul>
      </div>
</template>

<script>
export default {
  methods: {
    toggleCollapsed() {
      this.$store.commit('changeCollapse');
    },
  },
};
</script>

<style>

</style>
