<script setup>
const emit = defineEmits(['update:input'])

const props = defineProps(['input', 'placeholder', 'inputType', 'max', 'autoFocus', 'error']);
const {input, placeholder, inputType, max, autoFocus, error} = toRefs(props)

const inputComputed = computed({
    get: ()=> input.value,
    set: (val) => emit('update:input', val)
})

onMounted(() => {
  if(autoFocus.value){
    document.getElementById(`input-${placeholder.value}`).focus();
  }  
})
</script>

<template>
  <div>
    <input
      :id="`input-${placeholder}`"
      :placeholder="placeholder"
      :type="inputType"
      class="block w-full bg-[#F1F1F2] text-gray-800 border border-gray-300 rounded-md py-2.5 px-3 focus:outline-none"
      v-model="inputComputed"
      autocomplete="off"
    />

    <span v-if="error" class="text-red-500 text-[14px font-semibold]">{{
      error
    }}</span>
  </div>
</template>
