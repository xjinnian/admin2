<!--
 * @Date           : 2023-04-09 14:41:22
 * @FilePath: /client-api-doc-admin/src/pages/keyGroup/components/edit.vue
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
        <div class="w120 form-item-label">属性组名字</div>
        <MulitLansInput class="col" @lan_change="handle_names_lan_change" :detail_obj="editing_obj['names']" />
      </div>

      <div class="row">
        <div class="w120 form-item-label">属性组键</div>
        <q-input class="col" filled dense v-model="editing_obj.key" :disable="detail_obj.id" />
      </div>
      <div class="row">
        <div class="w120 form-item-label">布局模板</div>
        <q-select class="col" filled dense emit-value map-options :options="$config.options_client_project"
          v-model="editing_obj.project" />
      </div>
      <div class="row">
        <div class="w120 form-item-label">键类型</div>
        <q-select class="col" filled dense emit-value map-options :options="$config.options_client_type"
          v-model="editing_obj.key_type" />
      </div>
      <!-- // css 级别 -->
      <div class="row" v-if="editing_obj.key_type == KEY_TYPE_CSS_KEY">
        <div class="w120 form-item-label">css级别/类型</div>
        <q-select class="col" filled dense emit-value map-options :options="$config.options_css_level"
          v-model="editing_obj.level" />
      </div>
      <!-- js 级别 -->
      <div class="row" v-if="editing_obj.key_type == KEY_TYPE_JS_KEY">
        <div class="w120 form-item-label">js级别/类型</div>
        <q-select class="col" filled dense emit-value map-options :options="$config.options_js_level"
          v-model="editing_obj.level" />
      </div>
      <!-- assets 级别 -->
      <div class="row" v-if="editing_obj.key_type == KEY_TYPE_ASSETS_KEY">
        <div class="w120 form-item-label">assets级别/类型</div>
        <q-select class="col" filled dense emit-value map-options :options="$config.options_asset_level"
          v-model="editing_obj.level" />
      </div>
      <div class="row">
        <div class="w120 form-item-label">状态</div>
        <q-select class="col" filled dense emit-value map-options :options="$config.options_status"
          v-model="editing_obj.status" />
      </div>

      <div class="row">
        <div class="w120 form-item-label">描述</div>
        <MulitLansInput class="col" @lan_change="handle_descriptions_lan_change"
          :detail_obj="editing_obj['descriptions']" />
      </div>

      <div class="row">
        <div class="w120 form-item-label">备注</div>
        <q-input class="col" filled dense type="textarea" v-model="editing_obj.mark" />
      </div>
    </q-card-section>
    <q-separator />
    <q-card-actions align="right">
      <q-btn color="primary" @click="handle_conform_edit" label="确定" />
      <q-btn v-close-popup color="deep-orange" glossy @click="handle_cancel_edit" label="取消" />
    </q-card-actions>
  </q-card>
</template>
<script>
import { ref } from "vue";
import MulitLansInput from "src/components/mulit_lans_input/mulit_lans_input.vue";
import { KEY_TYPE_ASSETS_KEY, KEY_TYPE_CSS_KEY, KEY_TYPE_JS_KEY } from "src/config/key_type";
export default {
  emits: ["emit-edit"],
  components: {
    MulitLansInput,
  },
  data() {
    return {
      KEY_TYPE_ASSETS_KEY,
      KEY_TYPE_CSS_KEY,
      KEY_TYPE_JS_KEY,
      editorRef: ref(null),
      files: [],
      editing_obj: {},
      temp_obj: {
        names: {},
        project: "",
        key_type: 1,
        status: "",
        descriptions: {},
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
    handle_names_lan_change(obj) {
      let { lan, value } = obj;
      this.editing_obj["names"][lan] = value;
    },
    handle_descriptions_lan_change(obj) {
      let { lan, value } = obj;
      this.editing_obj["descriptions"][lan] = value;
    },
    /**
     * 确定 提交更改
     *
     */
    handle_conform_edit() {
      let { names, project, key_type, status, descriptions, mark, id, key, level } =
        this.editing_obj;
      let final_obj = {
        names,
        project,
        key_type,
        status,
        descriptions,
        mark,
        id,
        key,
        level
      };

      this.$utils.remove_false_key(final_obj);
      this.$emit("emit-edit", final_obj);
    },
    /**
     * 取消  取消更改
     *
     */
    handle_cancel_edit() { },
  },
};
</script>
<style lang="scss" scoped></style>
