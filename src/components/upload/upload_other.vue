<!--
 * @Date           : 2022-04-11 11:16:33
 * @LastEditTime: 2023-10-30 15:30:09
 * @Description    :
-->
<template>
  <div class="br4 row q-gutter-x-md upload-file" style="">
    <div class="ralative-position w160 h30">
      <q-file class="absolute w160 h30" style="z-index: 6" flat dense max-files="1" accept=".zip,.apk"
        @update:model-value="handle_content_files_update">
        <template v-slot:file="{ index, file }"> </template>
      </q-file>
      <q-btn color="primary" class="absolute w160 h40" style="z-index: 3"> 上传文件</q-btn>
    </div>
  </div>
</template>
<script>
import { api_file } from 'src/api/index'

export default {
  emits: ['emit-file-path'],
  data() {
    return {}
  },
  props: {
    // 当前上传文件的 内容对应的 表单 key
    key_str: {
      type: String,
      default: '',
      require: true
    },
    // 是否需要loading
    loading:{
      type: Boolean,
      default: true
    }
  },
  created() { },
  methods: {
    /**
     * 文件上传
     * @param {*} files
     */
    async handle_upload(files = []) {
      let len = files.length
      if (len == 0) {
        return false
      }
      let form = new FormData()
      for (let i = 0; i < len; i++) {
        form.append('files[]', files[i])
      }
      form.set('other', 1)
      form.set('project_id', 1)

      let res = await api_file.handle_upload(form)
      form = null
      let { code, data, msg, success } = res.data
      if (success) {
        return data
      } else {
        return ''
      }
    },
    //通用内容 文件 更新
    async handle_content_files_update(value) {
      let name = value.name
      if (!name) {
        return false
      }
      this.show_loading()
      let data = await this.handle_upload([value])
      this.hide_loading()
      if (!data) {
        this.$q.notify('上传文件出错')
        return false
      }

      this.$emit('emit-file-path', {
        key: this.key_str,
        path: data[name],
        name,
        size: +(value.size/1024/1024).toFixed(2)
      })
    },
    show_loading(){
      if(this.loading){
        this.$q.loading.show({
          message: '文件上传中...<br/><span class="text-italic">Please wait...</span>',
          html: true,
          spinnerColor: 'amber',
          messageColor: 'amber'
        })
      }
    },
    hide_loading(){
      if(this.loading){
        this.$q.loading.hide();
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.upload-file>div {
  margin-bottom: 10px;
}
</style>
