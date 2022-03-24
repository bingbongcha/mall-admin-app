<template>
  <div class="login-container">
    <a-form-model
      class="login-form"
      ref="loginForm"
      :model="loginForm"
      :rules="rules"
      v-bind="layout"
    >
      <a-form-model-item has-feedback label="邮箱" prop="email">
        <a-input v-model="loginForm.email" />
      </a-form-model-item>
      <a-form-model-item has-feedback label="密码" prop="password">
        <a-input
          v-model="loginForm.password"
          type="password"
          autocomplete="off"
        />
      </a-form-model-item>

      <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
        <a-button type="primary" @click="submitForm('loginForm')">
          提交
        </a-button>
        <a-button style="margin-left: 10px" @click="resetForm('loginForm')">
          重置
        </a-button>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>

<script>
import loginApi from '@/api/login';

export default {
  data() {
    const validateEmail = (rule, value, callback) => {
      const reg = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;
      if (value === '') {
        callback(new Error('邮箱不能为空'));
      } else if (!reg.test(value)) {
        callback('邮箱格式不正确');
      } else {
        callback();
      }
    };
    const validatePassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('密码不能为空'));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        email: '',
        password: '',
      },
      rules: {
        email: [{ validator: validateEmail, trigger: 'blur' }],
        password: [{ validator: validatePassword, trigger: 'blur' }],
      },
      layout: {
        labelCol: { span: 6 },
        wrapperCol: { span: 14 },
      },
    };
  },
  methods: {
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    submitForm() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          loginApi.login(this.loginForm).then(() => {
            this.$router.push({
              name: 'Home',
            });
          }).catch((error) => this.$message.error(error));
        } else {
          this.$message.error('请完善信息');
        }
      });
    },
  },
};
</script>
<style scoped lang="less">
@import "~@/assets/css/login.less";
</style>
