import Vue from 'vue'
import App from './App.vue'
import axios from "axios";
import Qs from 'qs';
import Vuetify from 'vuetify';
import VueRouter from 'vue-router';
import lottie from 'vue-lottie'

import vuetify from './plugins/vuetify';
import './registerServiceWorker'
import predict from "@/components/Predict";
import nfa2DFA from "@/components/NFA2DFA";
import dfaMinimize from "@/components/DFAMinimize";
import regex2NFA from "@/components/Regex2NFA";
import home from "@/components/Home"
import calculateFirst from "@/components/CalculateFirst";
import calculateFollow from "@/components/CalculateFollow";
import ll1 from "@/components/LL1";
import elr from "@/components/ELR";
import rda from "@/components/RDA";
import lr0 from "@/components/LR0";

Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.prototype.$qs = Qs;
Vue.prototype.$vis = require("vis-network/dist/vis-network.min")
require("vis-network/styles/vis-network.min.css")
Vue.use(Vuetify)
Vue.use(VueRouter)
Vue.component('lottie', lottie)

const routes = [
  {path: '/predict', component: predict, name: 'Predict'},
  {path: '/nfa2DFA', component: nfa2DFA, name: 'NFA2DFA'},
  {path: '/dfaMinimize', component: dfaMinimize, name: 'DFAMinimize'},
  {path: '/regex2NFA', component: regex2NFA, name: 'Regex2NFA'},
  {path: '/calculateFirst', component: calculateFirst, name: 'calculateFirst'},
  {path: '/calculateFollow', component: calculateFollow, name: 'calculateFollow'},
  {path: '/ll1', component: ll1, name: "LL1"},
  {path: '/home', component: home, name: 'Home'},
  {path: '/elr', component: elr, name: 'ELR'},
  {path: '/rda', component: rda, name: 'RDA'},
  {path: '/lr0', component: lr0, name: 'LR0'},
  {path: '', component: home, name: 'Default'}
]

const router = new VueRouter({
  routes
})

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
