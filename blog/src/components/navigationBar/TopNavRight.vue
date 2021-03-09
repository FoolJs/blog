<template>
    <div class="top-nav-right">
        <i :class="icon" @click="$store.commit('openSide')"></i>
    </div>
</template>

<script>
export default {
    name: 'TopNavRight',
    data() {
        return {
            icon: 'iconfont icon-zhankai',
        }
    }
}
</script>

<style lang="scss" scoped>

.top-nav-right {
    margin-right: 0.5em;
    display: flex;
    justify-content: center;
    align-items: center;

    i {
        font-size: 1.9em;
        cursor: pointer;
    }
    display: none;
}

@media (max-width: 900px) {
    .top-nav-right {
        display: flex;
    }
}

</style>