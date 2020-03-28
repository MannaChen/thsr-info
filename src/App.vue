<template>
  <div id="app">
    <h1>高鐵即時資料查詢</h1>
    <div id="nav">
      <router-link to="/checkTrain">查詢車次</router-link> |
      <router-link to="/checkStop">查詢停靠站</router-link> |
      <router-link to="/checkSeats">查詢座位</router-link>
    </div>
    <router-view />
  </div>
</template>

<script>

export default {
  data: () => ({
  }),
  created() {
    this.$store.dispatch('getStations');
  },
};
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', 'Microsoft JhengHei',Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  padding: 20px;
  h1 {
    margin: 0 0 20px 0;
  }
}

#nav {
  margin-bottom: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
