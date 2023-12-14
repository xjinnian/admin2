<template>
  <q-card class="my-card mw50vw q-px-md w50vw">
    <q-card-section class="no-padding">
      <div class="row">
        <div class="text-weight-bolder lh40">新建标签</div>
        <q-space />
        <q-btn flat round icon="close" v-close-popup />
      </div>
    </q-card-section>
    <q-separator />
    <q-card-section class="q-py-md q-gutter-y-md">
      <div class="row">
        <div class="w120 form-item-label">标签名称</div>
        <q-input class="col" filled dense v-model="editing_obj.name" />
      </div>
      <div class="row">
        <div class="w120 form-item-label">标签描述</div>
        <q-input class="col" filled dense type="textarea" v-model="editing_obj.desc" />
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
  emits: ["emit-edit"],
  data() {
    return {
      code_tag_list: [],
      editing_obj: {},
    };
  },
  methods: {
    /**
     * 确定 提交更改
     */
    handle_conform_edit() {
      // this.$q.notify({ type: "negative", message: "名字 必填", });
      this.$emit("emit-edit", this.editing_obj);
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
