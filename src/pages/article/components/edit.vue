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
          v-model.trim="detail_obj.name_zh"
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
          v-model.trim="detail_obj.name_en"
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
          v-model="detail_obj.content_zh"
          min-height="5rem"
          ref="content_zh_input"
        />
        <div class="ralative-position w100 h30 q-ml-md">
          <q-file
            class="absolute w100 h30"
            style="z-index: 6"
            flat
            dense
            @update:model-value="handle_content_zh_files_update"
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
            @update:model-value="handle_content_en_files_update"
          >
            <template v-slot:file="{ index, file }"> </template>
          </q-file>
          <q-btn color="primary" class="absolute w100 h40" style="z-index: 3">
            插入图片</q-btn
          >
        </div>
      </div>
      <div class="row">
        <div class="w120 form-item-label">主题标签</div>
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
        <q-checkbox v-model="detail_obj.is_top" />
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
import { api_file } from "src/api/index";
export default {
  data() {
    return {
      editorRef: ref(null),
      files: [],
      detail_obj: {},
      temp_obj: {
        name_zh: "",
        name_en: "",
        content_zh: "",
        content_en: "",
        status: -1,
        is_top: false,
        topic: [],
      },

      //中文内容 旁边的插入图片
      content_zh_files: null,
      //英文内容 旁边的插入图片
      content_en_files: null,
    };
  },
  props: {
    init_obj: {},
  },
  created() {
    if (this.init_obj.id) {
      this.detail_obj = Object.assign(
        this.$lodash.cloneDeep(this.temp_obj),
        this.$lodash.cloneDeep(this.init_obj)
      );
    } else {
      this.detail_obj = this.$lodash.cloneDeep(this.temp_obj);
    }

    this.detail_obj.content_zh = ` <div class="text-center"><img src="http://127.0.0.1:18101/public/1.png" style="zoom: 60%;" ></div>`;
  },
  methods: {
    //英文文内容 文件 更新
    handle_content_en_files_update(value) {
      this.handle_content_files_update(value, "content_en");
    },
    //中文内容 文件 更新
    async handle_content_zh_files_update(value) {
      this.handle_content_files_update(value, "content_zh");
    },
    //通用内容 文件 更新
    async handle_content_files_update(value, key) {
      console.log(" //中文内容 文件 更新");
      console.log(value);
      let name = value.name;
      if (!name) {
        return false;
      }
      let data = await this.handle_upload([value]);
      console.log(data);
      let path = data[name]["save_filepath"];
      let str = ` <div class="text-center"><img src="http://127.0.0.1:18101${path}" style="zoom: 60%;" ></div>`;
      this.detail_obj[key] += str;
    },
    /**
     * 文件上传
     * @param {*} files
     */
    async handle_upload(files = []) {
      console.log("this.files----", this.files);
      let len = files.length;
      if (len == 0) {
        return false;
      }
      let form = new FormData();
      for (let i = 0; i < len; i++) {
        form.append("files[]", files[i]);
      }
      form.set("other", 1);
      let res = await api_file.handle_upload(form);
      form = null;
      console.log(res.data);
      let { code, data, msg, success } = res.data;
      if (success) {
        return data;
      } else {
        return "";
      }
    },
    /**
     * 中文 内容更改
     */
    handle_content_zh_update(value) {
      console.log(
        "this.$refs.content_zh_input.selectionStart-------",
        this.$refs.content_zh_input.selectionStart
      );
      console.log(value);
    },
    /**
     * 英文内容更改
     */
    handle_content_en_update(value) {
      console.log(value);
    },

    /**
     * 确定 提交更改
     *
     */
    handle_conform_edit() {
      let { name_zh, name_en, content_zh, content_en, status, is_top, topic } =
        this.detail_obj;

      let final_obj = {
        name_zh,
        name_en,
        content_zh,
        content_en,
        status,
        is_top,
        topic,
      };

      if (!name_zh) {
        this.$q.notify({
          type: "negative",
          message: 'This is a "negative" type notification.',
        });
      }

      this.$utils.remove_false_key(final_obj);

      console.log("this.detail_obj--------", this.detail_obj.value);
      console.log("this.detail_obj-----22---", final_obj);
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
