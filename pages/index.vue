<script setup>
import PostMain from "~/components/PostMain.vue";
import MainLayout from "~/layouts/MainLayout.vue";

const { $generalStore } = useNuxtApp();
let { error } = storeToRefs($generalStore);

const getPosts = async () => {
  try {
    await $generalStore.getAllUsersAndPosts();
  } catch (e) {
    error.value = e.response.data.message
      ? e.response.data.message
      : e.response.data.error;
  }
};

onMounted(() => {
  getPosts();
});
</script>

<template>
  <MainLayout>
    <div class="pt-[80px] w-[calc(100%-90px)] max-w-[690px]">
      <div v-for="post in $generalStore.posts" :key="post">
        <PostMain v-if="post" :post="post" /> 
      </div>
    </div>
  </MainLayout>
</template>
