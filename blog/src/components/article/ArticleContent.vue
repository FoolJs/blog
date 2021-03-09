<template>
    <div :class="{ 'article-content': true, 'night-article-content': night }">
        <content-all :article="article" v-if="isShow"></content-all>
        <comment
            :articleId="article._id"
            v-if="isShow"
            :key="commentKey"
        ></comment>
    </div>
</template>

<script>
import { getArticleContent } from '../../services/article';

export default {
    name: 'ArticleContent',
    components: {
        ContentAll: () => import('./Content.vue'),
        Comment: () => {
            return new Promise( (resolve, reject) => {
                setTimeout( () => require(['../comment/Comment.vue'], resolve), 1000 )
            } )
        }
    },
    props: {
        title: {
            type: String,
            required: true,
        },
    },
    computed: {
        night() {
            return this.$store.state.consoleStore.night;
        },
        maskShow() {
            return this.$store.state.maskStore.maskShow;
        },
        commentKey() {
            return this.$store.state.commentKeyStore.commentKey;
        },
    },
    data() {
        return {
            article: undefined,
            isShow: false,
        };
    },
    watch: {
        $route(to, from) {
            if (to.path.includes('/article/')) {
                this.requestArticle();
            }
        },
    },
    mounted() {
        this.requestArticle();
    },
    methods: {
        // 请求文章
        requestArticle() {
            this.isShow = false;
            this.$store.commit('openMask');
            getArticleContent({ Title: this.title })
                .then((res) => {
                    this.isShow = true;
                    this.$store.commit('closeMask');
                    if (res.data.err === 0) {
                        this.article = res.data.article;
                        document.title = this.title + ' - FOOLMAN';
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        },
    },
};
</script>

<style lang="scss" scoped></style>
