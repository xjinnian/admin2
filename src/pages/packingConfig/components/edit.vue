<template>
  <q-card class="my-card mw80vw q-px-md w80vw">
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
          <div class="w120 form-item-label">名字</div>
          <q-input
            class="col"
            filled
            dense
            type="textarea"
            v-model="editing_obj.name"
          />
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
        />
      </div>

      <q-separator />

      <div class="cloum q-gutter-y-md">
        <div class="row">
          <div class="w120 form-item-label">component</div>
          <q-select
            class="col"
            filled
            dense
            emit-value
            map-options
            option-label="name"
            option-value="version"
            :options="all_version"
            v-model="editing_obj.component"
          />
        </div>
        <div class="row">
          <div class="w120 form-item-label">js</div>
          <q-select
            class="col"
            filled
            dense
            emit-value
            map-options
            option-label="name"
            option-value="version"
            :options="all_version"
            v-model="editing_obj.js"
          />
        </div>
        <div class="row">
          <div class="w120 form-item-label">i18n</div>
          <q-select
            class="col"
            filled
            dense
            emit-value
            map-options
            option-label="name"
            option-value="version"
            :options="all_version"
            v-model="editing_obj.i18n"
          />
        </div>
        <div class="row">
          <div class="w120 form-item-label">备注</div>
          <q-input
            class="col"
            filled
            dense
            type="textarea"
            v-model="editing_obj.mark"
          />
        </div>
        <div class="row">
          <div class="w120 form-item-label">theme</div>
          <div class="col">
            <ThemeConfig ref="ref_themeConfig" :editing_obj="editing_obj" :all_version="all_version"  />
          </div>
        </div>
      </div>
    </q-card-section>
    <q-separator />
    <q-card-actions align="right">
      <q-btn color="primary" @click="handle_conform_edit" label="确定" />
      <q-btn
        v-close-popup
        color="deep-orange"
        glossy
        @click="handle_cancel_edit"
        label="取消"
      />
    </q-card-actions>
  </q-card>
</template>
<script>
import { ref } from "vue";
import { api_configVersion, api_themeTemplate } from "src/api";
import { mapGetters } from "vuex";
import ThemeConfig from "./theme.vue";
export default {
  components: {
    ThemeConfig,
  },
  emits: ["emit-edit"],
  data() {
    return {
      tab: "base",
      editorRef: ref(null),
      files: [],
      editing_obj: {},
      all_version: [],
      all_themeTemplate: [],
      temp_obj: {
        name:'',
        project: null,
        component: null,
        js: null,
        i18n: null,

        mark: "",
      },
    };
  },
  props: {
    detail_obj: {},
  },
  computed: {
    ...mapGetters(["get_all_layout", "get_all_language"]),
  },
  created() {
    this.handle_get_all_version();
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
     * 获取所有版本
     */
    async handle_get_all_version() {
      let params = {
        currentPage: 1,
        pageSize: 10000,
      };
      let res = await  api_configVersion.handle_read(params);
      let { code, msg, data } = res.data;
      let docs = data?.docs || [];
      this.all_version = docs;
    },
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
      // console.log(this.$refs.ref_themeConfig.get_theme_config());
      const theme_config = this.$refs.ref_themeConfig.get_theme_config();
      let { id,name, project, component, js, i18n,   mark } = this.editing_obj;
      let final_obj = {
        name,
        project,
        component,
        js,
        i18n,
        theme:theme_config,
        mark,
        id
      };

      console.error('final_obj-----',final_obj);

      // return false

      this.$utils.remove_false_key(final_obj);
      this.$emit("emit-edit", final_obj);
    },
    /**
     * 取消  取消更改
     *
     */
    handle_cancel_edit() {},
  },
};
</script>
<style lang="scss" scoped></style>
