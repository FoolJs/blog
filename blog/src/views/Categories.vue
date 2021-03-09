<template>
    <div id="categories">
        <categories-list></categories-list>
    </div>
</template>

<script>
export default {
    name: 'Categories',
    components: {
        CategoriesList: () => import( '../components/categories/CategoriesList.vue' )
        
    }
}
</script>

<style lang="scss" scoped>




</style>