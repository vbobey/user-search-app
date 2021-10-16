<template>
  <div class="container">
    <the-header></the-header>
    <search-bar></search-bar>
    <user-profile></user-profile>
  </div>
</template>

<script>
import TheHeader from './components/TheHeader.vue';
import SearchBar from './components/SearchBar.vue';
import UserProfile from './components/UserProfile.vue';
import { mapState } from 'vuex';

export default {
  name: 'App',
  components: {
    TheHeader,
    SearchBar,
    UserProfile
  },
  computed: {
    ...mapState({
      theme: state => state.theme
    })
  },
  created() {
    const theme = localStorage.getItem('theme') ?? 'light';
    this.$store.dispatch('setTheme', theme);
    this.setTheme();
  },
  watch: {
    theme() {
      this.setTheme();
    }
  },
  methods: {
    setTheme() {
      const rootElement = document.documentElement;
      rootElement.setAttribute('theme', this.theme);
      localStorage.setItem('theme', this.theme);
    }
  }
};
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap');
@import './assets/css/colors.scss';

*,
*::before,
*::after {
  margin: 0;
  padding: 0;
  box-sizing: inherit;
}

html {
  font-size: 62.5%;
  font-family: 'Space Mono', monospace;
}

body {
  box-sizing: border-box;
  background-color: var(--color-main-background);
}

#app {
  height: 100vh;
  display: flex;
  justify-content: center;
  margin-top: 14rem;
}

.container {
  width: 100%;
  max-width: 100rem;
}
</style>
