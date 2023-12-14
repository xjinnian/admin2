<template>
  <div class="q-pa-md">
    <div ref="tableHeader">
      <!-- 导航栏 -->
      <div class="q-py-xs">
        <q-breadcrumbs>
          <q-breadcrumbs-el label="主页面" v-if="!is_child_component" />
          <q-breadcrumbs-el label="接口管理" />
        </q-breadcrumbs>
      </div>
      <!-- 搜索区域 -->
      <div class="row q-my-sm q-gutter-sm" v-if="show_search_form_area">
        <q-input outlined v-model="search_form.url" label="请求地址" dense class="w200 q-mr-md" />
        <q-select outlined clearable class="w200 q-mr-md" dense emit-value map-options :options="code_tag_list"
          option-label="name" option-value="id" label="code 码标签" v-model="search_form.code_tag_id" />
        <q-select outlined clearable class="w200 q-mr-md" dense emit-value map-options :options="$config.options_status"
          label="状态" v-model="search_form.status" />

        <q-space />
        <q-btn color="secondary" glossy class="q-mr-md" @click="hadle_click_create" label="新建" />
        <q-btn color="primary" glossy class="q-mr-md" @click="hadle_click_search" label="搜索" />
        <q-btn color="deep-orange" glossy @click="hadle_reset_search_form" label="重置" />
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
          <q-btn color="secondary" class="q-mr-md" glossy @click="handle_code_manage(props.row)" label="code 管理" />
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
      <EditComponent :detail_obj="detail_obj" :code_tag_list="code_tag_list" @emit-edit="handle_conform_edit"
        @emit-create-new-tag="to_create_new_tag" />
    </q-dialog>

    <!-- 创建标签 -->
    <q-dialog v-model="show_dialog_create_tag" persistent>
      <CreateTagComponent @emit-edit="on_create_tag" />
    </q-dialog>

    <!-- 状态码管理 -->
    <q-dialog v-model="show_dialog_code_manage" persistent>
      <CodeManageComponent :interface="interface" @emit-edit="save_code_list" />
    </q-dialog>
  </div>
</template>
<script>
import { columns } from "./config/index";
import { api_middlewareInterface, api_codeTag } from "src/api/index.js";
import { window_size_mixin, table_crud_mixin } from "src/mixin/index";
import EditComponent from "./components/edit.vue";
import CreateTagComponent from "./components/create_tag.vue";
import CodeManageComponent from "./components/code_manage.vue";

export default {
  components: {
    EditComponent,
    CreateTagComponent,
    CodeManageComponent,
  },
  mixins: [window_size_mixin, table_crud_mixin],
  data() {
    return {
      //API 命名空间
      api_namespace: api_middlewareInterface,
      //列表 表格项配置
      columns,
      //编辑弹窗内的数据
      detail_obj: {
        name: "",
        password: "",
      },
      //搜索表单
      search_form: {
      },
      show_dialog_create_tag: false,
      code_tag_list: [],
      interface: null,
      show_dialog_code_manage: false,
    };
  },

  created() {
    this.findCodeTag()
  },

  methods: {
    to_create_new_tag() {
      this.show_dialog_create_tag = true
    },

    async findCodeTag() {
      const { data } = await api_codeTag.handle_read()
      this.code_tag_list = data.data
    },

    async on_create_tag(tagInfo) {
      if (!tagInfo.name) {
        return this.$q.notify({ type: "negative", message: "标签名称必填", });
      }

      await api_codeTag.handle_create(tagInfo)
      this.findCodeTag()

      this.show_dialog_create_tag = false
    },

    handle_code_manage(row) {
      this.interface = row
      this.show_dialog_code_manage = true
    },

    save_code_list(data) {
      this.handle_conform_edit(data)
      this.interface = null
      this.show_dialog_code_manage = false
    },

  },
};
</script>
