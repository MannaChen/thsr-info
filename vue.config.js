module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/thsr-info'
    : '/',
  css: {
    loaderOptions: {
      sass: {
        prependData: "@import '@/assets/scss/global.scss';",
      },
    },
  },
}