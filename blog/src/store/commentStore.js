// 评论相关的Store

export default {
    state: {
        commentKey: 1,   // 与评论绑定的Key值，控制它让评论刷新
    },
    mutations: {

        changeCommentKey(state) {
            state.commentKey += 1;
        }
    },
};
