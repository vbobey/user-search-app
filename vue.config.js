module.exports = {
  publicPath: '/user-search-app/',
  css: {
    loaderOptions: {
      sass: {
        additionalData: `@import "@/assets/scss/mixins.scss";`
      }
    }
  }
};
