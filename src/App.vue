<template>
  <router-view />

  <ImageViewer v-model="thumbnail_src" />
</template>

<script setup>
import { onMounted, ref } from 'vue'
import ImageViewer from './components/ImageViewer.vue'

const thumbnail_src = ref('')

document.body.onclick = ({ target }) => {
  if (target.tagName === 'IMG' && target.className.includes('thumbnail_image')) {
    thumbnail_src.value = target.src
  }
}
</script>

<style>
.thumbnail_image {
  cursor: pointer;
}
</style>
