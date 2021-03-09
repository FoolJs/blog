<template>
    <div id="app">
        <top-nav />

        <side-nav-bar></side-nav-bar>

        <mask-transition :isShow="maskShow"></mask-transition>
        <login />

        <main :class="{ 'night-main': night }">
            <keep-alive>
                <router-view></router-view>
            </keep-alive>
        </main>

        <tools />

        <console />

        <bottom-nav />
    </div>
</template>

<script>
import TopNav from './components/navigationBar/TopNav.vue';
import BottomNav from './components/navigationBar/BottomNav.vue';
import Tools from './views/Tools.vue';

// 判断是否为手机端
function _isMobile() {
    let flag = navigator.userAgent.match(
        /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
    );
    return flag;
}

export default {
    name: 'app',
    components: {
        TopNav,
        BottomNav,
        Tools,
        Console: () => import('./views/Console.vue'),
        Login: () => import('./views/Login.vue'),
        MaskTransition: () => import('./views/MaskTransition.vue'),
        SideNavBar: () => {
            if (_isMobile()) {
                return import('./views/SideNavBar.vue');
            } else {
                return;
            }
        },
    },
    computed: {
        night() {
            return this.$store.state.consoleStore.night;
        },
        maskShow() {
            return this.$store.state.maskStore.maskShow;
        },
    },
    data() {
        return {};
    },
    methods: {},
};
</script>

<style lang="scss">
#app {
    width: 100vw;
    min-height: 100vh;
    display: flex;
    flex-direction: column;

    > main {
        flex: 1;

        background: radial-gradient(
                    hsl(0, 0%, 100%) 4%,
                    hsl(0, 0%, 100%) 9%,
                    hsla(0, 100%, 20%, 0) 9%
                )
                0 0,
            radial-gradient(
                    hsl(0, 0%, 100%) 4%,
                    hsl(0, 0%, 100%) 8%,
                    hsla(0, 100%, 20%, 0) 10%
                )
                50px 50px,
            radial-gradient(hsla(0, 100%, 100%, 0.8) 20%, hsla(0, 100%, 20%, 0))
                50px 0,
            radial-gradient(hsla(0, 0%, 100%, 0.8) 20%, hsla(0, 100%, 20%, 0)) 0
                50px,
            radial-gradient(rgb(255, 255, 255) 35%, hsla(0, 100%, 20%, 0) 60%)
                50px 0,
            radial-gradient(rgb(255, 255, 255) 35%, hsla(0, 100%, 20%, 0) 60%)
                100px 50px,
            radial-gradient(hsla(0, 0%, 100%, 0.7), hsla(0, 100%, 20%, 0)) 0 0,
            radial-gradient(hsla(0, 0%, 100%, 0.7), hsla(0, 100%, 20%, 0)) 50px
                50px,
            linear-gradient(
                    45deg,
                    hsla(0, 0%, 100%, 0) 49%,
                    rgb(218, 214, 214) 50%,
                    hsla(0, 3%, 87%, 0) 70%
                )
                0 0,
            linear-gradient(
                    -45deg,
                    hsla(0, 0%, 98%, 0) 49%,
                    rgb(228, 226, 226) 50%,
                    hsla(0, 3%, 85%, 0) 70%
                )
                0 0;
        background-color: white;
        background-size: 100px 100px;
    }
}

.night-main {
    background-color: black !important;
    background-image: radial-gradient(
            white,
            rgba(255, 255, 255, 0.2) 2px,
            transparent 40px
        ),
        radial-gradient(white, rgba(255, 255, 255, 0.15) 1px, transparent 30px),
        radial-gradient(white, rgba(255, 255, 255, 0.1) 2px, transparent 40px),
        radial-gradient(
            rgba(255, 255, 255, 0.4),
            rgba(255, 255, 255, 0.1) 2px,
            transparent 30px
        ) !important;
    background-size: 550px 550px, 350px 350px, 250px 250px, 150px 150px !important;
    background-position: 0 0, 40px 60px, 130px 270px, 70px 100px !important;
}
</style>
