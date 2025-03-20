<script setup>
import Avatar from "./Avatar.vue";

const video = ref(null);

onMounted(() => {
  if (video.value) {
    video.value.play();
  }
});
</script>

<template>
  <div id="PostMain" class="border-b py-6 w-full">
    <div class="pl-3 w-full px-4">
      <div class="flex items-center justify-between pb-0.5">
       <div class="flex gap-2">
        <div class="cursor-pointer h-fit">
      <Avatar
        class="max-h-[60px]"
        image-src="https://picsum.photos/id/8/300/300"
        image-width="60"
        image-height="60"
      />
    </div>
        <button class="flex flex-col items-start md:block">
          <span class="font-bold hover:underline cursor-pointer"
            >User name</span
          >
          <span class="text-small font-light text-gray-500 pl-1 cursor-pointer"
            >User name</span
          >
        </button>
       </div>

        <button
          class="border text-normal px-[21px] py-0.5 border-primary text-primary hover:bg-primary_hover font-semibold rounded-md"
        >
          Follow
        </button>
      </div>

      <div
        class="text-normal pb-0.5 break-words max-w-[300px] md:max-w-[400px]"
      >
        This is some text
      </div>
      <div class="text-[14px] text-gray-500 pb-0.5">
        #fun #cool #SuperAwesome
      </div>
      <div class="text-[14px] pb-0.5 flex items-center font-semibold">
        <Icon name="mdi:music" size="17" />
        <div class="px-1">original sound - AWESOME</div>
        <Icon name="mdi:heart" size="20" />
      </div>
<div class="flex w-full justify-center md:justify-start">
  
  <div
        class="mt-2.5 relative flex min-h-[480px] max-h-[580px] max-w-[300px] md:min-h-0 md:max-h-[100%] md:max-w-[100%] overflow-hidden"
      >
        <div
          class="relative min-h-[480px] max-h-[580px] max-w-[300px] flex items-center bg-black rounded-xl cursor-pointer"
        >
          <video
            ref="video"
            class="rounded-xl object-cover mx-auto h-full"
            loop
            muted
            src="/quran.mp4"
          />

          <img
            class="absolute right-2 bottom-14"
            width="90"
            src="~/assets/images/tiktok-logo-white.png"
            alt=""
          />
        </div>
        <div class="absolute right-14 bottom-5 md:right-0 md:bottom-0 md:relative md:mr-[75px]">
          <div class="absolute bottom-0 pl-2">
            <div class="pb-4 text-center">
              <button
                class="rounded-full leading-3 bg-gray-200 p-2 cursor-pointer"
              >
                <Icon name="mdi:heart" size="25" />
              </button>
              <span class="text-xs text-white md:text-gray-800 font-semibold">34</span>
            </div>

            <div class="pb-4 text-center">
              <button
                class="rounded-full leading-3 bg-gray-200 p-2 cursor-pointer"
              >
                <Icon name="bx:bxs-message-rounded-dots" size="25" />
              </button>
              <span class="text-xs text-white md:text-gray-800 font-semibold">34</span>
            </div>

            <div class="pb-4 text-center">
              <button
                class="rounded-full leading-3 bg-gray-200 p-2 cursor-pointer"
              >
                <Icon name="ri:share-forward-fill" size="25" />
              </button>
              <span class="text-xs text-white md:text-gray-800 font-semibold">34</span>
            </div>
          </div>
        </div>
      </div>
</div>
    </div>
  </div>
</template>
