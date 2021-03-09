<template>
    <div id="user-manage">
        <user-manage-list></user-manage-list>
    </div>
</template>

<script>
export default {
    name: 'UserManage',
    components: {
        UserManageList: () => import( '../components/personal/UserManageList.vue' ),
    },
    data() {
        return {

        }
    },
}
</script>

<style lang="scss" scoped>

#user-manage {
    width: 100%;
}


</style>