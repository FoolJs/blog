export default {
    state: {
        sideSwitch: false,
    },
    mutations: {
        closeSide(state) {
            state.sideSwitch = false;
        },
        openSide(state) {
            state.sideSwitch = true;
        }
    },
};
