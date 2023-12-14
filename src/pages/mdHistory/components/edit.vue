<!--
 *
 * @LastEditTime: 2022-10-26 17:08:47
 * @Description    :
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
      <div class="row">
        <div class="w120 form-item-label">相关人员</div>

        <q-input
          class="col"
          filled
          dense
          v-model.trim="editing_obj.related_staff"
          type="text"
          counter
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
      <div class="row" v-if="related_doc">
        <div class="w120 form-item-label">关联文档ID</div>
        <div class="row lh40">{{ related_doc }}</div>
      </div>
      <div class="row" v-if="related_faq">
        <div class="w120 form-item-label">关联常见问题ID</div>
        <div class="row lh40">{{ related_faq }}</div>
      </div>

      <div class="row">
        <div class="w120 form-item-label">置顶</div>
        <q-checkbox v-model="editing_obj.is_top" />
      </div>
    </q-card-section>
    <q-separator />
    <q-card-actions align="right">
      <q-btn color="primary" @click="handle_conform_edit" label="确定" />
      <q-btn
        :v-close-popup="!isinner"
        color="deep-orange"
        glossy
        label="取消"
      />
    </q-card-actions>
  </q-card>
</template>
<script>
import { ref } from "vue";
import { api_mdHistory as api_namespace } from "src/api/index";

import { edit_component_mixin } from "src/mixin/index";
export default {
  mixins: [edit_component_mixin],
  data() {
    return {
      //API 命名空间
      api_namespace,

      editorRef: ref(null),
      files: [],
      editing_obj: {},
      temp_obj: {
        name_zh: "",
        name_en: "",
        content_zh: "",
        content_en: "",
        status: null,
        is_top: false,
        related_staff: "",
      },
    };
  },
  props: {
    detail_obj: {},
    related_faq: "",
    related_doc: "",
    isinner: {
      type: Boolean,
      default: false,
    },
  },

  methods: {
    /**
     * 确定 提交更改
     *
     */
    handle_conform_edit() {
      let {
        id,
        name_zh,
        name_en,
        content_zh,
        content_en,
        status,
        is_top,
        related_staff,
      } = this.editing_obj;

      let final_obj = {
        id,
        name_zh,
        name_en,
        content_zh,
        content_en,
        status,
        is_top,
        related_staff,
        related_faq: this.related_faq,
        related_doc: this.related_doc,
      };
      console.log(this.related_faq, this.related_doc);

      if (!name_zh || !content_zh) {
        this.$q.notify({
          type: "negative",
          message: "中文标题和中文内容必填",
        });
        return;
      }

      this.$utils.remove_false_key(final_obj);

      console.log("this.editing_obj-----22---", final_obj);

      this.handle_conform_edit_process(final_obj);
    },
  },
};
</script>
<style lang="scss" scoped></style>
