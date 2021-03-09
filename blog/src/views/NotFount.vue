<template>
    <div id="notfount">
        <h2 :class="{'night-h2': night}">404</h2>
    </div>
</template>

<script>
export default {
    name: 'NotFount',
    computed: {
        night() {
            return this.$store.state.consoleStore.night;
        }
    }
}
</script>

<style lang="scss" scoped>

#notfount {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-top: 5em;
    width: 100%;
    height: 70vh;

    h2 {
        font-size: 10em;
    }
}

#notfount {

    .night-h2 {
        color: rgb(161, 161, 161);
    }
}


</style>