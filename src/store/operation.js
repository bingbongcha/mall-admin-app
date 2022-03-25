export default {
  namespaced: true,
  state: {
    collapse: false,
  },
  mutations: {
    changeCollapse(state) {
      state.collapse = !state.collapse;
    },
  },
};
