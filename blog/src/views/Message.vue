<template>
    <div id="message">
        <message-main></message-main>
    </div>
</template>

<script>
export default {
    name: 'Message',
    components: {
        MessageMain: () => import( '../components/message/MessageMain.vue' ),
    }
}
</script>

<style lang="scss" scoped>



</style>