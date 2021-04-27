import Vue from 'vue'
import App from './App.vue'
import axios from "axios";
import Qs from 'qs';
import Vuetify from 'vuetify';
import VueRouter from 'vue-router';

import vuetify from './plugins/vuetify';
import './registerServiceWorker'
import predict from "@/components/Predict";
import nfa2DFA from "@/components/NFA2DFA";
import dfaMinimize from "@/components/DFAMinimize";
import regex2NFA from "@/components/Regex2NFA";
import home from "@/components/Home"
import CalculateFirst from "@/components/CalculateFirst";
import CalculateFollow from "@/components/CalculateFollow";
import LL1 from "@/components/LL1";

Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.prototype.$qs = Qs;
Vue.prototype.$vis = require("vis-network/dist/vis-network.min")
require("vis-network/styles/vis-network.min.css")
Vue.use(Vuetify)
Vue.use(VueRouter)

const routes = [
  {path: '/predict', component: predict, name: 'Predict'},
  {path: '/nfa2DFA', component: nfa2DFA, name: 'NFA2DFA'},
  {path: '/dfaMinimize', component: dfaMinimize, name: 'DFAMinimize'},
  {path: '/regex2NFA', component: regex2NFA, name: 'Regex2NFA'},
  {path: '/calculateFirst', component: CalculateFirst, name: 'calculateFirst'},
  {path: '/calculateFollow', component: CalculateFollow, name: 'calculateFollow'},
  {path: '/ll1', component: LL1, name: "LL1"},
  {path: '/home', component: home, name: 'Home'},
  {path: '*', component: home, name: 'Default'}
]

const router = new VueRouter({
  routes
})

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
