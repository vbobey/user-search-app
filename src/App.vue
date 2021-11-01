<template>
  <main class="container">
    <the-header></the-header>
    <search-bar></search-bar>
    <user-profile></user-profile>
  </main>
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
    let theme;

    if (
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
    ) {
      // Use darkmode if the user prefers it
      theme = 'dark';
    }

    if (!theme) {
      theme = localStorage.getItem('theme') ?? 'light';
    }

    this.$store.dispatch('setTheme', theme);
    this.$store.dispatch('getUser', 'octocat');
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
@import './assets/scss/colors.scss';

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
  display: flex;
  justify-content: center;
  margin-top: 14rem;

  @include media-md-land {
    margin-top: 8rem;
  }

  @include media-sm {
    margin-top: 0;
  }

  @include media-sm-land {
    margin-top: 0;
    padding: 3rem 2rem;
  }
}

.container {
  width: 100%;
  max-width: 73rem;

  @include media-md {
    max-width: 57.3rem;
  }

  @include media-sm {
    padding: 3rem 0;
    max-width: 32.7rem;
  }

  @include media-xs {
    max-width: 90%;
  }
}
</style>
