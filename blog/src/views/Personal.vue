<template>
    <div id="personal">
        <user-message></user-message>
        <div class="personal-pack">
            <personal-nav-list></personal-nav-list>
            <keep-alive>
                <router-view />
            </keep-alive>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Personal',
    components: {
        PersonalNavList: () =>
            import('../components/personal/PersonalNavList.vue'),
        UserMessage: () => import('../components/personal/UserMessage.vue'),
    },
};
</script>

<style lang="scss" scoped>
#personal {
    margin-top: 6em;
    display: flex;

    .personal-pack {
        flex: 7;
        margin-bottom: 3em;
    }
}

@media (max-width: 900px) {
    #personal {
        flex-direction: column;
        margin-top: 4em;
    }
}
</style>
