<template>
  <div class="q-pa-md">
    <div ref="tableHeader">
      <!-- 导航栏 -->
      <div class="q-py-xs">
        <q-breadcrumbs>
          <q-breadcrumbs-el label="主页面" v-if="!is_child_component" />
          <q-breadcrumbs-el label="賽事切片管理" />
        </q-breadcrumbs>
      </div>
      <div class="competition_info_layout">
        <div><label>赛事名称：</label>{{competition_info.name}}</div>
        <div><label>赛种：</label>{{competition_info.race}}</div>
        <div><label>数据类型：</label>{{DATA_TYPE_MAP[competition_info.data_type]}}</div>
        <div class="_line"></div>
        <div><label>请求类型：</label>{{competition_info.request_type}}</div>
        <div><label>请求接口：</label>{{interface_info.url}}</div>
      </div>
      <!-- 搜索区域 -->
      <div class="row q-my-sm q-gutter-sm" v-if="show_search_form_area">
        <q-space />
        <q-btn color="secondary" glossy class="q-mr-md" @click="hadle_click_create" label="新建切片" />
      </div>
    </div>
    <q-table class="sticky-header-table" :rows="table_data" :columns="columns" row-key="name"
      table-header-class="bg-grey-4 text-weight-bolder" hide-pagination hide-bottom v-model:pagination="pagination"
      :style="`max-height:${scroll_area_height}px`">
      <template v-slot:body-cell-code_state_list="{ row }">
        <q-td :props="props">
          <q-markup-table dense flat bordered class="text-left" v-if="row.code_state_list.length">
            <tbody>
              <q-tr v-for="(v, i) in row.code_state_list" :key="i">
                <q-td class="q-px-md w120"> {{ v.code }}: </q-td>
                <q-td class="q-px-md w100"> {{ v.desc }} </q-td>
              </q-tr>
            </tbody>
          </q-markup-table>
        </q-td>
      </template>
      <template v-slot:body-cell-handle="props">
        <q-td :props="props">
          <q-btn color="primary" class="q-mr-md" glossy @click="handle_edit_record(props.row)" label="编辑" />
          <q-btn color="deep-orange" glossy v-if="$config.show_delete" @click="handle_delete_record(props.row, { cid })"
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
      <EditComponent :detail_obj="detail_obj" :competition_info="competition_info" :code_tag_list="code_tag_list" @emit-edit="handle_conform_edit" />
    </q-dialog>

  </div>
</template>
<script>
import { columns } from "./config/index";
import { api_competitionSlice, api_competitionManage, api_middlewareInterface } from "src/api/index.js";
import { window_size_mixin, table_crud_mixin } from "src/mixin/index";
import EditComponent from "./components/edit.vue";
import { DATA_TYPE_MAP } from "../competitionManage/config";

export default {
  components: { EditComponent, },
  mixins: [window_size_mixin, table_crud_mixin],
  data() {
    const cid = this.$route.query.cid
    return {
      cid,
      //API 命名空间
      api_namespace: api_competitionSlice,
      init_table_when_created: false,
      //列表 表格项配置
      columns,
      //编辑弹窗内的数据
      detail_obj: { cid },
      //搜索表单
      search_form: { cid },

      competition_info: {},
      interface_info: {},
    };
  },

  created() {
    this.DATA_TYPE_MAP = DATA_TYPE_MAP
    this.findCompetitionByCid()
  },

  mounted() {
    this.hadle_click_search()
  },

  methods: {
    async findCompetitionByCid() {
      const {data} = await api_competitionManage.findOneByCidApi(this.$route.query.cid)
      this.competition_info = data.data
      this.findInterfaceInfoById(data.data.interface_id)
    },

    async findInterfaceInfoById(id) {
      const {data} = await api_middlewareInterface.handle_info({id})
      this.interface_info = data.data
    },
  },
};
</script>

<style lang="scss" scoped>
.competition_info_layout {
  margin-top: 10px;
  padding: 8px;
  display: flex;
  flex-wrap: wrap;
  border-radius: 4px;
  line-height: 2.6;
  background-color: #e0e0e0;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2),
              0 2px 2px rgba(0, 0, 0, 0.14),
              0 3px 1px -2px rgba(0, 0, 0, 0.12);

  >div {
    min-width: 300px;
    display: flex;

    &._line {
      flex-basis: 100%;
    }

    >label {
      color: #888;
    }
  }
}
</style>