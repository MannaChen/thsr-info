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
    trainID: [],
    trainStopsInfo: {},
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
    getSeats(context, payload) {
      return new Promise((resolve, reject) => {
        myAxios.get(`AvailableSeatStatusList/${payload.stationId}`)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    getAllTrainID({ state }) {
      return new Promise((resolve, reject) => {
        myAxios.get('/GeneralTimetable?$select=GeneralTimetable')
          .then((response) => {
            response.data.forEach((item) => {
              const trainID = item.GeneralTimetable.GeneralTrainInfo.TrainNo;
              const stopsInfo = item.GeneralTimetable.StopTimes;
              state.trainStopsInfo[trainID] = stopsInfo;
            });
            resolve(response.data);
          })
          .catch((error) => {
            reject(error);
          })
      });
    },
  },
});
