import { api_keyGroup, api_layoutTemplate } from "src/api/index.js";

const key_type = {
  css: 1,
  js: 2,
  layout: 3,
  component: 4,
  theme: 5,
  i18n: 6,
  assets: 7,
};

export default {
  // namespaced: true,
  state: {
    all_layout: [],
    all_keygroup: [],
    all_keygroup_css: [],
    all_keygroup_js: [],
    all_keygroup_assets: [],
  },
  getters: {
    get_all_layout(state) {
      return state.all_layout;
    },
    get_all_keygroup(state) {
      return state.all_keygroup;
    },

    get_all_keygroup_css(state) {
      return state.all_keygroup_css;
    },
    get_all_keygroup_js(state) {
      return state.all_keygroup_js;
    },
    get_all_keygroup_assets(state) {
      return state.all_keygroup_assets;
    },
  },
  actions: {
    async set_all_layout({ commit }) {
      let params = {
        currentPage: 1,
        pageSize: 1000,
      };

      let { data } = await api_layoutTemplate.handle_read(params);
      let docs = data?.data.docs || [];

      commit("set_all_layout", docs);
    },

    async set_all_keygroup({ commit }) {
      let params = {
        currentPage: 1,
        pageSize: 1000,
      };

      let { data } = await api_keyGroup.handle_read(params);
      let docs = data?.data.docs || [];

      let project_obj = {
        k_1: "	亚洲版 H5（旧版）",
        k_2: "	亚洲版 PC（旧版）",
        k_3: "	亚洲版 H5（新版）",
        k_4: "	亚洲版 PC（新版）",
      };

      const show_name = (val) => (val["names"] || {})["zh_cn"];
      const show_project = (val) => project_obj[`k_${val["project"]}`] || "";
      const show_type = (val) => ({ 1: "css", 2: "js", 3: "assets" }[val.type]);

      docs.map((x) => {
        x.show_type = show_type(x);
        x.show_project = show_project(x);
        x.show_name = show_name(x);

        x.show_label = `${x.show_project} -- ${x.show_type} -- ${x.show_name}`;
      });

      commit("set_all_keygroup", docs);
    },
  },
  mutations: {
    set_all_keygroup(state, all_keygroup) {
      state.all_keygroup = all_keygroup;
      const store_map = { 1: "css", 2: "js", 3: "assets" };

      state.all_keygroup = [];
      state.all_keygroup_css = [];
      state.all_keygroup_js = [];
      state.all_keygroup_assets = [];

      for (const item of all_keygroup) {
        state["all_keygroup_" + store_map[item.type]]?.push(item);
      }
      console.log(state.all_keygroup_assets);
    },
    set_all_layout(state, all_layout) {
      state.all_layout = all_layout;
    },
  },
};
