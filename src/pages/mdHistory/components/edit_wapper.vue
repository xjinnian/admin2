<template>
  <q-card class="my-card q-px-md mw70vw w70vw">
    <q-card-section class="no-padding">
      <div class="row">
        <div class="text-weight-bolder lh40">
          {{ detail_obj.id ? "编辑" : "新建" }}数据
        </div>

        <q-space />
        <q-btn flat round icon="close" v-close-popup />
      </div>
    </q-card-section>
    <q-separator />

    <q-scroll-area class="dialog-wapper-scroll-area">
      <q-card-section @emit-related-id="handle_recive_related_id">
        <EditComponent :detail_obj="detail_obj" />
      </q-card-section>
    </q-scroll-area>
  </q-card>
</template>
<script>
import { ref } from "vue";

import EditComponent from "./edit.vue";

export default {
  components: {
    EditComponent,
  },
  emits: ["emit-close"],
  data() {
    return {
      //关联ID
      related_id: "",
    };
  },
  props: {
    detail_obj: {},
  },
  created() {
    if (this.detail_obj.id) {
      this.related_id = this.detail_obj.id;
    }
  },
  methods: {
    /**
     * 接收 关联ID
     * @param {*} id
     */
    handle_recive_related_id(id) {
      this.related_id = id;
    },
    /**
     * 关闭弹窗
     */
    handle_close_dialog() {
      this.$emit("emit-close");
    },
  },
};
</script>
<style lang="scss" scoped></style>
