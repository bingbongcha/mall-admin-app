<template>
  <div class="menu-list menu-container">
    <a-menu
      :default-selected-keys="[
        $router.currentRoute.matched[1]
          ? $router.currentRoute.matched[1].name
          : '',
      ]"
      :default-open-keys="[$router.currentRoute.matched[0].name]"
      mode="inline"
      theme="dark"
      :inline-collapsed="$store.state.operation.collapse"
    >
      <template v-for="r in $store.state.menuroute.route">
        <a-sub-menu v-if="!r.meta.hidden" :key="r.name">
          <span slot="title"
            ><a-icon :type="r.meta.icon" /><span>{{ r.meta.title }}</span></span
          >
          <a-menu-item v-for="c in r.children" :key="c.name">
            <RouterLink :to="{ name: c.name }">
              <a-icon :type="c.meta.icon" />{{ c.meta.title }}
            </RouterLink>
          </a-menu-item>
        </a-sub-menu>
      </template>
    </a-menu>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>
