/**
  *@info 入口文件
  *@author: thinkmix
  *@date 2018-03-15
* */
import Vue from 'vue';
import store from './store';
import router from './router';
import App from './App';


import { Button } from 'element-ui';
Vue.use(Button);

require("./assets/css/style.css");
require("./config/service.js");

new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App },
});
