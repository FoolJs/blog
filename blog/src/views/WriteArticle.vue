<template>
    <div id="write-article">
        <write-article-main></write-article-main>
    </div>
</template>

<script>
export default {
    name: 'WriteArticle',
    components: {
        WriteArticleMain: () => import( '../components/personal/WriteArticleMain.vue' ),
    }
}
</script>


<style lang="scss" scoped>

</style>