<template>
  <div class="productadd-container">
    <a-steps :current="current" class="productadd-steps">
      <a-step v-for="item in steps" :key="item.title" :title="item.title" />
    </a-steps>
    <div class="steps-content">
      <BasicInfo
        v-if="current === 0"
        :categoryList="categoryList"
        :form="form"
        @next="next"
      />
      <SaleInfo
        v-else-if="current === 1"
        :form="form"
        @next="next"
        @prev="prev"
      />
    </div>
  </div>
</template>

<script>
import BasicInfo from "@/components/BasicInfo.vue";
import SaleInfo from "@/components/SaleInfo.vue";
import { getAllCategory } from "@/api/category";
import { addProduct, getOneProduct, editProduct } from "@/api/product";
export default {
  data() {
    return {
      form: {
        title: "",
        desc: "",
        category: "",
        c_items: [],
        tags: [],
        price: "",
        price_off: "",
        unit: "",
        inventory: 0,
        images: [],
      },
      categoryList: [],
      current: 0,
      steps: [
        {
          title: "填写商品基本信息",
        },
        {
          title: "填写商品销售信息",
        },
      ],
    };
  },
  created() {
    this.fetchCategory();
    const { id } = this.$route.params;
    if (id) {
      getOneProduct(parseInt(id)).then((res) => {
        this.form = { ...res };
      });
    }
  },
  methods: {
    fetchCategory() {
      getAllCategory().then((res) => {
        this.categoryList = res.data;
      });
    },
    next(form) {
      this.form = {
        ...this.form,
        ...form,
      };
      if (this.current === 1) {
        const { id } = this.$route.params;
        if (id) {
          // 说明是新增产品
          editProduct(this.form).then(()=>{
            this.$message.success("修改成功");
            this.$router.push({ name: "ProductList" });
          })
        } else {
          addProduct(this.form).then(() => {
            this.$message.success("新增成功");
            this.$router.push({ name: "ProductList" });
          });
        }
      } else {
        this.current += 1;
      }
    },
    prev() {
      this.current -= 1;
    },
  },
  components: {
    BasicInfo,
    SaleInfo,
  },
};
</script>

<style lang="less" scoped>
.productadd-container {
  .productadd-steps {
    width: 50%;
    margin: 20px auto;
  }
  .steps-content {
    margin-top: 16px;
    border: 1px dashed #e9e9e9;
    border-radius: 6px;
    background-color: #fafafa;
    min-height: 200px;
    text-align: center;
    padding-top: 80px;
  }
  .steps-action {
    margin-top: 24px;
  }
}
</style>
