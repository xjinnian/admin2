<template>
  <q-card class="my-card mw50vw q-px-md w50vw">
    <q-card-section class="no-padding">
      <div class="row">
        <div class="text-weight-bolder lh50">编辑数据</div>
        <q-space />
        <q-btn flat round icon="close" v-close-popup />
      </div>
    </q-card-section>
    <q-separator />
    <q-card-section class="q-py-md q-gutter-y-md">
      <div class="row">
        <div class="w120 form-item-label">组件名称</div>
        <q-input class="col" filled dense v-model="editing_obj.name" />
      </div>

      <div class="row">
        <div class="w120 form-item-label">布局模板</div>
        <q-select class="col" filled dense emit-value map-options readonly :options="$config.options_client_project"
          v-model="editing_obj.project" />
      </div>

      <div class="row">
        <div class="w120 form-item-label">描述</div>
        <MulitLansInput class="col" @lan_change="handle_descriptions_lan_change"
          :detail_obj="editing_obj['descriptions']" />
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

  components: { MulitLansInput, },

  data() {
    return {
      editing_obj: {},
      temp_obj: {
        name: "",
        project: "",
        descriptions: {},
      },
    };
  },

  props: {
    detail_obj: {},
  },

  computed: {
    ...mapGetters(["get_all_language"]),
  },

  created() {
    this.editing_obj = Object.assign(
      this.$lodash.cloneDeep(this.temp_obj),
      this.$lodash.cloneDeep(this.detail_obj)
    );
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
      let { name, descriptions, } = this.editing_obj;

      const final_obj = { id: this.detail_obj.id, name, descriptions, }

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
