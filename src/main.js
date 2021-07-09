import Vue from 'vue'
import VueCookies from 'vue-cookies';
import App from './App.vue'
import Buefy from "buefy";
import "buefy/dist/buefy.css";
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import { faCheck, faCheckCircle, faInfoCircle, faExclamationTriangle, faExclamationCircle,
    faArrowUp, faAngleRight, faAngleLeft, faAngleDown, faEye, faEyeSlash, faCaretDown, 
    faCaretUp, faUpload, faStar, faGlobeAsia, faWallet, faSearch} from "@fortawesome/free-solid-svg-icons";

library.add(faCheck, faCheckCircle, faInfoCircle, faExclamationTriangle, faExclamationCircle,
    faArrowUp, faAngleRight, faAngleLeft, faAngleDown, faEye, faEyeSlash, faCaretDown, 
    faCaretUp, faUpload, faStar, faGlobeAsia, faWallet, faSearch);
Vue.component('vue-fontawesome', FontAwesomeIcon);

Vue.use(VueCookies);

Vue.use(Buefy, {
  defaultIconComponent: 'vue-fontawesome',
  defaultIconPack: 'fas',
});
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
