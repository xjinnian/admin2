<template>
  <q-card class="my-card mw50vw q-px-md w50vw">
    <q-card-section class="no-padding">
      <div class="row">
        <div class="text-weight-bolder lh50">
          {{ editing_obj.id ? "编辑" : "新建" }}数据
        </div>
        <q-space />
        <div>
          <h5 v-if="editing_obj.key">资源变量键名：{{ editing_obj.key }}</h5>
          <h5 v-if="editing_obj.id">{{ `ID: ${editing_obj.id}` }}</h5>
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
        <div class="w120 form-item-label">资源类型</div>
        <q-select class="col" filled dense emit-value map-options :options="$config.options_asset_level"
          v-model="editing_obj.level" />
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
        <div class="w120 form-item-label">默认值</div>
        <div class="row">
          <UploadImg @emit-file-path="(data) => handle_file_emit_upload_file_path(data, 'value')" />
          <img v-if="editing_obj.value" :src="$config.get_cdn_url(editing_obj.value) " height="40" class="thumbnail_image q-ml-md" />
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
import UploadImg from "src/components/upload/upload_img.vue";

export default {
  emits: ["emit-edit"],
  components: {
    MulitLansInput,
    UploadImg,
  },
  data() {
    return {
      editorRef: ref(null),
      files: [],
      editing_obj: {},

      temp_obj: {
        key: "",
        group: "",
        group_id: "",
        project: "",
        level: '',

        status: 1,
        value: "",

        descriptions: {},
        mark: "",
      },
    };
  },
  props: ['detail_obj','attribuits_options','attribuits_map'] ,

  computed: {
    ...mapGetters(["get_all_layout","get_all_language"]),
       // 布局模版 和 级别类型 获取对应的 属性组列表
    filter_attribuits_options(){
      const { attribuits_options,editing_obj } = this;
      const { project='',level='' } = editing_obj
      const filter_list = attribuits_options.filter((v)=>v.project==project && v.level==level)
      console.log(filter_list);
      return filter_list
    }
  },
  watch: {

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
    handle_file_emit_upload_file_path(obj, key) {
      this.editing_obj[key] = obj.path.save_filepath;
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
      let {
        key,
        group,
        project,
        level,
        group_id,

        status,
        value,

        descriptions,
        mark,
      } = this.editing_obj;
      let final_obj = {
        id: this.detail_obj.id,
        key,
        group,
        group_id,
        project,
        level,

        status,
        value,

        descriptions,
        mark,
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
