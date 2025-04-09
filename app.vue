<script setup>
import { storeToRefs } from "pinia";
import BaseToast from "./components/Base/BaseToast.vue";

const { $generalStore, $userStore } = useNuxtApp();
const { isLoginOpen, isEditProfileOpen, error } = storeToRefs($generalStore);

const prepareApp = async () => {
  $generalStore.bodySwitch(false);
  isLoginOpen.value = false;
  isEditProfileOpen.value = false;

  try {
    await $generalStore.hasSessionExpired();

    if ($userStore.id) {
      $userStore.getUser();
    }
  } catch (e) {
    error.value = e.response.data.message
      ? e.response.data.message
      : e.response.data.error;
  }
};

const getRandomUsers = () => {
  try {
    $generalStore.getRandomUsers();
  } catch (e) {
    error.value = e.response.data.message
      ? e.response.data.message
      : e.response.data.error;
  }
};

onMounted(() => {
  prepareApp();
  getRandomUsers();
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
  <BaseToast />
  <AuthOverlay v-if="isLoginOpen" />
  <EditProfileOverlay v-if="isEditProfileOpen" />
</template>
