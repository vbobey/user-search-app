<template>
  <form @submit.prevent="searchUser">
    <img
      src="../assets/svg/icon-search.svg"
      alt="Magnifying Glass Search Icon"
    />
    <input
      id="username"
      v-model.trim="username"
      type="text"
      placeholder="Search GitHub username..."
    />
    <button :disabled="!username" type="submit">
      Search
    </button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      isLoading: false,
      error: ''
    };
  },
  methods: {
    async searchUser() {
      this.isLoading = true;
      try {
        await this.$store.dispatch('getUser', this.username);
      } catch (error) {
        this.error =
          error.message || `Could not fetch user profile for ${this.username}.`;
      }
      this.isLoading = false;
    }
  }
};
</script>

<style lang="scss" scoped></style>
