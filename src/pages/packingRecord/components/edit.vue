<!--
 * @Date           : 2023-04-09 14:41:22
 * @FilePath       : /client-api-doc-admin/src/pages/packingRecord/components/edit.vue
 * @description    :
-->
<template>
  <q-card class="my-card mw50vw q-px-md w50vw">
    <q-card-section class="no-padding">
      <div class="row">
        <div class="text-weight-bolder lh40">
          {{ editing_obj.id ? "编辑" : "新建" }}数据
        </div>
        <q-space />
        <q-btn flat round icon="close" v-close-popup />
      </div>
    </q-card-section>
    <q-separator />
    <q-card-section class="q-py-md q-gutter-y-md">
      <div class="row">
        <div class="w120 form-item-label">布局模板</div>
        <q-input class="col" filled dense v-model="editing_obj.project" />
      </div>

      <div class="row">
        <div class="w120 form-item-label">用户名字</div>
        <q-input class="col" filled dense v-model="editing_obj.username" />
      </div>
      <div class="row">
        <div class="w120 form-item-label">版本号</div>
        <q-input class="col" filled dense v-model="editing_obj.version" />
      </div>
      <div class="row">
        <div class="w120 form-item-label">打包类型</div>
        <q-input class="col" filled dense v-model="editing_obj.type" />
      </div>
      <div class="row">
        <div class="w120 form-item-label">文件名字</div>
        <q-input class="col" filled dense v-model="editing_obj.file_name" />
      </div>
      <div class="row">
        <div class="w120 form-item-label">文件地址</div>
        <q-input class="col" filled dense v-model="editing_obj.file_path" />
      </div>

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

export default {
  emits: ["emit-edit"],
  data() {
    return {
      editorRef: ref(null),
      files: [],
      editing_obj: {},
      temp_obj: {
        project: "",
        username: "",
        version: "",
        type: "",
        file_name: "",
        file_path: "",
        mark: "",
      },
    };
  },
  props: {
    detail_obj: {},
  },
  created() {
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
    /**
     * 确定 提交更改
     *
     */
    handle_conform_edit() {
      let { id, project, username, version, type, file_name, file_path, mark } =
        this.editing_obj;
      let final_obj = {
        id,
        project,
        username,
        version,
        type,
        file_name,
        file_path,
        mark,
      };
      if (!name) {
        this.$q.notify({
          type: "negative",
          message: "名字必填",
        });
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
