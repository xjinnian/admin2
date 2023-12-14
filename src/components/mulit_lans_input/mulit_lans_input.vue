<template>
  <div class="q-pa-md" style="min-height: 300px">
    <div class="q-gutter-y-md" style="">
      <q-card>
        <div class="row">
          <q-tabs
            v-model="lan_tab"
            dense
            class="text-grey"
            active-color="primary"
            indicator-color="primary"
            align="justify"
            narrow-indicator
            v-for="(item, index) in get_all_language"
            :key="index"
          >
            <q-tab :name="item.value" :label="item.name" />
          </q-tabs>
        </div>
        <q-separator />
        <q-tab-panels v-model="lan_tab" animated v-for="(item, index) in get_all_language" :key="index">
          <q-tab-panel :name="item.value">
            <!-- <div class="text-h6">{{ item.name }}描述</div> -->
            <q-input
              class="col"
              filled
              type="textarea"
              dense
              v-model="editing_obj[item.value]"
              @input="handle_per_lan_change"
            />
          </q-tab-panel>
        </q-tab-panels>
      </q-card>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  emits: ['lan_change'],
  data() {
    return {
      lan_tab: 'zh_cn',
      editing_obj: {}
    }
  },

  props: { detail_obj: Object },

  created() {
    this.editing_obj = this.detail_obj
  },

  computed: {
    ...mapGetters(['get_all_language'])
  },

  methods: {
    handle_per_lan_change() {
      this.$emit('lan_change', {
        lan: this.lan_tab,
        value: this.editing_obj[this.lan_tab]
      })
    }
  }
}
</script>

<style lang="scss" scoped></style>
