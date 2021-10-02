<template>
  <div :style="backgroundColor" class="container">
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
import colors from './assets/css/colors.scss';

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
    }),
    backgroundColor() {
      return {
        backgroundColor: colors[`main-bg-${this.theme}`]
      };
    }
  }
};
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap');

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
}

.container {
  height: 100vh;
  padding: 14.4rem 35.5rem 0 35.5rem;
}
</style>
