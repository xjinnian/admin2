<template>
  <q-card class="my-card mw70vw q-px-md w70vw dialog-card">
    <q-card-section class="no-padding">
      <div class="row">
        <div class="text-weight-bolder lh40">预览数据</div>
        <q-space />
        <q-btn flat round icon="close" v-close-popup />
      </div>
      <q-separator />
    </q-card-section>
    <q-card-section class="dialog-card-content">
      <div class="row">
        <!-- @click="handle_lan_tab_click(item)" -->
        <q-tabs
          @update:model-value="handle_lan_tab_click"
          v-model="current_lan_tab"
          class="text-teal justify-left"
          active-class="text-black bg-teal-2"
        >
          <q-tab
            v-for="(item, index) in get_all_language"
            :key="index"
            :name="item.value"
          >
            <div class="text-left">
              <div>{{ item.name_zh }}</div>
              <div>{{ item.name_en }}</div>
              <div>
                语言：{{
                  detail_obj["mulit_language"][item.value] == 1 ? "开" : "--"
                }}
              </div>
              <div>文档：{{ all_lan_md_obj[item.value] ? "开" : "--" }}</div>
            </div>
          </q-tab>
        </q-tabs>
      </div>
      <div class="pb30">
        <div class="text-center fz30 fw600 my30">
          {{ title_str }}
        </div>
        <!-- 主题 -->
        <div class="row text-center justify-center q-gutter-x-lg my20">
          <div>标签：</div>
          <div v-for="(item, index) in topic" :key="index">
            {{ item }}
          </div>
        </div>
        <div></div>
        <div v-if="show_html" v-html="html_str"></div>
        <div v-if="show_md">
          <Markdown :source="md_str" class="wy" />
        </div>
      </div>
    </q-card-section>
    <q-separator />
  </q-card>
</template>
<script>
import { mapGetters } from "vuex";
import { api_file, api_b_sdk_mddocpool } from "src/api/index";
import Markdown from "vue3-markdown-it";
export default {
  components: {
    Markdown,
  },
  data() {
    return {
      current_lan_tab: "zh_cn",
      activetab: 1,
      show_html: false,
      show_md: true,
      md_path: "",
      html_str: "",
      title_str: "",
      md_str: "#",
      topic: [],
      info_obj: {},
      //所有语言开启状态的md 文档对象
      all_lan_md_obj: {},
    };
  },
  props: {
    detail_obj: {},
    handle_info: {
      type: Function,
      default: Promise.resolve(),
    },
  },
  computed: {
    ...mapGetters(["get_questionTopic", "get_all_language"]),
  },
  created() {
    this.get_all_language_kaiqi_md();
  },
  methods: {
    /**
     * 获取当前文档的 所有语言的开启的  md
     */
    get_all_language_kaiqi_md() {
      let params = {
        document: this.detail_obj.id,
        currentPage: 1,
        pageSize: 1000,
        status: 1,
      };
      api_b_sdk_mddocpool.handle_read(params).then((res) => {
        let { code, data, msg } = res.data;
        this.rebuild_md_data(data.docs);
      });
    },
    /**
     * 加工 返回的 md 文档数据
     */
    rebuild_md_data(arr = []) {
      let obj = {};
      arr.map((x) => {
        obj[x.language] = x;
      });
      this.all_lan_md_obj = obj;
      this.handle_get_md_content();
    },
    /**
     * 单种语言的   语种 tab 按钮点击
     * @param {*} item
     */
    handle_lan_tab_click(lan_val) {
      // console.error("handle_lan_tab_click-", lan_val);
      this.current_lan_tab = lan_val;
      this.handle_get_md_content();
    },
    /**
     * 读取md 文档内容
     */
    async handle_get_md_content() {
      console.error("this.all_lan_md_obj-", this.all_lan_md_obj);
      console.error("this.current_lan_tab-", this.current_lan_tab);
      let path = (this.all_lan_md_obj[this.current_lan_tab] || {})["path"];
      if (!path) {
        this.md_str = "# 暂无配置  No configuration  ";
        return;
      }
      // this.md_path
      let url = this.$config.get_cdn_url(path)
      console.log(url);
      let res = await api_file.handle_read_md_file({}, url);
      let { code, data } = res;
      // console.log(data);
      this.md_str = data + '';
    },
  },
};
</script>
<style lang="scss" scoped></style>
