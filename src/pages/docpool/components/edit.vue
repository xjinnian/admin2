<!--
 *
 * @LastEditTime: 2022-10-26 17:08:33
 *
-->
<template>
  <q-card class="my-card" flat style="max-width: 66vw">
    <q-card-section class="q-py-md q-gutter-y-md">
      <div>
        <RuleComponent />
      </div>
      <div class="row">
        <div class="w120 form-item-label">
          标题中文 <span class="text-red">*</span>
        </div>
        <q-input
          class="col"
          filled
          dense
          v-model.trim="editing_obj.name_zh"
          type="text"
          counter
        />
      </div>
      <div class="row">
        <div class="w120 form-item-label">标题英文</div>
        <q-input
          class="col"
          filled
          dense
          v-model.trim="editing_obj.name_en"
          type="text"
          counter
        />
      </div>
      <div class="row">
        <div class="w120 form-item-label">url</div>

        <q-input
          class="col"
          filled
          dense
          v-model="editing_obj.url"
          type="textarea"
        />
      </div>
      <div class="row">
        <div class="w120 form-item-label">使用MD文档</div>
        <q-checkbox v-model="editing_obj.use_md" />
      </div>

      <div class="row">
        <div class="w120 form-item-label">中文MD文档</div>
        <div class="column">
          <div>
            <UploadComponentMd
              key_str="md_zn"
              :file_path="editing_obj.md_zn"
              @emit-file-path="handle_file_emit_upload_file_path"
            />
          </div>

          <div>
            <MdListTable
              key_str="md_zn"
              :historty_list="editing_obj['md_zn_historty']"
            />
          </div>
        </div>
      </div>

      <div class="row">
        <div class="w120 form-item-label">英文MD文档</div>
        <div class="column">
          <div>
            <UploadComponentMd
              key_str="md_en"
              :file_path="editing_obj.md_en"
              @emit-file-path="handle_file_emit_upload_file_path"
            />
          </div>

          <div>
            <MdListTable
              key_str="md_en"
              :historty_list="editing_obj['md_en_historty']"
            />
          </div>
        </div>
      </div>
      <div class="row">
        <div class="w120 form-item-label">主题标签</div>
        <q-select
          class="col"
          filled
          dense
          emit-value
          multiple
          map-options
          option-label="name_zh"
          option-value="sid"
          :options="questionTopic_options"
          v-model="editing_obj.topic"
        />
      </div>

      <div class="row">
        <div class="w120 form-item-label">关联问题</div>
        <q-select
          class="col"
          filled
          dense
          emit-value
          map-options
          multiple
          use-input
          input-debounce="100"
          label="可以关键字过滤"
          @filter="filterFn"
          option-label="name_zh"
          option-value="id"
          :options="related_faq_options"
          v-model="editing_obj.related_faq"
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
      <div class="row">
        <div class="w120 form-item-label">置顶</div>
        <q-checkbox v-model="editing_obj.is_top" />
      </div>

      <div class="row">
        <div class="w120 form-item-label">
          内容中文 <span class="text-red">*</span>
        </div>
        <q-editor
          class="col"
          filled
          dense
          v-model="editing_obj.content_zh"
          min-height="5rem"
          ref="content_zh_input"
        />
        <UploadComponent
          key_str="content_zh"
          @emit-html-str="handle_file_emit_upload_html_str"
        />
      </div>
      <div class="row">
        <div class="w120 form-item-label">内容英文</div>
        <q-editor
          class="col"
          filled
          dense
          v-model="editing_obj.content_en"
          min-height="5rem"
          @update:model-value="handle_content_en_update"
        />
        <UploadComponent
          key_str="content_en"
          @emit-html-str="handle_file_emit_upload_html_str"
        />
      </div>
    </q-card-section>
    <q-separator />
    <q-card-actions align="right">
      <q-btn color="primary" @click="handle_conform_edit" label="确定" />
      <q-btn
        color="deep-orange"
        glossy
        @click="handle_close_dialog"
        label="取消"
      />
    </q-card-actions>
  </q-card>
</template>
<script>
import { ref, toRaw, markRaw } from "vue";
import { mapGetters } from "vuex";
import { api_docpool as api_namespace } from "src/api/index";
import { edit_component_mixin } from "src/mixin/index";
export default {
  mixins: [edit_component_mixin],

  data() {
    return {
      //API 命名空间
      api_namespace,
      tab: "edit",
      editorRef: ref(null),
      files: [],
      editing_obj: {},
      related_faq_options: [],
      temp_obj: {
        name_zh: "",
        name_en: "",
        url: "",
        content_zh: "",
        content_en: "",
        status: null,
        is_top: false,
        use_md: false,
        md_zn: "",
        md_en: "",
        topic: [],
        related_faq: [],
      },
    };
  },
  computed: {
    ...mapGetters(["get_all_faq"]),
  },
  created() {
    this.related_faq_options = markRaw(this.get_all_faq);
  },
  methods: {
    /**
     * 获取详情
     */
    async get_info() {
      let params = {
        id: this.detail_obj.id,
      };
      let res = await this.api_fn_info(params);
      let { code, msg, data } = res.data;
      console.log(data);
      this.editing_obj = this.$lodash.cloneDeep(data);

      if (!this.editing_obj.related_faq) {
        this.editing_obj.related_faq = [];
      }
      if (!this.editing_obj.is_top) {
        this.editing_obj.is_top = false;
      }
      if (!this.editing_obj.content_zh) {
        this.editing_obj.content_zh = "";
      }
      if (!this.editing_obj.content_en) {
        this.editing_obj.content_en = "";
      }

      this.$forceUpdate();
    },
    /**
     * 确定 提交更改
     *
     */
    handle_conform_edit() {
      let {
        id,
        name_zh,
        name_en,
        url,
        content_zh,
        content_en,
        status,
        use_md,
        md_zn,
        md_en,
        is_top,
        topic,
        related_faq,
      } = this.editing_obj;
      let final_obj = {
        id,
        name_zh,
        name_en,
        url,
        content_zh,
        content_en,
        status,
        use_md,
        md_zn,
        md_en,
        is_top,
        topic,
        related_faq: JSON.parse(JSON.stringify(related_faq)),
      };
      if (!name_zh || !content_zh) {
        this.$q.notify({
          type: "negative",
          message: "中文标题和中文内容必填",
        });
        return;
      }
      this.$utils.remove_false_key(final_obj, ["use_md"]);
      console.log("this.editing_obj-----22---", final_obj);
      this.handle_conform_edit_process(final_obj);
    },
    filterFn(val, update, abort) {
      let get_all_faq = this.get_all_faq;
      update(() => {
        const needle = val.toLowerCase();
        let arr = get_all_faq.filter(
          (v) => (v.name_zh || "").toLowerCase().indexOf(needle) > -1
        );
        this.related_faq_options = markRaw(arr);
      });
    },
    handle_close_dialog() {
      if (this.detail_obj.id) {
        this.get_info();
      }
    },
    before_close_dialog() {},
  },
};
</script>
<style lang="scss" scoped></style>
