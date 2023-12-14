import { api_language } from "src/api/index.js";
import { markRaw } from "vue";
export default {
  // namespaced: true,
  state: {
    all_language: [],
    all_language_obj: {},
  },
  getters: {
    get_all_language(state) {
      return state.all_language;
    },
    get_all_language_obj(state) {
      return state.all_language_obj;
    },
  },
  actions: {
    async set_all_language({ commit }) {
      /**
       * 获取所有主题标签
       */
      let params = {
        currentPage: 1,
        pageSize: 1000,
      };
      let res = await api_language.handle_read(params);
      let { code, msg, data } = res.data;
      let docs = data.docs || [];
      commit("set_all_language", docs);
    },
  },
  mutations: {
    set_all_language(state, all_language) {
      let all_language_obj = {};
      all_language.map((x) => {
        x.name = `${x.name_zh}   ---   ${x.name_en}`;
        all_language_obj[x.value] = x;
      });
      all_language.sort((a, b) => a.order - b.order);
      state.all_language = markRaw(all_language);
      state.all_language_obj = markRaw(all_language_obj);
    },
  },
};
