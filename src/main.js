import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import axios from "axios";
import Qs from 'qs';
import Vuetify from 'vuetify';
import VueRouter from 'vue-router';

import 'element-ui/lib/theme-chalk/index.css';
import vuetify from './plugins/vuetify';
import './registerServiceWorker'
import predict from "@/components/Predict";
import nfa2DFA from "@/components/NFA2DFA";
import dfaMinimize from "@/components/DFAMinimize";
import regex2NFA from "@/components/Regex2NFA";
import home from "@/components/Home"

Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.prototype.$qs = Qs;
Vue.prototype.$vis = require("vis-network/dist/vis-network.min")
require("vis-network/styles/vis-network.min.css")
Vue.use(ElementUI)
Vue.use(Vuetify)
Vue.use(VueRouter)

const routes = [
  {path: '/predict', component: predict, name: 'Predict'},
  {path: '/nfa2DFA', component: nfa2DFA, name: 'NFA2DFA'},
  {path: '/dfaMinimize', component: dfaMinimize, name: 'DFAMinimize'},
  {path: '/regex2NFA', component: regex2NFA, name: 'Regex2NFA'},
  {path: '/home', component: home, name: 'Home'},
  {path: '*', component: home}
]

const router = new VueRouter({
  routes
})

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
