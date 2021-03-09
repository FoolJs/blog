<template>
    <div id="about">

    </div>
</template>

<script>
export default {
    name: 'About',
    data() {
        return {
            list: [
                { name: '年龄', content: '18' },
                { name: '住址', content: '开封' },
                { name: '职业', content: '风' },
                { name: '联系', content: '2908407243' },
                { name: 'Email', content: '@qq.com' },
                { name: 'Spouse', content: '中森明菜' },
            ],
        };
    },
    computed: {
        src() {
            return require('../assets/image/foolman.jpg');
        },
        night() {
            return this.$store.state.consoleStore.night;
        },
    },
};
</script>

<style lang="scss" scoped>
#about {

}





</style>
