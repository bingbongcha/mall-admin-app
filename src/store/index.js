import Vue from 'vue';
import Vuex from 'vuex';
import operation from './operation';
import user from './user';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    operation,
    user,
  },
});
