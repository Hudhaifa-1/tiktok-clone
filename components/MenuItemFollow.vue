<script setup>
import Avatar from "./Avatar.vue";

defineProps(["user"]);
</script>

<template>
  <div
    class="flex items-center hover:bg-gray_hover_bg rounded-md w-full py-1.5 px-2"
  >
    <Avatar
      class="mx-auto lg:mx-0"
      image-src="https://picsum.photos/id/8/300/300"
      image-width="35"
      image-height="35"
    />

    <div class="lg:pl-2.5 hidden lg:block">
      <div class="flex items-center">
        <div class="font-bold text-[14px]">User name</div>
        <div class="ml-1 rounded-full bg-account_mark h-[14px] relative">
          <Icon
            class="relative -top-[4px] text-white"
            name="teenyicons:tick-small-solid"
            size="15"
          />
        </div>
      </div>
    </div>
  </div>
</template>
