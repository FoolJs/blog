<template>
    <div id="setting">
        <setting-main></setting-main>
    </div>
</template>

<script>
export default {
    name: 'Setting',
    components: {
        SettingMain: () => import( '../components/personal/SettingMain.vue' ),
    }
}
</script>

<style lang="scss" scoped>



</style>