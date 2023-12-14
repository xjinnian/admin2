<template>
  <div class="q-pa-md">
    <div ref="tableHeader">
      <!-- 导航栏 -->
      <div class="q-py-xs">
        <q-breadcrumbs>
          <q-breadcrumbs-el label="主页面" v-if="!is_child_component" />
          <q-breadcrumbs-el label="賽事管理" />
        </q-breadcrumbs>
      </div>
      <!-- 搜索区域 -->
      <div class="row q-my-sm q-gutter-sm" v-if="show_search_form_area">
        <q-input outlined v-model="search_form.name" label="赛事名称" dense class="w200 q-mr-md" />
        <q-input outlined v-model="search_form.race" label="赛种" dense class="w200 q-mr-md" />
        <q-select outlined clearable class="w200 q-mr-md" dense emit-value map-options :options="['WS', 'HTTP']"
          label="请求类型" v-model="search_form.request_type" />
        <q-select outlined clearable class="w200 q-mr-md" dense emit-value map-options
          :options="[{ label: '列表数据', value: 'list' }, { label: '详情数据', value: 'details' }]" label="数据类型"
          v-model="search_form.data_type" />
        <q-select outlined clearable class="w200 q-mr-md" dense emit-value map-options :options="$config.options_status"
          label="状态" v-model="search_form.status" />

        <q-space />
        <q-btn color="primary" glossy class="q-mr-md" @click="hadle_click_search" label="搜索" />
        <q-btn color="deep-orange" glossy @click="hadle_reset_search_form" label="重置" />
      </div>
    </div>
    <q-table class="sticky-header-table" :rows="table_data" :columns="columns" row-key="name"
      table-header-class="bg-grey-4 text-weight-bolder" hide-pagination hide-bottom v-model:pagination="pagination"
      :style="`max-height:${scroll_area_height}px`">
      <template v-slot:body-cell-column_type="props">
        <q-td :props="props">{{ props.row.column_type }} 列</q-td>
      </template>
      <template v-slot:body-cell-status="props">
        <q-td :props="props">
          <q-select filled dense emit-value map-options style="width: 130px" :options="$config.options_status"
            v-model="props.row.status" @update:model-value="handle_update_record_by_key(props.row, 'status')" />
        </q-td>
      </template>
      <template v-slot:body-cell-handle="props">
        <q-td :props="props">
          <q-btn color="primary" class="q-mr-md" glossy @click="toCompetitionSlice(props.row)" label="赛事切片" />
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
        <template #buildOptionText="props"> <span>{{ props.value }}条/页</span> </template>
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
import { api_competitionManage } from "src/api/index.js";
import { window_size_mixin, table_crud_mixin } from "src/mixin/index";
import EditComponent from "./components/edit.vue";

export default {
  components: { EditComponent, },
  mixins: [window_size_mixin, table_crud_mixin],
  data() {
    return {
      // API 命名空间
      api_namespace: api_competitionManage,
      // 列表 表格项配置
      columns,
      // 编辑弹窗内的数据
      detail_obj: {},
      // 搜索表单
      search_form: {},
    };
  },

  methods: {

    toCompetitionSlice({ id }) {
      this.$router.push({ name: 'competitionSlice', query: { cid: id } })
    }

  },
};
</script>
