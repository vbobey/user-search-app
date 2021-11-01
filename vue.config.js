module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/user-search-app' : '/',
  css: {
    loaderOptions: {
      sass: {
        additionalData: `@import "@/assets/scss/mixins.scss";`
      }
    }
  }
};
