<template>
  <q-card class="my-card mw70vw q-px-md w70vw">
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
    <q-card-section class="q-py-md q-gutter-y-md">
      <div class="text-red text-center">如果英文配有配置则使用中文的配置</div>
      <div class="row">
        <div class="w120 form-item-label">标题中文</div>
        <q-input
          class="col"
          filled
          dense
          v-model="detail_obj.name_zh"
          type="textarea"
          autogrow
          counter
        />
      </div>
      <div class="row">
        <div class="w120 form-item-label">标题英文</div>
        <q-input
          class="col"
          filled
          dense
          v-model="detail_obj.name_en"
          type="textarea"
          autogrow
          counter
        />
      </div>
      <div class="row">
        <div class="w120 form-item-label">内容中文</div>

        <q-editor
          class="col"
          filled
          dense
          v-model="detail_obj.content_zh"
          min-height="5rem"
          @update:model-value="handle_content_zh_update"
        />

        <div class="ralative-position w100 h30 q-ml-md">
          <q-file
            class="absolute w100 h30"
            style="z-index: 6"
            flat
            dense
            v-model="content_zh_files"
          >
            <template v-slot:file="{ index, file }"> </template>
          </q-file>
          <q-btn color="primary" class="absolute w100 h40" style="z-index: 3">
            插入图片</q-btn
          >
        </div>
      </div>
      <div class="row">
        <div class="w120 form-item-label">内容英文</div>
        <q-editor
          class="col"
          filled
          dense
          v-model="detail_obj.content_en"
          min-height="5rem"
          @update:model-value="handle_content_en_update"
        />
        <div class="ralative-position w100 h30 q-ml-md">
          <q-file
            class="absolute w100 h30"
            style="z-index: 6"
            flat
            dense
            v-model="content_en_files"
          >
            <template v-slot:file="{ index, file }"> </template>
          </q-file>
          <q-btn color="primary" class="absolute w100 h40" style="z-index: 3">
            插入图片</q-btn
          >
        </div>
      </div>

      <div class="row">
        <div class="w120 form-item-label">图片上传</div>

        <q-file
          class="col"
          filled
          bottom-slots
          multiple
          clearable
          v-model="files"
          label="上传图片"
          counter
          max-files="6"
        >
          <template v-slot:file="{ index, file }">
            <q-chip class="full-width q-my-xs">
              <div class="ellipsis relative-position">
                {{ file.name }}
              </div>
            </q-chip>
          </template>
        </q-file>

        <div class="q-ml-md">
          <q-btn color="primary" @click="handle_upload()"> 点击上传</q-btn>
        </div>
      </div>

      <div class="row">
        <div class="w120 form-item-label"></div>
        <div class="col">
          <div class="row q-gutter-md justify-start">
            <div
              v-for="(item, index) in image_preview_arr"
              :key="index"
              class="border-grey br2 px2 py2"
              style="width: 106px; height: 106px"
            >
              <img :src="item" alt="" class="w100 h100" />
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="w120 form-item-label">#参与话题</div>
        <q-select
          class="col"
          filled
          dense
          emit-value
          map-options
          :options="$config.options_status"
          v-model="detail_obj.status"
        />
      </div>
      <div class="row">
        <div class="w120 form-item-label">#官方助手</div>
        <q-select
          class="col"
          filled
          dense
          emit-value
          map-options
          :options="$config.options_status"
          v-model="detail_obj.status"
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
          v-model="detail_obj.status"
        />
      </div>

      <div class="row">
        <div class="w120 form-item-label">置顶</div>
        <q-checkbox v-model="detail_obj.order" />
      </div>
      <div class="row">
        <div class="w120 form-item-label">精华</div>
        <q-checkbox v-model="detail_obj.order" />
      </div>
    </q-card-section>
    <q-separator />
    <q-card-actions align="right">
      <q-btn
        v-close-popup
        color="primary"
        @click="handle_conform_edit"
        label="确定"
      />
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
import { image_upload_mixin } from "src/mixin/index";
export default {
  mixins: [image_upload_mixin],
  data() {
    return {
      editorRef: ref(null),
      files: [],
      detail_obj: {},

      //中文内容 旁边的插入图片
      content_zh_files: [],
      //英文内容 旁边的插入图片
      content_en_files: [],
    };
  },
  props: {
    init_obj: {},
  },
  created() {
    this.detail_obj = this.$lodash.cloneDeep(this.init_obj);
  },
  methods: {
    handle_conform_edit() {},
    handle_cancel_edit() {},
    handle_content_zh_update(value) {
      console.log(value);
    },
    handle_content_en_update(value) {
      console.log(value);
    },
    /**
     * Capture the <CTL-V> paste event, only allow plain-text, no images.
     * See: https://stackoverflow.com/a/28213320
     */
    onPaste(evt) {
      // Let inputs do their thing, so we don't break pasting of links.
      if (evt.target.nodeName === "INPUT") return;
      let text, onPasteStripFormattingIEPaste;
      evt.preventDefault();
      evt.stopPropagation();
      if (evt.originalEvent && evt.originalEvent.clipboardData.getData) {
        text = evt.originalEvent.clipboardData.getData("text/plain");
        this.editorRef.value.runCmd("insertText", text);
      } else if (evt.clipboardData && evt.clipboardData.getData) {
        text = evt.clipboardData.getData("text/plain");
        this.editorRef.value.runCmd("insertText", text);
      } else if (window.clipboardData && window.clipboardData.getData) {
        if (!onPasteStripFormattingIEPaste) {
          onPasteStripFormattingIEPaste = true;
          this.editorRef.value.runCmd("ms-pasteTextOnly", text);
        }
        onPasteStripFormattingIEPaste = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
