<template>
    <div :class="{'comment': true, 'night-comment': night}">
        <comment-input :articleId="articleId" pattern="COMMENT"></comment-input>

        <comment-item
            v-for="(item, index) of commentList"
            :key="index"
            :item="item"
            :articleId="articleId"
            :commentUserId="item.CommentUserId"
            :commentId="item._id"
        ></comment-item>

        <el-pagination
            :page-size="pageSize"
            :total="total"
            @current-change="getComment"
            layout="prev,pager,next"
        >
        </el-pagination>
    </div>
</template>

<script>
import { getCommentContent } from '../../services/comment';

export default {
    components: {
        CommentInput: () => import('./CommentInput.vue'),
        CommentItem: () => import('./CommentItem.vue'),
    },
    name: 'Comment',
    props: {
        articleId: {
            type: String,
            required: true,
        },
    },
    data() {
        return {
            commentList: [],
            pageSize: 20, // 单页评论数量
            total: 0,
        };
    },
    computed: {
        night() {
            return this.$store.state.consoleStore.night;
        }
    },
    mounted() {
        this.getComment(1);
    },
    methods: {
        getComment(page) {
            getCommentContent({
                id: this.articleId,
                page,
                pageSize: this.pageSize,
            })
                .then((res) => {
                    this.commentList = res.data.commentList;
                    this.total = res.data.total;
                })
                .catch((err) => {
                    console.log(err);
                });
        },
    },
};
</script>

<style lang="scss" scoped>
.comment {
    width: 100vw;
    background: #fafafa;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2em 0;

    > .comment-item {
        margin-bottom: 2em;
    }
    > .comment-input {
        margin-bottom: 5em;
    }
}

.comment::v-deep .el-pagination {
    width: 850px;
    display: flex;
    justify-content: center;
    margin: 3em 0;
    background: white;

    button {
        width: 15%;
    }
    ul {
        width: 70%;
        display: flex;
        justify-content: center;
    }
}

.night-comment {
    background: transparent;
}
.night-comment::v-deep .el-pagination {
    background: transparent;

    button, ul, li {
        background: transparent;
    }
}

@media (max-width: 900px) {
    .comment::v-deep .el-pagination {
        width: 80%;
    }
}

@media (max-width: 770px) {
    .comment::v-deep .el-pagination {
        width: 95%;
    }
}
</style>
