<template>
    <blockquote class="statement" :class="{statement: true, 'night-statement': night}">
        <p>
            <strong>本文作者：</strong>
            <span>FOOLMAN</span>
        </p>
        <p>
            <strong>本文链接：</strong>
            <a :href="'https://www.foolman.top/article/' + title">{{
                'https://www.foolman.top/article/' + title
            }}</a>
        </p>
        <p>
            <strong>版权声明：</strong>
            本博客所有文章除特别声明外，均采用
            <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/"
                >CC BY-NC-SA 4.0</a
            >
            许可协议。转载请注明来自
            <a href="https://www.foolman.top/">FOOLMAN</a>
        </p>
    </blockquote>
</template>

<script>
export default {
    name: 'Statement',
    props: {
        title: String,
    },
    computed: {
        night() {
            return this.$store.state.consoleStore.night;
        },
    }
};
</script>

<style lang="scss" scoped>
.statement {
    border-left: 4px solid rgb(194, 194, 194);
    padding: 0.2em 0 0.2em 1em;
    background-color: rgb(238, 236, 236);
    margin: auto;
    margin-top: 4em;
    width: 850px;

    * {
        line-height: 180%;
    }

    a {
        word-wrap: break-word;

        &:hover {
            text-decoration: underline !important;
        }
    }
}

.night-statement {
    background: black;
    color: rgb(192, 191, 191);
    border-left-color: rgb(136, 135, 135);
}

@media (max-width: 900px) {
    .statement {
        width: 95vw;
    }
}

</style>
