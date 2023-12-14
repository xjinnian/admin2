<template>
  <div class="q-pa-md">
    <div ref="tableHeader">
      <!-- 导航栏 -->
      <div class="q-py-xs">
        <q-breadcrumbs>
          <q-breadcrumbs-el label="主页面" v-if="!is_child_component" />
          <q-breadcrumbs-el label="CSS配置" />
        </q-breadcrumbs>
      </div>
      <!-- 搜索区域 -->
      <div class="row q-my-sm q-gutter-sm" v-if="show_search_form_area">
        <q-input outlined clearable v-model="search_form.id" label="ID" dense class="w300 q-mr-md"
          @keyup.enter="hadle_click_search" />
        <q-input outlined clearable v-model="search_form.key" label="键名" dense class="w300 q-mr-md"
          @keyup.enter="hadle_click_search" />


          <q-select outlined clearable v-model="search_form.project" class="w300 q-mr-md" dense emit-value map-options
          :options="$config.options_client_project" label="布局模板" @update:model-value="search_form.group_id=undefined" />

          <FilterSelect v-model="search_form.group_id" :options="filterGroup_by_project"></FilterSelect>

        <q-select outlined clearable class="w200 q-mr-md" dense emit-value map-options :options="$config.options_status"
          label="状态" v-model="search_form.status" />

        <q-input outlined clearable v-model="search_form.value" label="默认值" dense class="w300 q-mr-md"
          @keyup.enter="hadle_click_search" />
        <q-input outlined clearable v-model="search_form.operator" label="最后操作人" dense class="w300 q-mr-md"
          @keyup.enter="hadle_click_search" />
        <q-checkbox v-model="search_form.no_upload_image" left-label label="图片未上传" />
        <q-checkbox v-model="search_form.exact_query" left-label label="精确查询" />
        <q-space />
        <q-btn color="purple" glossy class="q-mr-md" :loading="flush_imgdesc_loading" @click="hadle_flush_imgdesc" label="刷新图片描述统计" />
        <q-btn color="secondary" glossy class="q-mr-md" v-if="show_create_btn" @click="hadle_click_create" label="新建" />
        <q-btn color="primary" glossy class="q-mr-md" @click="hadle_click_search" label="搜索" />
        <q-btn color="deep-orange" glossy @click="hadle_reset_search_form" label="重置" />
      </div>
    </div>
    <q-table class="sticky-header-table" :rows="table_data" :columns="columns" row-key="name"
      table-header-class="bg-grey-4 text-weight-bolder" hide-pagination hide-bottom v-model:pagination="pagination"
      :style="`max-height:${scroll_area_height}px`">

      <template v-slot:body-cell-imgdesc="props">
        <q-td :props="props">
          <ImgDescriptionCount :detail_obj="props.row.imgdesc || {}" />
        </q-td>
      </template>
      <!-- 属性组 -->
      <template v-slot:body-cell-group_id="props">
        <q-td :props="props">
          {{ attribuits_map[props.value]?.names?.zh_cn }}
        </q-td>
      </template>

      <template v-slot:body-cell-value="props">
        <q-td :props="props">
          <DefaultValueComponent :value="props.row.value" :project="props.row.project" class="q-mr-md" />
          <!-- <img v-if="isShowCacheImage(props)" :src="cache_image_url[`${props.row.id}_${props.col.name}`]" width="50"
            height="50" class="thumbnail_image q-mr-md" /> -->
          {{ props.row.value }}
        </q-td>
      </template>
      <template v-slot:body-cell-descriptions="props">
        <q-td :props="props">
          <MulitLansShow :detail_obj="props.row.descriptions || {}" />
        </q-td>
      </template>
      <template v-slot:body-cell-handle="props">
        <q-td :props="props">
          <q-btn color="primary" class="q-mr-md" glossy @click="handle_img_description_record(props.row)" label="图片描述" />
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
      <EditComponent
        :attribuits_options="attribuits_options"
        :attribuits_map="attribuits_map"
        :detail_obj="detail_obj"
        @emit-edit="handle_conform_edit" />
    </q-dialog>
    <!-- 编辑弹窗  图片 录入的 -->
    <q-dialog v-model="show_dialog_img_description" persistent>
      <ImgDescription :detail_obj="detail_obj" :key_type="KEY_TYPE_CSS_KEY" @emit-edit="handle_conform_edit"
        @closeDialog="() => (show_dialog_img_description = false)" />
    </q-dialog>

  </div>
</template>
<script>
import { columns } from './config/index'
import { api_cssKey,api_imgDescription, api_keyGroup } from 'src/api/index.js'
import { window_size_mixin, table_crud_mixin } from 'src/mixin/index'
import EditComponent from './components/edit.vue'
import DefaultValueComponent from './components/default_value.vue'
import ImgDescription from 'src/components/img_description/img_description.vue'
import ImgDescriptionCount from 'src/components/img_description/img_description_count.vue'
import { mapGetters, mapActions } from 'vuex'
import { KEY_TYPE_CSS_KEY } from 'src/config/key_type'
import FilterSelect from 'src/components/filter-select'

export default {
  components: {
    EditComponent,
    ImgDescription,
    ImgDescriptionCount,
    DefaultValueComponent,
    FilterSelect
  },
  mixins: [window_size_mixin, table_crud_mixin],
  data() {
    return {
      KEY_TYPE_CSS_KEY,
      //API 命名空间
      api_namespace: api_cssKey,
      //列表 表格项配置
      columns,
      //编辑弹窗内的数据
      detail_obj: {
        // name: "",
        // password: "",
      },
      //搜索表单
      search_form: {
        id: '',
        key: '',
        group: '',
        project: '',
        status: '',
        exact_query: false,
        no_upload_image: false,

        valie: '',
        operator: ''
      },
      //图片 描述
      show_dialog_img_description: false,
      flush_imgdesc_loading: false,
      attribuits_options:[]
    }
  },
  computed: {
    filterGroup_by_project(){
      const project = this.search_form.project
      return !!project ? this.attribuits_options.filter(item=>item.project===project) : this.attribuits_options;
    },
      // 属性组映射map
     attribuits_map(){
      return this.attribuits_options.reduce((pre,next)=>{
        pre[next.id] = next
        return pre
      },{})
    },
    project_map(){
      return this.$config.options_client_project_map
    }
  },
  watch: {
  },
  created() {
    this.get_group_list()

  },
  methods: {
    async get_group_list(){
      const { data } = await api_keyGroup.handle_read({
        key_type: KEY_TYPE_CSS_KEY,
      })
      const docs = data?.data?.docs || []

      let css_level_map = this.$config.css_level_map

      let groups = docs.map(item=>{
        let label = this.project_map[item.project] + ' / ' + css_level_map[item.level] + ' / ' + item.names?.zh_cn
        return {
          ...item,
          label,
          value: item.id
        }
      })
      this.attribuits_options = groups
    },
    handle_img_description_record(item) {
      this.detail_obj = { ...item }
      this.show_dialog_img_description = true
    },

    async hadle_flush_imgdesc() {
      this.flush_imgdesc_loading = true
      try {
        await api_imgDescription.handle_flush({key_type: KEY_TYPE_CSS_KEY})
      } catch (error) {}
      this.$lodash.delay(() => {
        this.$q.notify({ type: "warning", message: "数据刷新中，请于3分钟后刷新列表！", })
        this.flush_imgdesc_loading = false
      }, 800)
    }
  }
}
</script>
