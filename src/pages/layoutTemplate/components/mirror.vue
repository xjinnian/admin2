<template>
  <q-card class="my-card mw50vw q-px-md w500">
    <q-card-section class="no-padding">
      <div class="row">
        <div class="text-weight-bolder lh50"> 镜像布局 {{ detail_obj.name }}</div>
        <q-space />
        <q-btn flat round icon="close" v-close-popup />
      </div>
    </q-card-section>
    <q-separator />
    <q-card-section class="q-py-md q-gutter-y-md">
      <div class="row">
        <div class="w120 form-item-label">布局模板</div>

        <q-select
            class="col"
            filled
            dense
            emit-value
            map-options
            option-label="name"
            option-value="value"
            :options="layout_options"
            v-model="form_data.mirror"
          />

      </div>




    </q-card-section>
    <q-separator />
    <q-card-actions align="right">
      <q-btn color="primary" @click="handle_conform_edit"  label="确定" />
      <q-btn v-close-popup color="deep-orange" glossy label="取消" />
    </q-card-actions>
  </q-card>
</template>
<script setup>
import { defineEmits, defineProps, onMounted, ref } from 'vue'

const emit = defineEmits(['emit-edit'])
const props = defineProps({
   detail_obj: { type: Object, default: () =>  {} },
   layout_options: { type: Object, default: () => [] },

  })

const form_data = ref({
  mirror:null
})

onMounted(() => {
  form_data.value = {   mirror:null }
})

function handle_conform_edit() {

  let obj ={
    target:  props.detail_obj.value,
    mirror : form_data.value.mirror
  }

  emit('emit-edit', obj)
}
</script>
<style lang="scss" scoped></style>
