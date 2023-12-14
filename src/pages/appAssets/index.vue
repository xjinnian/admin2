<template>
  <div class="q-pa-md">
    <div ref="tableHeader">
      <!-- 导航栏 -->
      <div class="q-py-xs">
        <q-breadcrumbs>
          <q-breadcrumbs-el label="主页面" v-if="!is_child_component" />
          <q-breadcrumbs-el label="APP素材管理" />
        </q-breadcrumbs>
      </div>
      <q-tabs
        v-model="search_form.project"
        class=" shadow-10 q-mt-md"
      >
        <q-tab v-for="item in ['cp','dj','ty']" :key="item" :name="item" :label="item" />
      </q-tabs>
      <!-- 搜索区域 -->
      <div class="row q-my-sm q-gutter-sm" v-if="show_search_form_area">
        <q-input
          outlined
          clearable
          v-model="search_form.path"
          label="文件原路径"
          dense
          class="w300 q-mr-md"
          @keyup.enter="hadle_click_search" />
        <q-input
          outlined
          clearable
          v-model="search_form.url"
          label="服务器地址"
          dense
          class="w300 q-mr-md"
          @keyup.enter="hadle_click_search" />

        <q-space />
        <q-btn
          color="secondary"
          glossy
          class="q-mr-sm"
          @click="show_dialog_upload=true"
          :label="search_form.project+'文件上传'"
        />
        <q-btn
          color="secondary"
          glossy
          class="q-mr-sm"
          @click="hadle_click_scan"
          :label="'扫描'+search_form.project"
        />
        <q-btn
          color="primary"
          glossy
          class="q-mr-sm"
          @click="hadle_click_search"
          label="搜索"
          />
          <q-btn
            color="deep-orange"
            glossy
            @click="hadle_reset_search_form"
            label="重置"
          />
        <!-- <q-btn
          color="secondary"
          glossy
          class="q-mr-md"
          v-if="show_create_btn"
          @click="hadle_click_create"
          label="新建"
        /> -->
      </div>
    </div>
    <q-table
      class="sticky-header-table"
      :rows="table_data"
      :columns="columns"
      row-key="id"
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
            @click="handle_erweima_record(props.row)"
            label="二维码"
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
    <q-dialog v-model="show_dialog_ewm" persistent>
      <QrCodeComponent
        :title="detail_obj.name"
        :qr_text="qr_text"
        :copy_text="qr_text"
      />
    </q-dialog>
    <!-- 文件上传 -->
    <q-dialog v-model="show_dialog_upload" persistent>
      <UploadAssets
        :project="search_form.project"
        @emit-edit="handle_conform_upload"
        />
    </q-dialog>
  </div>
</template>
<script>
import { columns } from "./config/index";
import { api_admin,api_appAssets } from "src/api/index.js";
import { window_size_mixin, table_crud_mixin } from "src/mixin/index";
import EditComponent from "./components/edit.vue";
import UploadAssets from "./components/upload.vue";
import QrCodeComponent from "src/components/qr-code/qr-code.vue";
export default {
  components: {
    EditComponent,
    QrCodeComponent,
    UploadAssets
  },
  mixins: [window_size_mixin, table_crud_mixin],
  data() {
    return {
      //API 命名空间
      api_namespace: api_appAssets,
      //列表 表格项配置
      columns,
      //编辑弹窗内的数据
      detail_obj: {
        name: "",
        password: "",
      },
      //搜索表单
      search_form: {
        project: 'cp',
      },
      show_dialog_ewm: false,
      show_dialog_ewm: false,
      show_dialog_upload: false,
    };
  },
  watch:{
    'search_form.project'(){
      this.init_table_data()
      console.log(this.search_form);
    }
  },
  methods:{
    async hadle_click_scan(){
      if(!this.search_form.project){
        this.$q.notify({type:'warning',message:'请选择项目'})
        return
      }
      const res = await api_appAssets.handle_scan({project:this.search_form.project})
      this.init_table_data()
    },
    handle_conform_edit(res){
      this.table_data = res;
      this.show_dialog_edit = false
    },
    // 二维码
    handle_erweima_record(record){
      this.detail_obj = record
      this.qr_text = this.$config.get_cdn_url(record.url)
      this.show_dialog_ewm = true
    },
    // 上传完成回调
    async handle_conform_upload(){
      await this.init_table_data()
      this.show_dialog_upload = false
    }
  }
};
</script>
