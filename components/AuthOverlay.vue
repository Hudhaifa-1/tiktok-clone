<script setup>
const {$generalStore} = useNuxtApp()
let isRegister = ref(true)

</script>

<template>
  <div
    id="AuthOverlay"
    class="fixed flex items-center justify-center z-40 top-0 left-0 w-full h-full bg-black/50"
  >
  <div class="relative bg-white w-full max-w-[470px] h-[70%] p-4 rounded-lg">
    <div class="flex w-full justify-end">
        <button @click="$generalStore.isLoginOpen = false" class="p-1.5 rounded-full bg-gray_bg w-10 h-10">
            <Icon name="mdi:close" size="26" />
        </button>
    </div>

    <Login v-if="isRegister" />
    <Register v-else />

    <div class="absolute flex items-center justify-center py-5 left-0 bottom-0 border-t w-full">
        <span class="text-[14px] text-gray-600">Don't have account?</span>
        <button @click="isRegister = !isRegister" class="text-[14px] text-primary font-semibold pl-1">
            <span v-if="isRegister">Sign up</span>
            <span v-else>Log in</span>
        </button>
    </div>
  </div>
  </div>
</template>
