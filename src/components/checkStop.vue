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
        @click="getStops">
        查詢停靠站
      </el-button>
    </el-form>
    <section class="result">
      <p>共 {{ result.length }} 個停靠站</p>
      <div v-for="item in result" :key="item.StopSequence">
        <span>{{ item.StopSequence }}：{{ item.StationName.Zh_tw }}，</span>
        <span>離開時間 {{ item.DepartureTime }}，</span>
        <hr>
      </div>
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
