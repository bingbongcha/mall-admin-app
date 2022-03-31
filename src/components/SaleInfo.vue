<template>
  <a-form-model
    ref="ruleForm"
    :model="form"
    :rules="rules"
    :label-col="{ span: 6 }"
    :wrapper-col="{ span: 12 }"
    class="saleinfo-container"
  >
    <a-form-model-item label="商品售价" prop="price" required>
      <a-input v-model="form.price" />
    </a-form-model-item>

    <a-form-model-item label="折扣价格" prop="price_off">
      <a-input v-model="form.price_off" />
    </a-form-model-item>

    <a-form-model-item label="商品库存" prop="inventory" required>
      <a-input v-model="form.inventory" />
    </a-form-model-item>

    <a-form-model-item label="计量单位" prop="unit" required>
      <a-input v-model="form.unit" />
    </a-form-model-item>
    <a-form-model-item label="商品相册">
      <a-upload
        :action="
          'http://mallapi.duyiedu.com/upload/images?appkey=' +
          $store.state.user.appkey
        "
        list-type="picture-card"
        :file-list="fileList"
        name="avatar"
        @preview="handlePreview"
        @change="handleChange"
      >
        <div v-if="fileList.length < 8">
          <a-icon type="plus" />
          <div class="ant-upload-text">Upload</div>
        </div>
      </a-upload>
    </a-form-model-item>
    <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
      <a-button @click="prev"> 上一步 </a-button>
      <a-button type="primary" style="margin-left: 10px" @click="next">
        {{ this.$route.params.id ? "修改" : "提交" }}
      </a-button>
    </a-form-model-item>
  </a-form-model>
</template>

<script>
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}
export default {
  props: ["form"],
  data() {
    return {
      fileList: [],
      rules: {
        price: {
          required: true,
          message: "请填写商品售价",
          trigger: "blur",
        },
        inventory: {
          required: true,
          message: "请填写商品库存",
          trigger: "blur",
        },
        unit: {
          required: true,
          message: "请填写计量单位",
          trigger: "blur",
        },
      },
      previewVisible: false,
      previewImage: "",
    };
  },
  created() {
    if (this.form.images.length > 0) {
      // 说明有商品相册，要回填
      this.fileList = this.form.images.map((item, index) => {
        return {
          uid: -index,
          name: `image${index}.png`,
          status: "done",
          url: item,
        };
      });
    }
  },
  methods: {
    prev() {
      this.$emit("prev");
    },
    next() {
      this.$emit("next", this.form);
    },
    handleCancel() {
      this.previewVisible = false;
    },
    async handlePreview(file) {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
      }
      this.previewImage = file.url || file.preview;
      this.previewVisible = true;
    },
    handleChange({ file, fileList }) {
      if (file.status === "done") {
        this.form.images.push(file.response.data.url);
      } else if (file.status === "removed") {
        let url = "";
        if (file.response) {
          url = file.response.data.url;
        } else {
          url = file.url;
        }
        this.form.images = this.form.images.filter((item) => item !== url);
      }
      this.fileList = fileList;
    },
  },
};
</script>

<style>
</style>