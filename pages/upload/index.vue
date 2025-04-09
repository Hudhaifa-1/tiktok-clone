<script setup>
import UploadError from "~/components/UploadError.vue";
import UploadLayout from "~/layouts/UploadLayout.vue";
import BaseLoading from "~/components/Base/BaseLoading.vue";
import BaseToast from "~/components/Base/BaseToast.vue";

const { $userStore } = useNuxtApp();
const router = useRouter();

let file = ref(null);
let fileDisplay = ref(null);
let errorType = ref(null);
let caption = ref("");
let fileData = ref(null);
let errors = ref(null);
let isUploading = ref(false);

definePageMeta({middleware: 'auth'})


watch(
  () => caption.value,
  (caption) => {
    if (caption.length >= 150) {
      errorType.value = "caption";
      return;
    }
    errorType.value = null;
  }
);

const onChange = () => {
  fileDisplay.value = URL.createObjectURL(file.value.files[0]);
  fileData.value = file.value.files[0];
};

const onDrop = (event) => {
  errorType.value = "";
  file.value = event.dataTransfer.files[0];
  fileData.value = event.dataTransfer.files[0];

  let extenstion = file.value.name.substring(
    file.value.name.lastIndexOf(".") + 1
  );

  if (extenstion !== "mp4") {
    discard();
    errorType.value = "file";
    setTimeout(() => {
      errorType.value = null;
    }, 3000);
    return;
  }

  fileDisplay.value = URL.createObjectURL(event.dataTransfer.files[0]);
};

const discard = () => {
  clearVideo();
  caption.value = "";
};

const createPost = async () => {
  errors.value = null;

  let data = new FormData();

  data.append("video", fileData.value);
  data.append("text", caption.value);

  if (fileData.value && caption.value) {
    isUploading.value = true;

    try {
      let res = await $userStore.createPost(data);
      if (res.status === 200) {
        setTimeout(() => {
          isUploading.value = false;
          router.push("/profile/" + $userStore.id);
        }, 1000);
      }
    } catch (error) {
      isUploading.value = false;
      errors.value = error.response.data.errors;
    }
  }
};

const destructError = computed(() => {
  if (errors.value) {
    if (errors.value.video) return errors.value.video[0];
    if (errors.value.text) return errors.value.text[0];
  }
  return null
})

const clearVideo = () => {
  file.value = null;
  fileDisplay.value = null;
  fileData.value = null;
};
</script>

<template>
  <UploadError :error-type="errorType" />
  <BaseToast :error="destructError" />
  <BaseLoading v-if="isUploading" />
  <UploadLayout >
    <div
      class="w-full mt-[70px] mb-[20px] bg-white shadow-lg rounded-md py-6 px-4 md:px-10"
    >
      <div>
        <div class="text-[23px] font-semibold">Upload video</div>
        <div class="text-gray-400 mt-1">Post a video to your account</div>
      </div>
      <div class="mt-8 md:flex gap-6">
        <label
          v-if="!fileDisplay"
          for="fileInput"
          @drop.prevent="onDrop"
          @dragover.prevent=""
          class="mx-auto md:mx-0 mt-4 mb-6 flex flex-col items-center justify-center w-full max-w-[260px] h-[470px] text-center p-3 border-2 border-dashed border-gray_border rounded-lg hover:bg-gray_hover_bg cursor-pointer"
        >
          <Icon
            name="majesticons:cloud-upload"
            size="40"
            class="text-[#b3b3b1]"
          />
          <div class="mt-4 text[17px]">Select video to upload</div>
          <div class="mt-1.5 text-gray-500 text-small">
            Or drag and drop a file
          </div>
          <div class="mt-12 text-gray-400 text-sm">MP4</div>
          <div class="mt-2 text-gray-400 text-small">Up to 30 minutes</div>
          <div class="mt-2 text-gray-400 text-small">Less than 2 GB</div>
          <div
            class="px-2 py-1.5 mt-8 text-white text-[15px] w-[80%] bg-primary rounded-sm"
          >
            Select file
          </div>
          <input
            @change="onChange"
            ref="file"
            type="file"
            id="fileInput"
            hidden
            accept=".mp4"
          />
        </label>

        <div
          v-else
          class="mx-auto md:mx-0 mt-4 mb-16 md:mb-12 flex items-center justify-center w-full max-w-[245px] h-[500px] p-3 rounded-2xl cursor-pointer relative"
        >
          <div class="bg-black h-full w-full" />
          <img
            class="absolute z-20 pointer-events-none max-h-[500px]"
            src="~/assets/images/mobile-case.png"
            alt=""
          />
          <img
            class="absolute right-4 bottom-6 z-20 pointer-events-none"
            width="90"
            src="~/assets/images/tiktok-logo-white.png"
            alt=""
          />
          <video
            autoplay
            loop
            muted
            class="absolute rounded-xl object-cover z-10 p-[13px] w-full h-full"
            :src="fileDisplay"
          />
          <div
            class="absolute -bottom-12 flex items-center justify-between z-40 rounded-xl border w-full p-2 border-gray_border"
          >
            <div class="flex items-center truncate">
              <Icon
                name="clarity:success-standard-line"
                size="16"
                class="min-w-[16px]"
              />
              <div class="text-[11px] pl-1 truncate">{{ fileData.name }}</div>
            </div>
            <button @click="clearVideo" class="text-s_small ml-2 font-semibold">
              Change
            </button>
          </div>
        </div>

        <div class="mt-4 mb-6">
          <div class="flex bg-[#F8F8F8] py-4 px-6">
            <div>
              <Icon class="mr-4" size="20" name="mdi:box-cutter-off" />
            </div>
            <div>
              <div class="font-semibold text-normal mb-1.5">
                Divide videos and edit
              </div>
              <div class="font-semibold text-small text-gray-400">
                You can quickly divide videos into mulitple parts, remove
                reundant parts and turn landscape videos inot portrait videos
              </div>
            </div>
            <div
              class="flex justify-end max-w-[130px] w-full h-full text-center my-auto"
            >
              <button
                class="px-8 py-1.5 text-white text-normal bg-primary rounded-sm"
              >
                Edit
              </button>
            </div>
          </div>

          <div class="mt-5">
            <div class="flex items-center justify-between">
              <div class="mb-1 text-normal">Caption</div>
              <div class="text-gray-400 text-[12px]">
                {{ caption.length }}/150
              </div>
            </div>
            <input
              v-model="caption"
              maxlength="150"
              type="text"
              class="w-full border p-2.5 rounded-md focus:outline-none"
            />
          </div>

          <div class="flex gap-3">
            <button
              @click="discard"
              class="px-10 py-2.5 mt-8 border text-[16px] hover:bg-gray_hover_bg rounded-sm"
            >
              Discard
            </button>
            <button
            @click="createPost"
              class="px-10 py-2.5 mt-8 border text-[16px] text-white bg-primary rounded-sm"
            >
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  </UploadLayout>
</template>
