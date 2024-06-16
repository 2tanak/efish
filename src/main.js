import Vue from 'vue';
import Vuex from 'vuex';
import App from './App.vue';
import router from './router';
import moment from 'moment';
import Vue2Editor from 'vue2-editor';

import i18n from './i18n';
import store from '@/store/index.js';
import vuetify from './plugins/vuetify';
import vmodal from 'vue-js-modal';
import VTooltipPlugin from 'v-tooltip';

import '@fancyapps/ui';
import '@fancyapps/ui/dist/fancybox.css';
import VueNumber from 'vue-number-animation';

import Vuelidate from 'vuelidate';

import configFile from './config';

Vue.use(Vuelidate);

Vue.use(Vue2Editor);
Vue.use(VueNumber);
Vue.use(Vuex);
Vue.use(VTooltipPlugin);
Vue.use(vmodal);
Vue.prototype.moment = moment;
Vue.config.productionTip = false;

Vue.filter('formatDate', function (value) {
  if (value) {
    return moment(String(value)).format('DD.MM.YYYY HH:mm');
  }
});

Vue.filter('formatFullDate', function (value) {
  if (value) {
    return moment(String(value)).lang('ru').format('DD MMMM YYYY');
  }
});

Vue.filter('formatOnlyDate', function (value) {
  if (value) {
    return moment(String(value)).format('DD.MM.YYYY');
  }
});

Vue.filter('formatOnlyYear', function (value) {
  if (value) {
    return moment(String(value)).format('YYYY');
  }
});

Vue.filter('formatTime', function (value) {
  if (value) {
    return moment(String(value)).format('HH:mm');
  }
});

Vue.filter('procent', function (value) {
  if (value.total && value.number) {
    return ((value.number * 100) / value.total).toFixed(2);
  }
  return 0;
});

Vue.component('v-kazmap', require('./views/Map.vue').default);

Vue.component('v-header', require('./components/Header.vue').default);
Vue.component('v-mobile-header', require('./components/HeaderMobile.vue').default);
Vue.component('v-footer', require('./components/Footer.vue').default);

Vue.component('v-header-admin', require('./components/AdminHeader.vue').default);
Vue.component('v-footer-admin', require('./components/AdminFooter.vue').default);

Vue.component('v-sidebar', require('./components/Sidebar.vue').default);

Vue.component('v-preloader', require('./components/Preloader.vue').default);

router.beforeEach((to, from, next) => {
  let language = to.params.lang;
  let langArray = ['ru', 'kz']; //, 'en'
  if (!langArray.includes(language)) {
    window.location = `/ru/404`;
  }
  if (!language) {
    language = 'ru';
  }

  // set the current language for i18n.
  i18n.locale = language;
  next();
});

Vue.prototype.$configFile = configFile;

new Vue({
  router,
  i18n,
  vuetify,
  store: new Vuex.Store(store),
  render: (h) => h(App),
}).$mount('#app');
