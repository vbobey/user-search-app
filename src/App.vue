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

<style>
*,
*::before,
*::after {
  margin: 0;
  padding: 0;
  box-sizing: inherit;
}

html {
  font-size: 62.5%;
}

body {
  box-sizing: border-box;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
