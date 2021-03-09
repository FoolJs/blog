<template>
    <transition name="asd">
        <div id="login" v-show="boxSwitch">
            <transition name="form-rotate">
                <login-form v-if="boxSwitch"></login-form>
            </transition>
        </div>
    </transition>
</template>

<script>
export default {
    name: 'Login',
    components: {
        LoginForm: () => import('../components/login/Form.vue'),
    },
    computed: {
        boxSwitch() {
            return this.$store.state.loginStore.box;
        },
    },
};
</script>

<style lang="scss" scoped>
#login {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.459);
    z-index: 99;
}

.form-rotate-enter-active {
    transition: all 200ms;
}
.form-rotate-leave-active {
    transition: all 200ms;
}

.form-rotate-enter {
    transform: scale(0, 0) rotate(-360deg);
}

.form-rotate-enter-to {
    transform: scale(1, 1) rotate(0deg);
}

.form-rotate-leave {
    transform: scale(1, 1);
}
.form-rotate-leave-to {
    transform: scale(0, 0);
}

.asd-leave-active {
    transition: all 200ms;
}
</style>
