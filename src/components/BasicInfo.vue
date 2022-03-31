<template>
  <a-form-model
    ref="ruleForm"
    :model="form"
    :rules="rules"
    :label-col="{ span: 6 }"
    :wrapper-col="{ span: 12 }"
    class="basicinfo-container"
  >
    <a-form-model-item label="标题" prop="title" required>
      <a-input v-model="form.title" />
    </a-form-model-item>

    <a-form-model-item label="商品描述" prop="desc">
      <a-input v-model="form.desc" />
    </a-form-model-item>

    <a-form-model-item label="商品类目" required prop="category">
      <a-select v-model="form.category" @change="handleCategoryChange">
        <a-select-option :value="c.id" v-for="c in categoryList" :key="c._id"
          >{{ c.name }}
        </a-select-option>
      </a-select>
      <a-select v-model="form.c_items" placeholder="请添加子类目">
        <a-select-option :value="c" v-for="c in subCategoryList" :key="c"
          >{{ c }}
        </a-select-option>
      </a-select>
    </a-form-model-item>

    <a-form-model-item label="商品标签" prop="tags" required>
      <a-select
        mode="tags"
        placeholder="请填写标签，例如：七天无理由退换货"
        v-model="form.tags"
      >
        <a-select-option key="包邮，最晚次日达">
          包邮，最晚次日达
        </a-select-option>
      </a-select>
    </a-form-model-item>

    <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
      <a-button type="primary" @click="next"> 下一步 </a-button>
    </a-form-model-item>
  </a-form-model>
</template>
<script>
export default {
  props: ["categoryList","form"],
  data() {
    return {
      rules: {
        title: {
          required: true,
          message: "请填写标题",
          trigger: "blur",
        },
        category: {
          required: true,
          message: "请选择类目",
          trigger: "blur",
        },
        tags: {
          required: true,
          message: "请填写标签",
          trigger: "blur",
        },
      },
      subCategoryList: [],
    };
  },
  methods: {
    next() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.$emit("next",this.form)
        } else {
          this.$message.error("请完善基本信息")
          return false;
        }
      });
      return true;
    },
    handleCategoryChange(id) {
      this.form.category = id;
      this.categoryList.forEach((item) => {
        if (item.id === id) {
          this.subCategoryList = item.c_items;
        }
      });
    },
  },
};
</script>
