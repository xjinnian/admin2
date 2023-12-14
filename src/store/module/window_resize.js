export default {
  // namespaced: true,
  state: {
    window_size_change: 0,
    window_size: {},
  },
  getters: {
    get_window_size(state) {
      return state.window_size;
    },
    get_window_size_change(state) {
      return state.window_size_change;
    },
  },
  actions: {
    set_window_size({ commit }, window_size) {
      commit("set_window_size", window_size);
    },
  },
  mutations: {
    set_window_size(state, window_size) {
      state.window_size = window_size;
      state.window_size_change = new Date().getTime();
    },
  },
};
