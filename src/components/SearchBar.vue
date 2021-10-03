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

<style lang="scss" scoped>
form {
  width: 100%;
  height: 7rem;
  background-color: var(--color-content-background);
  border-radius: 1.5rem;
  padding: 2rem 1rem;
  display: flex;
  align-items: center;
}

input {
  width: 100%;
  color: var(--color-text);
  font-size: 1.8rem;
  font-family: inherit;
  border: none;
  background-color: transparent;
  padding: 0 2rem;
}

button {
  height: 5rem;
  width: 10.6rem;
  color: var(--color-white);
  font-size: 1.6rem;
  font-family: inherit;
  font-weight: 700;
  background-color: var(--color-blue);
  border: none;
  border-radius: 1rem;
  margin-left: auto;
}
</style>
