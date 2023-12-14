<!--
 *
 * @LastEditTime: 2023-10-20 14:20:03
 *
-->
<template>
  <q-card class="my-card" flat style="overflow: auto">
    <q-card-section class="q-py-md q-gutter-y-md">
      <div>
        <RuleComponent />
      </div>
      <div class="row">
        <div class="w120 form-item-label">语言开关:</div>
        <div class="col">
          <div class="row text-red">受系统语言设计总开关制约</div>
          <div class="row q-gutter-x-sm">
            <q-checkbox
              v-for="(item, index) in get_all_language"
              :key="index + 'radio'"
              v-model="show_lan"
              :val="item.value"
              :label="item.name"
            />
          </div>
        </div>
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
        <div class="w120 form-item-label">版本</div>
        <q-input
          class="col"
          filled
          dense
          v-model="editing_obj.sdk_version"
          type="input"
        />
      </div>
      <div class="row">
        <div class="w120 form-item-label">环境</div>
        <q-input
          class="col"
          filled
          dense
          v-model="editing_obj.sdk_environment"
          type="input"
        />
      </div>
      <div class="row">
        <div class="w120 form-item-label">类型</div>
        <q-input
          class="col"
          filled
          dense
          v-model="editing_obj.sdk_type"
          type="input"
        />
      </div>
      <div class="row">
        <div class="w120 form-item-label">内外</div>
        <q-input
          class="col"
          filled
          dense
          v-model="editing_obj.sdk_internal_external"
          type="input"
        />
      </div>
      <div class="row items-center">
        <div class="w120 form-item-label">SDK 文件</div>
        <div class="q-mr-md">
          {{ editing_obj.sdk_file_url }}
        </div>
        <q-btn color="primary" @click="handle_upload_sdk">上传SDK</q-btn>
      </div>
      <div class="row" v-if="editing_obj.id">
        <div class="w120 form-item-label">MD文档</div>
        <div class="col">
          <q-card class="my-card">
            <q-card-section>
              <div class="row">
                <!-- @click="handle_md_doc_history_lan_tab_click(item)" -->
                <q-tabs
                  @update:model-value="handle_md_doc_history_lan_tab_click"
                  v-model="current_md_doc_history_tab"
                  class="text-teal"
                  active-class="text-black bg-teal-2"
                >
                  <q-tab
                    v-for="(item, index) in get_all_language"
                    :key="index"
                    :name="item.value"
                  >
                    <div>{{ item.name_zh }}</div>
                    <div>{{ item.name_en }}</div>
                  </q-tab>
                </q-tabs>
              </div>
            </q-card-section>
            <q-separator />
            <q-card-section>
              <div class="row q-gutter-x-md">
                <!-- <q-btn color="primary" class="w200 h40" style="z-index: 3">
                  选择MD文件</q-btn
                > -->
                <UploadComponentMd
                  :key_str="`docpool-edit-${current_md_doc_history_tab}`"
                  @emit-file-path="handle_file_emit_upload_file_path"
                />
              </div>
            </q-card-section>
            <q-card-section>
              <MdListTable
                :historty_list="
                  all_languages_mddoc_history[current_md_doc_history_tab]
                "
                @item_edit="handle_historty_list_item_edit"
                @item_detail="handle_historty_list_item_detail"
                @item_update="handle_historty_list_item_update"
              />
            </q-card-section>
          </q-card>
        </div>
      </div>
      <div class="row">
        <div class="w120 form-item-label">备注</div>
        <q-input
          class="col"
          filled
          dense
          v-model.trim="editing_obj.mark"
          type="text"
          counter
          maxlength="100"
        />
      </div>

      <div class="row">
        <div class="w120 form-item-label">主题标签</div>
        <q-select
          class="col"
          filled
          dense
          multiple
          emit-value
          map-options
          option-value="sid"
          option-label="show_name"
          :options="get_questionTopic"
          v-model="editing_obj.topic"
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
      <q-btn
        color="deep-orange"
        glossy
        @click="handle_close_dialog"
        label="取消"
      />
    </q-card-actions>
    <!-- 预览弹窗 -->
    <q-dialog v-model="show_dialog_preview" persistent>
      <ArticlePreview :detail_obj="normal_md" />
    </q-dialog>
    <!-- 编辑弹窗 -->
    <q-dialog v-model="show_dialog_md_edit" persistent class="z-max">
      <ArticleEdit
        :md_detail_obj="normal_md"
        :doc_detail_obj="editing_obj"
        @md_edit_close="handle_md_edit_close"
      />
    </q-dialog>
  </q-card>
</template>
<script>
import {
  api_b_sdk_docpool as api_namespace,
  api_file,
  api_b_sdk_mddocpool,
} from "src/api/index";
import { edit_component_mixin } from "src/mixin/index";
import { mapActions, mapGetters } from "vuex";
import ArticleEdit from "./edit_md.vue";
import ArticlePreview from "src/components/b_sdk_preview/preview2.vue";

export default {
  mixins: [edit_component_mixin],

  components: {
    ArticlePreview,
    ArticleEdit,
  },

  props: {
    detail_obj: {
      type: Object,
    },
  },

  data() {
    return {
      // 显示MD 编辑弹窗
      show_dialog_md_edit: false,
      //显示 MD 预览弹窗
      show_dialog_preview: false,
      //所有语言的 文档历史
      all_languages_mddoc_history: {},
      mdobj: [],
      api_namespace,

      editing_obj: {},
      temp_obj: {
        mulit_language: {},
        name_zh: "",
        name_en: "",
        status: 1,
        mark: "",
        topic: [],
      },
      show_lan: [],
      //当前 md 文档语言tab 标签的  语言 键
      current_md_doc_history_tab: "zh_cn",
      //当前操作预览或者编辑的 md 文档的数据
      normal_md: {},
    };
  },

  computed: {
    ...mapGetters(["get_user", "get_all_language", "get_questionTopic"]),
  },

  watch: {
    current_md_doc_history_tab() {
      if (this.detail_obj.id) {
        this.get_mddoc_history_by_language();
      }
    },
  },

  created() {
    this.set_all_language();
    this.get_mddoc_history_by_language();
  },

  methods: {
    ...mapActions(["set_all_language"]),

    handle_md_edit_close(val) {
      this.show_dialog_md_edit = false;
      this.handle_file_emit_upload_file_path(val);
    },

    /**
     * 单种语言的  文档历史  语种 tab 按钮点击
     * @param {*} item
     */
    handle_md_doc_history_lan_tab_click(lan_val) {
      console.error("handle_md_doc_history_lan_tab_click-", lan_val);
      this.current_md_doc_history_tab = lan_val;
    },

    /**
     * @description  通过语种 获取历史上传
     * @param
     * @return
     */
    async get_mddoc_history_by_language() {
      if (this.detail_obj.id) {
        let res = await api_b_sdk_mddocpool.handle_read({
          document: this.detail_obj.id,
          language: this.current_md_doc_history_tab,
          currentPage: 1,
          pageSize: 1000,
        });
        let { code, msg, data } = res.data;
        this.all_languages_mddoc_history[this.current_md_doc_history_tab] =
          data.docs;
      }
    },

    /**
     * 获取详情
     */
    async get_info() {
      console.log('---get info---');
      if (this.detail_obj.id) {
        let params = {
          id: this.detail_obj.id,
        };
        let res = await this.api_fn_info(params);
        let { code, msg, data } = res.data;
        this.editing_obj = this.$lodash.cloneDeep(data);
        let obj = data.mulit_language || {};
        let show_lan = [];
        for (let i in data.mulit_language) {
          if (data.mulit_language[i] == 1) {
            show_lan.push(i);
          }
        }
        this.show_lan = show_lan;
      } else {
        this.editing_obj = this.$lodash.cloneDeep(this.temp_obj);
      }
      // this.$forceUpdate();
    },

    /**
     * 处理 sdk 上传
     */
    async handle_upload_sdk() {
      const file = await this.chooseFile();
      let formdata = new FormData();
      formdata.append("files[]", file);
      formdata.set("b_sdk", 1);
      const { data } = await api_file.handle_upload(formdata);
      this.editing_obj.sdk_file_url = data.data[file.name].save_filepath;
      this.editing_obj.sdk_file_name = file.name;
      this.editing_obj.sdk_file_size = file.size;
    },

    /**
     * 选择文件
     */
    async chooseFile() {
      if (!this.upload_el) {
        this.upload_el = document.createElement("input");
        this.upload_el.type = "file";
      }

      return new Promise((resolve, reject) => {
        this.upload_el.onchange = () => {
          if (!this.upload_el.files.length) {
            reject("用户取消上传");
          } else {
            const [file] = this.upload_el.files;
            resolve(file);
          }

          this.upload_el.value = "";
        };

        this.upload_el.oncancel = () => {
          reject("用户取消上传");
        };

        this.upload_el.click();
      });
    },

    /**
     * 确定 提交更改
     *
     */
    handle_conform_edit() {
      let {
        id,
        mark,
        name_zh,
        name_en,
        status,
        topic,
        sdk_version,
        sdk_environment,
        sdk_type,
        sdk_internal_external,
        sdk_file_url,
        sdk_file_name,
        sdk_file_size,
      } = this.editing_obj;

      let final_obj = {
        id,
        mark,
        name_zh,
        name_en,
        status,
        topic,
        sdk_version,
        sdk_environment,
        sdk_type,
        sdk_internal_external,
        sdk_file_url,
        sdk_file_name,
        sdk_file_size,
      };
      let mulit_language = {};
      this.show_lan.map((x) => {
        mulit_language[x] = 1;
      });
      final_obj.mulit_language = mulit_language;
      console.error("final_obj--------", JSON.stringify(final_obj));
      if (!final_obj.name_zh) {
        this.$q.notify({
          timeout: 900,
          type: "negative",
          message: "中文标题必填",
        });
        return;
      }
      this.handle_conform_edit_process(final_obj);
    },

    handle_close_dialog() {
      this.$emit("emit-close");
    },

    /**
     * 接收文件上传 生成的地址
     *
     */
    handle_file_emit_upload_file_path(obj) {
      console.error("handle_file_emit_upload_file_path-----", obj);
      let params = {
        // "md文档语言 value "
        language: this.current_md_doc_history_tab,
        //md文档 文件 名字
        name: obj.md_name,
        // md文档 文件 路径
        path: obj.path,
        //所属的的文档 id
        document: this.detail_obj.id,
        status: -1,
      };
      api_b_sdk_mddocpool.handle_create(params).then((res) => {
        this.get_mddoc_history_by_language();
      });
    },

    /**
     * 新增   确定
     *
     */
    async handle_conform_create(obj) {
      let params = obj || {
        ...this.detail_obj,
      };
      let res = await this.api_fn_create(params);
      let { code, msg, data } = res.data;
      if (data.id) {
        this.handle_md_update(data.id);
      }
    },

    // 在原基础上新建的  md 编辑弹窗内点击确定 后
    async handle_md_update(id) {
      let this_ = this;
      this.mdobj.map((item) => {
        api_b_sdk_mddocpool.handle_create({ ...item, document: id }).then((res) => {
          this_.get_mddoc_history_by_language();
        });
      });
    },

    before_close_dialog() {
      // this.get_info()
    },

    /**
     *md 文档历史 内单个文档 开启关闭状态改变
     */
    async handle_historty_list_item_update(record,key,updateHook) {
      let res = await api_b_sdk_mddocpool.handle_update({
        id: record.id,
        [key]: record[key]
      })
      let { code, data, msg } = res.data
      if (code == '000000') {
        let obj = this.all_languages_mddoc_history[
          this.current_md_doc_history_tab
        ].find((x) => x.id == data.id);
        Object.assign(obj, data);
      } else {
        this.$q.notify(msg)
      }
      updateHook()
    },

    /**
     *md 文档历史 内单个文档  编辑 在原基础上新建
     */
    handle_historty_list_item_edit(item) {
      console.error(" 显示MD 编辑弹窗");
      console.error("item-", item);
      this.normal_md = { ...item };
      // 显示MD 编辑弹窗
      this.show_dialog_md_edit = true;
    },

    /**
     *md 文档历史 内单个文档  预览   点击文件名字
     */
    handle_historty_list_item_detail(item) {
      this.normal_md = { ...item };
      //显示 MD 预览弹窗
      this.show_dialog_preview = true;
    },
  },
};
</script>
<style lang="scss" scoped></style>
