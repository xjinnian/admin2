<template>
  <q-card class="my-card mw60vw q-px-md w60vw">
    <q-card-section class="no-padding">
      <div class="row">
        <div class="text-weight-bolder lh40">
          {{ detail_obj.id ? "编辑" : "新建" }}数据
        </div>
        <q-space />
        <div class="text-red text-weight-bolder lh40">
          请注意：每条数据单独保存
        </div>

        <q-space />
        <q-btn flat round icon="close" v-close-popup />
      </div>
    </q-card-section>
    <q-separator />
    <q-card-section class="q-py-md q-gutter-y-lg">
      <div class="row">
        <q-tabs v-model="current_tab" dense class="text-grey" active-color="primary" indicator-color="primary"
          align="justify" narrow-indicator v-for="(item, index) in all_tabs" :key="index">
          <q-tab :name="index" :label="index + 1" />
        </q-tabs>

        <div>
          <q-btn color="primary" @click="handle_add_img" label="新增" />
        </div>
      </div>

      <q-tab-panels v-model="current_tab" animated>
        <q-tab-panel v-for="(v, i) in all_tabs" :key="i" :name="i" class="q-gutter-y-md">
          <div class="row">
            <div class="w120 form-item-label">标题</div>
            <MulitLansInput class="col" :detail_obj="v['titles']" />
          </div>

          <div class="row">
            <div class="w120 form-item-label">描述</div>
            <MulitLansInput class="col" :detail_obj="v['descriptions']" />
          </div>

          <div class="row">
            <div class="w120 form-item-label">图片上传</div>
            <UploadImg @emit-file-path="(data) => handle_file_emit_upload_file_path(data, v)
              " />
          </div>

          <div class="row">
            <div class="w120 form-item-label">图片地址</div>
            <div class="col" v-if="v['path']">
              {{ $config.get_cdn_url(v['path']) }}
            </div>
          </div>
          <div class="row">
            <div class="w120 form-item-label">图片预览</div>
            <div class="col" v-if="v['path']">
              <img :src="$config.get_cdn_url(v['path'])" style="height: 300px" alt="" />
            </div>
          </div>

          <div class="row">
            <div class="w120 form-item-label">排序(从小到大)</div>
            <q-input class="col" filled dense style="width: 130px" v-model="v.order" type="number" />
          </div>

          <div class="row">
            <div class="w120 form-item-label">状态</div>
            <q-select class="col" filled dense emit-value map-options :options="$config.options_status"
              v-model="v.status" />
          </div>

          <div class="row">
            <div class="w120 form-item-label">备注</div>
            <q-input class="col" filled dense type="textarea" v-model="v.mark" />
          </div>
        </q-tab-panel>
      </q-tab-panels>
    </q-card-section>
    <q-separator />
    <q-card-actions align="right">
      <q-btn color="primary" @click="handle_conform_edit" :label="`保存第${current_tab + 1}条数据----`" />
      <q-btn v-close-popup color="deep-orange" glossy @click="handle_cancel_edit" label="关闭弹窗" />
    </q-card-actions>
  </q-card>
</template>
<script>
import { mapGetters } from "vuex";
import MulitLansInput from "src/components/mulit_lans_input/mulit_lans_input.vue";
import UploadImg from "src/components/upload/upload_img.vue";

import { api_imgDescription } from "src/api/index";

export default {
  emits: ["emit-edit"],
  components: {
    MulitLansInput,
    UploadImg,
  },
  data() {
    return {
      current_tab: 0,
      all_tabs: [],

      temp_obj: {
        path: "",
        status: 1,
        keyid: "",
        key_type: 0,
        titles: {},
        descriptions: {},
        mark: "",
        order: null,
      },
    };
  },
  props:['detail_obj','key_type','project','keyid'],
  computed: {
    ...mapGetters(["get_all_language"]),

    // 参数
    computed_params(){
      const { project,id } = this.detail_obj;
      return {
        keyid:this.keyid || id,
        key_type:this.key_type,
        project:this.project || project,
      }
    }
  },
  created() {
    console.log(this.detail_obj);
    this.fetchListByCssKeyId();
  },
  methods: {
    async fetchListByCssKeyId() {
      const { data } = await api_imgDescription.findListByKeyApi(
        { keyid: this.computed_params.keyid }
      );
      console.log(data)
      if (!data.success) return;

      if (data.data?.length) {
        this.all_tabs = data.data;
      } else {
        this.handle_add_img();
      }
    },

    /**
     * 添加图片描述
     */
    handle_add_img() {
      this.all_tabs.push({
        titles: {},
        descriptions: {},
        keyid: this.detail_obj.id,
        key_type: parseInt(this.key_type),
        status: 1,
        order: 10 * (this.all_tabs.length + 1),
      });
      this.current_tab = this.all_tabs.length - 1;
    },

    handle_file_emit_upload_file_path(obj, imgDesc) {
      imgDesc.path = obj.path.save_filepath;
    },

    /**
     * 确定 提交更改
     */
    async handle_conform_edit() {
      const form_data = this.all_tabs[this.current_tab]
      console.log(this.computed_params, form_data)
      let params = {
        ...form_data,
        ...this.computed_params,
      }
      if (!form_data.titles?.zh_cn)
        return this.$q.notify({ type: "negative", message: "中文标题必填", })

      if (!form_data.descriptions?.zh_cn)
        return this.$q.notify({ type: "negative", message: "中文描述必填", })
      console.log()

      await api_imgDescription.updateImgDescsApi(params);
    },

    /**
     * 取消  取消更改
     */
    handle_cancel_edit() { },
  },
};
</script>
<style lang="scss" scoped></style>
