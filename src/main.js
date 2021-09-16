import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import { LMap, LTileLayer, LMarker } from 'vue2-leaflet'
import { Icon } from 'leaflet';
 
// Order is importtant on the below files
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'leaflet/dist/leaflet.css'

Vue.config.productionTip = false

// Leaflet Icon Configuration
delete Icon.Default.prototype._getIconUrl;
Icon.Default.mergeOptions({
  //iconRetinaUrl:require('leaflet/dist/images/marker-icon-2x.png'),
  iconRetinaUrl:require('@/assets/images/icon-location.svg'),
  //iconUrl:require('leaflet/dist/images/marker-icon.png'),
  iconUrl:require('@/assets/images/icon-location.svg'),
  shadowUrl:require('leaflet/dist/images/marker-shadow.png')
});

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

Vue.component('l-map', LMap);
Vue.component('l-tile-layer', LTileLayer);
Vue.component('l-marker', LMarker);


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
