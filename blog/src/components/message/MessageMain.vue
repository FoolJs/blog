<template>
    <div :class="{'message-main': true, 'night-message-main': night}">
        <h2>留言</h2>
        <p>(PS:请夸博主ヽ(✿ﾟ▽ﾟ)ノ)</p>
        <comment :articleId="articleId" v-if="articleId" :key="commentKey"></comment>
    </div>
</template>

<script>
import { getArticleContent } from '../../services/article';

export default {
    name: 'MessageMain',
    components: {
        Comment: () => import( '../comment/Comment.vue' )
    },
    computed: {
        commentKey() {
            return this.$store.state.commentKeyStore.commentKey;
        },
        night() {
            return this.$store.state.consoleStore.night;
        }
    },
    data() {
        return {
            articleId: ''
        }
    },
    mounted() {
        this.requestArticle();
    },
    methods: {
        requestArticle() {
            this.$store.commit( 'openMask' );
            getArticleContent({Title: '留言'})
            .then( res => {
                this.$store.commit( 'closeMask' );
                this.articleId = res.data.article._id;
            }) 
            .catch( err => {
                console.log(err);
            })
        }
    }
}
</script>

<style lang="scss" scoped>

.message-main {

    h2 {
        text-align: center;
        padding-top: 5em;
        background: #fafafa;
        font-size: 1.7em;
        color: rgb(95, 94, 94);
    }
    p {
        background: #fafafa;
        text-align: center;
        font-size: 1.2em;
        padding-top: 1em;
        //text-decoration:line-through;
    }
}

.night-message-main {

    h2, p {
        background: rgba(255, 255, 255, 0);
        color: rgb(158, 157, 157);
    }
}


</style>