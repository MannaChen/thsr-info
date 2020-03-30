<template>
  <div>
    <el-form label-position="left" label-width="90px">
      <el-form-item required label="起始車站">
        <el-select v-model="stationIdSelected" placeholder="请选择">
          <el-option
            v-for="item in $store.state.station"
            :key="item.StationID"
            :label="item.StationName.Zh_tw"
            :value="item.StationID">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="艙位">
        <el-checkbox-group v-model="seatTypeSelected">
          <el-checkbox label="經濟艙"></el-checkbox>
          <el-checkbox label="商務艙"></el-checkbox>
        </el-checkbox-group>
        <span v-show="seatTypeSelected.length < 1">至少選擇一種唷！</span>
      </el-form-item>
    </el-form>
    <el-button
      type="primary"
      :loading="loading"
      :disabled="btnDisabled"
      @click="getSeats">
      查詢座位
    </el-button>
    <section class="result"
      :class="[{'show-standard': seatTypeSelected.includes('經濟艙')},
      {'show-business': seatTypeSelected.includes('商務艙')}]"
    >
      <p>
        共 {{ tableData.length }} 個車次
        <el-tooltip placement="top">
          <div class="result-desc" slot="content">
            <span class="text-normal">正常</span>
            <span class="text-warning">有限</span>
            <span class="text-alert">售罄</span>
          </div>
          <i class="el-icon-warning-outline"></i>
        </el-tooltip>
      </p>
      <el-table v-loading="loading" :data="tableData" stripe max-height="300">
        <el-table-column fixed prop="trainId" label="車次" width="60" />
        <el-table-column fixed prop="departureTime" label="出發時間" width="80" />
        <el-table-column
          v-for="station in $store.state.station"
          :prop="station.StationID"
          :label="station.StationName.Zh_tw"
          :key="station.StationID"
        >
          <template slot-scope="scope">
            <i :class="['el-icon-user-solid',
              renderIconClass(scope.row[station.StationID] ? scope.row[station.StationID].split('|')[0] : null)]" />
            <i :class="['el-icon-s-goods',
              renderIconClass(scope.row[station.StationID] ? scope.row[station.StationID].split('|')[1] : null)]" />
          </template>
        </el-table-column>
      </el-table>
    </section>
  </div>
</template>

<script>
export default {
  data: () => ({
    stationIdSelected: '',
    seatTypeSelected: ['經濟艙', '商務艙'],
    loading: false,
    originData: [],
    tableData: [],
    isShowInfoPop: false,
  }),
  methods: {
    renderTable() {
      this.tableData = [];
      this.originData
        .sort((a, b) => {
          if (a.DepartureTime < b.DepartureTime) return -1;
          return 1;
        })
        .forEach((item) => {
          const seatInfo = {};
          item.StopStations.forEach((stop) => {
            seatInfo[stop.StationID] = `${stop.StandardSeatStatus}|${stop.BusinessSeatStatus}`;
          });
          this.tableData.push({
            trainId: item.TrainNo,
            departureTime: item.DepartureTime,
            ...seatInfo,
          });
        });
      this.loading = false;
    },
    renderIconClass(status) {
      switch (status) {
        case 'Available':
          return 'text-normal';
        case 'Limited':
          return 'text-warning';
        case 'Full':
          return 'text-alert';
        default:
          return 'is-hidden';
      }
    },
    getSeats() {
      this.loading = true;
      this.$store.dispatch('getSeats', {
        stationId: this.stationIdSelected,
      }).then((res) => {
        this.originData = res.data.AvailableSeats;
        this.renderTable();
      });
    },
  },
  computed: {
    btnDisabled() {
      if (!this.stationIdSelected) return true;
      if (this.seatTypeSelected.length === 0) return true;
      return false;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/components/checkSeats.scss';

</style>
