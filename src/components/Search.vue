<template>
  <a-form-model
    class="form"
    layout="inline"
    :model="loginForm"
    @submit="handleSubmit"
    @submit.native.prevent
  >
    <a-form-model-item label="检索关键字">
      <a-input v-model="loginForm.searchWord" placeholder="请输入关键字">
      </a-input>
    </a-form-model-item>
    <a-form-model-item label="商品类目">
      <a-select
        :allowClear="true"
        style="width: 120px"
        @change="handleChange"
        placeholder="请选择"
      >
        <a-select-option v-for="c in data" :key="c._id" :value="c.id">
          {{ c.name }}
        </a-select-option>
      </a-select>
    </a-form-model-item>
    <a-form-model-item>
      <a-button type="primary" html-type="submit"> 搜索 </a-button>
    </a-form-model-item>
  </a-form-model>
</template>
<script>
export default {
  props: ['data'],
  data() {
    return {
      loginForm: {
        searchWord: '',
        category: '',
      },
    };
  },
  methods: {
    handleSubmit() {
      this.$emit('submit', this.loginForm);
    },
    handleChange(value) {
      this.loginForm.category = value;
    },
  },
};
</script>
<style scoped lang="less">
.form {
  padding: 20px 10px;
}
</style>
