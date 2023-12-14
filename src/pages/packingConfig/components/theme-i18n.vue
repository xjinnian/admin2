<template>
    <q-card class="my-card mw70vw q-px-md w70vw">
      <q-card-section class="no-padding">
        <div class="row">
          <div class="text-weight-bolder lh40">
            {{ detail_obj.id ? "编辑" : "新建" }}数据
          </div>
          <q-space />
          <q-btn flat round icon="close" v-close-popup />
        </div>
      </q-card-section>
      <q-separator />
      <div class="text-h6 q-my-md">CSS 和资源 捆绑 根据同一个版本进行配置</div>
      <q-markup-table>
        <thead>
          <tr>
            <th class="">语言-中文</th>
            <th class="">语言-英文</th>
            <th class="">键</th>
            <th class="">值</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in all_clientLanguage" :key="index">
            <td class="">
              {{ item.name_zh }}
            </td>
            <td class="">
              {{ item.name_en }}
            </td>
            <td class="">
              {{ item.value }}
            </td>
            <td class="w400">
              <q-input
                class="col"
                filled
                dense
                type="text"
                v-model.trim="i18n_obj[item.value]"
              />
            </td>
          </tr>
        </tbody>
      </q-markup-table>
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
import { api_clientLanguage } from "src/api";
export default {
  data() {
    return {
      all_clientLanguage: [],
      i18n_obj: {},
    };
  },
  props: {
    detail_obj: {},
  },
  created() {
    this.handle_get_all_clientLanguage();
    if(this.detail_obj.i18n){
      this.i18n_obj = this.detail_obj.i18n;
    }
  },
  methods: {
    async handle_get_all_clientLanguage() {
      let params = {
        currentPage: 1,
        pageSize: 10000,
      };
      let res = await api_clientLanguage.handle_read(params);
      let { code, msg, data } = res.data;
      let docs = data?.docs || [];
      this.all_clientLanguage = docs;
    },
    handle_conform_edit(){
      this.$emit("emit-edit", this.i18n_obj);
    }
  },
};
</script>
<style lang="scss" scoped></style>
