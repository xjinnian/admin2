<template>
  <q-card class="my-card q-px-md mw70vw w70vw">
    <q-card-section class="no-padding">
      <div class="row">
        <q-tabs v-model="tab" class="text-teal">
          <q-tab name="edit">{{ detail_obj.id ? "编辑" : "新建" }}数据</q-tab>
        </q-tabs>
        <q-space />
        <q-btn flat round icon="close" @click="handle_close_dialog" />
      </div>
    </q-card-section>
    <q-separator class="q-my-md" />
    <q-scroll-area class="dialog-wapper-scroll-area">
      <q-card-section class="no-padding">
        <EditComponent
          :detail_obj="detail_obj"
          @emit-close="handle_close_dialog"
        />
      </q-card-section>
    </q-scroll-area>
  </q-card>
</template>

<script>
import EditComponent from "./edit2.vue";
export default {
  components: { EditComponent },
  emits: ["emit-close"],
  data() {
    return {
      //关联ID
      related_id: "",
    };
  },
  props: {
    detail_obj: { type: Object },
  },
  created() {
    if (this.detail_obj.id) {
      this.related_id = this.detail_obj.id;
    }
  },
  methods: {
    /**
     * 关闭弹窗
     */
    handle_close_dialog() {
      this.$emit("emit-close");
    },
  },
};
</script>
