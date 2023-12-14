<!--
 *
 * @LastEditTime: 2023-10-27 18:41:02
 * @Description    :
-->
<template>
  <q-card class="my-card mw70vw q-px-md w70vw" style="">
    <q-card-section class="no-padding">
      <div class="row">
        <div class="text-weight-bolder lh40">
          {{ md_detail_obj.id ? "编辑" : "新建" }}数据
        </div>

        <q-space />
        <q-btn flat round icon="close" v-close-popup />
      </div>
    </q-card-section>
    <q-separator />
    <q-card class="my-card" style="display: block; overflow: hidden">
      <q-card-section class="q-py-md q-gutter-y-md dialog-card-content-2">
        <div class="row">
          <div class="w120 form-item-label">
            内容 <span class="text-red">*</span>
          </div>
          <v-md-editor v-model="md_str" height="auto"></v-md-editor>
        </div>
        <!-- <div class="row" v-if="false">
          <div class="w120 form-item-label">状态</div>
          <q-select class="col" filled dense emit-value map-options :options="$config.options_status" v-model="editing_obj.state" />
        </div>
        <div class="row" v-if="false">
          <div class="w120 form-item-label">关联文档<span class="text-red">*</span></div>
          <q-select class="col" label="关联文档" filled dense emit-value map-options :options="get_all_documdent" option-label="name_zh" option-value="id" v-model="editing_obj.document" />
        </div>
        <div class="row" v-if="false">
          <div class="w120 form-item-label">语言<span class="text-red">*</span></div>
          <q-select class="col" label="语言" filled dense emit-value map-options :options="all_lan" option-label="name" option-value="value" v-model="editing_obj.language" />
        </div> -->
      </q-card-section>
      <q-separator />
      <q-card-actions align="right">
        <q-btn color="primary" @click="handle_conform_edit" label="确定" />
        <q-btn
          v-close-popup
          color="deep-orange"
          glossy
          @click="handle_cancel_edit"
          label="取消"
        />
      </q-card-actions>
    </q-card>
  </q-card>
</template>
<script>
import { ref } from "vue";
import { api_b_sdk_mddocpool as api_namespace, api_file } from "src/api/index";

import { mapActions, mapGetters } from "vuex";
export default {
  mixins: [],
  emits: ["md_edit_close"],
  data() {
    return {
      //API 命名空间
      api_namespace,
      editorRef: ref(null),
      files: [],
      editing_obj: {},
      md_str: "",
      temp_obj: {
        language: "",
        document: "",
        state: -1,
      },
    };
  },
  props: {
    //md 文档对象
    md_detail_obj: {},
    //文章对象
    doc_detail_obj: {},
  },
  created() {
    console.error("md_detail_obj--", this.md_detail_obj);
    console.error("doc_detail_obj--", this.doc_detail_obj);

    if (this.md_detail_obj.id) {
      this.handle_get_md_content();
    }
  },
  computed: {
    ...mapGetters(["get_user"]),
  },

  methods: {
    async handle_get_md_content() {
      // this.md_path
      let url = this.$config.get_cdn_url(this.md_detail_obj.path)
      let res = await api_file.handle_read_md_file({}, url);
      let { code, data } = res;
      this.md_str = data + '';
    },

    handle_conform_edit() {
      var file = new File([this.md_str], "新生成的文件.md", {
        // type: "text/plain",
        type: "application/octet-stream",
      });
      this.handle_upload([file], "新生成的文件.md");
    },

    /**
     * 文件上传
     * @param {*} files
     */
    async handle_upload(files = [], file_name) {
      console.log("this.files----", this.files);
      let len = files.length;
      if (len == 0) {
        return false;
      }
      let form = new FormData();
      for (let i = 0; i < len; i++) {
        form.append("files[]", files[i]);
      }
      form.set("other", 1);
      let res = await api_file.handle_upload(form);
      form = null;
      console.log(res.data);
      let { code, data, msg, success } = res.data;

      let obj = data[file_name];

      this.$emit("md_edit_close", {
        md_name: obj.save_name,
        path: obj.save_filepath,
      });
    },
    //通用内容 文件 更新
    async handle_content_files_update(value) {
      console.log(" //中文内容 文件 更新");
      console.log(value);
      let name = value.name;
      if (!name) {
        return false;
      }
      let data = await this.handle_upload([value]);

      if (!data) {
        this.$q.notify("上传文件出错");
        return false;
      }

      console.log(data);
      let path = data[name]["save_filepath"];
      let url = this.$config.get_cdn_url(path);

      this.show_url = url;
    },
  },
};
</script>
<style lang="scss" scoped></style>
