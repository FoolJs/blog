<template>
    <div :class="{ 'comment-input': true, 'night-comment-input': night }">
        <avatar></avatar>
        <div class="input-right">
            <textarea
                maxlength="199"
                v-model="value"
                placeholder="留下您的意见与评论吧..."
            ></textarea>
            <p class="font-rule">
                {{ `${value.length}/199` }}
            </p>
            <div class="submit-comment" @click="patternCommentOrReply">
                提交
            </div>
        </div>
    </div>
</template>

<script>
import { publishComment, replyComment } from '../../services/comment';
import { Message } from 'element-ui';

export default {
    name: 'CommentInput',
    components: {
        Avatar: () => import('../navigationBar/TopNavLeft.vue'),
    },
    props: {
        articleId: {
            type: String,
        },
        pattern: {
            type: String,
            required: true,
        },
        commentUserId: {
            type: String,
        },
        commentId: {
            type: String,
        },
    },
    data() {
        return {
            value: '', // 与文本域双向绑定的变量
        };
    },
    computed: {
        token() {
            return this.$store.state.tokenStore.token;
        },
        night() {
            return this.$store.state.consoleStore.night;
        },
    },
    methods: {
        // 评论或者回复评论
        patternCommentOrReply() {
            if (this.pattern === 'COMMENT') {
                this.requestComment();
            } else if (this.pattern === 'REPLY') {
                this.requestReply();
            }
        },

        // 评论
        requestComment() {
            if (!this.token) {
                this.$store.commit('changeBox');
            } else {
                this.$store.commit('openMask');
                publishComment({ id: this.articleId, value: this.value })
                    .then((res) => {
                        this.$store.commit('closeMask');
                        Message({
                            type: res.data.type,
                            message: res.data.message,
                        });
                        if (res.data.err === 0) {
                            this.value = '';
                            this.$store.commit('changeCommentKey');
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }
        },

        // 回复
        requestReply() {
            this.$store.commit('openMask');
            replyComment({
                commentUserId: this.commentUserId,
                value: this.value,
                commentId: this.commentId,
                id: this.articleId,
            })
                .then((res) => {
                    this.$store.commit('closeMask');
                    this.value = '';

                    Message({
                        type: res.data.type,
                        message: res.data.message,
                    });
                    this.$store.commit('changeCommentKey');
                })
                .catch((err) => {
                    console.log(err);
                });
        },
    },
};
</script>

<style lang="scss" scoped>
.comment-input {
    width: 850px;
    background: white;
    display: flex;
    align-items: flex-start;
    padding: 0.5em;
    padding-right: 1em;
    padding: 0.5em 1em 1em 0.5em;
    border: 1px solid #f1f1f1;
    border-radius: 5px;

    .input-right {
        flex: 1;
        display: flex;
        flex-direction: column;

        textarea {
            width: 100%;
            height: 10em;
            border: 1px solid transparent;
            border-top: 1px dashed #dedede;
            margin-top: 2.8em;
            resize: none;
            overflow: hidden;
            padding: 1em;
            font-size: 1.1em;
            color: rgb(100, 99, 99);
            line-height: 1.5em;
            outline: none;
        }
        .font-rule {
            color: rgb(221, 219, 219);
            width: 100%;
            text-align: right;
            font-size: 0.9em;
            padding-right: 0.5em;
        }
        .submit-comment {
            background: white;
            color: gray;
            font-size: 0.8em;
            border: 1px solid #e0dfdf;
            border-radius: 3px;
            margin-left: auto;
            margin-top: 1em;
            padding: 0.4em 1.1em;
            cursor: pointer;

            &:hover {
                border-color: orangered;
                color: orangered;
            }
        }
    }
}

.night-comment-input {
    border-color: rgb(66, 66, 66);
    background: black;

    .input-right {
        textarea {
            background: rgb(26, 25, 25);
            border-top-color: rgb(97, 95, 95);
        }
        .submit-comment {
            background: black;
            border-color: rgb(73, 72, 72);
        }
    }
}

@media (max-width: 900px) {
    .comment-input {
        width: 90vw;
    }
}
</style>
