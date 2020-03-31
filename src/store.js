import Vue from 'vue';
import Vuex from 'vuex';
import { getAuthorizationHeader } from '@/api/authorization';

const axios = require('axios');

Vue.use(Vuex);

const myAxios = axios.create({
  baseURL: 'https://ptx.transportdata.tw/MOTC/v2/Rail/THSR/',
  timeout: 5000,
});

export default new Vuex.Store({
  state: {
    station: [],
    trainID: [],
  },
  mutations: {

  },
  actions: {
    getStations({ state }) {
      return new Promise((resolve, reject) => {
        myAxios.get('/Station', { headers: getAuthorizationHeader() })
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
        myAxios.get(`/DailyTimeTable/OD/${payload.departureStation}/to/${payload.arrivalStation}/${payload.departureDate}`, { headers: getAuthorizationHeader() })
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
        myAxios.get(`AvailableSeatStatusList/${payload.stationId}`, { headers: getAuthorizationHeader() })
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    getAllTrainID() {
      return new Promise((resolve, reject) => {
        myAxios.get('/GeneralTimetable?$select=GeneralTimetable', { headers: getAuthorizationHeader() })
          .then((response) => {
            const trainStopsInfo = {};
            response.data.forEach((item) => {
              const trainID = item.GeneralTimetable.GeneralTrainInfo.TrainNo;
              const stopsInfo = item.GeneralTimetable.StopTimes;
              trainStopsInfo[trainID] = stopsInfo;
            });
            resolve(trainStopsInfo);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
  },
});
