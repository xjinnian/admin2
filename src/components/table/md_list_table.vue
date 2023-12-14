<!--
 * @Author: eisha
 * @Description:
 * @FilePath: \sports-rules-admin\src\components\table\md_list_table.vue
-->
<template>
  <div>
    <div class="row q-my-sm fw800">历史文档参照</div>
    <q-markup-table class="text-center" style="max-height: 300px">
      <thead>
        <tr>
          <th>序号</th>
          <th>名称</th>
          <th>作者</th>
          <th>创建时间</th>
          <th>更新时间</th>
          <th>备注</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in historty_list" :key="index">
          <td class="">{{ index + 1 }}</td>
          <td class="">
            <div class="ellipsis-line">
              <a @click="click_item(item)">{{ item.name }}</a>
            </div>
          </td>
          <td class="">
            <div class="ellipsis-line">
              {{ item.author }}
            </div>
          </td>
          <td class="">
            {{ date.formatDate(item.createdAt, 'YYYY-MM-DD HH:mm:ss ') }}
          </td>
          <td class="">
            {{ date.formatDate(item.updatedAt, 'YYYY-MM-DD HH:mm:ss ') }}
          </td>
          <td class="">
            <q-input v-model="item.mark" filled type="textarea" maxlength="80" @blur="saveMark(item)" />
          </td>
          <td class="q-gutter-x-md row">
            <q-select
              filled
              dense
              emit-value
              map-options
              style="width: 80px"
              :options="$config.options_status"
              v-model="item.status"
              @update:model-value="check_state(item, 'status')"
            />
            <q-btn color="primary" glossy @click="click_edit(item)" label="原基础上新建" />
            <q-btn color="primary" label="下载" @click="$utils.handle_download_md_file(item.path, item.name)" />
          </td>
        </tr>
      </tbody>
    </q-markup-table>
  </div>
</template>
<script>
import { date } from 'quasar'
export default {
  emits: ['item_edit', 'item_detail', 'item_update'],
  // mixins: [table_crud_mixin],
  setup() {
    return {}
  },
  data() {
    return {
      // api_namespace,
      date
    }
  },
  props: {
    //历史记录
    historty_list: {
      type: Array
    }
  },
  methods: {
    /**
     * @description 编辑  原基础上新建
     * @param
     * @return
     */
    click_edit(item) {
      this.$emit('item_edit', item)
    },
    //查看详情
    click_item(item) {
      this.$emit('item_detail', item)
    },
    // 保存备注
    saveMark(item) {
      this.handle_update_record_by_key(item, 'mark')
    },
    //判断状态
    check_state(item) {
      console.log(item);
      let state_open = this.historty_list.find((val) => {
        if (val.state == 1 && val.id != item.id) return item
      })
      if (item.state == 1 && state_open) {
        this.$q.notify({
          timeout: 900,
          type: 'negative',
          message: '在当前语种下请先关闭其他历史md文档，再开启此md文档'
        })
        item.state = -1
        return
      }
      this.handle_update_record_by_key(item, 'status')
    },
    /**
     *更新单个字段
     */
    async handle_update_record_by_key(record, key) {
      this.$emit('item_update', record,key, this.$forceUpdate)
    }
  }
}
</script>
<style lang="scss" scoped>
.ellipsis-line {
  overflow: hidden;
  width: 100px;
  text-overflow: ellipsis; //文本溢出显示省略号
  white-space: nowrap; //文本不会换行
}
::v-deep .q-table tbody td {
  height: 55px;
}
</style>
