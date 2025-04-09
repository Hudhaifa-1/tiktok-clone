<script setup>
import Avatar from "~/components/Avatar.vue";
import BaseDialog from "~/components/Base/BaseDialog.vue";

const { $userStore, $generalStore, $profileStore } = useNuxtApp();
let { error } = storeToRefs($generalStore);

const route = useRoute();
const router = useRouter();

definePageMeta({middleware: 'auth'})

let video = ref(null);
let inputFocused = ref(false);
let isLoaded = ref(false);
let isDeleteComment = ref(false);
let isDeletePost = ref(false);
let isSending = ref(false);
let comment = ref(null);
let commentId = ref(null)

const isLiked = computed(() => {
  let res = $generalStore.selectedPost.likes.find(
    (like) => like.user_id == $userStore.id
  );
  if (res) {
    return true;
  }

  return false;
});

const likePost = async () => {
  if (!$userStore.id) {
    $generalStore.isLoginOpen = true;
    return;
  }

  try {
    await $userStore.likePost($generalStore.selectedPost);
  } catch (e) {
    error.value = e.response.data.message
      ? e.response.data.message
      : e.response.data.error;
  }
};

const openDeleteDialog = (id) => {
  commentId.value = id;
  isDeleteComment.value = true;
};

const unLikePost = async () => {
  if (!$userStore.id) {
    $generalStore.isLoginOpen = true;
    return;
  }

  try {
    await $userStore.unLikePost($generalStore.selectedPost);
  } catch (e) {
    error.value = e.response.data.message
      ? e.response.data.message
      : e.response.data.error;
  }
};

const addComment = async () => {
  try {
    isSending.value = true;
    await $userStore.addComment($generalStore.selectedPost, comment.value);
    isSending.value = false;
    comment.value = null;
    document.getElementById("Comments").scroll({ top: 0, behavior: "smooth" });
  } catch (e) {
    isSending.value = false;
    error.value = e.response.data.errors
      ? e.response.data.errors[0]
      : e.response.data.error;
  }
};

const deleteComment = async () => {
  try {
   if(commentId.value){
    isSending.value = true;
    await $userStore.deleteComment($generalStore.selectedPost, commentId.value);
    isSending.value = false;
    isDeleteComment.value = false;
    commentId.value = null
   }
  } catch (e) {
    isSending.value = false;
    error.value = e.response.data.errors
      ? e.response.data.errors[0]
      : e.response.data.error;
  }
};

const deletePost = async () => {
  try{
    await $userStore.deletePost($generalStore.selectedPost)
    await $profileStore.getProfile($userStore.id)
    router.push(`/profile/${$userStore.id}`)
  }catch(e){
    error.value = e.response.errors? e.response.errors[0] : e.response.error
  }
}

const loopThroughPostsDown = ()=> {
  setTimeout(() => {
    let idArrayReversed = $generalStore.ids.reverse()
    let isBreak = false

    for (let i = 0; i < idArrayReversed.length; i++) {
      const id = idArrayReversed[i];
      if(id < route.params.id) {
        router.push(`/post/${id}`)
        isBreak = true
        return
      }
      
    }

    if(!isBreak){
      router.push(`/post/${idArrayReversed[0]}`)
    }
  }, 300);
}

const loopThroughPostsUp = ()=> {
  setTimeout(() => {
    let isBreak = false

    for (let i = 0; i < $generalStore.ids.length; i++) {
      const id = $generalStore.ids[i];
      if(id > route.params.id) {
        router.push(`/post/${id}`)
        isBreak = true
        return
      }
      
    }

    if(!isBreak){
      router.push(`/post/${$generalStore.ids[0]}`)
    }
  }, 300);
}

const getPostReady = async () => {
  $generalStore.selectedPost = null;

  try {
    await $generalStore.getPostById(route.params.id);
    await nextTick();
  } catch (e) {
    if (e && e.response.status === 400) {
      router.push("/");
    }
  }
};

onMounted(() => {
  getPostReady();
});


onBeforeUnmount(() => {
  if (video.value) {
    video.value.pause();
    video.value.currentTime = 0;
    video.value.src = "";
  }
});
</script>
<template>
  <div
    id="PostPage"
    class="fixed lg:flex justify-between z-40 top-0 left-0 w-full h-full bg-black lg:overflow-hidden overflow-auto"
  >
    <div
      v-if="$generalStore.selectedPost"
      class="lg:w-[calc(100%-540px)] h-full relative"
    >
      <BaseDialog
        title="Delete comment"
        desc="Are you sure?"
        okAction="Delete"
        cancelAction="Cancel"
        :isOpen="isDeleteComment"
        @perform-action="deleteComment"
        @close-dialog="isDeleteComment = false"
      />

      <BaseDialog
        title="Delete post"
        desc="Are you sure?"
        okAction="Delete"
        cancelAction="Cancel"
        :isOpen="isDeletePost"
        @perform-action="deletePost"
        @close-dialog="isDeletePost = false"
      />
      <NuxtLink
        :to="$generalStore.isBackUrl"
        class="absolute flex justify-center items-center z-20 h-10 w-10 m-5 rounded-full bg-gray-700 p-1 hover:bg-gray-800"
      >
        <Icon name="material-symbols:close" class="text-white" size="27" />
      </NuxtLink>

      <div v-if="$generalStore.ids?.length > 1">
        <button
          :disabled="!isLoaded"
          @click="loopThroughPostsUp"
          class="absolute z-20 right-4 top-4 flex items-center justify-center rounded-full bg-gray-700 p-1.5 hover:bg-gray-800"
        >
          <Icon name="mdi:chevron-up" size="30" class="text-white" />
        </button>

        <button
          :disabled="!isLoaded"
          @click="loopThroughPostsDown"
          class="absolute z-20 right-4 top-20 flex items-center justify-center rounded-full bg-gray-700 p-1.5 hover:bg-gray-800"
        >
          <Icon name="mdi:chevron-down" size="30" class="text-white" />
        </button>
      </div>

      <img
        class="absolute rounded-full top-[18px] left-[70px] lg:mx-0 mx-auto"
        height="45"
        width="45"
        src="~/assets/images/tiktok-logo-small.png"
        alt=""
      />

      <video
        v-if="$generalStore.selectedPost.video"
        class="absolute object-cover w-full my-auto z-[-1] h-screen"
        :src="$generalStore.selectedPost.video"
      />

      <div
        v-if="!isLoaded"
        class="flex items-center justify-center bg-black bg-opacity-70 h-screen lg:min-w-[480px]"
      >
        <Icon
          class="animate-spin ml-1 text-white"
          name="mingcute:loading-line"
          size="100"
        />
      </div>

      <div class="bg-black bg-opacity-70 lg:min-w-[480px]">
        <video
          v-if="$generalStore.selectedPost.video"
          autoplay
          @loadeddata="isLoaded = true"
          ref="video"
          loop
          muted
          class="h-screen mx-auto"
          :src="$generalStore.selectedPost.video"
        />
      </div>
    </div>

    <div
      id="InfoSection"
      v-if="$generalStore.selectedPost"
      class="lg:max-w-[550px] relative w-full h-full bg-white"
    >
      <div class="py-7" />

      <div class="flex items-center justify-between px-8">
        <div class="flex items-center">
          <NuxtLink :to="`/profile/${$generalStore.selectedPost.user.id}`">
            <Avatar
              class="lg:mx-0 mx-auto"
              image-height="40"
              image-width="40"
              :image-src="$generalStore.selectedPost.user.image"
            />
          </NuxtLink>

          <div class="ml-3 pt-0.5">
            <div class="text-[17px] font-semibold">
              {{ $generalStore.selectedPost.user.name }}
            </div>
            <div class="text-small -mt-5 font-light">
              <span>{{ $generalStore.selectedPost.user.name }}</span>
              <span class="relative -top-[2px] text-[30px] pr-0.5">.</span>
              <span class="font-medium">{{
                $generalStore.selectedPost.created_at
              }}</span>
            </div>
          </div>
        </div>

        <Icon
          v-if="$userStore.id === $generalStore.selectedPost.user.id"
          @click="isDeletePost = true"
          class="cursor-pointer"
          name="material-symbols:delete-outline-sharp"
          size="25"
        />
      </div>

      <div class="px-8 mt-4 text-sm">{{ $generalStore.selectedPost.text }}</div>

      <div class="px-8 text-sm font-bold mt-4 flex gap-1 items-center">
        <Icon name="mdi:music" size="17" />
        <span>original sound - {{ $generalStore.selectedPost.user.name }}</span>
      </div>

      <div class="flex items-center px-8 mt-8">
        <div class="pb-4 text-center flex items-center">
          <button
            @click="isLiked ? unLikePost() : likePost()"
            class="rounded-full bg-gray-200 p-2 cursor-pointer h-10 w-10"
          >
            <Icon
              name="mdi:heart"
              size="25"
              :class="isLiked ? 'text-primary' : ''"
            />
          </button>
          <span class="text-xs pl-2 pr-4 text-gray-800 font-semibold">
            {{ $generalStore.selectedPost.likes.length }}
          </span>
        </div>
        <div class="pb-4 text-center flex items-center">
          <div class="rounded-full bg-gray-200 p-2 cursor-pointer h-10 w-10">
            <Icon name="bx:bxs-message-rounded-dots" size="25" />
          </div>
          <span class="text-xs pl-2 pr-4 text-gray-800 font-semibold">
            {{ $generalStore.selectedPost.comments?.length }}
          </span>
        </div>
      </div>

      <div
        id="Comments"
        class="bg-[#F8F8F8] z-0 w-full h-[calc(100%-273px)] border-t-2 overflow-auto"
      >
        <div class="pt-2" />

        <div
          v-if="$generalStore.selectedPost.comments.length < 1"
          class="text-center mt-6 text-xl text-gray-500"
        >
          No comments...
        </div>
        <div
          v-else
          v-for="comment in $generalStore.selectedPost.comments"
          :key="comment"
          class="flex items-center justify-between px-8 mt-4"
        >
          <div v-if="comment" class="flex items-center relative w-full">
            <NuxtLink :to="`/profile/${comment.user.id}`">
              <Avatar
                class="absolute top-0 lg:mx-0 mx-auto"
                image-height="40"
                image-width="40"
                :image-src="comment.user.image"
              />
            </NuxtLink>
            <div class="ml-14 pt-0.5 w-full">
              <div
                class="text-[18px] font-semibold flex items-center justify-between"
              >
                <span>{{ comment.user.name }}</span>
                <button
                  :disabled="isSending"
                  v-if="$userStore.id === comment.user.id"
                  @click="openDeleteDialog(comment.id)"
                  class="h-[27px]"
                >
                  <Icon
                    class="cursor-pointer"
                    name="material-symbols:delete-outline-sharp"
                    size="25"
                  />
                </button>
              </div>
              <div class="text-[15px] font-light">
                {{ comment.text }}
              </div>
            </div>
          </div>
        </div>

        <div class="mb-28" />
      </div>

      <div
        id="CreateComment"
        v-if="$userStore.id"
        class="absolute flex items-center justify-between bottom-0 bg-white h-[85px] lg:max-w-[550px] w-full py-5 px-8 border-t-2"
      >
        <div
          :class="
            inputFocused
              ? 'border-2 border-gray-400'
              : 'border-2 border-[#F1F1F2]'
          "
          class="bg-[#F1F1F2] flex items-center rounded-lg w-full lg:max-w-[420px]"
        >
          <input
            v-model="comment"
            @focus="inputFocused = true"
            @blur="inputFocused = false"
            class="bg-[#F1F1F2] text-[14px] focus:outline-none w-full lg:max-w-[420px] p-2 rounded-lg"
            type="text"
            placeholder="Add comment..."
          />
        </div>
        <button
          :disabled="!comment || isSending"
          @click="addComment"
          :class="
            comment && !isSending
              ? 'text-primary cursor-pointer'
              : 'text-gray-400'
          "
          class="font-semibold text-sm ml-5 pr-1"
        >
          Post
        </button>
      </div>
    </div>
  </div>
</template>
