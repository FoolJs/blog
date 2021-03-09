import { getJurisdictionList } from '../services/jurisdiction';
import { formatRouterTree, generateRouter, generateNav } from '../libs/utils';

export default {
    state: {
        token: '',
        jurisdictionRouter: [], // 权限路由
        jurisdictionNav: [], // 权限导航
    },
    mutations: {
        /**
         * @description 将token添加到VueX和浏览器存储中
         */
        setToken(state, obj) {
            state.token = obj.token;
            localStorage.setItem('token', obj.token);
        },
        /**
         * @description 退出登录
         */
        deleteToken(state) {
            localStorage.removeItem('token');
            state.token = '';
            state.jurisdictionRouter = [];
            state.jurisdictionNav = [];
        },

        /**
         * @description 将权限路由表添加到VueX
         */
        setJurisdictionRouterTree(state, jurisdictionRouter) {
            state.jurisdictionRouter = jurisdictionRouter;
        },

        setJurisdictionNav(state, jurisdictionNav) {
            state.jurisdictionNav = jurisdictionNav;
        },
    },
    actions: {
        /**
         * @description 获取权限路由列表
         */
        async getJurisdiction({ commit }) {
            let { data } = await getJurisdictionList({});

            if (data.err === 0) {
                let jurisdiction = data.jurisdiction;

                let routerTree = formatRouterTree(jurisdiction);

                let jurisdictionRouter = generateRouter(routerTree);

                let jurisdictionNav = generateNav(routerTree);

                commit('setJurisdictionRouterTree', jurisdictionRouter);
                commit('setJurisdictionNav', jurisdictionNav);
            } else if (data.err === -900) {
                commit('deleteToken');
            }
        },
    },
};
