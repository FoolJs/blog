<template>
    <div class="overview">
        <router-view />
    </div>
</template>

<script>
export default {
    name: 'Overview',
};
</script>

<style lang="scss" scoped>

.overview {
    margin: 3em 3em 0 3em;
}

@media (max-width: 600px) {

    .overview {
        margin: 3em 1em 0 1em;
    }
}

</style>
