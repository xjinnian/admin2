import { api_menu,api_b_sdk_menu } from "src/api/index.js";
export default {
  // namespaced: true,
  state: {
    all_menu: [],
    all_b_sdk_menu: [],
  },
  getters: {
    get_all_menu(state) {
      return state.all_menu;
    },
    get_all_b_sdk_menu(state) {
      return state.b_sdk_all_menu;
    },
  },
  actions: {
    async set_all_menu({ commit }) {
      /**
       * 获取所有主题标签
       */

      let params = {
        currentPage: 1,
        pageSize: 1000,
      };
      let res = await api_menu.handle_read(params);

      let { code, msg, data } = res.data;
      let docs = data.docs || [];

      commit("set_all_menu", docs);
    },
    async set_all_b_sdk_menu({ commit }) {
      /**
       * 获取所有主题标签
       */

      let params = {
        currentPage: 1,
        pageSize: 1000,
      };
      let res = await api_b_sdk_menu.handle_read(params);

      let { code, msg, data } = res.data;
      let docs = data.docs || [];

      commit("set_all_b_sdk_menu", docs);
    },
  },
  mutations: {
    set_all_menu(state, all_menu) {
      state.all_menu = all_menu;
    },
    set_all_b_sdk_menu(state, all_b_sdk_menu) {
      state.all_b_sdk_menu = all_b_sdk_menu;
    },
  },
};
