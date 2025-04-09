import { defineStore } from "pinia";
import axios from "~/plugins/axios";

const $axios = axios().provide.axios;

export const useUserStore = defineStore("user", {
  state: () => ({
    id: "",
    name: "",
    email: "",
    bio: "",
    image: "",
  }),

  actions: {
    async getTokens() {
      await $axios.get("/sanctum/csrf-cookie");
    },

    async login(email, password) {
      await $axios.post("/login", {
        email: email,
        password: password,
      });
    },

    async register(name, email, password, confirmPassword) {
      await $axios.post("/register", {
        name: name,
        email: email,
        password: password,
        password_confirmation: confirmPassword,
      });
    },

    async getUser() {
      let res = await $axios.get("/api/logged-in-user");

      this.$state.id = res.data[0].id;
      this.$state.name = res.data[0].name;
      this.$state.bio = res.data[0].bio;
      this.$state.image = res.data[0].image;
    },

    async updateUser(name, bio) {
      return await $axios.patch("/api/update-user", {
        name: name,
        bio: bio,
      });
    },

    async updateUserImage(data) {
      return await $axios.post("/api/update-user-image", data);
    },

    async createPost(data) {
      return await $axios.post("/api/posts", data);
    },

    async deletePost(post) {
      return await $axios.delete(`/api/posts/${post.id}`);
    },

    async likePost(post) {
      let newLike = {
        id: "temp_" + Date.now(), // temp id
        user_id: this.id,
        post_id: post.id,
      };

      post.likes.push(newLike);

      let res = await $axios.post("/api/likes", {
        post_id: post.id,
      });

      const tempIndex = post.likes.findIndex((like) => like.id === newLike.id);
      if (tempIndex !== -1) {
        post.likes[tempIndex] = res.data.like;
      }
    },

    async unLikePost(post) {
      const index = post.likes.findIndex((like) => like.user_id === this.id);

      if (index === -1) return;

      const likeToDelete = post.likes[index];

      post.likes.splice(index, 1);

      await $axios.delete(`/api/likes/${likeToDelete.id}`);
    },

    async addComment(post, comment) {
      let res = await $axios.post("/api/comments", {
        post_id: post.id,
        comment: comment,
      });

      if (res.status === 200) {
        this.updateComments(post, res.data);
      }
    },

    async deleteComment(post, commentId) {
      let res = await $axios.delete("/api/comments/" + commentId);

      if (res.status === 200) {
        this.updateComments(post, commentId, true);
      }
    },

    async updateComments(post, data, isDelete) {
      if (!isDelete) {
        let newComment = {
          id: data.comment.id,
          text: data.comment.text,
          user: data.user[0],
        };
        post.comments.unshift(newComment);
        return;
      }

      let deletedCommentIndex = post.comments.findIndex((co) => co.id == data);
      post.comments.splice(deletedCommentIndex, 1);
    },

    async logout() {
      await $axios.post("/logout");
      this.resetUser();
    },

    resetUser() {
      this.$state.id = "";
      this.$state.name = "";
      this.$state.email = "";
      this.$state.bio = "";
      this.$state.image = "";
    },
  },

  persist: true,
});
