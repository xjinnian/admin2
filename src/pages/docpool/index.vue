<!--
 *
 * @LastEditTime: 2022-09-23 16:48:49
 * @Description    :
-->
<template>
  <div class="q-pa-md">
    <div ref="tableHeader">
      <!-- 导航栏 -->
      <div class="q-py-xs">
        <q-breadcrumbs>
          <q-breadcrumbs-el label="主页面" v-if="!is_child_component" />
          <q-breadcrumbs-el
            :label="
              $route.meta.type == 'faq' ? '常见问题模块' : '文档资源池模块'
            "
          />
        </q-breadcrumbs>
      </div>
      <!-- 搜索区域 -->
      <div class="row q-my-sm q-gutter-sm" v-if="show_search_form_area">
        <q-input
          outlined
          v-model="search_form.name"
          dense
          label="标题"
          class="w200 q-mr-md"
        >
        </q-input>
        <q-input
          outlined
          v-model="search_form.url"
          dense
          label="url"
          class="w200 q-mr-md"
        >
        </q-input>
        <q-input
          outlined
          v-model="search_form.id"
          dense
          label="ID"
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
      <template v-slot:body-cell-url="props">
        <q-td :props="props">
          <div
            v-html="
              props.row.url &&
              props.row.url
                .split('\n')
                .join('<br/>')
                .split(',')
                .join('<br/>')
                .split('，')
                .join('<br/>')
            "
          ></div>
        </q-td>
      </template>

      <template v-slot:body-cell-page_address="props">
        <q-td :props="props">
          <div
            class="cursor-pointer text-blue"
            @click="
              $utils.copy_text(
                `http://api-doc-2.sportxxxw1box.com/#/main/detail?type=doc&id=${props.row.id}`
              )
            "
          >
            复制哈希链接
          </div>
        </q-td>
      </template>
      <!-- 语种开启情况 -->
      <template v-slot:body-cell-mulit_language="props">
        <q-td :props="props">
          <div
            v-for="(value, key) in props.row.mulit_language || {}"
            :key="key"
          >
            {{ (get_all_language_obj[key] || {})["name"] }}
          </div>
        </q-td>
      </template>
      <!-- 主题标签 -->
      <template v-slot:body-cell-topic="props">
        <q-td :props="props">
          <div v-for="(item, index) in props.row.topic || {}" :key="index">
            {{ (get_questionTopic_obj[`k_${item}`] || {})["show_name"] }}
          </div>
        </q-td>
      </template>

      <template v-slot:body-cell-handle="props">
        <q-td :props="props">
          <div class="row q-gutter-x-md justify-center" style="width: 450px">
            <q-select
              filled
              dense
              emit-value
              map-options
              style="width: 80px"
              :options="$config.options_status"
              v-model="props.row.status"
              @update:model-value="
                handle_update_record_by_key(props.row, 'status')
              "
            />
            <q-btn
              color="primary"
              glossy
              @click="handle_preview_record(props.row)"
              label="预览"
            />
            <q-btn
              color="primary"
              glossy
              @click="handle_edit_record(props.row)"
              label="编辑"
            />

            <q-btn
              color="primary"
              glossy
              @click="handle_show_update_record(props.row)"
              label="更新记录"
            />

            <q-btn
              color="deep-orange"
              glossy
              @click="handle_delete_record(props.row)"
              label="删除"
              v-if="$config.show_delete"
            />
          </div>
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
      <ArticleEdit :detail_obj="detail_obj" @emit-close="handle_close_dialog" />
    </q-dialog>
    <!-- 预览弹窗 -->
    <q-dialog v-model="show_dialog_preview" persistent>
      <ArticlePreview :detail_obj="detail_obj" />
    </q-dialog>
  </div>
</template>
<script>
import { columns } from "./config/index";
import { mapActions } from "vuex";
import { api_docpool } from "src/api/index.js";
import { window_size_mixin, table_crud_mixin } from "src/mixin/index";
import ArticleEdit from "./components/edit_wapper.vue";
import ArticlePreview from "src/components/preview/preview.vue";
import ShowBadge from "src/components/badge/badge.vue";
export default {
  components: {
    ArticleEdit,
    ShowBadge,
    ArticlePreview,
  },
  mixins: [window_size_mixin, table_crud_mixin],
  data() {
    return {
      //API 命名空间
      api_namespace: api_docpool,
      //列表 表格项配置
      columns,
      //编辑弹窗内的数据
      detail_obj: {
        name: "",
        status: -1,
        order: 0,
      },
      //搜索表单
      search_form: {
        id: "",
        name: "",
        url: "",
      },

      //预览弹窗
      show_dialog_preview: false,
      //更新记录弹窗
      show_dialog_update_record: false,
    };
  },
  methods: {
    ...mapActions(["set_all_faq"]),
    //增删改     之后 的附加回调方法
    handle_edit_additional_callback() {
      this.set_all_documdent();
    },

    /**
     * 显示预览 弹窗
     * @param {*} record
     */
    handle_preview_record(record) {
      this.detail_obj = record;
      console.error("record--------", record);

      this.show_dialog_preview = true;
    },
    /**
     * 显示更新记录 弹窗
     * @param {*} record
     */
    handle_show_update_record(record) {
      this.detail_obj = record;

      this.show_dialog_update_record = true;
    },
  },
};
</script>
