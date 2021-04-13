<!-- mapbox -->
<template>
  <div class="com-container">
    <div id="map"></div>
  </div>
</template>
 
<script>
export default {
  data: function () {
    return {};
  },
  components: {},
  created() {},
  mounted() {
    this.initmap();
  },
  computed: {},
  methods: {
    initmap() {
      this.$mapboxgl.accessToken =
        "pk.eyJ1IjoiZ29uZ3dmNjYyIiwiYSI6ImNrbjYzd3h0ODBhajUyd3M0MGZvZmo2dnEifQ.R0WTQv3t1nIwoZ-Hy23xWw";
      var map = new this.$mapboxgl.Map({
        container: "map",
        style: "mapbox://styles/mapbox/streets-v11",
        center: [104.07, 30.67],
        zoom: 5,
        pitch: 0, //视野倾斜，0-60
        // bearing: -17.6,//视野旋转角度
      });

      //注册点击事件
      map.on("click", function (e) {
        console.log("点击");
      });
    },
  },
};
</script>
 
<style>
#map {
  height: 800px;

}
</style>