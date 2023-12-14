<template>
  <div class="text-red text-left">
    <div class="text-red">
      md 文档 建议使用
      <a href="https://typora.io/" target="_blank" rel="noopener noreferrer"
        >typora
      </a>
      专业 md 文档编辑器 样式比较美观。
    </div>
    <div class="text-red">新建数据需要先保存，然后进行编辑 上传MD文档。</div>
  </div>
</template>

<script>
export default {
  setup() {
    return {};
  },
  props: {
    show_update: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped></style>
