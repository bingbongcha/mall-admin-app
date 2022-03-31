<template>
  <div class="productlist-container">
    <Search :data="categoryList" @submit="handleSearchSubmit" />
    <a-button type="primary" class="product-add-btn">
      <router-link :to="{ name: 'ProductAdd' }">添加商品</router-link>
    </a-button>
    <Table
      :data="tableData"
      :page="page"
      @change="handleChange"
      @removeProduct="handleRemoveProduct"
    />
  </div>
</template>

<script>
import Search from "@/components/Search.vue";
import { getAllCategory } from "@/api/category";
import Table from "@/components/Table.vue";
import { getProducts, delOneProduct } from "@/api/product";

export default {
  data() {
    return {
      tableData: [],
      categoryList: [],
      searchForm: {},
      page: {
        current: 1, // 当前页
        pageSize: 10, // 每页显示多少条数据
        showSizeChanger: true, // 要不要有换数据量插件
        total: 1, // 总数据量
      },
      categoryMap: {},
    };
  },
  created() {
    getAllCategory()
      .then((res) => {
        this.categoryList = res.data;
        res.data.forEach((item) => {
          this.categoryMap[item.id] = item;
        });
      })
      .then(() => {
        this.fetchTable();
      });
  },
  methods: {
    fetchTable() {
      getProducts({
        page: this.page.current,
        size: this.page.pageSize,
        ...this.searchForm,
      }).then((res) => {
        this.page.total = res.total;
        this.tableData = res.data.map((item) => {
          return {
            ...item,
            categoryName: this.categoryMap[item.category]
              ? this.categoryMap[item.category].name
              : "",
          };
        });
      });
    },
    handleSearchSubmit(form) {
      this.searchForm = form;
      this.fetchTable();
    },
    handleChange(changeInfo) {
      this.page = changeInfo;
      this.fetchTable();
    },
    handleRemoveProduct(record) {
      this.$confirm({
        title: "确认删除",
        content: () => (
          <div style="color:red;">{`确认删除标题为:${record.title}的商品吗`}</div>
        ),
        onOk: () => {
          delOneProduct({ id: record.id }).then(() => {
            this.fetchTable();
          });
        },
        onCancel() {},
        class: "confirm-box",
      });
    },
  },
  components: {
    Search,
    Table,
  },
};
</script>

<style lang="less">
.productlist-container {
  position: relative;
  .product-add-btn {
    position: absolute;
    right: 10px;
    top: 24px;
  }
}
</style>
