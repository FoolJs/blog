<template>
    <aside id="tools" @click="changeConsole">
        <i class="iconfont icon-shezhi"></i>
    </aside>
</template>

<script>
export default {
    name: 'Tools',
    methods: {
        changeConsole() {
            this.$store.commit('changeSwitch');
        },
    },
};
</script>

<style lang="scss" scoped>
#tools {
    background: rgba(0, 0, 0, 0.315);
    position: fixed;
    bottom: 7em;
    right: 1em;
    padding: 0.3em;
    z-index: 999;
    cursor: pointer;
    transition: all 600ms;

    > i {
        color: white;
        font-weight: 700;
        font-size: 1.4em;
        display: inline-block;
        animation: rotate 1.5s linear infinite;
    }
    &:hover {
        background: rgba(0, 0, 0, 0.568);
    }
}

@keyframes rotate {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}
</style>
