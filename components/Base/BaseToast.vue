<script setup>
const { $generalStore } = useNuxtApp();
const {error } = storeToRefs($generalStore);

let isErrorVisible = ref(false);
let errorTimout = ref("");

const timoutErrorVisibility = () => {
  if (error.value != null) {
    isErrorVisible.value = true;
    clearTimeout(errorTimout.value);
    errorTimout.value = setTimeout(() => {
      isErrorVisible.value = false;
      error.value = null
    }, 3000);
  }
};

watch(
  () => error.value,
  () => {
    timoutErrorVisibility();
  }
);
</script>

<template>
  <div class="w-full relative flex justify-center">
    <div
      class="fixed top-6 z-50 mx-auto bg-red-500 bg-opacity-70 text-white px-14 py-3 rounded-sm"
      :class="isErrorVisible ? 'visible' : 'invisible'"
    >
      {{ error }}
    </div>
  </div>
</template>
