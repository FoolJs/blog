<template>
    <ul class="nav-list">
        <router-link
            v-for="(item, index) of navList"
            :key="index"
            :to="item.path"
        >
            {{ item.name }}
        </router-link>
    </ul>
</template>

<script>
export default {
    name: 'TopNavCenter',
    props: {
        navList: {
            type: Array,
            required: true,
        },
    },
};
</script>

<style lang="scss" scoped>
.nav-list {
    width: 80vw;
    margin: auto;
    display: flex;

    > a {
        font-weight: 900;
        font-size: 0.9em;
        padding: 1em;
        display: flex;
        justify-content: center;
        align-items: center;

        &:not(:first-child):hover {
            color: rgb(92, 89, 89);
        }

        &:first-child {
            font-family: Art;
            font-size: 1.5em;
            margin-right: auto;
            font-weight: 100;
        }
    }
}

@media (max-width: 900px) {
    .nav-list {

        > a {
            padding: .5em;

            &:not(:first-child) {
                display: none;
            }

            &:first-child {
                margin: auto;
            }
        }
    }
}

</style>
