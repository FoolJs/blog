<template>
    <transition name="side-show">
        <aside id="side-nav-bar" @click.self="closeSide" v-if="sideSwitch">
            <div
                class="side-nav-main"
                :class="{ 'night-side-nav-main': night }"
            >
                <div class="foolman-pack">
                    <img :src="src" alt="博主头像" />
                </div>
                <p class="name">
                    <span>FOOLMAN</span>
                </p>
                <ul class="nav-list">
                    <li
                        v-for="(item, index) of navList"
                        :key="index"
                        @click="goPath(item.path)"
                    >
                        <i
                            :class="item.icon"
                            @click="$store.commit('closeSide')"
                        >
                        </i>
                        <span>
                            {{ item.name }}
                        </span>
                    </li>
                </ul>
            </div>
        </aside>
    </transition>
</template>

<script>
export default {
    name: 'SideNavBar',
    data() {
        return {
            navList: [
                {
                    name: '首页',
                    path: '/',
                    icon: 'iconfont icon-iconfontzhizuobiaozhun023101',
                },
                {
                    name: '归档',
                    path: '/archives',
                    icon: 'iconfont icon-dangan',
                },
                { name: '分类', path: '/categories', icon: 'iconfont icon-2' },
                { name: '留言', path: '/message', icon: 'iconfont icon-msg' },
                { name: '关于', path: '/about', icon: 'iconfont icon-guanyu' },
            ],
        };
    },
    methods: {
        closeSide() {
            this.$store.commit('closeSide');
        },
        goPath(path) {
            this.$router.push({ path: path }).catch((err) => {});
            this.closeSide();
        },
    },
    computed: {
        sideSwitch() {
            return this.$store.state.sideNavStore.sideSwitch;
        },
        src() {
            return require('../assets/image/foolman.jpg');
        },
        night() {
            return this.$store.state.consoleStore.night;
        },
    },
};
</script>

<style lang="scss" scoped>
#side-nav-bar {
    background: rgba(0, 0, 0, 0.747);
    position: fixed;
    top: 0;
    right: 0;
    z-index: 999;
    min-height: 100vh;
    width: 100vw;

    .side-nav-main {
        min-height: 100vh;
        width: 75%;
        background: white;
        margin-left: auto;
        display: flex;
        flex-direction: column;
        align-items: center;

        background-color: #fff;
        background-image: linear-gradient(
                90deg,
                transparent 79px,
                #abced4 79px,
                #abced4 81px,
                transparent 81px
            ),
            linear-gradient(#eee 0.1em, transparent 0.1em);
        background-size: 100% 1.2em;

        .foolman-pack {
            width: 6em;
            height: 6em;
            border-radius: 50%;
            margin-top: 2em;

            img {
                max-width: 100%;
                border-radius: 50%;
                border: 3px solid rgb(218, 216, 216);
            }
        }
        .name {
            margin-top: 1em;
            font-size: 1.4em;
            color: orange;
        }
        .nav-list {
            margin-top: 1em;
            width: 50%;

            li {
                padding: 1em;
                width: 100%;
                display: flex;
                align-items: center;

                span {
                    margin-left: 2em;
                }
            }
        }
    }

    .night-side-nav-main {
        background-color: black;
        background-image: radial-gradient(
                white,
                rgba(255, 255, 255, 0.2) 2px,
                transparent 40px
            ),
            radial-gradient(
                white,
                rgba(255, 255, 255, 0.15) 1px,
                transparent 30px
            ),
            radial-gradient(
                white,
                rgba(255, 255, 255, 0.1) 2px,
                transparent 40px
            ),
            radial-gradient(
                rgba(255, 255, 255, 0.4),
                rgba(255, 255, 255, 0.1) 2px,
                transparent 30px
            );
        background-size: 550px 550px, 350px 350px, 250px 250px, 150px 150px;
        background-position: 0 0, 40px 60px, 130px 270px, 70px 100px;

        ul {
            color: rgb(206, 200, 200);
        }
    }
}

.side-show-enter-active,
.side-show-leave-active {
    transition: all 200ms !important;
}

.side-show-enter,
.side-show-leave-to {
    opacity: 0 !important;
}
.side-show-enter-to,
.side-show-leave {
    opacity: 1 !important;
}
</style>
