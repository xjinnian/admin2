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
        <div class="w120 form-item-label">赛事名称</div>
        <q-input class="col" filled dense v-model="editing_obj.name" />
      </div>
      <div class="row">
        <div class="w120 form-item-label">赛种</div>
        <q-input class="col" filled dense v-model="editing_obj.race" />
      </div>
      <div class="row">
        <div class="w120 form-item-label">请求类型</div>
        <q-input class="col" filled dense type="textarea" v-model="editing_obj.request_type" />
      </div>
      <div class="row">
        <div class="w120 form-item-label">数据类型</div>
        <q-select class="col" filled dense emit-value map-options :options="code_tag_list" option-label="name"
          option-value="id" v-model="editing_obj.data_type" />
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
export default {
  emits: ["emit-edit", 'emit-create-new-tag'],
  data() {
    return {
      editing_obj: {},
      temp_obj: {
        url: '',
        desc: '',
        code_tag_id: '',
        status: 1,
        mark: '',
      },
    };
  },
  props: {
    detail_obj: Object,
    code_tag_list: Array
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

    to_create_new_tag() {
      this.$emit("emit-create-new-tag");
    },

    /**
     * 确定 提交更改
     */
    handle_conform_edit() {
      let { id, url, desc, response, code_tag_id, status, mark } = this.editing_obj;
      let final_obj = { id, url, desc, response, code_tag_id, status, mark };
      // this.$q.notify({ type: "negative", message: "名字 必填", });
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
