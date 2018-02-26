import './vendor';

import Vue from 'vue';
import Vuex from 'vuex';
import VueRouter from 'vue-router';

import {mount} from './routing/mount';

import App from '../components/App.vue';

// Init Vue Native Modules
Vue.use(Vuex);
Vue.use(VueRouter);

// Mount Vue
mount(`#app-container`, App);