<script setup>
const props = defineProps(['iconString', 'colorString', 'sizeString']);
const {iconString, colorString, sizeString} = toRefs(props)

let icon = ref('')

if(iconString.value === 'For You') icon.value = 'mdi:home'
if(iconString.value === 'Following') icon.value = 'ci:group'
if(iconString.value === 'LIVE') icon.value = 'ri:live-line'
</script>

<template>
    <div class="w-full flex items-center hover:bg-gray_hover_bg p-2.5 rounded-md">
        <div class="flex items-center mx-auto lg:mx-0">
            <Icon :name="icon" :style="{color: colorString}" :size="sizeString" />
            <span  :style="{color: colorString}" class="hidden lg:block pl-[9px] mt-0.5 font-semibold text-[17px]">
                {{ iconString }}
            </span>
        </div>

    </div>
</template>