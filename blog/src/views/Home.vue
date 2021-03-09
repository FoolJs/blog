<template>
    <div id="home">
        <cover></cover>
        <div :class="{ 'home-article': true, 'night-home-article': night }">
            <article-list></article-list>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Home',
    components: {
        Cover: () => import('../components/home/Cover.vue'),
        ArticleList: () => import('../components/home/ArticleList.vue'),
    },
    computed: {
        night() {
            return this.$store.state.consoleStore.night;
        },
    },
};
</script>

<style lang="scss" scoped>
#home {
    display: flex;
    flex-direction: column;
    align-items: center;

    .home-article {
        display: flex;
        padding-top: 2.5em;
        width: 100vw;
        justify-content: center;

        background: white;
        background-image: linear-gradient(-90deg, #4ecbe413 0%, #3f7bd411 100%);
    }

    .night-home-article {
        background: rgba(255, 255, 255, 0);
        background-image: none;
    }
}
</style>
