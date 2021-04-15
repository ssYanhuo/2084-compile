import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import axios from "axios";
import Qs from 'qs';
import Vuetify from "vuetify";

import 'element-ui/lib/theme-chalk/index.css';
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.prototype.$qs = Qs;
Vue.prototype.$vis = require("vis-network/dist/vis-network.min")
require("vis-network/styles/vis-network.min.css")
Vue.use(ElementUI)
Vue.use(Vuetify)

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')

export default new Vuetify({
  theme: { dark: true },
})
