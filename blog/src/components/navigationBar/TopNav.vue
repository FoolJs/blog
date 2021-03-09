<template>
    <transition name="nav-zoom">
        <header
            class="top-nav-bar"
            v-show="navBarShow"
            :style="background"
            :class="{ 'night-nav': night }"
        >
            <portrait></portrait>
            <nav-list :navList="navList"></nav-list>
            <nav-menu></nav-menu>
        </header>
    </transition>
</template>

<script>
import Portrait from './TopNavLeft.vue';
import NavList from './TopNavCenter.vue';
import NavMenu from './TopNavRight.vue';

export default {
    name: 'TopNavBar',
    components: {
        Portrait,
        NavList,
        NavMenu,
    },
    data() {
        return {
            // 导航列表数据
            navList: [
                { name: 'FOOLMAN', path: '/' },
                {name: '首页', path: '/'},
                { name: '归档', path: '/archives' },
                { name: '分类', path: '/categories' },
                { name: '留言', path: '/message' },
                { name: '关于', path: '/about' },
            ],
            i: 0, // 上次滚动的距离
            navBarShow: true, // 是否显示导航栏
            // 导航栏的背景颜色
            background: {
                background: 'rgba(255, 255, 255, 0.3)',
            },
        };
    },
    mounted() {
        window.addEventListener('scroll', this.scrollGo, true); // 监听滚动条事件
    },
    computed: {
        night() {
            return this.$store.state.consoleStore.night;
        },
    },
    methods: {
        // 滚动条事件函数
        scrollGo() {
            let scrolltop = document.documentElement.scrollTop; // 滚动条与顶部的距离
            let scroll = scrolltop - this.i; // 本次滚动的距离减去上次滚动的距离
            this.i = scrolltop; // 将本次滚动的距离赋给i

            // 根据scroll使导航栏隐藏或显示
            if (scroll > 0) {
                this.navBarShow = false;
            } else if (scroll < 0) {
                this.navBarShow = true;
            }

            // 根据i判断滚动条是否在顶部
            if (this.i != 0) {
                this.background = {
                    background: 'white',
                    boxShadow: '0px 5px 10px #f0efee',
                };
            } else {
                this.background = {
                    background: 'rgba(255, 255, 255, 0.3)',
                };
            }
        },
    },
};
</script>

<style lang="scss" scoped>
.top-nav-bar {
    display: flex;
    width: 100vw;
    position: fixed;
    z-index: 999;
    transition: all 600ms;

    &:hover {
        background: white !important;
        box-shadow: 0px 5px 10px #f0efee !important;
    }
}

// 导航栏过渡动效
.nav-zoom-leave-active,
.nav-zoom-enter-active {
    transition: all 200ms;
}
.nav-zoom-enter,
.nav-zoom-leave-to {
    transform: translateY(-100%);
}
.nav-zoom-enter-to,
.nav-zoom-leave {
    transform: translateY(0);
}

// 夜间模式
.night-nav {
    @extend %night;
    @extend %article-linear;
}
</style>
