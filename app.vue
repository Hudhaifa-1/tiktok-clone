<script setup>
import { storeToRefs } from "pinia";
import BaseToast from "./components/Base/BaseToast.vue";

const { $generalStore, $userStore } = useNuxtApp();
const { isLoginOpen, isEditProfileOpen, error } = storeToRefs($generalStore);

const prepareApp = async ()=> {
  $generalStore.bodySwitch(false);
  isLoginOpen.value = false;
  isEditProfileOpen.value = false;

  try {
    await $generalStore.hasSessionExpired();

    if ($userStore.id) {
      $userStore.getUser();
    }
  } catch (error) {
    error.value = error.response.data.errors[0]
  }
}

onMounted(() => {
  prepareApp()
});

watch(
  () => isLoginOpen.value,
  (val) => $generalStore.bodySwitch(val)
);
watch(
  () => isEditProfileOpen.value,
  (val) => $generalStore.bodySwitch(val)
);
</script>

<template>
  <NuxtPage />
  <BaseToast :error="error" />
  <AuthOverlay v-if="isLoginOpen" />
  <EditProfileOverlay v-if="isEditProfileOpen" />
</template>
