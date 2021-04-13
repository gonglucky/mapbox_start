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
        style: "mapbox://styles/mapbox/dark-v10",
        center: [109.0283203125, 34.05265942137599],
        zoom: 3.5,
        // pitch: 0, //视野倾斜，0-60
        // bearing: -17.6,//视野旋转角度
      });
      map.on("load", function () {
        // Add a geojson point source.
        // Heatmap layers also work with a vector tile source.
        map.addSource("aqi-source", {
          type: "geojson",
          data: "/assets/test.json",
        });
        // 添加热力图图层da
        map.addLayer(
          {
            id: "aqi-heatmap",
            type: "heatmap",
            source: "aqi-source",
            maxzoom: 9,
            paint: {
              // 使用new_diagnosis属性
              "heatmap-weight": [
                "interpolate",
                ["linear"],
                ["get", "new_recovery"],
                0,
                0,
                6,
                1,
              ],
              "heatmap-intensity": [
                "interpolate",
                ["linear"],
                ["zoom"],
                0,
                1,
                9,
                3,
              ],
              // Color ramp for heatmap.  Domain is 0 (low) to 1 (high).
              // Begin color ramp at 0-stop with a 0-transparancy color
              // to create a blur-like effect.
              "heatmap-color": [
                "interpolate",
                ["linear"],
                ["heatmap-density"],
                0,
                "rgba(33,102,172,0)",
                0.1,
                "rgb(103,169,207)",
                0.2,
                "rgb(209,229,240)",
                0.3,
                "rgb(253,219,199)",
                0.8,
                "rgb(239,138,98)",
                1,
                "rgb(178,24,43)",
              ],
              // Adjust the heatmap radius by zoom level
              "heatmap-radius": [
                "interpolate",
                ["linear"],
                ["zoom"],
                0,
                2,
                9,
                15,
              ],
              // Transition from heatmap to circle layer by zoom level
              "heatmap-opacity": [
                "interpolate",
                ["linear"],
                ["zoom"],
                7,
                1,
                9,
                0,
              ],
            },
          },
          "waterway-label"
        );
      });
      map.addLayer(
        {
          id: "earthquakes-point",
          type: "circle",
          source: "earthquakes",
          minzoom: 7,
          paint: {
            // Size circle radius by earthquake magnitude and zoom level
            "circle-radius": [
              "interpolate",
              ["linear"],
              ["zoom"],
              7,
              ["interpolate", ["linear"], ["get", "mag"], 1, 1, 6, 4],
              16,
              ["interpolate", ["linear"], ["get", "mag"], 1, 5, 6, 50],
            ],
            // Color circle by earthquake magnitude
            "circle-color": [
              "interpolate",
              ["linear"],
              ["get", "mag"],
              1,
              "rgba(33,102,172,0)",
              2,
              "rgb(103,169,207)",
              3,
              "rgb(209,229,240)",
              4,
              "rgb(253,219,199)",
              5,
              "rgb(239,138,98)",
              6,
              "rgb(178,24,43)",
            ],
            "circle-stroke-color": "white",
            "circle-stroke-width": 1,
            // Transition from heatmap to circle layer by zoom level
            "circle-opacity": ["interpolate", ["linear"], ["zoom"], 7, 0, 8, 1],
          },
        },
        "waterway-label"
      );
    },
  },
};
</script>
 
<style>
body {
  margin: 0;
  padding: 0;
}

#map {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
}
</style>