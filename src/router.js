import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/checkTrain',
    },
    {
      path: '/checkTrain',
      component: () => import('./components/checkTrain.vue'),
    },
    {
      path: '/checkStop',
      component: () => import('./components/checkStop.vue'),
    },
    {
      path: '/checkSeats',
      component: () => import('./components/checkSeats.vue'),
    },
  ],
});
