<template>
    <div :class="{ 'article-item': true, 'night-article-item': night }">
        <h2 class="article-title" @click="goArticle(item.Title)">
            {{ item.Title }}
        </h2>
        <p class="article-tag">
            <i class="iconfont icon-jingxuanwenzhang" @click="goTypeArticle(item.Type)">
                <span>{{ item.Type }}</span>
            </i>
            <i class="iconfont icon-shijian">
                <span>{{ item.UpdateTime | conversionTime }}</span>
            </i>
        </p>
        <el-image
            :src="item.Cover"
            fit="cover"
            lazy
            alt="文章封面"
            @click.prevent="goArticle(item.Title)"
        >
            <img
                src="../../assets/image/zhanwei.gif"
                slot="placeholder"
                alt="占位图片"
                class="zhanwei"
            />
        </el-image>

        <p class="article-introduction">
            {{ item.Introduction }}
        </p>

        <div class="divider-line"></div>

        <p class="article-bottom">
            <i class="iconfont icon-gengduo" @click="goArticle(item.Title)"></i>

            <i class="iconfont icon-pinglun">
                <span>{{ item.CommentCount }}</span>
            </i>
            <i class="iconfont icon-liulan">
                <span>{{ item.Count }}</span>
            </i>
        </p>
    </div>
</template>

<script>
export default {
    name: 'ArticleItem',
    props: {
        item: {
            type: Object,
            require: true,
        },
    },
    filters: {
        conversionTime(d) {
            let date = new Date(d);
            let year = date.getFullYear();
            let month =
                date.getMonth() + 1 < 10
                    ? '0' + (date.getMonth() + 1)
                    : date.getMonth() + 1;
            let day =
                date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
            return `${year}-${month}-${day}`;
        },
    },
    computed: {
        night() {
            return this.$store.state.consoleStore.night;
        },
    },
    methods: {
        // 跳转到文章内容页面
        goArticle(title) {
            this.$router.push({
                name: 'ArticleContent',
                params: {
                    title: title,
                },
            });
        },
        // 跳转到类型文章页面
        goTypeArticle(type) {
            this.$router.push({
                path: `/categories/${type}`,
            });
        },
    },
};
</script>

<style lang="scss" scoped>
.article-item {
    width: 840px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #555;
    padding: 1.5em 1em 0.2em 1em;
    border-radius: 10px;
    box-shadow: 0 4px 8px 6px rgba(103, 103, 104, 0.06);
    transition: all 400ms;

    &:hover {
        box-shadow: 0 4px 8px 6px rgba(7, 17, 27, 0.075);
    }
    &:hover ::v-deep .el-image__inner {
        transform: scale(1.2, 1.2);
    }

    > p > i {
        font-size: 0.9em;
        cursor: pointer;
    }

    .article-title {
        font-weight: inherit;
        font-size: 1.2em;
        color: black;
        cursor: pointer;
        transition: all 100ms;
        margin-bottom: 0.2em;

        &:hover {
            color: rgb(95, 92, 92);
        }
    }

    .article-tag {
        font-size: 0.9em;
        margin-top: 0.5em;

        i {
            > * {
                margin-left: 0.2em;
            }
            &:first-child {
                margin-right: 1em;
            }
        }
    }

    .zhanwei {
        width: 100%;
        height: 20em;
        border-radius: 5px;
    }
    .article-introduction {
        text-indent: 2em;
        margin: 0.5em 0;
        font-size: 0.9em;
    }

    .divider-line {
        width: 100%;
        height: 1px;
        background: #dcdfe6;
        margin: 0.5em 0;
    }

    > .article-bottom {
        display: flex;
        width: 100%;

        i {
            display: flex;
            align-items: center;

            &:first-child {
                margin-right: auto;
                font-weight: 900;
                font-size: 2em;
            }
            &:not(:first-child) {
                margin-left: 0.5em;
            }
            > * {
                margin-left: 0.2em;
            }
        }
    }
}

.article-item::v-deep .el-image {
    width: 100%;
    height: 20em;
    margin-bottom: 2em;
    border-radius: 5px;
    margin: 0.5em 0;
    cursor: pointer;
}
.article-item::v-deep .el-image__inner {
    border-radius: 5px;
    transition: all 500ms;

    &:hover {
        transform: scale(1.2, 1.2);
    }
}

.night-article-item {
    @extend %night;
    @extend %article-linear;
    border-radius: 5px !important;
    overflow: hidden;
    z-index: 1;
}

.night-article-item::v-deep .el-image__inner {
    filter: brightness(80%);
}

@media (max-width: 900px) {
    .article-item {
        width: 80vw;
    }
}

@media (max-width: 770px) {
    .article-item {
        width: 95vw;
    }
}

</style>
