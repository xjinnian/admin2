<template>
  <q-card class="my-card   q-px-md  " style="width:1000px ;max-width: 1000px;">
    <q-card-section class="no-padding">
      <div class="row">
        <div class="text-weight-bolder lh40">二维码 : {{ title }}  </div>
        <q-space />
        <q-btn flat round icon="close" v-close-popup />
      </div>
    </q-card-section>
    <q-separator />
    <q-card-section class="q-py-md q-gutter-y-md"  style="width:960px">
      <div> <pre>  {{ copy_text }}</pre> </div>
      <div class="row justify-center">
        <QRCodeVue3 :width="300" :height="300"  :version="10"  :value="qr_text" />

      </div>


    </q-card-section>
    <q-separator />
    <q-card-actions align="right">
      <q-btn
            color="primary"
            class="q-mr-md"
            glossy
            @click="handle_cope_record"
            label="复制地址"
          />
      <q-btn v-close-popup color="deep-orange" glossy label="关闭" />
    </q-card-actions>
  </q-card>
</template>
<script>
import { ref } from "vue";
import QRCode from 'qrcode'
import QRCodeVue3 from "vue-qrcode";
import { copyToClipboard } from "quasar";
export default {
  components: {
    QRCodeVue3,
  },

  data() {
    return {
      QRCode
    };
  },
  props: {
    title: "",
    qr_text: "",
    copy_text: "",
  },
  created() {},
  methods: {

     handle_cope_record() {

      copyToClipboard(this.copy_text)
        .then(() => {
          this.$q.notify(`已复制：${ this.copy_text}`);
        })
        .catch(() => {
          // fail
        });
     },
  },
};
</script>
<style lang="scss" scoped></style>
