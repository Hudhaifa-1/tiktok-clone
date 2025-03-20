<script setup>
import MenuItem from "./MenuItem.vue";
import MenuItemFollow from "./MenuItemFollow.vue";

const route = useRoute();
</script>

<template>
  <div
    id="SideNavMain"
    :class="route.fullPath === '/' ? 'lg:w-[310px]' : 'lg:w-[220px]'"
    class="fixed z-20 bg-white pt-[70px] h-full border-r lg:border-r-0 w-[75px] overflow-auto"
  >
    <div class="w-[55px] lg:w-full mx-auto">
      <NuxtLink to="/">
        <MenuItem iconString="For You" colorString="#F02C56" sizeString="30" />
      </NuxtLink>
      <MenuItem iconString="Following" colorString="#000000" sizeString="27" />
      <MenuItem iconString="LIVE" colorString="#000000" sizeString="27" />

      <div class="border-b lg:ml-2 mt-2" />

      <div
        class="hidden lg:block text-xs text-gray-600 font-semibold pt-4 pb-2"
      >
        Suggested accounts
      </div>

      <div class="cursor-pointer pt-3 lg:pt-0">
        <MenuItemFollow />
      </div>
      <button class="hidden lg:block text-primary_bg pt-1.5 pl-2 text-small">
        See all
      </button>

      <div class="border-b lg:ml-2 mt-2" />

      <div
        class="hidden lg:block text-xs text-gray-600 font-semibold pt-4 pb-2"
      >
        Following accounts
      </div>

      <div class="cursor-pointer pt-3 lg:pt-0">
        <MenuItemFollow />
      </div>
      <button class="hidden lg:block text-primary_bg pt-1.5 pl-2 text-small">
        See more
      </button>

      <div class="border-b lg:ml-2 mt-2" />

      <div class="hidden lg:block text-s_small text-gray-500">
        <div class="pt-4 px-2">
          About Newsroom TikTok Shop Contact Careers ByeDance
        </div>
        <div class="pt-4 px-2">
          TikTok for Good Advertise Developers Transparency TikTok Rewards
          TikTok Browse Tiktok TikTok Embeds
        </div>
        <div class="pt-4 px-2">
          Help Safety Terms Privacy Creator Portal Community Guidelines
        </div>
        <div class="pt-4 px-2">&copy; 2025 TikTok</div>
      </div>
      <div class="pb-14"></div>
    </div>
  </div>
</template>
