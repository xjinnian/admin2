<template>
  <div>
    <q-markup-table dense flat bordered class="text-left" v-if="detail_obj&&detail_obj.name">
      <tbody>
        <q-tr>
          <q-td class="q-px-md w120"> 类型 </q-td>
          <q-td class="q-px-md w100"> {{ detail_obj.type }} </q-td>
        </q-tr>

        <q-tr>
          <q-td class="q-px-md w120"> 是否完成 </q-td>
          <q-td class="q-px-md w100" :class="compute_finish_class(detail_obj.finish)"> {{  compute_finish_label(detail_obj.finish)  }} </q-td>
        </q-tr>
        <q-tr>
          <q-td class="q-px-md w120"> 日期 </q-td>
          <q-td class="q-px-md w100"> {{ detail_obj.day }} </q-td>
        </q-tr>
        <q-tr>
          <q-td class="q-px-md w120"> 版本号 </q-td>
          <q-td class="q-px-md w100"> {{ detail_obj.base_name }} </q-td>
        </q-tr>

        <q-tr>
          <q-td class="q-px-md w120"> 文件名 </q-td>
          <q-td class="q-px-md w100"> {{ detail_obj.name }} </q-td>
        </q-tr>



        <q-tr>
          <q-td class="q-px-md w120"> 全路径 </q-td>
          <q-td class="q-px-md w100"> {{ detail_obj.path }} </q-td>
        </q-tr>

        <q-tr>
          <q-td class="q-px-md w120"> 下载 </q-td>
          <q-td class="q-px-md w100">
            <a
              :href="$config.get_cdn_url(detail_obj.path)"
              target="_blank"
              rel="noopener noreferrer"
              >{{ detail_obj.name }}
            </a>
          </q-td>
        </q-tr>
      </tbody>
    </q-markup-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
    };
  },

  props: {

    detail_obj: {},
  },

  methods: {
    compute_finish_class(num) {
     let str=num
      switch (num) {
        case 1:
          str='bg-green'
          // str='bg-orange'
          break;
          case -1:
        str='bg-orange'
          break;
          case -2:
        str='bg-red-6'
          break;
          case -3:
        str='bg-yellow-6'
          break;

        default:
          break;
      }
     return str
    },
    compute_finish_label(num){
      let str=num
      switch (num) {
        case 1:
        str='已完成'
          break;
          case -1:
        str='未完成'
          break;
          case -2:
        str='超时未完成强制结束'
          break;
          case -3:
        str='未完成手动取消'
          break;

        default:
          break;
      }

      return str
    }
  },
};
</script>

<style lang="scss" scoped></style>
