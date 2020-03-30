<template>
  <div>
    <el-form label-position="left" label-width="70px">
      <el-form-item required label="車次ID">
        <el-select v-model="trainIDSelected" filterable placeholder="请选择">
          <el-option
            v-for="item in allTrainID"
            :key="item"
            :label="item"
            :value="item">
          </el-option>
        </el-select>
      </el-form-item>
      <el-button
        type="primary"
        :disabled="btnDisabled"
        @click="getStops">
        查詢停靠站
      </el-button>
    </el-form>
    <section class="result">
      <p>共 {{ result.length }} 個停靠站</p>
      <el-table :data="result" stripe max-height="500">
        <el-table-column type="index" />
        <el-table-column prop="StationName.Zh_tw" label="停靠站" />
        <el-table-column prop="DepartureTime" label="離開時間" />
      </el-table>
    </section>
  </div>
</template>

<script>
export default {
  data: () => ({
    trainIDSelected: '',
    trainStopsInfo: {},
    result: [],
    isCreated: false,
  }),
  computed: {
    allTrainID() {
      if (!this.isCreated) return null;
      return Object.keys(this.trainStopsInfo);
    },
    btnDisabled() {
      return !this.trainIDSelected;
    },
  },
  created() {
    this.$store.dispatch('getAllTrainID').then((res) => {
      this.isCreated = true;
      this.trainStopsInfo = res;
    });
  },
  methods: {
    getStops() {
      this.result = this.trainStopsInfo[this.trainIDSelected];
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
