<template>
  <q-card class="my-card mw50vw q-px-md w500">
    <q-card-section class="no-padding">
      <div class="row">
        <div class="text-weight-bolder lh50">{{ form_data.id ? '编辑' : '创建' }}数据</div>
        <q-space />
        <q-btn flat round icon="close" v-close-popup />
      </div>
    </q-card-section>
    <q-separator />
    <q-card-section class="q-py-md q-gutter-y-md">
      <div class="row">
        <div class="w120 form-item-label">布局模板名</div>
        <q-input class="col" filled dense v-model="form_data.name"   />
      </div>
      <div class="row">
        <div class="w120 form-item-label">客户端目录</div>
        <q-input class="col" filled dense v-model="form_data.folder"   />
      </div>
    </q-card-section>
    <q-separator />
    <q-card-actions align="right">
      <q-btn color="primary" @click="handle_conform_edit" label="确定" />
      <q-btn v-close-popup color="deep-orange" glossy label="取消" />
    </q-card-actions>
  </q-card>
</template>
<script setup>
import { defineEmits, defineProps, onMounted, ref } from 'vue'

const emit = defineEmits(['emit-edit'])
const props = defineProps({ detail_obj: { type: Object, default: () => ({}) } })

const form_data = ref({})

onMounted(() => {
  form_data.value = JSON.parse(JSON.stringify(props.detail_obj))
})

function handle_conform_edit() {
  emit('emit-edit', form_data.value)
}
</script>
<style lang="scss" scoped></style>
