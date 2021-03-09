<template>
    <div
        :class="{ 'categories-item': true }"
        :style="rgb()"
        @click="goTypeArticle(typeItem.Type)"
    >
        <p class="type">{{ typeItem.Type }}</p>
        <div class="type-bottom">
            <p class="article-number">
                {{ '(' + typeItem.Article.length + ')' }}
            </p>
            <i class="iconfont icon-zonglan"></i>
        </div>
    </div>
</template>

<script>
export default {
    name: 'CategoriesItem',
    props: {
        typeItem: {
            type: Object,
            required: true,
        },
    },
    methods: {
        //rgb颜色随机
        rgb() {
            let r = Math.floor(Math.random() * 200);
            let g = Math.floor(Math.random() * 200);
            let b = Math.floor(Math.random() * 256);
            let rgb = '(' + r + ',' + g + ',' + b + ')';
            return {
                background: 'rgb' + rgb,
            };
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
.categories-item {
    width: 48%;
    margin-bottom: 1em;
    padding: 1.2em 1em 0.5em 1em;
    border-radius: 3px;
    transition: all 100ms;
    cursor: pointer;
    margin-bottom: 2em;

    &:hover {
        transform: scale(1.05, 1.05);
    }

    .type {
        color: white;
    }
    .type-bottom {
        display: flex;
        justify-content: space-between;
        margin-top: 2em;
        align-items: center;

        .article-number {
            color: white;
        }
        i {
            font-size: 3em;
            color: white;
        }
    }
}

@media (max-width: 770px) {
    .categories-item {
        width: 90%;
    }
}
</style>
