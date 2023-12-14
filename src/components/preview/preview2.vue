<!--
 * @FilePath: /client-api-doc-admin/src/components/preview/preview2.vue
 * @Description:
-->
<template>
  <q-card class="my-card mw70vw q-px-md w70vw dialog-card">
    <q-card-section class="no-padding">
      <div class="row">
        <div class="text-weight-bolder lh40">预览数据</div>
        <q-space />
        <q-btn flat round icon="close" v-close-popup />
      </div>
    </q-card-section>
    <q-separator />
    <q-card-section class="q-py-md q-gutter-y-md">
      <q-separator />
      <div class="pb30 dialog-card-content">
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
import { api_file } from "src/api/index";
import Markdown from "vue3-markdown-it";
export default {
  components: {
    Markdown,
  },
  data() {
    return {
      activetab: 1,
      // show_html: true,
      show_md: true,
      md_path: "",
      html_str: "",
      title_str: "",
      md_str: "#",
      topic: [],
      info_obj: {},
    };
  },
  props: {
    detail_obj: {
      type: Object,
      default: () => {},
    },
    handle_info: {
      type: Function,
      default: Promise.resolve(),
    },
  },
  computed: {
    ...mapGetters(["get_questionTopic"]),
  },
  created() {
    console.error("this.detail_obj-", this.detail_obj);
    if (this.detail_obj.id) {
      this.handle_get_md_content();
    }
  },
  methods: {
    async handle_get_md_content() {
      // this.md_path
      let url = this.$config.get_cdn_url(this.detail_obj.path)
      console.error(" let url = this.detail_obj.path;", url);
      let res = await api_file.handle_read_md_file({}, url);
      let { code, data } = res;
      console.error(res);
      this.md_str = data + '';
    },
  },
};
</script>

<style lang="scss" scoped></style>
