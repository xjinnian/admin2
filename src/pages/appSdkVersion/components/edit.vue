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
        <div class="w120 form-item-label">名字</div>
        <q-input class="col" filled dense v-model="editing_obj.name" />
      </div>

      <div class="row">
        <div class="w120 form-item-label">版本号</div>
        <q-input class="col" filled dense v-model="editing_obj.version" />
      </div>
      <div class="row">
        <div class="w120 form-item-label">环境</div>
        <q-input class="col" filled dense v-model="editing_obj.env" />
      </div>
      <div class="row">
        <div class="w120 form-item-label">正式/测试</div>
        <q-select
          class="col"
          filled
          emit-value
          map-options
          option-label="label"
          option-value="value"
          dense
          v-model="editing_obj.status"
          :options="option_status"
        />
      </div>
      <div class="row">
        <div class="w120 form-item-label">类型</div>
        <q-select
          class="col"
          filled
          emit-value
          map-options
          option-label="label"
          option-value="value"
          dense
          v-model="editing_obj.type"
          :options="option_type"
        />
      </div>
      <div class="row">
        <div class="w120 form-item-label">文件</div>

        <UploadOther
          @emit-file-path="handle_file_emit_upload_file_path"
          key_str="path"
        />

        <div class="q-mx-md" v-if="editing_obj.filename">
          {{ editing_obj.filename }}
        </div>
        <div class="q-mx-md" v-else>
          <div>格式： zip 或者apk </div>
          <div>备注： 带宽原因，上传较慢，上传完会显示文件名字</div>
           </div>
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

import UploadOther from "src/components/upload/upload_other.vue";
import MulitLansInput from "src/components/mulit_lans_input/mulit_lans_input.vue";
import { option_type ,option_status} from  "../config/index.js"
export default {
  components: {
    MulitLansInput,
    UploadOther,
  },
  emits: ["emit-edit"],
  data() {
    return {
      editorRef: ref(null),
      files: [],
      editing_obj: {},
      temp_obj: {
        name: "",
        version: "",
        status: -1,
        type: 1,
        env:""
      },
      option_status ,
      option_type ,
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
    handle_file_emit_upload_file_path(obj) {
      console.error("obj-----", obj);
      this.editing_obj.path = obj.path.save_filepath;
      this.editing_obj.filename = obj.name;
      this.editing_obj.size = obj.size;
    },

    /**
     * 确定 提交更改
     *
     */
    handle_conform_edit() {
      let { id, name, mark, version, status, filename, type, path ,env,size } =
        this.editing_obj;
      let final_obj = {
        id,
        name,
        mark,
        version,
        status,
        filename,
        type,
        path,
        env,
        size
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
