<template>
  <q-card class="my-card mw50vw q-px-md w50vw">
    <q-card-section class="no-padding">
      <div class="row">
        <div class="text-weight-bolder lh50">
          {{ detail_obj.id ? "编辑" : "创建" }}数据
        </div>
        <q-space />
        <q-btn flat round icon="close" v-close-popup />
      </div>
    </q-card-section>
    <q-separator />
    <q-card-section class="q-py-md q-gutter-y-md">
      <div class="col">
        <q-tabs
          v-model="tab_index"
          dense
          class="text-black"
          active-color="primary"
          indicator-color="primary"
          narrow-indicator
        >
          <q-tab
            v-for="(item, index) in get_all_language"
            :key="'tab' + index"
            :name="index"
          >
            <span v-if="item.value == 'zh_cn'"
              ><span class="text-red">*</span>{{ item.name_zh }}</span
            >
            <span v-else>{{ item.name_zh }}</span>
            <span>{{ item.name_en }}</span>
          </q-tab>
        </q-tabs>
        <q-separator />

        <q-tab-panels v-model="tab_index" animated>
          <q-tab-panel
            v-for="(item, index) in get_all_language"
            :key="'tabpanels' + index"
            :name="index"
          >
            <div>
              <q-input
                filled
                dense
                v-model.trim="editing_obj.name[item.value]"
                type="text"
                counter
                maxlength="100"
              />
            </div>
          </q-tab-panel>
        </q-tab-panels>
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


      <div class="row">
        <div class="w120 form-item-label">标准版本号</div>
        <q-input
          class="col"
          filled
          dense
          type="text"
          v-model.trim="editing_obj.version"
        />
      </div>
      <div class="row">
        <div class="w120 form-item-label">状态</div>
        <q-select
          class="col"
          filled
          dense
          emit-value
          map-options
          :options="$config.options_status"
          v-model="editing_obj.status"
        />
      </div>



    </q-card-section>
    <q-separator />
    <q-card-actions align="right">
      <q-btn color="primary" @click="handle_conform_edit" label="确定" />
      <q-btn v-close-popup color="deep-orange" glossy label="取消" />
    </q-card-actions>
  </q-card>
</template>
<script>
import { ref } from "vue";
import { mapGetters, mapActions } from "vuex";
export default {
  emits: ["emit-edit"],
  props: {
    detail_obj: {},
  },
  data() {
    return {
      tab_index: 0,
      editing_obj: {},
      temp_obj: {
        name: {},
        project: "",
        version: "",

        status: -1,

        descriptions: {},
      },
    };
  },

  computed: {
    ...mapGetters(["get_all_layout", "get_all_language"]),
  },
  created() {
    this.set_all_layout();
    console.error('get_all_layout--',this.get_all_layout);
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
    ...mapActions({
      set_all_layout: "set_all_layout",
    }),
    /**
     * 确定 提交更改
     *
     */
    handle_conform_edit() {
      let {
        name,
        project,
        version,

        status,

        descriptions,
      } = this.editing_obj;
      let final_obj = {
        id: this.detail_obj.id,
        name,
        project,
        version,

        status,
        descriptions,
      };
      this.$utils.remove_false_key(final_obj);
      console.error('final_obj----------',final_obj);
      this.$emit("emit-edit", final_obj);
    },
  },
};
</script>
<style lang="scss" scoped></style>
