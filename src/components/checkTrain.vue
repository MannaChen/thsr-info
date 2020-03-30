<template>
  <div>
    <el-form label-position="left" label-width="70px">
      <el-form-item required label="起點">
        <el-select v-model="departureStation" placeholder="请选择">
          <el-option
            v-for="item in $store.state.station"
            :key="item.StationID"
            :label="item.StationName.Zh_tw"
            :value="item.StationID">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item required label="終點">
        <el-select v-model="arrivalStation" placeholder="请选择">
          <el-option
            v-for="item in $store.state.station"
            :key="item.StationID"
            :label="item.StationName.Zh_tw"
            :value="item.StationID">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item required label="日期">
        <el-date-picker
          :clearable="false"
          :editable="false"
          :picker-options="pickerOption"
          value-format="yyyy-MM-dd"
          v-model="departureDate"
          type="date"
          placeholder="选择發車日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="出發時間">
        <el-time-select
          v-model="departureTime"
          :editable="false"
          :clearable="false"
          :picker-options="{
            start: startTimeOption,
            step: '00:30',
            end: '23:30'
          }"
          placeholder="选择时间">
        </el-time-select>
      </el-form-item>
      <el-form-item label="抵達時間">
        <el-time-select
          v-model="arrivalTime"
          :editable="false"
          :clearable="false"
          :picker-options="{
            start: startTimeOption,
            step: '00:30',
            end: '23:30'
          }"
          placeholder="选择时间">
        </el-time-select>
      </el-form-item>
      <el-button
        type="primary"
        :loading="loading"
        :disabled="btnDisabled"
        @click="getTrains">
        查詢車次
      </el-button>
    </el-form>
    <section class="result">
      <p>共 {{ result.length }} 筆結果</p>
      <el-table v-loading="loading" :data="result" stripe max-height="300">
        <el-table-column type="index" />
        <el-table-column prop="DailyTrainInfo.TrainNo" label="車次" />
        <el-table-column prop="OriginStopTime.DepartureTime" label="出發" />
        <el-table-column prop="DestinationStopTime.ArrivalTime" label="抵達" />
      </el-table>
    </section>
  </div>
</template>

<script>
export default {
  data: () => ({
    departureStation: '',
    arrivalStation: '',
    departureDate: '',
    departureTime: '00:00',
    arrivalTime: '23:59',
    pickerOption: {
      disabledDate(date) {
        const now = new Date();
        // 已過日期不能選
        return date < now - 86400000 * 1;
      },
    },
    result: [],
    startTimeOption: '',
    loading: false,
  }),
  methods: {
    getTrains() {
      this.loading = true;
      this.$store.dispatch('getTrains', {
        departureStation: this.departureStation,
        arrivalStation: this.arrivalStation,
        departureDate: this.departureDate,
      }).then((res) => {
        this.loading = false;
        this.result = res.data.sort((a, b) => {
          if (a.OriginStopTime.DepartureTime < b.OriginStopTime.DepartureTime) return -1;
          return 1;
        }).filter(item => this.departureTime < item.OriginStopTime.DepartureTime)
          .filter(item => this.arrivalTime > item.DestinationStopTime.ArrivalTime);
      });
    },
    prepandZero(number) {
      if (number > 10) return number;
      return `0${number}`;
    },
  },
  computed: {
    btnDisabled() {
      return !this.departureStation || !this.arrivalStation;
    },
  },
  created() {
    const d = new Date();
    this.departureDate = `${d.getFullYear()}-${this.prepandZero(d.getMonth() + 1)}-${this.prepandZero(d.getDate())}`;

    let hour = d.getHours();
    let min = d.getMinutes();
    if (min > 30) {
      min = '0';
      hour += 1;
    } else {
      min = '30';
    }
    this.startTimeOption = `${this.prepandZero(hour)}:${this.prepandZero(min)}`;
    this.endTimeOption = `${this.prepandZero(hour + 24)}:${this.prepandZero(min)}`;
  },
};
</script>

<style scoped lang="scss">
.result {
  font-size: 13px;
}
</style>
