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
        <div class="w120 form-item-label">版本名字</div>
        <q-input class="col" filled dense v-model="editing_obj.name" />
      </div>
      <div class="row" v-if="editing_obj.id">
        <div class="w120 form-item-label">用户名字</div>
        <q-input class="col" filled dense disable v-model="editing_obj.username" />
      </div>

      <div class="row">
        <div class="w120 form-item-label">目标布局</div>
        <q-select
          class="col"
          filled
          dense
          emit-value
          map-options
          option-label="name"
          option-value="value"
          :options="get_all_layout"
          v-model="editing_obj.targetProject"
        />
      </div>
      <div class="row">
          <div class="w120 form-item-label">主题蓝本</div>
          <q-select
            class="col"
            filled
            dense
            emit-value
            map-options
            :option-label="(item) => item?.name?.zh_cn"
            option-value="version"
            :options="all_themeTemplate"
            v-model="editing_obj.themeRefer"
          />
        </div>

      <div class="row">
        <div class="w120 form-item-label">状态</div>
        <q-select class="col" filled dense emit-value map-options :options="$config.options_client_key_status"
          v-model="editing_obj.status" />
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
import { api_configVersion, api_themeTemplate } from "src/api";
export default {
  emits: ["emit-edit"],
  data() {
    return {
      editorRef: ref(null),
      files: [],
      editing_obj: {},
      all_themeTemplate: [],
      temp_obj: {
        name: "",
        targetProject:null,
        themeRefer:null,
        status: null,
        mark: "",
      },
    };
  },
  props: {
    detail_obj: {},
  },
  computed: {
    ...mapGetters(["get_all_layout" ]),
  },
  created() {
    this.handle_get_all_theme();
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
        /**
     * 获取所有主题
     */
     async handle_get_all_theme() {
      let params = {
        currentPage: 1,
        pageSize: 10000,
      };
      let res = await api_themeTemplate.handle_read(params);
      let { code, msg, data } = res.data;
      let docs = data?.docs || [];
      this.all_themeTemplate = docs;
    },

    /**
     * 确定 提交更改
     *
     */
    handle_conform_edit() {
      let { id, name, targetProject,themeRefer, status, mark } = this.editing_obj;
      let final_obj = {
        id,
        name,
        targetProject,
        themeRefer,
        status,
        mark,
      };

      if (!name) {
        this.$q.notify({
          type: "negative",
          message: "名字 必填",
        });
      }
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
