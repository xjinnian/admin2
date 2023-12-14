<template>
  <div class="q-pa-md full-width">
    <div class="text-h6 q-my-md">CSS 和资源 捆绑 根据同一个版本进行配置</div>
    <q-markup-table>
      <thead>
        <tr>
          <th class="">版本选择</th>
          <th class="">是否默认</th>
          <th class="">目标布局</th>
          <th class="">主题蓝本</th>
          <th class="">国际化设置</th>
          <th class="">操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in selected_themes" :key="index">
          <td class="w400">
            <q-select
              class="col"
              filled
              dense
              emit-value
              map-options
              option-label="name"
              option-value="version"
              :options="all_version"
              v-model="item.version"
              />
          </td>

          <td class="">
            <q-checkbox
              v-model="item['is_default']"
              :true-value="1"
              :false-value="-1"
            />
          </td>

          <td class="">
            {{ get_target_project_name(item) }}

          </td>
          <td class="">
            {{ version_map[item.version]?.name }}
          </td>


          <td class="">
             {{ item.i18n }}
          </td>
          <td class="">
            <q-btn color="primary" label="国际化" @click="handle_edit_i18n(item, index)" />
            <q-btn color="primary"  class="q-mx-md"  label="新增"  @click="handle_add_item"/>
            <q-btn color="deep-orange" class="q-mx-md" glossy label="删除" @click="handle_delete_item(index)" />

          </td>
        </tr>
      </tbody>
    </q-markup-table>
    <!-- 编辑弹窗 -->
    <q-dialog v-model="show_dialog_edit" persistent>
      <ThemeI18n :detail_obj="detail_obj" @emit-edit="handle_conform_edit" />
    </q-dialog>


  </div>
</template>




<script>
import ThemeI18n from "./theme-i18n.vue";
export default {
  components: {
    ThemeI18n,
  },
  emits: ["emit-edit"],
  data() {
    return {
      show_dialog_edit:false,

      theme_item_temp: {
        version: "",
        themeRefer:null,
        is_default: -1,
        order: 100,

        i18n: {},
      },
      selected_themes: [
        {
          version: "",
          themeRefer:null,
          is_default: -1,
          order: 100,

          i18n: {},
        },
      ],
    };
  },
  props: {
    all_version: {
      type: Array,
      default: () => [],
    },
    editing_obj: {
      type: Object,
      default: () => ({}),
    },
  },
  created() {
    this.init_when_update()
  },
  computed:{
    isEdit(){
      return !!this.editing_obj?.id || false
    },
    version_map(){
      return this.all_version.reduce((acc,cur)=>{
        acc[cur.version] = cur
        return acc
      },{})
    },
    project_map(){
      return this.$config.options_client_project_map
    },

  },
  methods: {
    get_target_project_name(item){
      const target = this.version_map[item.version]?.targetProject
      // console.log(this.project_map);
      return this.project_map?.[target]
    },
    init_when_update() {
      console.log(this.all_version);
      const {editing_obj,isEdit} = this
      // 编辑逻辑
      if(isEdit){
        this.selected_themes = this.$lodash.cloneDeep(editing_obj.theme)
      }
    },
    handle_add_item() {
      let item = this.$lodash.cloneDeep(this.theme_item_temp)


      this.selected_themes.push(item  )

    },
    handle_edit_i18n(item, index){
      this.detail_obj= item
      this.show_dialog_edit =true
    },
    handle_delete_item(index){
      this.selected_themes.splice(index,1)

    },
    handle_conform_edit(obj){

      this.detail_obj['i18n'] = this.$lodash.cloneDeep(obj)
      this.show_dialog_edit=false

    },

    /**
     * @description: 获取theme 配置数组
     * @return {*}
     */
    get_theme_config(){
      let final_obj =  this.selected_themes.filter(x=>x.version)

      final_obj.map((x,i)=>{
        x.key =`theme-${i+1}`
        x.themeRefer = this.version_map[x.version]?.themeRefer
      })

      let config =   this.$lodash.cloneDeep(final_obj);

      return config

    }
  },
};
</script>

<style lang="scss" scoped></style>
