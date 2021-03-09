export default {
    state: {
        messageBoxShow: false,
    },
    mutations: {
        openMessageBox(state) {
            state.messageBoxShow = true;
        },
        closeMessageBox(state) {
            state.messageBoxShow = false;
        },
    },
};
