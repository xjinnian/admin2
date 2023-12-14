<template>
  <q-card class="my-card mw50vw q-px-md w50vw">
    <q-card-section class="no-padding">
      <div class="row">
        <div class="text-weight-bolder lh40">打包设置</div>
        <q-space />
        <q-btn flat round icon="close" v-close-popup />
      </div>
    </q-card-section>
    <q-separator />
    <q-card-section class="q-py-md q-gutter-y-md">
      <div class="row">
        <div class="w120 form-item-label">布局模板</div>
        <q-select
          class="col"
          filled
          dense
          emit-value
          map-options
          :options="$config.options_client_project"
          v-model="editing_obj.project"
        />
      </div>
      <div class="row">
        <div class="w120 form-item-label">环境</div>
        <q-select
          filled
          clearable
          v-model="editing_obj.env"
          :options="$config.options_pack_up"
          class="col"
          dense
          emit-value
          map-options
        />
      </div>
      <!-- //打包类型 1 全量配置文件 2 用户差异化配置文件， 3.前端代码打包zip 下载 4     js sdk -->
      <div class="row">
        <div class="w120 form-item-label">构建类型</div>
        <div class="q-gutter-sm">
          <q-checkbox
            v-model="editing_obj.puck_up_type"
            label="全量配置文件"
            val="1"
          />
          <q-checkbox
            v-model="editing_obj.puck_up_type"
            label="用户差异化配置文件"
            val="2"
          />
          <q-checkbox
            v-model="editing_obj.puck_up_type"
            label="前端代码打包zip"
            val="3"
          />
          <q-checkbox
            v-model="editing_obj.puck_up_type"
            label="js sdk"
            val="4"
          />
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
import { api_packingRecord } from "src/api/index.js";
export default {
  emits: ["emit-edit"],
  data() {
    return {
      editorRef: ref(null),
      files: [],
      editing_obj: {},
      temp_obj: {
        project: 1,
        puck_up_type: [],
        mark: "",
        env:"shiwan"
      },
    };
  },
  props: {
    detail_obj: {},
  },
  created() {
    if (this.detail_obj.id) {
      this.editing_obj = Object.assign(this.$lodash.cloneDeep(this.temp_obj));
    } else {
      this.editing_obj = this.$lodash.cloneDeep(this.temp_obj);
    }
  },
  methods: {
    /**
     * 确定 提交更改
     *
     */
    async handle_conform_edit() {
      let { project, puck_up_type, mark ,env} = this.editing_obj;
      let { username, version } = this.detail_obj;
      let final_obj = {
        username,
        version,
        project,
        type: puck_up_type.join(",") || "2",
        mark,
        env
      };
      this.$utils.remove_false_key(final_obj);
      await api_packingRecord.handle_create(final_obj);
      this.$emit("emit-edit");
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
