<template>
    <div id="archives">
        <axis></axis>
    </div>
</template>

<script>
export default {
    name: 'Archives',
    components: {
        Axis: () => import( '../components/archives/Axis.vue' ),
    }
}
</script>

<style lang="scss" scoped>


#archives {

    width: 100vw;



}



</style>