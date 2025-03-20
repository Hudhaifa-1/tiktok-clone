<script setup>
const props = defineProps(["errorType"]);
const { errorType } = toRefs(props);

let error = ref("");
let isErrorVisible = ref(false);
let errorTimout = ref("");

const timoutErrorVisibility = () => {
  isErrorVisible.value = true;
  clearTimeout(errorTimout.value);
  errorTimout.value = setTimeout(() => {
    isErrorVisible.value = false;
    error.value = "";
  }, 3000);
};

watch(
  () => errorType.value,
  () => {
    if (errorType.value === "caption") {
      timoutErrorVisibility();
      error.value = "Maximum 150 characters.";
    } else if (errorType.value === "bio") {
        timoutErrorVisibility();
        error.value = "Maximum 80 characters.";
    } else if (errorType.value === "file") {
        timoutErrorVisibility();
      error.value = "Unsupported file. Use MP4 instead.";
    } else {
      error.value = "";
    }
  }
);
</script>

<template>
  <div class="w-full relative flex justify-center">
    <div
      class="absolute top-6 z-50 mx-auto bg-black bg-opacity-70 text-white px-14 py-3 rounded-sm"
      :class="isErrorVisible && errorType ? 'visible' : 'invisible'"
    >
      {{ error }}
    </div>
  </div>
</template>
