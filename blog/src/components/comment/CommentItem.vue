<template>
    <div :class="{ 'comment-item': true, 'night-comment-item': night }">
        <div class="comment-box-top">
            <div class="comment-user-avatar">
                <img :src="item.CommentUserAvatar" alt="用户头像" />
            </div>
            <div class="user-nickname-time">
                <p
                    class="comment-user-nickName"
                    :class="{ 'master-style': masterStyle }"
                >
                    {{ item.CommentUserNickName }}
                    <span
                        v-if="item.CommentUserIdentify === 'Admin'"
                        class="admin-user"
                        >博主</span
                    >
                </p>
                <time>
                    {{ item.CommentTime | conversionTime }}
                </time>
            </div>
        </div>
        <div class="comment-content" v-html="item.CommentContent">
            {{ item.CommentContent }}
        </div>
        <div class="reply-button" @click="replyBox = !replyBox">回复</div>

        <comment-input
            v-if="replyBox"
            :articleId="articleId"
            pattern="REPLY"
            :commentUserId="commentUserId"
            :commentId="commentId"
        ></comment-input>

        <comment-item
            v-for="(a, index) of item.CommentOnComments"
            :key="index"
            :item="a"
            :articleId="articleId"
            :commentUserId="a.CommentUserId"
            :commentId="commentId"
        ></comment-item>
    </div>
</template>

<script>
export default {
    name: 'CommentItem',
    components: {
        CommentInput: () => import('./CommentInput.vue'),
    },
    props: {
        item: {
            type: Object,
            required: true,
        },
        // 文章的_id
        articleId: {
            type: String,
        },
        // 被评论用户的_id
        commentUserId: {
            type: String,
        },
        // 被评论的评论的_id
        commentId: {
            type: String,
        },
    },
    data() {
        return {
            replyBox: false,
        };
    },
    computed: {
        masterStyle() {
            if (this.item.CommentUserIdentify === 'Admin') {
                return true;
            } else {
                return false;
            }
        },
        night() {
            return this.$store.state.consoleStore.night;
        },
    },
    filters: {
        // 格式化时间函数
        conversionTime(d) {
            let date = new Date(d);
            let year = date.getFullYear(); // 年
            let month =
                date.getMonth() + 1 < 10
                    ? '0' + (date.getMonth() + 1)
                    : date.getMonth() + 1; // 月
            let day =
                date.getDate() < 10 ? '0' + date.getDate() : date.getDate(); //日

            let hour =
                date.getHours() < 10 ? '0' + date.getHours() : date.getHours(); // 时
            let minute =
                date.getMinutes() < 10
                    ? '0' + date.getMinutes()
                    : date.getMinutes(); // 分

            let nowDate = new Date();
            let nowYear = nowDate.getFullYear(); //现在的年

            if (year === nowYear) {
                return `${month}-${day} ${hour}:${minute}`;
            } else {
                return `${year}-${month}-${day}`;
            }
        },
    },
};
</script>

<style lang="scss" scoped>
.comment-item {
    width: 850px;
    background: white;
    border: 1px solid #f1f1f1;
    border-radius: 5px;
    padding: 1.2em;
    display: flex;
    flex-direction: column;
    align-items: flex-end;

    > .comment-item {
        align-self: center;
        margin-top: 2em;
        border-bottom-color: transparent;
    }

    .comment-box-top {
        display: flex;
        margin-bottom: 0.8em;
        width: 100%;

        .comment-user-avatar {
            width: 2.9em;
            height: 2.9em;
            border-radius: 50%;
            cursor: pointer;

            img {
                max-width: 100%;
                border-radius: 50%;
            }
        }
        .user-nickname-time {
            display: flex;
            flex-direction: column;
            justify-content: center;

            .comment-user-nickName {
                margin-left: 1em;
                font-size: 0.9em;
                font-weight: 600;
                color: rgb(78, 78, 78);
                margin-top: auto;

                .admin-user {
                    background: orangered;
                    color: white;
                    font-size: 0.8em;
                    padding: 0.1em 0.5em;
                    border-radius: 3px;
                    margin-left: 0.5em;
                    font-weight: 400;
                }
            }
            .master-style {
                color: rgb(240, 67, 4);
            }
            time {
                font-size: 0.8em;
                margin-left: 1em;
                margin-top: auto;
            }
        }
    }
    .comment-content {
        width: 100%;
    }

    .comment-content::v-deep {
        .reply-is {
            color: rgb(184, 182, 182);
        }
    }

    .reply-button {
        font-size: 0.8em;
        color: orangered;
        cursor: pointer;
    }

    > .comment-input {
        align-self: center;
    }
}

.night-comment-item {
    background: black;
    border-color: rgb(77, 76, 76);

    .user-nickname-time {
        color: gray;
    }
    .comment-content {
        color: rgb(156, 156, 156);
    }
}

@media (max-width: 900px) {
    .comment-item {
        width: 90vw;
    }
}
</style>
