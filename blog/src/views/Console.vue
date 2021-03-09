<template>
    <transition name="slide">
        <div
            id="console"
            v-if="consoleSwitch"
            :class="{ 'night-console': night }"
        >
            <div
                class="console-button"
                v-for="(item, index) of list"
                :key="index"
                @click="changeState(item)"
            >
                <i :class="item"></i>
            </div>
        </div>
    </transition>
</template>

<script>
export default {
    name: 'Console',
    data() {
        return {
            // 按钮列表
            list: [
                'el-icon-full-screen',
                'el-icon-s-opportunity',
                'el-icon-caret-top',
                'el-icon-caret-bottom',
            ],
            // 是否全屏绑定的变量，
            fullscreen: false,
        };
    },
    computed: {
        consoleSwitch() {
            return this.$store.state.consoleStore.switch;
        },
        night() {
            return this.$store.state.consoleStore.night;
        },
    },
    methods: {
        changeState(value) {
            switch (value) {
                case 'el-icon-s-opportunity':
                    this.changeLight();
                    break;
                case 'el-icon-full-screen':
                    this.changeScreen();
                    break;
                case 'el-icon-caret-bottom':
                    this.goBottom();
                    break;
                case 'el-icon-caret-top':
                    this.goTop();
                    break;
            }
        },
        // 开关灯
        changeLight() {
            this.$store.commit('changeNight');
        },
        // 开关全屏
        changeScreen() {
            let element = document.documentElement;
            if (this.fullscreen) {
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                } else if (document.webkitCancelFullScreen) {
                    document.webkitCancelFullScreen();
                } else if (document.mozCancelFullScreen) {
                    document.mozCancelFullScreen();
                } else if (document.msExitFullscreen) {
                    document.msExitFullscreen();
                }
            } else {
                if (element.requestFullscreen) {
                    element.requestFullscreen();
                } else if (element.webkitRequestFullScreen) {
                    element.webkitRequestFullScreen();
                } else if (element.mozRequestFullScreen) {
                    element.mozRequestFullScreen();
                } else if (element.msRequestFullscreen) {
                    element.msRequestFullscreen();
                }
            }
            this.fullscreen = !this.fullscreen;
            this.$store.commit('changeSwitch');
        },
        // 回到底部
        goBottom() {
            let _this = this;
            let scrollTop = document.documentElement.scrollTop; // 滚轮距顶部的距离
            let h = document.documentElement.scrollHeight; // 整个页面的高度

            let timerId = setTimeout(function go() {
                if (scrollTop < h) {
                    document.documentElement.scrollTop += 50;
                    scrollTop += 50;
                    timerId = setTimeout(go, 10);
                } else {
                    clearTimeout(timerId);
                    _this.$store.commit('changeSwitch');
                }
            }, 0);
        },
        // 回到顶部
        goTop() {
            let _this = this;
            let scrollTop = document.documentElement.scrollTop; // 滚轮距顶部的距离

            let timerId = setTimeout(function go() {
                if (scrollTop > 0) {
                    document.documentElement.scrollTop -= 50;
                    scrollTop -= 50;
                    timerId = setTimeout(go, 10);
                } else {
                    clearTimeout(timerId);
                    _this.$store.commit('changeSwitch');
                }
            });
        },
    },
};
</script>

<style lang="scss" scoped>
#console {
    width: 100vw;
    background: #555;
    position: fixed;
    bottom: 0;
    display: flex;
    justify-content: space-between;
    z-index: 999;

    .console-button {
        padding: 1em;
        background: rgb(71, 71, 71);
        cursor: pointer;

        &:nth-child(2) {
            margin-right: auto;
        }

        &:hover {
            background: rgb(32, 32, 32);
        }

        > i {
            color: white;
            font-size: 2em;
            transition: all 500ms;
        }
        &:hover i {
            transform: rotate(360deg);
        }
    }
}

.slide-enter-active,
.slide-leave-active {
    transition: all 300ms;
}

.slide-enter,
.slide-leave-to {
    transform: translateY(100%);
}
.slide-enter-to,
.slide-leave {
    transform: translateY(0);
}

// 夜间模式
.night-console {
    @extend %article-linear;
    .console-button {
        background: transparent !important;
    }
}
</style>
