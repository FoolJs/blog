export default {
    state: {
        maskShow: false, 
    },
    mutations: {
        openMask(state) {
            state.maskShow = true;
        },
        closeMask(state) {
            state.maskShow = false;
        }
    },
};
