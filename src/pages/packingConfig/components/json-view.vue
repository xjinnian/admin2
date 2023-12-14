<template>
  <q-card class="my-card mw50vw q-px-md w50vw">
    <q-card-section class="no-padding">
      <div class="row">
        <div class="text-weight-bolder lh40">查看配置</div>
        <q-space />
        <q-btn flat round icon="close" v-close-popup />
      </div>
    </q-card-section>
    <q-separator />
    <q-card-section class="q-py-md q-gutter-y-md">



       <JsonViewer :value="detail_obj"
              :expand-depth="5" copyable  sort></JsonViewer>

    </q-card-section>
    <q-separator />
    <q-card-actions align="right">

      <q-btn
        v-close-popup
        color="deep-orange"
        glossy

        label="关闭"
      />
    </q-card-actions>
  </q-card>
</template>
<script>
import { ref,reactive } from "vue";
import {JsonViewer} from "vue3-json-viewer"

import "vue3-json-viewer/dist/index.css";
export default {
  components: {
    JsonViewer,
  },
  emits: ["emit-edit"],
  data() {
    return {
      editorRef: ref(null),
      files: [],
      editing_obj: {},
      detail:{},
      temp_obj: {

      },
    };
  },
  props: {
    detail_obj: {},
  },
  created() {
    this.detail=  reactive(JSON.parse(JSON.stringify(this.detail_obj)))

  },
  methods: {

    /**
     * 取消  取消更改
     *
     */
    handle_cancel_edit() {},
  },
};
</script>
<style lang="scss" scoped></style>
