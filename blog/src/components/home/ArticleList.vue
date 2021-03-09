<template>
    <div :class="{ 'article-list': true, 'night-article-list': night }">
        <div class="article-packing" v-for="(item, index) of list" :key="index">
            <article-item :item="item"></article-item>
        </div>

        <el-pagination
            :page-size="pageSize"
            :total="total"
            @current-change="jumpPage"
            layout="prev,pager,next"
        >
        </el-pagination>
    </div>
</template>

<script>
import { getPageArticle } from '../../services/article';

export default {
    name: 'ArticleList',
    components: {
        ArticleItem: () => import('./ArticleItem.vue'),
    },
    data() {
        return {
            list: [], // 本页的文章列表
            pageSize: 5, // 单页文章数量
            total: 0, // 文章总数量
        };
    },
    computed: {
        night() {
            return this.$store.state.consoleStore.night;
        },
    },
    mounted() {
        this.jumpPage(1);
    },
    methods: {
        // 跳转到某页
        jumpPage(page) {
            getPageArticle({
                page,
                pageSize: this.pageSize,
            })
                .then((res) => {
                    if (res.data.err === 0) {
                        this.list = res.data.list;
                        this.total = res.data.total;
                    } else {
                        console.log(res.data.message);
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        },
    },
};
</script>

<style lang="scss" scoped>
.article-list {
    width: 100vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .article-packing {
        width: 100%;
        display: flex;
        justify-content: center;
        padding: 1.5em 0;

        border-radius: 5px;
    }
}

.article-list::v-deep .el-pagination {
    width: 850px;
    display: flex;
    justify-content: center;
    margin: 3em 0;

    button {
        width: 15%;
        background: transparent;
    }
    ul {
        width: 70%;
        display: flex;
        justify-content: center;
        li {
            background: transparent;
        }
    }
}

@media (max-width: 900px) {
    .article-list::v-deep .el-pagination {
        width: 80%;
    }
}

@media (max-width: 770px) {

    .article-list::v-deep .el-pagination {
        width: 95%;
    }
}


</style>
