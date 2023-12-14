<!--
 * @FilePath: /client-api-doc-admin/src/pages/packingProcess/index.vue
 * @Description:
-->
<template>
  <div class="q-pa-md">
    <div ref="tableHeader">
      <!-- 导航栏 -->
      <div class="q-py-xs">
        <q-breadcrumbs>
          <q-breadcrumbs-el label="主页面" v-if="!is_child_component" />
          <q-breadcrumbs-el label="打包进程模块" />
        </q-breadcrumbs>
      </div>
      <!-- 搜索区域 -->
      <div class="row q-my-sm q-gutter-sm" v-if="show_search_form_area">
        <q-input outlined v-model="search_form.puck_up_record_id" label="版本号" dense class="w200 q-mr-md">
        </q-input>
        <q-space />
        <q-btn color="secondary" glossy class="q-mr-md"   @click="hadle_click_refresh" label="刷新" />
        <q-btn color="primary" glossy class="q-mr-md" @click="hadle_click_search" label="搜索" />
        <q-btn color="deep-orange" glossy @click="hadle_reset_search_form" label="重置" />
      </div>
    </div>
    <q-table class="sticky-header-table" :rows="table_data" :columns="columns" row-key="name"
      table-header-class="bg-grey-4   text-weight-bolder" hide-pagination hide-bottom v-model:pagination="pagination"
      :style="`max-height:${scroll_area_height}px`">
      <template v-slot:body-cell-project="props">
        <q-td :props="props">{{ $config.options_client_project_map[props.row.project] }}</q-td>
      </template>
      <template v-slot:body-cell-handle="props">
        <q-td :props="props">

          <q-btn color="deep-orange" glossy   @click="handle_delete_record(props.row)"
            label="删除" />
        </q-td>
      </template>
    </q-table>
    <!-- 底部翻页器 -->
    <div class="q-mt-md row justify-center" v-if="show_pagination_area">
      <a-pagination v-model:current="currentPage" :page-size-options="pageSizeOptions" :total="total" show-size-changer
        show-quick-jumper :page-size="pageSize" :show-total="(total) => `总共 ${total} 条`" @change="onChange"
        @showSizeChange="onShowSizeChange">
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
      <EditComponent :detail_obj="detail_obj" @emit-edit="handle_conform_edit" />
    </q-dialog>
  </div>
</template>
<script>
import { columns } from "./config/index";
import { api_packingProcess } from "src/api/index.js";
import { window_size_mixin, table_crud_mixin } from "src/mixin/index";
import EditComponent from "./components/edit.vue";
import { handle_read } from 'src/api/module/layoutTemplate';
export default {
  components: {
    EditComponent,
  },
  mixins: [window_size_mixin, table_crud_mixin],
  data() {
    return {
      //API 命名空间
      api_namespace: api_packingProcess,
      //显示 新建按钮
      show_create_btn: false,
      //显示编辑按钮
      show_edit_btn: false,
      //显示翻页器功能区
      show_pagination_area: false,
      //列表 表格项配置
      columns,
      //编辑弹窗内的数据
      detail_obj: {
        name: "",
        password: "",
      },
      //搜索表单
      search_form: {
        puck_up_record_id: "",
      },
    };
  },
  created() {
  },
  methods: {
    async hadle_click_refresh(item){

      await api_packingProcess.handle_refresh()
      this.init_table_data()
    }
  }
};
</script>
