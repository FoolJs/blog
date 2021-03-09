import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './plugins/element.js';

import './assets/icon/iconfont.css'; // 引入字体图标
import './assets/font/fonts.css'; // 引入字体样式

Vue.config.productionTip = false;



new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount('#app');
