import Vue from 'vue';
import Vuex from 'vuex';
import operation from './operation';
import user from './user';
import menuroute from './menuroute';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    operation,
    user,
    menuroute,
  },
});
