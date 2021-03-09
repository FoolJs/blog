<template>
    <div :class="{'axis': true, }">
        <axis-item
        v-for="( item, index ) of list"
        :key="index"
        :axisContent="item"
        ></axis-item>

        <div class="axis-line"></div>

        <el-pagination
            :page-size="pageSize"
            :total="total"
            @current-change="requestArticleList"
            layout="prev,pager,next"
        >
        </el-pagination>



    </div>
</template>

<script>
import { getPageArticle } from '../../services/article';

export default {
    name: 'Axis',
    components: {
        AxisItem: () => import( './AxisItem.vue' ),
    },
    data() {
        return {
            list: [],
            pageSize: 5, // 单页内文章的数量
            total: 0, // 文章总数
        }
    },
    mounted() {
        this.requestArticleList( 1 );
    },
    methods: {
        requestArticleList(page) {
            this.$store.commit( 'openMask' );
            getPageArticle({
                page,
                pageSize: this.pageSize
            })
            .then( res => {
                if( res.data.err === 0 ) {
                    this.$store.commit( 'closeMask' );
                    this.list = res.data.list;
                    this.total = res.data.total;
                }
            })
            .catch( err => {
                console.log(err);
            })
        }
    }
}
</script>

<style lang="scss" scoped>

.axis {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 7em;
    min-height: 100vh;

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
            left: -.6em;
            bottom: -.6em;
        }
    }
}

.axis::v-deep .el-pagination {
    width: 800px;
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
    .axis .axis-line, .axis::v-deep .el-pagination {
        width: 80%;
    }
}
@media (max-width: 770px) {
    .axis .axis-line, .axis::v-deep .el-pagination {
        width: 90%;
    }
}



</style>