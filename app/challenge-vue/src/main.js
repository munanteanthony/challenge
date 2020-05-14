import Vue from 'vue'
import App from './App.vue'
import VueResource from 'vue-resource'
import Chartkick from 'vue-chartkick'
import Chart from 'chart.js'

Vue.use(VueResource);

Vue.use(Chartkick.use(Chart))
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
