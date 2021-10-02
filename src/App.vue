<template>
  <the-header></the-header>
  <search-bar></search-bar>
  <user-profile></user-profile>
</template>

<script>
import TheHeader from "./components/TheHeader.vue";
import SearchBar from "./components/SearchBar.vue";
import UserProfile from "./components/UserProfile.vue";

export default {
  name: "App",
  components: {
    TheHeader,
    SearchBar,
    UserProfile,
  },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap");
@import "./assets/css/colors.scss";

*,
*::before,
*::after {
  margin: 0;
  padding: 0;
  box-sizing: inherit;
}

html {
  font-size: 62.5%;
  font-family: "Space Mono", monospace;
}

body {
  box-sizing: border-box;
}
</style>
