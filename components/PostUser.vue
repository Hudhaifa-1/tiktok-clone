<script setup>
defineProps(["post"]);

const { $generalStore } = useNuxtApp();

const route = useRoute();
const router = useRouter();

let video = ref(null);
let isLoaded = ref(false);
let videoListener = null;

const isVideoLoaded = () => {
  if (video.value) {
    video.value.load();

    // videoListener = (e) => {
    //   if (e.target) {
        setTimeout(() => {
          isLoaded.value = true;
        }, 200);
      // }
    };

    // video.value.addEventListener("loadeddata", videoListener);
  // }
};

const isHover = (bool) => {
  if (video.value) {
    if (bool) {
      video.value.play();
    } else {
      video.value.pause();
    }
  }
};

const displayPost = (post) => {
  $generalStore.setBackUrl("/profile/" + route.params.id);
  $generalStore.selectedPost = null;
  setTimeout(() => {
    router.push(`/post/${post.id}`);
  }, 300);
};

onMounted(() => {
  isVideoLoaded();
});

onBeforeUnmount(() => {
  // video.value.removeEventListener("loadeddata", videoListener);
 if(video.value){
  video.value.pause();
  video.value.currentTime = 0;
  video.value.src = "";
 }
});
</script>

<template>
  <div
    @click="displayPost(post)"
    @mouseenter="isHover(true)"
    @mouseleave="isHover(false)"
    class="relative brightness-90 hover:brightness-[1.1] cursor-pointer"
  >
    <div
      v-if="!isLoaded"
      class="absolute flex items-center justify-center top-0 left-0 aspect-[3/4] w-full object-cover rounded-md bg-black"
    >
      <Icon
        class="animate-spin ml-1 text-white"
        name="mingcute:loading-line"
        size="100"
      />
    </div>
    <div>
      <video
        ref="video"
        loop
        muted
        class="aspect-[3/4] object-cover rounded-md"
        :src="post.video"
      ></video>
    </div>
    <div class="px-1">
      <div class="text-gray-700 text-normal pt-1 break-words">
        {{ post.text }}
      </div>
      <div
        class="flex gap-1 items-center -ml-1 text-gray-600 font-bold text-xs"
      >
        <Icon name="gg:loadbar-sound" size="20" />
        <span> 3%</span>
        <Icon name="tabler:alert-circle" size="16" />
      </div>
    </div>
  </div>
</template>
