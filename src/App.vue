<template>
  <div id="app">
    <h1>高鐵即時資料查詢</h1>
    <nav>
      <div class="router-wrapper">
        <router-link
          v-for="link in routerLinks" :key="link.id"
          :to="link.path"
          @click.native="routerActiveIndex = link.id"
        >
          {{ link.label }}
        </router-link>
        <div class="active-bar" :style="activeBarStyle"></div>
      </div>
    </nav>
    <main>
      <keep-alive>
        <router-view />
      </keep-alive>
    </main>
  </div>
</template>

<script>

export default {
  data: () => ({
    routerActiveIndex: 0,
    routerLinks: [
      { id: 0, path: '/checkTrain', label: '查詢車次' },
      { id: 1, path: '/checkStop', label: '查詢停靠站' },
      { id: 2, path: '/checkSeats', label: '查詢座位' },
    ],
  }),
  computed: {
    activeBarStyle() {
      return {
        width: `${100 / this.routerLinks.length}%`,
        left: `${(100 / this.routerLinks.length) * this.routerActiveIndex}%`,
      };
    },
  },
  created() {
    this.$store.dispatch('getStations');
  },
};
</script>

<style lang="scss">
@import '@/assets/scss/components/app.scss';

</style>
