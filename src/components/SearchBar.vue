<template>
  <form @submit.prevent="searchUser">
    <input
      id="username"
      v-model.trim="username"
      type="text"
      placeholder="Search GitHub username..."
    />
    <button :disabled="!username" type="submit">Search</button>
  </form>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      username: "",
    };
  },
  methods: {
    async searchUser() {
      if (this.username) {
        const response = await axios.get(
          `https://api.github.com/users/${this.username}`
        );
        console.log(response);
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
