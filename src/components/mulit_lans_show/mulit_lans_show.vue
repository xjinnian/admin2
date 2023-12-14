<template>
  <div>
    <q-markup-table dense flat bordered class="text-left">
      <tbody>
        <q-tr v-for="(value, key) in detail_obj" :key="key">
          <q-td class="q-px-md w240">
            {{ (get_all_language_obj[key] || {})["name"] }}：</q-td
          >
          <q-td>
            <div class="ellipsis-3-lines break-all" style="width: 400px">
              {{ value }}
            </div>
          </q-td>
        </q-tr>
      </tbody>
    </q-markup-table>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      keys: ["total", "status_1", "status_f1", "status_f2"],
    };
  },
  computed: {
    ...mapGetters(["get_all_language_obj"]),
    show_table() {
      return Object.keys(this.detail_obj).length > 0;
    },
  },
  props: {
    detail_obj: {},
  },
  methods: {},
};
</script>

<style lang="scss" scoped></style>
