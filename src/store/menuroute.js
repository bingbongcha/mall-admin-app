export default {
  namespaced: true,
  state: {
    route: false,
  },
  mutations: {
    CHANGE_ROUTE(state, payload) {
      state.route = payload;
    },
  },
  actions: {
    changeRoute({ commit }, payload) {
      commit('CHANGE_ROUTE', payload);
    },
  },
};
