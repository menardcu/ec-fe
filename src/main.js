import Vue from 'vue'
import App from './App.vue'
import Buefy from "buefy";
import "buefy/dist/buefy.css";
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faStar } from '@fortawesome/free-regular-svg-icons'

library.add(faStar)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.use(Buefy);
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
