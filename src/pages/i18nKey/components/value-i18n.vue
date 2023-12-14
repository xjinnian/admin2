<template>
    <q-card class="my-card  q-px-md  ">


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
                @update:model-value="handle_conform_edit"
              />
            </td>
          </tr>
        </tbody>
      </q-markup-table>

    </q-card>
</template>
<script>
import { api_clientLanguage } from "src/api";
export default {
  emits:['emit-edit'],
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

    if(this.detail_obj.id){
       this.i18n_obj={

        ...this.detail_obj.value
       }
    }
    this.handle_get_all_clientLanguage();
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


      let obj={}
      this.all_clientLanguage.map(x=>{
        obj[x.value] = this.i18n_obj[x.value]
      })
      this.$emit("emit-edit", obj);
    }
  },
};
</script>
<style lang="scss" scoped></style>
