/* eslint-disable */
import Vue from 'vue';
import VCharts from 'v-charts';
import App from './App.vue';
import router from './router';
import store from './store';
import './plugins/ant-design-vue';
import '@/assets/css/reset.css';
// 下面是为了解决控制台提示
import 'default-passive-events'

Vue.config.productionTip = false;
store.dispatch("user/whoAmI")
Vue.use(VCharts)
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
