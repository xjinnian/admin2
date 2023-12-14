<template>
  <div class="q-pa-md">
    <div ref="tableHeader">
      <!-- 导航栏 -->
      <div class="q-py-xs">
        <q-breadcrumbs>
          <q-breadcrumbs-el label="主页面" v-if="!is_child_component" />
          <q-breadcrumbs-el label="彩票电竞SDK管理" />
        </q-breadcrumbs>
      </div>
      <!-- 搜索区域 -->
      <div class="row q-my-sm q-gutter-sm" v-if="show_search_form_area">
        <q-input
          outlined
          v-model="search_form.version"
          label="版本"
          dense
          class="w200 q-mr-md"
        >
        </q-input>
        <q-space />
        <q-btn
          color="secondary"
          glossy
          class="q-mr-md"
          v-if="show_create_btn"
          @click="hadle_click_create"
          label="新建"
        />
        <q-btn
          color="primary"
          glossy
          class="q-mr-md"
          @click="hadle_click_search"
          label="搜索"
        />
        <q-btn
          color="deep-orange"
          glossy
          @click="hadle_reset_search_form"
          label="重置"
        />
      </div>
    </div>
    <q-table
      class="sticky-header-table"
      :rows="table_data"
      :columns="columns"
      row-key="name"
      table-header-class="bg-grey-4   text-weight-bolder"
      hide-pagination
      hide-bottom
      v-model:pagination="pagination"
      :style="`max-height:${scroll_area_height}px`"
    >
      <template v-slot:body-cell-handle="props">
        <q-td :props="props">
          <q-btn
            color="primary"
            class="q-mr-md"
            glossy
            @click="handle_qrcode_record(props.row)"
            label="二维码"
          />
          <q-btn
            color="primary"
            class="q-mr-md"
            glossy
            @click="handle_cope_record(props.row)"
            label="复制地址"
          />
          <q-btn
            color="primary"
            class="q-mr-md"
            glossy
            @click="handle_edit_record(props.row)"
            label="编辑"
          />
          <q-btn
            color="deep-orange"
            glossy
            v-if="$config.show_delete"
            @click="handle_delete_record(props.row)"
            label="删除"
          />
        </q-td>
      </template>
    </q-table>
    <!-- 底部翻页器 -->
    <div class="q-mt-md row justify-center" v-if="show_pagination_area">
      <a-pagination
        v-model:current="currentPage"
        :page-size-options="pageSizeOptions"
        :total="total"
        show-size-changer
        show-quick-jumper
        :page-size="pageSize"
        :show-total="(total) => `总共 ${total} 条`"
        @change="onChange"
        @showSizeChange="onShowSizeChange"
      >
        <template #itemRender="{ type, originalElement }">
          <a v-if="type === 'prev'">上一页</a>
          <a v-else-if="type === 'next'">下一页</a>
          <component :is="originalElement" v-else></component>
        </template>
        <template #buildOptionText="props">
          <span>{{ props.value }}条/页</span>
        </template>
      </a-pagination>
    </div>

    <!-- 编辑弹窗 -->
    <q-dialog v-model="show_dialog_edit" persistent>
      <EditComponent
        :detail_obj="detail_obj"
        @emit-edit="handle_conform_edit"
      />
    </q-dialog>

    <!-- 二维码弹窗 -->
    <q-dialog v-model="show_dialog_qrcode" persistent>
      <QrCodeComponent
        :title="detail_obj.name"
        :qr_text="qr_text"
        :copy_text="copy_text"

      />
    </q-dialog>
  </div>
</template>
<script>
import { columns ,use_option_type ,use_option_status } from "./config/index";

import { api_appSdkVersion } from "src/api/index.js";
import { window_size_mixin, table_crud_mixin } from "src/mixin/index";
import EditComponent from "./components/edit.vue";
import QrCodeComponent from "src/components/qr-code/qr-code.vue";
import { copyToClipboard } from "quasar";
import moment from "moment";

export default {
  components: {
    EditComponent,
    QrCodeComponent,
  },
  mixins: [window_size_mixin, table_crud_mixin],
  data() {
    return {
      //API 命名空间
      api_namespace: api_appSdkVersion,
      //列表 表格项配置
      columns,
      //编辑弹窗内的数据
      detail_obj: {

      },
      //搜索表单
      search_form: {
        version: "",
      },
      //二维码 弹窗
      show_dialog_qrcode: false,
      qr_text:'',
      copy_text:''

    };
  },
  methods: {
    handle_qrcode_record(item) {
      this.detail_obj = item;
      this.qr_text = this.$config.get_cdn_url(item.path);
      this.copy_text =  this.compute_copy_str(item)   ;
      this.show_dialog_qrcode = true;
    },
    compute_copy_str(item){
      let url = this.$config.get_cdn_url(item.path);

      let str =`
    名字 ：${item.name}
    版本 ：${item.version}
    环境 ：${item.env}
    人员 ：${item.operator}
    类型 ：${use_option_type(item.type).label}
    内外 ：${use_option_status(item.status).label}
    日期 ：${moment(item.createdAt).format("YYYY-MM-DD HH:mm:ss")}
    地址 ：${url}
      `
      return  str

    },
    handle_cope_record(item) {

      let str = this.compute_copy_str(item)


      copyToClipboard(str)
        .then(() => {
          this.$q.notify(`已复制：${str}`);
        })
        .catch(() => {
          // fail
        });
    },
  },
};
</script>
