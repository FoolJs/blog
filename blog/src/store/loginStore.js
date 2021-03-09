export default {
    state: {
        box: false, // 登录框开关
    },
    mutations: {
        changeBox(state) {
            state.box = !state.box;
        }
    },
};