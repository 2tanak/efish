import Vue from 'vue';
import VueRouter from 'vue-router';

import { routes } from './routes';
import VueHead from 'vue-head';

Vue.use(VueHead, {
  separator: '|',
  complement: 'Мониторинг рыб и других водных животных',
});
Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});
export default router;
