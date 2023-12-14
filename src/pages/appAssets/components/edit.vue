<template>
  <q-card class="my-card mw50vw q-px-md w50vw">
    <q-card-section class="no-padding">
      <div class="row">
        <div class="text-weight-bolder lh40">
          上传
          <!-- {{ editing_obj.id ? "编辑" : "新建" }}数据 -->
        </div>
        <q-space />
        <q-btn flat round icon="close" v-close-popup />
      </div>
    </q-card-section>
    <q-separator />
    <q-card-section class="q-py-md q-gutter-y-md">
      <input type="file" @change="selectFolder" webkitdirectory />

      <div class="row">
        <div class="w120 form-item-label">备注</div>
        <q-input
          class="col"
          filled
          dense
          type="textarea"
          v-model="editing_obj.mark"
        />
      </div>
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
</template>
<script>
import { ref } from "vue";
import { api_appAssets } from "src/api/index.js";
// const { v4: uuid } = require("uuid");
function get_uid() {
  // return uuid().replace(/-/gi, "");
}
export default {
  emits: ["emit-edit"],
  data() {
    return {
      editorRef: ref(null),
      files: [],
      editing_obj: {},
      temp_obj: {
        name: "",
        password: "",
        mark: "",
        project: 1,
        roleId: undefined,
      },
      role_list: [],
    };
  },
  props: {
    detail_obj: {},
  },
  created() {
    // this.get_role_list()
    if (this.detail_obj.id) {
      this.editing_obj = Object.assign(
        this.$lodash.cloneDeep(this.temp_obj),
        this.$lodash.cloneDeep(this.detail_obj)
      );
    } else {
      this.editing_obj = this.$lodash.cloneDeep(this.temp_obj);
    }
  },
  methods: {
    /*
      获取oss列表
    */
    async get_role_list() {
      const { data } = await api_appAssets.handle_read();
      const docs = data?.data?.docs || [];
      this.role_list = docs;
      console.log(data);
    },
    /**
     * 选择文件夹
     */
    async selectFolder(e) {
      let files = e.target.files;
      console.log(files);
      const promises = [];
      const oss_res = [];
      const filter_arr = [...files].filter((file) =>
        file.type.includes("image/")
      );

      const formData = filter_arr.reduce((pre,next)=>{
        pre.append(`${next.webkitRelativePath}`,next)
        return pre
      }, new FormData())
      console.log(formData.keys());
      console.log(formData.values());
      await api_appAssets.handle_create(formData);
      return
      for (let i = 0; i < filter_arr.length; i++) {
        try {
          const file = filter_arr[i];

          const path = file.webkitRelativePath; // 文件路径  a/b/c
          const name = file.name; // 文件名字
          const uid = get_uid()

          const formData = new FormData();
          formData.append("file", file);
          // const oss_obj = await api_appAssets.handle_upload_oss(formData);

          // 模拟数据
          const oss_obj = { data:uid }

          const final_obj = {
            path,
            name,
            uid,
            url: oss_obj?.data?.filePath,
          }

          oss_res.push(final_obj);
          await api_appAssets.handle_create(final_obj);

        } catch (err) {
          console.error(err);
        }
      }
      console.log(oss_res);
      this.$emit('emit-edit',oss_res)
    },
    async upload_oss(formData) {},
    /**
     * 确定 提交更改
     *
     */
    handle_conform_edit() {
      let { id, name, password, mark, project, roleId } = this.editing_obj;
      let final_obj = {
        id,
        name,
        password,
        mark,
        project,
        roleId,
      };
      if (!name) {
        this.$q.notify({
          type: "negative",
          message: "名字必填",
        });
        return;
      }
      this.$utils.remove_false_key(final_obj);
      this.$emit("emit-edit", final_obj);
    },
    /**
     * 取消  取消更改
     *
     */
    handle_cancel_edit() {},
  },
};
</script>
<style lang="scss" scoped></style>
