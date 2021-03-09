

export default {
    state: {
        switch: false,
        night: false,
    },
    mutations: {
        changeSwitch(state) {
            state.switch = !state.switch;
        },
        changeNight(state) {
            state.night = !state.night;
        },
    },
};