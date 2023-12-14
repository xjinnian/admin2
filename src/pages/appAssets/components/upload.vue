<!--
 * @FilePath: /client-api-doc-admin/src/pages/appAssets/components/upload.vue
 * @Description:
-->
<template>
    <q-card class="my-card mw50vw q-px-md w50vw">
    <q-card-section class="no-padding">
      <div class="row">
        <div class="text-weight-bolder lh40">
          上传
        </div>
        <q-space />
        <q-btn flat round icon="close" v-close-popup />
      </div>
    </q-card-section>
    <q-separator />
    <q-card-section class="q-py-md q-gutter-y-md">
      <div class="row">
        <div class="w120 form-item-label">文件路径</div>
        <q-input
          class="col"
          filled
          dense
          label="输入文件存储路径：images/bet"
          v-model="editing_obj.path"
        />
      </div>
      <div class="row">
        <div class="w120 form-item-label">上传文件</div>
        <q-file color="purple-12" v-model="editing_obj.files" label="上传" dense flat multiple
          @update:model-value="handle_file_upload">
          <template v-slot:prepend>
            <q-icon name="attach_file" />
          </template>
        </q-file>

      </div>
      <!-- <input type="file" @change="selectFolder" webkitdirectory /> -->

      <div class="row">
        <div class="w120 form-item-label">备注</div>
        <q-input
          class="col"
          filled
          dense
          type="textarea"
          v-model="editing_obj.mark"
        />
      </div>
    </q-card-section>
    <q-separator />
    <q-card-actions align="right">
      <q-btn color="primary" @click="handle_conform_edit" label="确定" />
      <q-btn
        v-close-popup
        color="deep-orange"
        glossy
        label="取消"
      />
    </q-card-actions>
  </q-card>
</template>

<script>
import { api_appAssets } from "src/api/index.js";
import { defineComponent, ref } from "vue";

export default defineComponent({
  props:{
    project:''
  },
  emit: ['emit-edit'],
  setup(props,{emit}) {
    const editing_obj = ref({})
    const handle_conform_edit = async ()=>{
      const project = props.project
      const { files,mark,path } = editing_obj.value
      let form = new FormData()
      for(let file of files){
        form.append(file.name, file)
      }
      path && form.append('path',path)
      form.append('project',project)
      mark && form.append('mark',mark)

      const res = await api_appAssets.handle_create(form)
      emit('emit-edit')
    }

    const handle_file_upload = async (file)=>{
    }


    return {
      handle_conform_edit,
      editing_obj,
      handle_file_upload
    }
  },
})

</script>
