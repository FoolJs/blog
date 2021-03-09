<template>
    <div class="categories-list">
        <h2>分类</h2>
        <div class="categories-list-pack">
        <categories-item
        v-for="( item, index ) of list"
        :key="index"
        :typeItem="item"
        ></categories-item>

        </div>
    </div>
</template>

<script>
import { getArticleCategories } from '../../services/article';

export default {
    name: 'CategoriesList',
    components: {
        CategoriesItem: () => import( './CategoriesItem.vue' ),
    },
    data() {
        return {
            list: [],
        }
    },
    mounted() {
        this.requestArticleCategories();
    },
    methods: {
        requestArticleCategories() {
            this.$store.commit( 'openMask' );
            getArticleCategories({})
            .then( res => {
                if( res.data.err === 0 ) {
                    this.$store.commit( 'closeMask' );
                    this.list = res.data.articleTypeList;
                }
            })
            .catch( err => {
                console.log(err);
            })
        }
    }
}
</script>

<style lang="scss" scoped>

.categories-list {
    width: 100%;
    margin-bottom: 3em;

        h2 {
        text-align: center;
        margin: 5em 0 1.5em 0;
        font-size: 1.7em;
        color: rgb(95, 94, 94);
    }

    .categories-list-pack {
        width: 850px;
        margin: 0 auto;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
    }
}

@media (max-width: 900px) {
    .categories-list {
        
        .categories-list-pack {
            justify-content: center;
            width: 100%;
        }
    }
}


</style>