<template>
    <div class="categories-type">
        <div class="article-type">
            <h2>
                {{ type }}
            </h2>
        </div>

        <axis-item
            v-for="(item, index) of list"
            :key="index"
            :axisContent="item"
        ></axis-item>

        <div class="axis-line"></div>

        <el-pagination
            :page-size="pageSize"
            :total="total"
            @current-change="requestTypeArticle"
            layout="prev,pager,next"
        >
        </el-pagination>
    </div>
</template>

<script>
import { getTypeArticle } from '../../services/article';

export default {
    name: 'CategoriesType',
    props: {
        type: {
            type: String,
            required: true,
        },
    },
    components: {
        AxisItem: () => import('../archives/AxisItem.vue'),
    },
    watch: {
        $route(to, from) {
            if (to.path.includes('/categories/')) {
                this.requestTypeArticle(1);
            }
        },
    },
    data() {
        return {
            list: [],
            pageSize: 5, // 单页内文章的数量
            total: 0, // 文章总数
        };
    },
    mounted() {
        this.requestTypeArticle(1);
    },
    methods: {
        requestTypeArticle(page) {
            this.$store.commit('openMask');
            
            getTypeArticle({
                Type: this.type,
                page,
                pageSize: this.pageSize,
            })
                .then((res) => {
                    document.title = this.type + ' - FOOLMAN';
                    this.$store.commit('closeMask');
                    this.list = res.data.list;
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
.categories-type {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 100vh;

    margin-top: 6em;

    .article-type {
        border: 3px solid transparent;
        border-left-color: rgba(201, 199, 199, 0.37);
        margin-top: 5em;
        width: 800px;
        height: 5em;
        position: relative;

        &::before {
            content: '';
            position: absolute;
            width: 1em;
            height: 1em;
            border-radius: 50%;
            background: rgb(197, 196, 196);
            left: -0.6em;
            top: -0.5em;
        }

        > h2 {
            position: absolute;
            top: -0.8em;
            left: 1em;
            font-weight: 400;
            color: rgb(65, 63, 63);
        }
    }

    .axis-line {
        width: 800px;
        height: 2em;
        border: 3px solid rgba(201, 199, 199, 0.37);
        border-top-color: transparent;
        border-right-color: transparent;
        position: relative;
        margin-bottom: 2em;

        &::before {
            content: '';
            position: absolute;
            width: 1em;
            height: 1em;
            border-radius: 50%;
            background: rgb(197, 196, 196);
            left: -0.6em;
            bottom: -0.6em;
        }
    }
}

.categories-type::v-deep .el-pagination {
    width: 50vw;
    display: flex;
    justify-content: center;
    margin: 3em 0;
    margin-top: auto;

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
    .categories-type .article-type,
    .categories-type .axis-line,
    .categories-type::v-deep .el-pagination {
        width: 80%;
    }
}
@media (max-width: 770px) {
    .categories-type .article-type,
    .categories-type .axis-line,
    .categories-type::v-deep .el-pagination {
        width: 90%;
    }
}
</style>
