import Vue from 'vue';
import Vuex from 'vuex';
import { getAuthorizationHeader } from '@/api/authorization';

const axios = require('axios');

Vue.use(Vuex);

const myAxios = axios.create({
  baseURL: 'https://ptx.transportdata.tw/MOTC/v2/Rail/THSR/',
  timeout: 5000,
  headers: getAuthorizationHeader(),
});

export default new Vuex.Store({
  state: {
    station: [],
  },
  mutations: {

  },
  actions: {
    getStations({ state }) {
      return new Promise((resolve, reject) => {
        myAxios.get('/Station')
          .then((response) => {
            state.station = response.data;
            resolve();
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    getTrains(context, payload) {
      return new Promise((resolve, reject) => {
        myAxios.get(`/DailyTimeTable/OD/${payload.departureStation}/to/${payload.arrivalStation}/${payload.departureDate}`)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
  },
});
