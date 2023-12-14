<template>
  <div class="q-pa-md">
    <div ref="tableHeader">
      <!-- 导航栏 -->
      <div class="q-py-xs">
        <q-breadcrumbs>
          <q-breadcrumbs-el label="主页面" v-if="!is_child_component" />
          <q-breadcrumbs-el label="商户配置记录" />
        </q-breadcrumbs>
      </div>
      <!-- 搜索区域 -->
      <div class="row q-my-sm q-gutter-sm" v-if="show_search_form_area">
        <q-input outlined v-model="search_form.operator" label="用户名字" dense class="w200 q-mr-md">
        </q-input>
        <q-space />
        <!-- <q-btn
          color="secondary"
          glossy
            class="q-mr-md"
            v-if="show_create_btn"
            @click="hadle_click_create"
            label="新建"
          /> -->
        <q-btn color="purple" glossy class="q-mr-md" :loading="flush_imgUrl_loading" @click="hadle_flush_imgUrl"
          label="刷新图片地址" />
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
          <q-btn color="primary" class="q-mr-md" glossy @click="handle_edit_record(props.row)" label="编辑" />
          <q-btn color="deep-orange" glossy v-if="$config.show_delete" @click="handle_delete_record(props.row)"
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
import { api_keyConfigRecord } from "src/api/index.js";
import { window_size_mixin, table_crud_mixin } from "src/mixin/index";
import EditComponent from "./components/edit.vue";

export default {
  components: {
    EditComponent,
  },
  mixins: [window_size_mixin, table_crud_mixin],
  data() {
    return {
      flush_imgUrl_loading:false,
      //API 命名空间
      api_namespace: api_keyConfigRecord,
      //列表 表格项配置
      columns,
      //编辑弹窗内的数据
      detail_obj: {
        // name: '',
        // password: ''
      },
      //搜索表单
      search_form: {
        operator: "",
      },
    };
  },
  methods:{
    async hadle_flush_imgUrl() {
      this.flush_imgUrl_loading = true
      try {
        const { data } = await api_keyConfigRecord.handle_flush_imgUrl()
        this.flush_imgUrl_loading = false
        const message = data?.data?.message || ''
        await this.init_table_data()
        this.$q.notify({ type: "positive", message })
      } catch (error) {
        console.error(error);
      }
    },
  }
};
</script>
