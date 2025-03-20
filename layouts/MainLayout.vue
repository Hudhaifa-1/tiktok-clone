<script setup>
const route = useRoute();
</script>

<template>
  <TopNav />
  <div
    :class="route.fullPath === '/' ? 'max-w-[1140px]' : ''"
    class="flex justify-between mx-auto w-full px-0 lg:px-2.5"
  >
  <div>
    <SideNavMain />
  </div>
  <slot />
  </div>
</template>
