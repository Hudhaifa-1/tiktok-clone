import { defineStore } from "pinia";
import { useUserStore } from "./user";
import axios from "~/plugins/axios";

const $axios = axios().provide.axios;


export const useGeneralStore = defineStore("general", {
  state: () => ({
    isLoginOpen: false,
    isEditProfileOpen: false,
    selectedPost: null,
    ids: null,
    isBackUrl: "/",
    posts: null,
    suggested: null,
    following: null,
    error: null,
  }),

  actions: {
    bodySwitch(val) {
      if (val) {
        document.body.style.overflow = "hidden";
        return;
      }
      document.body.style.overflow = "visible";
    },

    setBackUrl(url) {
      this.isBackUrl = url;
    },

    async getRandomUsers() {
      let res = await $axios.get("api/get-random-users");
      this.$state.suggested = res.data.suggested;
      this.$state.following = res.data.following;
    },

    async getAllUsersAndPosts(){
      let res = await $axios.get('/api/home')
      this.$state.posts = res.data
    },

    async getPostById(id){
      let res = await $axios.get(`/api/posts/${id}`)

      this.$state.selectedPost = res.data.post[0]
      this.$state.ids = res.data.ids
    },

    async hasSessionExpired() {
      await $axios.interceptors.response.use(
        (response) => {
          // Call was successfull, continue
          return response;
        },
        (error) => {
          switch (error?.response?.status) {
            case 401: // Not logged in
            case 419: // Session expired
            case 503: // Down for maintenace
              // throw user to the login screen
              useUserStore().resetUser();
              window.location.href = "/";
              break;
            case 500:
              alert("Oops, something went wrong! The team has been notified.");
              break;
            default:
              // Allow individual requests to handle other errors
              return Promise.reject(error);
          }
        }
      );
    },
  },

  persist: true,
});
