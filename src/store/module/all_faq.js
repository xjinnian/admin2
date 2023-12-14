import { api_faq } from "src/api/index.js";
import { markRaw } from "vue";
export default {
  // namespaced: true,
  state: {
    all_faq: [],
  },
  getters: {
    get_all_faq(state) {
      return state.all_faq;
    },
  },
  actions: {
    async set_all_faq({ commit }, params) {
      /**
       * 获取所有主题标签
       */

      const { data } = await api_faq.handle_read({
        currentPage: 1,
        pageSize: 1000,
        ...params,
      });
      let docs = data.docs || [];

      commit("set_all_faq", docs);
    },
  },
  mutations: {
    set_all_faq(state, all_faq) {
      state.all_faq = markRaw(all_faq);
    },
  },
};
