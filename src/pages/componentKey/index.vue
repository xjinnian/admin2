<template>
  <div class="q-pa-md">
    <div ref="tableHeader">
      <!-- 导航栏 -->
      <div class="q-py-xs">
        <q-breadcrumbs>
          <q-breadcrumbs-el label="主页面" v-if="!is_child_component" />
          <q-breadcrumbs-el label="组件文档" />
        </q-breadcrumbs>
      </div>
      <!-- 搜索区域 -->
      <div class="row q-my-sm q-gutter-sm" v-if="show_search_form_area">
        <q-input outlined clearable v-model="search_form.name" label="组件名称" dense class="w300 q-mr-md"
          @keyup.enter="hadle_click_search" />
        <q-input outlined clearable v-model="search_form.component_name" label="目标组件名称" dense class="w300 q-mr-md"
          @keyup.enter="hadle_click_search" />
        <q-select outlined clearable v-model="search_form.project" class="w300 q-mr-md" dense emit-value map-options
          :options="$config.options_client_project" label="布局模板" @update:model-value="search_form_group_data = null" />
        <q-space />
        <q-btn color="primary" glossy class="q-mr-md" @click="hadle_click_search" label="搜索" />
        <q-btn color="deep-orange" glossy @click="hadle_reset_search_form" label="重置" />
      </div>
    </div>
    <q-table class="sticky-header-table" :rows="table_data" :columns="columns" row-key="name"
      table-header-class="bg-grey-4 text-weight-bolder" hide-pagination hide-bottom v-model:pagination="pagination"
      :style="`max-height:${scroll_area_height}px`">
      <template v-slot:body-cell-project="props">
        <q-td :props="props">{{ $config.options_client_project_map[props.row.project] }}</q-td>
      </template>
      <template v-slot:body-cell-descriptions="props">
        <q-td :props="props">
          <MulitLansShow :detail_obj="props.row.descriptions || {}" />
        </q-td>
      </template>
      <template v-slot:body-cell-handle="props">
        <q-td :props="props">
          <q-btn color="primary" class="q-mr-md" glossy @click="handle_edit_record(props.row)" label="编辑" />
          <q-btn color="primary" class="q-mr-md" glossy @click="handle_img_description_record(props.row)" label="图片描述" />
          <q-btn color="primary" class="q-mr-md" glossy @click="handle_component_doc_history(props.row)" label="历史版本" />
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
  </div>

  <!-- 编辑弹窗 -->
  <q-dialog v-model="show_dialog_edit" persistent>
    <EditComponent :detail_obj="detail_obj" @emit-edit="handle_conform_edit" />
  </q-dialog>

  <!-- 编辑弹窗  图片 录入的 -->
  <q-dialog v-model="show_dialog_img_description" persistent>
    <ImgDescription :detail_obj="detail_obj" :key_type="KEY_TYPE_COMPONENT_KEY" @emit-edit="handle_conform_edit"
      @closeDialog="() => (show_dialog_img_description = false)" />
  </q-dialog>

  <!-- 组件文档历史 -->
  <q-dialog v-model="show_dialog_component_doc_history" persistent>
    <ComponentDocHistory :detail_obj="detail_obj" @closeDialog="() => (show_dialog_component_doc_history = false)" />
  </q-dialog>
</template>
<script>
import { columns } from './config/index'
import { api_componentKey } from 'src/api/index.js'
import { window_size_mixin, table_crud_mixin } from 'src/mixin/index'
import EditComponent from './components/edit.vue'
import ComponentDocHistory from './components/component_doc_history.vue'
import ImgDescription from 'src/components/img_description/img_description.vue'
import { KEY_TYPE_COMPONENT_KEY } from 'src/config/key_type'

export default {
  components: {
    EditComponent,
    ImgDescription,
    ComponentDocHistory,
  },
  mixins: [window_size_mixin, table_crud_mixin],
  data() {
    return {
      KEY_TYPE_COMPONENT_KEY,
      //API 命名空间
      api_namespace: api_componentKey,
      //列表 表格项配置
      columns,
      //编辑弹窗内的数据
      detail_obj: {},
      //搜索表单
      search_form: {},
      //图片 描述
      show_dialog_img_description: false,

      // 历史版本弹窗
      show_dialog_component_doc_history: false,
    }
  },
  methods: {
    handle_img_description_record(item) {
      this.detail_obj = { ...item }
      this.show_dialog_img_description = true
    },

    handle_component_doc_history(item) {
      this.detail_obj = { ...item }
      this.show_dialog_component_doc_history = true
    }
  }
}
</script>
