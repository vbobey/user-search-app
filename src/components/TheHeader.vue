<template>
  <div class="header">
    <h1>devfinder</h1>
    <button @click="toggleTheme">
      {{ buttonText }}
      <img :src="buttonImgSrc" alt="Icon to change theme" :style="imgColor" />
    </button>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState({
      theme: state => state.theme
    }),
    buttonText() {
      return this.theme === 'light' ? 'dark' : 'light';
    },
    buttonImgSrc() {
      return this.theme === 'light'
        ? require('@/assets/svg/icon-moon.svg')
        : require('@/assets/svg/icon-sun.svg');
    },
    imgColor() {
      return {
        '--filter':
          this.theme === 'light'
            ? 'brightness(0)'
            : 'invert(40%) sepia(34%) saturate(600%) hue-rotate(195deg) contrast(90%)'
      };
    }
  },
  methods: {
    toggleTheme() {
      this.$store.dispatch('toggleTheme');
    }
  }
};
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
}

h1 {
  font-weight: bold;
  font-size: 2.6rem;
  line-height: 3.8rem;
  color: var(--color-title);
  margin-bottom: 2.5rem;
}

button {
  color: var(--color-accent);
  font-size: 1.3rem;
  line-height: 1.9rem;
  letter-spacing: 2.5px;
  font-style: normal;
  font-weight: 700;
  text-transform: uppercase;
  border: none;
  padding: 1rem 0;
  align-self: flex-start;
  display: flex;
  align-items: center;
  background-color: transparent;

  img {
    margin-left: 1rem;
  }
}

button:hover {
  color: var(--color-text-hover);

  img {
    filter: var(--filter);
  }
}

button:active {
  transform: translateY(1px);
}
</style>
