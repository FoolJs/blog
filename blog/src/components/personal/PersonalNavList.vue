<template>
    <div
        :class="{ 'personal-nav-list': true, 'night-personal-nav-list': night }"
    >
        <personal-nav-item
            v-for="(item, index) of list"
            :key="index"
            :item="item"
            :class="{ 'select-item': a === index }"
            @click.native="asd(index)"
        ></personal-nav-item>
    </div>
</template>

<script>
export default {
    name: 'PersonalNavList',
    components: {
        PersonalNavItem: () => import('./PersonalNavItem'),
    },
    data() {
        return {
            a: 0,
        };
    },
    computed: {
        jurisdictionNav() {
            return this.$store.state.tokenStore.jurisdictionNav;
        },
        list() {
            let arr = JSON.parse(
                JSON.stringify(this.jurisdictionNav[0].children)
            );

            return arr;
        },
        night() {
            return this.$store.state.consoleStore.night;
        },
    },
    methods: {
        asd(index) {
            this.a = index;
        },
    },
};
</script>

<style lang="scss" scoped>
.personal-nav-list {
    background: white;
    border-bottom: 1px solid rgb(240, 238, 238);
    display: flex;
}
.night-personal-nav-list {
    background: black;
    border-bottom: 1px solid rgb(48, 47, 47);
}
</style>
