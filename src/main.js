import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import mapBoxGl from 'mapbox-gl'
Vue.config.productionTip = false
Vue.prototype.$mapboxgl = mapBoxGl
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
