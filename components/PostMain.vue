<script setup>
import Avatar from "./Avatar.vue";

const props = defineProps(["post"]);
const { post } = toRefs(props);

const { $userStore, $generalStore } = useNuxtApp();
const { error } = storeToRefs($generalStore);
const router = useRouter();

const video = ref(null);

const isLoggedIn = () => {
  if (!$userStore.id) {
    $generalStore.isLoginOpen = true;
    return;
  }

  setTimeout(() => router.push(`/profile/${post.value.user.id}`), 200);
};

const isLiked = computed(() => {
  let res = post.value.likes.find((like) => like.user_id == $userStore.id);
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
    await $userStore.likePost(post.value);
  } catch (e) {
    error.value = e.response.data.message
      ? e.response.data.message
      : e.response.data.error;
  }
};

const unLikePost = async () => {
  if (!$userStore.id) {
    $generalStore.isLoginOpen = true;
    return;
  }

  try {
    await $userStore.unLikePost(post.value);
  } catch (e) {
    error.value = e.response.data.message
      ? e.response.data.message
      : e.response.data.error;
  }
};

const displayPost = (post) => {
  if (!$userStore.id) {
    $generalStore.isLoginOpen = true;
    return;
  }

  $generalStore.setBackUrl("/");
  $generalStore.selectedPost = post;
  setTimeout(() => {
    router.push(`/post/${post.id}`);
  }, 200);
};

const handleObservedPosts = () => {
  let observer = new IntersectionObserver(
    function (entries) {
      if (video.value) {
        if (entries[0].isIntersecting) {
          console.log("Element is playing" + post.value.id);
          video.value.play();
        } else {
          console.log("Element is paused" + post.value.id);
          video.value.pause();
        }
      }
    },
    { threshold: [0.6] }
  );

  observer.observe(document.getElementById(`PostMain-${post.value.id}`));
};

onMounted(() => {
  handleObservedPosts();
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
  <div :id="`PostMain-${post.id}`" class="border-b py-6 w-full">
    <div class="pl-3 w-full px-4">
      <div class="flex items-center justify-between pb-0.5">
        <div class="flex gap-2">
          <div class="cursor-pointer h-fit" @click="isLoggedIn">
            <Avatar
              v-if="post?.user.image"
              class="max-h-[60px]"
              :image-src="post.user.image"
              image-width="60"
              image-height="60"
            />
          </div>
          <button
            @click="isLoggedIn"
            class="flex flex-col items-start md:block"
          >
            <span class="font-bold hover:underline cursor-pointer">{{
              post?.user?.name
            }}</span>
            <span
              class="text-small font-light text-gray-500 pl-1 cursor-pointer"
              >{{ post?.user?.name }}</span
            >
          </button>
        </div>

        <button
          class="border text-normal px-[21px] py-0.5 border-primary text-primary hover:bg-primary_hover font-semibold rounded-md"
        >
          Follow
        </button>
      </div>

      <div
        class="text-normal pb-0.5 break-words max-w-[300px] md:max-w-[400px]"
      >
        {{ post?.text }}
      </div>
      <div class="text-[14px] text-gray-500 pb-0.5">
        #fun #cool #SuperAwesome
      </div>
      <div class="text-[14px] pb-0.5 flex items-center font-semibold">
        <Icon name="mdi:music" size="17" />
        <div class="px-1">original sound - AWESOME</div>
        <Icon name="mdi:heart" size="20" />
      </div>
      <div class="flex w-full justify-center md:justify-start">
        <div
          class="mt-2.5 relative flex min-h-[480px] max-h-[580px] max-w-[300px] md:min-h-0 md:max-h-[100%] md:max-w-[100%] overflow-hidden"
        >
          <div
            @click="displayPost(post)"
            class="relative min-h-[480px] max-h-[580px] max-w-[300px] flex items-center bg-black rounded-xl cursor-pointer"
          >
            <video
              ref="video"
              class="rounded-xl object-cover mx-auto h-full"
              loop
              muted
              :src="post.video"
            />

            <img
              class="absolute right-2 bottom-14"
              width="90"
              src="~/assets/images/tiktok-logo-white.png"
              alt=""
            />
          </div>
          <div
            class="absolute right-14 bottom-5 md:right-0 md:bottom-0 md:relative md:mr-[75px]"
          >
            <div class="absolute bottom-0 pl-2">
              <div class="pb-4 text-center">
                <button
                  @click="isLiked ? unLikePost(post) : likePost(post)"
                  class="rounded-full leading-3 bg-gray-200 p-2 cursor-pointer"
                >
                  <Icon
                    name="mdi:heart"
                    size="25"
                    :class="isLiked ? 'text-primary' : ''"
                  />
                </button>
                <span
                  class="text-xs text-white md:text-gray-800 font-semibold"
                  >{{ post.likes?.length }}</span
                >
              </div>

              <div class="pb-4 text-center">
                <button
                  @click="displayPost(post)"
                  class="rounded-full leading-3 bg-gray-200 p-2 cursor-pointer"
                >
                  <Icon name="bx:bxs-message-rounded-dots" size="25" />
                </button>
                <span
                  class="text-xs text-white md:text-gray-800 font-semibold"
                  >{{ post.comments?.length }}</span
                >
              </div>

              <div class="pb-4 text-center">
                <button
                  class="rounded-full leading-3 bg-gray-200 p-2 cursor-pointer"
                >
                  <Icon name="ri:share-forward-fill" size="25" />
                </button>
                <span class="text-xs text-white md:text-gray-800 font-semibold"
                  >34</span
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
