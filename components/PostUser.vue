<script setup>
defineProps(["post"]);

const route = useRoute();
const router = useRouter();

let video = ref(null);
let isLoaded = ref(false);
let videoListener = null;

const isVideoLoaded = () => {
  if (video.value) {
    video.value.load();

    videoListener = (e) => {
      if (e.target) {
        setTimeout(() => {
          isLoaded.value = true;
        }, 200);
      }
    };

    video.value.addEventListener("loadeddata", videoListener);
  }
};

onMounted(() => {
  isVideoLoaded();
});

onBeforeUnmount(() => {
  video.value.removeEventListener("loadeddata", videoListener);
  video.value.pause();
  video.value.currentTime = 0;
  video.value.src = "";
});

const isHover = (bool) => {
  if (video.value) {
    if (bool) {
      video.value.play();
    } else {
      video.value.pause();
    }
  }
};
</script>

<template>
  <div
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
        muted
        loop
        class="aspect-[3/4] object-cover rounded-md"
        src="/quran.mp4"
      ></video>
    </div>
    <div class="px-1">
      <div class="text-gray-700 text-normal pt-1 break-words">
        This is some text
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
