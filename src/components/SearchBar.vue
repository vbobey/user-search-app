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
  box-shadow: 0 1.6rem 3rem -1rem rgba(70, 96, 187, 0.2);
}

img {
  width: 2.4rem;
  height: 2.4rem;
  margin-left: 1.4rem;
}

input {
  width: 100%;
  color: var(--color-text-input);
  font-size: 1.8rem;
  font-family: inherit;
  line-height: 2.5rem;
  border: none;
  background-color: transparent;
  padding: 0 2rem;

  &::placeholder {
    color: var(--color-text-placeholder);
  }

  &:focus,
  &:active {
    outline: none;
    caret-color: var(--color-blue);
  }
}

button {
  height: 5rem;
  width: 10.6rem;
  color: var(--color-white);
  font-size: 1.6rem;
  font-family: inherit;
  font-weight: 700;
  line-height: 2.4rem;
  background-color: var(--color-blue);
  border: none;
  border-radius: 1rem;
  margin-left: auto;
  transition: all 0.2s;

  &:hover:enabled,
  &:active:enabled {
    background-color: var(--color-blue-light);
  }

  &:hover:enabled {
    transform: translateY(-2px);
  }

  &:active:enabled {
    transform: translateY(0px);
  }

  &:disabled {
    cursor: not-allowed;
  }
}
</style>
