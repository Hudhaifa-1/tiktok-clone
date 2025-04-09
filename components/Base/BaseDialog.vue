<script setup>
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/vue";
import { ref, watch } from "vue";

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
  title: String,
  desc: String,
  okAction: String,
  cancelAction: String,
});

const emit = defineEmits(["close-dialog", "perform-action"]);

const isOpenBool = ref(false);

watch(props, () => {
  isOpenBool.value = props.isOpen;
});

function closeDialog() {
  isOpenBool.value = false;
  emit("close-dialog");
}
function performAction() {
  isOpenBool.value = false;
  emit("perform-action");
}
</script>

<template>
  <TransitionRoot appear :show="isOpenBool" as="template">
    <Dialog as="div" @close="closeDialog" class="relative z-50">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black/25" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div
          class="flex min-h-full items-center justify-center p-4 text-center"
        >
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-0 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel
              class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
            >
              <DialogTitle
                as="h3"
                class="text-lg font-medium leading-6 text-gray-900"
              >
                {{ title }}
              </DialogTitle>
              <div class="mt-2">
                <p class="text-sm text-gray-500">
                  {{ desc }}
                </p>
              </div>

              <div class="mt-4 flex justify-between gap-3">
                <button
                 @click="closeDialog"
                  class="w-full text-[17px] border-none font-semibold text-white py-3 rounded-md bg-success"
                >
                  {{ cancelAction }}
                </button>
                <button
                  @click="performAction"
                  class="w-full text-[17px] border-none font-semibold text-white py-3 rounded-md bg-primary"
                >
                  {{ okAction }}
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
