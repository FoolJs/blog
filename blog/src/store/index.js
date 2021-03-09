import Vue from 'vue';
import Vuex from 'vuex';
import tokenStore from './tokenStore';
import consoleStore from './consoleStore';
import loginStore from './loginStore';
import maskStore from './maskStore';
import commentKeyStore from './commentStore';
import sideNavStore from './sideNavStore';
import messageBoxStore from './messageBox';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {},
    mutations: {},
    actions: {},
    modules: {
        tokenStore,
        consoleStore,
        loginStore,
        maskStore,
        commentKeyStore,
        sideNavStore,
        messageBoxStore
    },
});
