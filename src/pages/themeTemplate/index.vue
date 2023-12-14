<!--
 * @FilePath: /client-api-doc-admin/src/pages/themeTemplate/index.vue
 * @Description:
-->
<template>
  <div class="q-pa-md">
    <div ref="tableHeader">
      <!-- 导航栏 -->
      <div class="q-py-xs">
        <q-breadcrumbs><q-breadcrumbs-el label="主页面" /><q-breadcrumbs-el label="布局模板" /></q-breadcrumbs>
      </div>

      <!-- 搜索区域 -->
      <div class="row q-my-sm q-gutter-sm" v-if="show_search_form_area">
        <q-input outlined clearable v-model="search_form.id" label="ID" dense class="w300 q-mr-md"
          @keyup.enter="hadle_click_search" />
        <q-input outlined clearable v-model="search_form.name" label="键名" dense class="w300 q-mr-md"
          @keyup.enter="hadle_click_search" />
        <q-space />
        <q-btn color="secondary" glossy class="q-mr-md" v-if="show_create_btn" @click="hadle_click_create" label="新建" />
        <q-btn color="primary" glossy class="q-mr-md" @click="hadle_click_search" label="搜索" />
        <q-btn color="deep-orange" glossy @click="hadle_reset_search_form" label="重置" />
      </div>
    </div>
    <q-table class="sticky-header-table" :rows="table_data" :columns="columns" row-key="name"
      table-header-class="bg-grey-4 text-weight-bolder" hide-pagination hide-bottom v-model:pagination="pagination"
      :style="`max-height:${scroll_area_height}px`">
      <template v-slot:body-cell-handle="props">
        <q-td :props="props">
          <q-btn color="primary" class="q-mr-md" glossy @click="handle_edit_record(props.row)" label="编辑" />
          <q-btn color="primary" class="q-mr-md" glossy @click="handle_img_description_record(props.row)" label="图片描述" />
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

  <!-- 弹窗 图片描述 -->
  <q-dialog v-model="show_dialog_img_description" persistent>
    <ImgDescription :detail_obj="detail_obj"  @emit-edit="handle_conform_edit"
      :key_type="KEY_TYPE_THEME_KEY"
      @closeDialog="() => (show_dialog_img_description = false)" />
  </q-dialog>
</template>
<script>
import { columns } from './config/index'
import { api_themeTemplate } from 'src/api/index.js'
import { window_size_mixin, table_crud_mixin } from 'src/mixin/index'
import EditComponent from './components/edit.vue'
import ImgDescription from 'src/components/img_description/img_description.vue'
import { KEY_TYPE_THEME_KEY } from 'src/config/key_type'
export default {
  components: { EditComponent, ImgDescription },
  mixins: [window_size_mixin, table_crud_mixin],
  data() {
    return {
      KEY_TYPE_THEME_KEY,
      //API 命名空间
      api_namespace: api_themeTemplate,
      //列表 表格项配置
      columns,
      //编辑弹窗内的数据
      detail_obj: {},
      //搜索表单
      search_form: {
        id: '',
        name: '',
      },
      //图片 描述
      show_dialog_img_description: false,
    }
  },
  created() {
  },
  methods: {
    handle_img_description_record(item) {
      this.detail_obj = { ...item }
      this.show_dialog_img_description = true
    },
  }
}
</script>
