import { api_docpool, api_b_sdk_docpool } from "src/api/index.js";
import { markRaw } from "vue";
export default {
  // namespaced: true,
  state: {
    all_documdent: [],
    all_documdent_obj: {},
    all_b_sdk_documdent: [],
    all_b_sdk_documdent_obj: {},
  },
  getters: {
    get_all_documdent(state) {
      return state.all_documdent;
    },
    get_all_documdent_obj(state) {
      return state.all_documdent_obj;
    },
    get_all_b_sdk_documdent(state) {
      return state.all_b_sdk_documdent;
    },
    get_all_b_sdk_documdent_obj(state) {
      return state.all_b_sdk_documdent_obj;
    },
  },
  actions: {
    async set_all_documdent({ commit }) {
      /**
       * 获取所有主题标签
       */

      let params = {
        currentPage: 1,
        pageSize: 1000,
      };
      let res = await api_docpool.handle_read(params);

      let { code, msg, data } = res.data;
      let docs = data.docs || [];

      commit("set_all_documdent", docs);
    },
    async set_all_b_sdk_documdent({ commit }) {
      /**
       * 获取所有主题标签
       */

      let params = {
        currentPage: 1,
        pageSize: 1000,
      };
      let res = await api_b_sdk_docpool.handle_read(params);

      let { code, msg, data } = res.data;
      let docs = data.docs || [];

      commit("set_all_b_sdk_documdent", docs);
    },
  },
  mutations: {
    set_all_documdent(state, all_documdent) {
      let all_documdent_obj = {};
      all_documdent.map((x) => {
        all_documdent_obj[`k_${x.id}`] = x;
      });

      state.all_documdent = markRaw(all_documdent);
      state.all_documdent_obj = markRaw(all_documdent_obj);
    },
    set_all_b_sdk_documdent(state, all_b_sdk_documdent) {
      let all_b_sdk_documdent_obj = {};
      all_b_sdk_documdent.map((x) => {
        all_b_sdk_documdent_obj[`k_${x.id}`] = x;
      });

      state.all_b_sdk_documdent = markRaw(all_b_sdk_documdent);
      state.all_b_sdk_documdent_obj = markRaw(all_b_sdk_documdent_obj);
    },
  },
};
