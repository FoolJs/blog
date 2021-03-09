<template>
    <div :class="{ content: true }">
        <content-cover :coverContent="coverContent"></content-cover>
        <content-main
            :mainContent="article.Content"
            :introduction="article.Introduction"
        ></content-main>
        <reward></reward>
        <statement :title="article.Title"></statement>
    </div>
</template>

<script>
export default {
    name: 'Content',
    components: {
        ContentCover: () => import('./ContentCover.vue'),
        ContentMain: () => import('./ContentMain.vue'),
        Reward: () => import( './Reward.vue' ),
        Statement: () => import( './Statement.vue' ),
    },
    props: {
        article: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            coverContent: {
                Cover: this.article.Cover,
                Title: this.article.Title,
                CreateTime: this.article.CreateTime,
                UpdateTime: this.article.UpdateTime,
                Type: this.article.Type,
                Count: this.article.Count,
                CommentCount: this.article.CommentCount
            },
        };
    },
    computed: {
        maskShow() {
            return this.$store.state.maskStore.maskShow;
        },
        coverContents() {
            if( article ) {
            return {
                Cover: this.article.Cover,
                Title: this.article.Title,
                CreateTime: this.article.CreateTime,
                UpdateTime: this.article.UpdateTime,
                Type: this.article.Type,
                Count: this.article.Count,
            }
            }
        }
    }
};
</script>

<style lang="scss" scoped>
.content {
    width: 100vw;
    margin-bottom: 5em;
}
</style>
