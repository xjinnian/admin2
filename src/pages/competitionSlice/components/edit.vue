<template>
  <q-card class="my-card mw50vw q-px-md w50vw">
    <q-card-section class="no-padding">
      <div class="row">
        <div class="text-weight-bolder lh40">
          {{ editing_obj.id ? "编辑" : "新建" }}数据
        </div>
        <q-space />
        <q-btn flat round icon="close" v-close-popup />
      </div>
    </q-card-section>
    <q-separator />
    <q-card-section class="q-py-md q-gutter-y-md">
      <div class="row">
        <div class="w120 form-item-label">赛事名称</div>
        <div style="line-height: 40px;">{{competition_info.name}}</div>
      </div>
      <div class="row items-center">
        <div class="w120 form-item-label">发送起止时间</div>
        <q-input class="col" filled dense v-model="editing_obj.send_start_time" label="时间格式为: YYYY-MM-DD hh:mm:ss" />
        <div class="q-px-md">至</div>
        <q-input class="col" filled dense v-model="editing_obj.send_end_time" label="时间格式为: YYYY-MM-DD hh:mm:ss" />
      </div>
      <div class="row">
        <div class="w120 form-item-label">响应数据</div>
        <q-input class="col" filled dense type="textarea" v-model="editing_obj.response_data" />
      </div>
      <div class="row">
        <div class="w120 form-item-label">备注</div>
        <q-input class="col" filled dense type="textarea" v-model="editing_obj.mark" />
      </div>
    </q-card-section>
    <q-separator />
    <q-card-actions align="right">
      <q-btn color="primary" @click="handle_conform_edit" label="确定" />
      <q-btn v-close-popup color="deep-orange" glossy @click="handle_cancel_edit" label="取消" />
    </q-card-actions>
  </q-card>
</template>

<script>
import moment from "moment";

export default {
  emits: ["emit-edit"],

  props: { detail_obj: Object, competition_info: Object },

  data() {
    return {
      editing_obj: {},
      temp_obj: { send_start_time: '', send_end_time: '', response_data: '', mark: '', },
    };
  },

  created() {
    if (this.detail_obj.id) {
      this.editing_obj = Object.assign(
        this.$lodash.cloneDeep(this.temp_obj),
        this.$lodash.cloneDeep(this.detail_obj)
      );
    } else {
      this.editing_obj = this.$lodash.cloneDeep(this.temp_obj);
      const times = new Date().getTime()
      this.editing_obj.send_start_time = this.editing_obj.send_end_time = this.formatTime(times)
      this.editing_obj.response_data = JSON.stringify({code:'000000',data:{},msg:'success',ts:times}, null, 4)
    }

    this.editing_obj.cid = this.competition_info.id
  },
  methods: {
    /**
     * 确定 提交更改
     */
    handle_conform_edit() {
      let { id, cid, send_start_time, send_end_time, response_time, mark } = this.editing_obj;
      const response_data = JSON.parse(this.editing_obj.response_data)
      let final_obj = { id, cid, send_start_time, send_end_time, response_time, response_data, mark };
      // this.$q.notify({ type: "negative", message: "名字 必填", });
      this.$utils.remove_false_key(final_obj);
      this.$emit("emit-edit", final_obj);
    },

    /**
     * 取消 取消更改
     *
     */
    handle_cancel_edit() { },

    /**
     * 格式化时间
     * 
     * @param {string|number} time 时间
     */
    formatTime(time) {
        return moment(time).format("YYYY-MM-DD HH:mm:ss")
    }
  },
};
</script>
