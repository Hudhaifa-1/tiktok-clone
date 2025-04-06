<script setup>
import PostUser from "~/components/PostUser.vue";
import MainLayout from "~/layouts/MainLayout.vue";

const { $userStore, $profileStore, $generalStore } = useNuxtApp();
const { posts } = storeToRefs($profileStore);

const route = useRoute();

let show = ref(false);

const getProfile = async () => {
  try {
    await $profileStore.getProfile(route.params.id);
  } catch (error) {}
};

onMounted(() => {
  getProfile();
});

watch(()=> posts.value, ()=> {
    setTimeout(() => {
        show.value = true
    }, 300);
})
</script>

<template>
  <MainLayout>
    <div
    v-if="$profileStore.name"
      class="pt-[90px] 2xl:pl-[185px] lg:pl-[140px] lg:pr-0 pr-2 w-[calc(100%-90px)] max-w-[1800px] 2xl:mx-auto"
    >
      <div class="flex md:w-[calc(100vw-240px)]">
        <Avatar
          class="max-w-[120px] rounded-full"
          :image-src="$profileStore.image"
        />
        <div class="ml-5 w-full">
          <div class="text-[30px] font-bold truncate">{{ $profileStore.name }}</div>
          <div class="text-[18px] truncate">{{ $profileStore.name }}</div>
          <button
            v-if="$profileStore.id === $userStore.id"
            @click="$generalStore.isEditProfileOpen = true"
            class="flex items-center rounded-md py-1.5 px-3.5 mt-3 text-normal font-semibold border hover:bg-gray_hover_bg"
          >
            <Icon class="mt-0.5 mr-1" name="mdi:pencil" size="18" />
            <div>Edit profile</div>
          </button>
          <button
            v-else
            class="flex items-center rounded-md py-1.5 px-8 mt-3 text-normal text-white font-semibold bg-primary"
          >
            Follow
          </button>
        </div>
      </div>

      <div class="flex items-center pt-4">
        <div class="mr-4">
          <span class="font-bold">10K</span>
          <span class="text-gray-500 font-light text-normal pl-1.5"
            >Following</span
          >
        </div>
        <div class="mr-4">
          <span class="font-bold">44K</span>
          <span class="text-gray-500 font-light text-normal pl-1.5"
            >Followers</span
          >
        </div>
        <div class="mr-4">
          <span class="font-bold">3K</span>
          <span class="text-gray-500 font-light text-normal pl-1.5">Likes</span>
        </div>
      </div>

      <div
        class="pt-4 mr-4 text-gray-500 font-light text-normal pl-1.5 max-w-[500px]"
      >
       {{ $profileStore.bio }}
      </div>

      <div class="w-full flex items-center pt-4 border-b">
        <div
          class="w-60 text-center py-2 text-[17px] font-semibold border-b-2 border-b-black"
        >
          Videos
        </div>
        <div
          class="flex items-center justify-center w-60 text-gray-500 text-center py-2 text-[17px] font-semibold"
        >
          <Icon name="material-symbols:lock-open" class="mb-0.5" />
          <span>Liked</span>
        </div>
      </div>

      <div
        class="mt-4 grid 2xl:grid-cols-6 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-3"
      >
      <div v-if="show" >
        <PostUser v-for="post in $profileStore.posts" :key="post.id" :post="post"/>
      </div>
      </div>
    </div>
  </MainLayout>
</template>
