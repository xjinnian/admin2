export default {
  // namespaced: true,
  state: {
    template: "",
  },
  getters: {
    get_template(state) {
      return state.template;
    },
  },
  actions: {
    set_template({ commit }, template) {
      commit("set_template", template);
    },
  },
  mutations: {
    set_template(state, template) {
      state.template = template;
    },
  },
};
