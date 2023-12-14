<!--
 * @FilePath: /client-api-doc-admin/src/components/filter-select/index.vue
 * @Description: 下列搜索组件
-->
<template>
   <q-select
    use-input
    input-debounce="0"
    outlined
    clearable
    v-model="select_value"
    class="w500 q-mr-md"
    :dense="dense"
    emit-value
    map-options
    :options="filter_options"
    :label="label"
    :option-label="optionLabel"
    :option-value="optionValue"
    :multiple="multiple"
    :use-chips="multiple"
    filled
    :color="color"
    @filter="filterFn"
    @update:model-value="updateValueFn"
  />
</template>

<script>
import { computed, defineComponent, markRaw, ref, watch } from "vue";

export default defineComponent({
  props:{
    modelValue: {
      type: [Number,String,Array],
      default: undefined
    },
    dense:{
      type: Boolean,
      default: true
    },
    multiple:{
      type: Boolean,
      default: false
    },
    options:{
      type: Array,
      default: () => []
    },
    label:{
      type: String,
      default:'属性组 / 可搜索过滤'
    },
    optionLabel:{
      type: String,
      default:'label'
    },
    optionValue:{
      type: String,
      default:'value'
    },
    // 选中的颜色
    color:{
      type: String,
      default:undefined
    }
  },
  emit:['update:modelValue'],
  setup(props, { emit }){
    const select_value  = ref(undefined)
    watch(()=>props.modelValue,(val)=>{
      console.log(val);
      // 回显
      select_value.value = val
    },{immediate:true})
    // console.log(props.options);
    // 原始数据
    const origin_options = computed(()=>props.options)
    // 过滤数据
    const filter_options = ref(props.options)
    const  filterFn  = (val, update, abort) =>{
      update(() => {
        const search_value = val.toLocaleLowerCase().trim()
        filter_options.value = origin_options.value.filter(v => v.label.toLocaleLowerCase().indexOf(search_value) > -1)
        // console.log(filter_options);
      })
    }

    const updateValueFn = ()=>{
      emit('update:modelValue', select_value.value)
    }

    return {
      select_value,
      filter_options,
      filterFn,
      updateValueFn
    }
  }
})
</script>
