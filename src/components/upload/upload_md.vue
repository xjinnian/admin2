<template>
  <div class="br4 row q-gutter-x-md upload-file" style="">
    <div class="ralative-position w160 h30">
      <q-file class="absolute w160 h30" style="z-index: 6" flat dense @update:model-value="handle_content_files_update">
        <template v-slot:file="{ index, file }"> </template>
      </q-file>
      <q-btn color="primary" class="absolute w160 h40" style="z-index: 3">
        上传MD文件</q-btn>
    </div>
    <!-- <MdMakeTool/> -->
    <div v-if="file_path">
      <q-btn class="w160 h40" color="primary" label="下载最新的MD文件" @click="handle_download_md_file" />
    </div>
  </div>
</template>
<script>
import { api_file } from "src/api/index";

import MdMakeTool from "src/components/upload/md_make_tool.vue";
export default {
  components: {
    MdMakeTool,
  },
  emits: ["emit-file-path"],
  data() {
    return {};
  },
  props: {
    // 当前上传文件的 内容对应的 表单 key
    key_str: {
      type: String,
      default: "",
      require: true,
    },
    file_path: {
      type: String || undefined,
      default: "",
      require: false,
    },
  },
  created() { },
  methods: {
    /**
     * 文件上传
     * @param {*} files
     */
    async handle_upload(files = []) {
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
      let { code, data, msg, success } = res.data;
      if (success) {
        return data;
      } else {
        return "";
      }
    },
    //通用内容 文件 更新
    async handle_content_files_update(value) {
      let name = value.name;
      if (!name) {
        return false;
      }
      let data = await this.handle_upload([value]);

      if (!data) {
        this.$q.notify("上传文件出错");
        return false;
      }

      let path = data[name]["save_filepath"];

      this.$emit("emit-file-path", {
        key: this.key_str,
        name,
        md_name: data[name]["save_name"],
        path,
      });
    },

    /**
     * 下载md 文档
     */
    handle_download_md_file() {
      let url = this.$config.get_cdn_url(this.file_path)
      let filename = this.file_path.substring(this.file_path.lastIndexOf("/"));
      let aLink = document.createElement("a");

      aLink.style.display = "none";
      aLink.setAttribute("target", "_blank");
      aLink.setAttribute("download", url);
      aLink.setAttribute("href", url);

      document.body.appendChild(aLink);
      aLink.click();
      document.body.removeChild(aLink);
    },
  },
};
</script>
<style lang="scss" scoped>
.upload-file>div {
  margin-bottom: 10px;
}
</style>
