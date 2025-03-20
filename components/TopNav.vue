<script setup>
const showMenu = ref(false);
const route = useRoute();
</script>

<template>
  <div
    id="TopNav"
    class="fixed bg-white z-30 flex items-center w-full border-b h-[61px]"
  >
    <div
      :class="route.fullPath === '/' ? 'max-w-[1150px]' : ''"
      class="flex items-center justify-between w-full px-6 mx-auto"
    >
      <div :class="route.fullPath === '/' ? 'w-[80%]' : 'lg:w-[20%] w-[70%]'">
        <NuxtLink to="/">
          <img width="115" src="~/assets/images/tiktok-logo.png" alt="" />
        </NuxtLink>
      </div>

      <div
        class="hidden md:flex items-center bg-gray_bg p-1 rounded-full max-w-[300px] w-full"
      >
        <input
          type="text"
          class="w-full pl-3 my-2 bg-transparent placeholder-gray_placeholder text-normal focus:outline-none"
          placeholder="Search accounts"
        />
        <div class="px-3 py-1 flex items-center border-l border-l-gray_border">
          <Icon name="ri:search-line" class="text-gray_font" size="22" />
        </div>
      </div>

      <div
        class="flex items-center justify-end gap-3 min-w-[275px] max-w-[320px] w-full"
      >
        <button
          class="flex items-center border rounded-sm px-3 py-[6px] hover:bg-gray_hover_bg"
        >
          <Icon name="mdi:plus" class="text-black_font" size="22" />
          <span class="px-2 font-medium text-normal">Upload</span>
        </button>

        <div v-if="false" class="flex items-center">
          <button
            class="flex items-center bg-primary_bg text-white border rounded-md px-3 py-[6px] hover:bg-primary_hover_bg"
          >
            <span class="px-2 font-medium text-normal">Log in</span>
          </button>
          <Icon name="mdi:dots-vertical" class="text-[#161724]" size="25" />
        </div>

        <div class="flex items-center">
          <Icon
            class="ml-1 mr-4 text-[#161724]"
            name="carbon:send-alt-filled"
            size="30"
          />
          <Icon
            class="mr-5 text-[#161724]"
            name="bx:bxs-message-detail"
            size="27"
          />
          <div class="relative">
            <button @click="showMenu = !showMenu" class="mt-1">
              <img
                class="rounded-full"
                width="33"
                src="https://picsum.photos/id/83/300/300"
                alt=""
              />
            </button>

            <div
              v-if="showMenu"
              id="PopupMenu"
              class="absolute bg-white rounded-lg py-1.5 w-[200px] shadow-xl border top-[43px] -right-2"
            >
              <NuxtLink
                @click="showMenu = false"
                class="flex items-center justify-start py-3 px-2 hover:bg-gray_hover_bg cursor-pointer"
              >
                <Icon name="ph:user" size="20" />
                <span class="pl-2 font-semibold text-sm">Profile</span>
              </NuxtLink>
              <div
                class="flex items-center justify-start py-3 px-1.5 hover:bg-gray_hover_bg cursor-pointer border-t"
              >
                <Icon name="ic:outline-login" size="20" />
                <span class="pl-2 font-semibold text-sm">Log out</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
