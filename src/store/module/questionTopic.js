import { api_questionTopic } from "src/api/index.js";
export default {
  // namespaced: true,
  state: {
    questionTopic: [],
    questionTopic_obj: {},
  },
  getters: {
    get_questionTopic(state) {
      return state.questionTopic;
    },
    get_questionTopic_obj(state) {
      return state.questionTopic_obj;
    },
  },
  actions: {
    async set_questionTopic({ commit }) {
      /**
       * 获取所有主题标签
       */

      let params = {
        currentPage: 1,
        pageSize: 1000,
      };
      let res = await api_questionTopic.handle_read(params);

      let { code, msg, data } = res.data;
      let docs = data.docs || [];

      commit("set_questionTopic", docs);
    },
  },
  mutations: {
    set_questionTopic(state, questionTopic) {
      //假定当前系统用户语言为 中文
      // 提取中文语言作为 通用名字显示
      let questionTopic_obj = {};
      questionTopic.map((x) => {
        x["show_name"] = (x.names || {})["zh_cn"] + (x.names || {})["en_gb"];
        questionTopic_obj[`k_${x.sid}`] = x;
      });

      state.questionTopic = questionTopic;
      state.questionTopic_obj = questionTopic_obj;
    },
  },
};
