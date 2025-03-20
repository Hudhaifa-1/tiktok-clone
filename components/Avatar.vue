<script setup>
const props = defineProps(["imageSrc", "imageWidth", "imageHeight"]);
const { imageSrc, imageWidth, imageHeight } = toRefs(props);
</script>

<template>
  <img class="rounded-full" :src="imageSrc" :width="imageWidth" :height="imageHeight" alt="" />
</template>
