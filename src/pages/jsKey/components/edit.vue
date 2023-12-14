<!--
 * @Date           : 2023-04-09 14:41:22
 * @FilePath: /client-api-doc-admin/src/pages/jsKey/components/edit.vue
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
        <div class="w120 form-item-label">键名</div>
        <q-input class="col" filled dense v-model="editing_obj.key" />
      </div>

      <div class="row">
        <div class="w120 form-item-label">布局模板</div>
        <q-select
          class="col"
          filled
          dense
          emit-value
          map-options
          option-label="name"
          option-value="value"
          :options="get_all_layout"
          v-model="editing_obj.project"
          @update:model-value="editing_obj.group_id = undefined"
        />
      </div>

      <div class="row">
        <div class="w120 form-item-label">级别/类型</div>
        <q-select class="col" filled dense emit-value map-options :options="$config.options_js_level"
          v-model="editing_obj.level"
          @update:model-value="editing_obj.group_id = undefined"
        />
      </div>

      <div class="row">
        <div class="w120 form-item-label">属性组</div>
        <q-select filled clearable v-model="editing_obj.group_id" class="col" dense emit-value map-options
        :options="filter_attribuits_options" />
      </div>

      <div class="row">
        <div class="w120 form-item-label">状态</div>
        <q-select class="col" filled dense emit-value map-options :options="$config.options_status"
          v-model="editing_obj.status" />
      </div>

      <div class="row">
        <div class="w120 form-item-label">是否能自定义</div>
        <q-select filled clearable v-model="editing_obj.custom" class="col" dense emit-value map-options :options="[
          { label: '是', value: 1 },
          { label: '否', value: -1 },
        ]" />
      </div>
      <div class="row">
        <div class="w120 form-item-label">值类型</div>
        <q-select filled v-model="editing_obj.values_type" class="col" dense emit-value map-options
          :options="['string', 'number', 'boolean']" />
      </div>
      <div class="row">
        <div class="w120 form-item-label">默认值</div>
        <q-input class="col" filled dense v-model="editing_obj.value" />
      </div>

      <div class="row" v-if="editing_obj.values_type !== 'boolean'">
        <div class="w120 form-item-label">可选值</div>

        <div class="col q-gutter-y-md">
          <div class="row" v-for="(item, index) in all_values" :key="index">
            <q-input class="col" filled dense v-model="all_values[index]" />
            <div class="q-gutter-x-md q-pl-md">
              <q-btn color="primary" @click="handle_add_value" label="增加" />
              <q-btn :disable="index == 0" color="deep-orange" glossy @click="handle_delete_value(index)" label="删除" />
            </div>
          </div>
        </div>
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
import { mapGetters } from "vuex";
import MulitLansInput from "src/components/mulit_lans_input/mulit_lans_input.vue";
export default {
  emits: ["emit-edit"],
  components: {
    MulitLansInput,
  },
  data() {
    return {
      editorRef: ref(null),
      files: [],
      editing_obj: {},

      temp_obj: {
        key: "",
        group: "",
        project: "",
        group_id: "",
        status: "",
        descriptions: {},
        value: "",
        values_type: 'string',
        custom: -1,
        values: [],
        mark: "",
      },
      //所有可选值
      all_values: [""],
    };
  },
  props: ['detail_obj','attribuits_options','attribuits_map'] ,

  computed: {
    ...mapGetters(["get_all_layout","get_all_language"]),
    // 布局模版 和 级别类型 获取对应的 属性组列表
    filter_attribuits_options(){
      const { attribuits_options,editing_obj } = this;
      // console.log(this.attribuits_options);
      const { project='',level='' } = editing_obj
      const filter_list = attribuits_options.filter((v)=>v.project==project && v.level==level)
      // console.log(filter_list);
      return filter_list
    },
  },
  watch: {

  },
  created() {
    if (this.detail_obj.id) {
      this.editing_obj = Object.assign(
        this.$lodash.cloneDeep(this.temp_obj),
        this.$lodash.cloneDeep(this.detail_obj)
      );
      this.all_values = this.detail_obj.values;

    } else {
      this.editing_obj = this.$lodash.cloneDeep(this.temp_obj);
    }

  },
  methods: {

    handle_descriptions_lan_change(obj) {
      let { lan, value } = obj;
      this.editing_obj["descriptions"][lan] = value;
    },
    /**
     * 确定 提交更改
     *
     */
    handle_conform_edit() {
      let {
        id,
        key,
        group,
        group_id,
        project,
        status,
        descriptions,
        values_type,
        value,
        custom,
        mark,
        level
      } = this.editing_obj;

      let final_obj = {
        id,
        key,
        group,
        group_id,
        project,
        status,
        descriptions,
        values_type,
        value,
        custom,
        values: this.all_values.filter(Boolean),
        mark,
        level
      };
      // if (!name) {
      //   this.$q.notify({
      //     type: "negative",
      //     message: "名字必填",
      //   });
      // }
      this.$utils.remove_false_key(final_obj);
      this.$emit("emit-edit", final_obj);
    },
    /**
     * 取消  取消更改
     *
     */
    handle_cancel_edit() { },

    /**
     * 增加可选值
     */
    handle_add_value() {
      this.all_values.push("");
    },
    /**
     * 删除可选值
     */

    handle_delete_value(index) {
      this.all_values.splice(index, 1);
    },
  },
};
</script>
<style lang="scss" scoped></style>
