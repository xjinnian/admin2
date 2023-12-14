<template>
  <div>
    <q-markup-table dense flat bordered class="text-left" v-if="show_table">
      <tbody>
        <q-tr v-for="key in keys || {}" :key="key">
          <q-td class="q-px-md w120"> {{ compute_show_key(key) }}: </q-td>
          <q-td class="q-px-md w100"> {{ detail_obj[key] }} </q-td>
        </q-tr>
      </tbody>
    </q-markup-table>
  </div>
</template>

<script>
/**
 * 图片细化描述 统计
 */
export default {
  data() {
    return {
      keys: ["total", "status_1", "status_f1", "status_f2"],
    };
  },
  computed: {
    show_table() {
      return Object.keys(this.detail_obj).length > 0;
    },
  },
  props: {
    detail_obj: {},
  },
  methods: {
    compute_show_key(key) {
      let str = "";

      switch (key) {
        case "total":
          str = "总计";
          // -1 禁用  ， 1 启用 ，-2  已废弃
          break;
        case "status_f1":
          str = "禁用";

          break;
        case "status_1":
          str = "启用";

          break;
        case "status_f2":
          str = "已废弃";

          break;

        default:
          break;
      }

      return str;
    },
  },
};
</script>

<style lang="scss" scoped></style>
