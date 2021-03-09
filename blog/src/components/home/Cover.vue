<template>
    <div class="cover">
        <div class="cover-mask">
            <h1 :class="{ 'night-title': night }" @click="goDown">{{ title }}</h1>
            <div class="down-arrow" @click="goDown">
                <i class="iconfont iconxiala"></i>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Cover',
    data() {
        return {
            title: 'FOOLMAN', //标题,
            timerId: null,
        };
    },
    computed: {
        night() {
            return this.$store.state.consoleStore.night;
        },
    },
    methods: {
        goDown() {
            this.timerId = setTimeout( this.go, 0 );
        },
        go() {
            let scrollTop = document.documentElement.scrollTop;

            if( scrollTop < 860 ) {
                document.documentElement.scrollTop += 40;
                this.timerId = setTimeout( this.go, 10 );
            } else {
                clearTimeout( this.timerId );
            }
        }
    }
};
</script>

<style lang="scss" scoped>
.cover {
    width: 100vw;
    height: 113vh;
    position: relative;
    background: {
        image: url(../../assets/image/cover.jpg);
        repeat: no-repeat;
        size: cover;
        position: center;
        attachment: fixed;
    }

    > .cover-mask {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        background: rgba(0, 0, 0, 0.411);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        > h1 {
            color: white;
            font-size: 10em;
            font-family: Machine;
            cursor: pointer;
            position: relative;
            margin-bottom: .5em;

            &::before {
                content: 'FOOLMAN';
                position: absolute;
                top: 0;
                left: 0;
                color: red;
                height: 50%;
                overflow: hidden;
            }
        }
        > .down-arrow {
            position: absolute;
            bottom: 1.5em;
            color: rgba(255, 255, 255, 0.274);
            cursor: pointer;
            animation: shaking 700ms infinite alternate;

            > i {
                font-size: 5em;
            }
        }
    }
}

.night-title {
    color: rgba(255, 255, 255, 0.548) !important;

    &::before {
        color: purple !important;
        height: 57% !important;
    }
}

// 箭头的动画效果
@keyframes shaking {
    0% {
        transform: translateY(0);
        color: rgba(207, 206, 206, 0.418);
    }
    100% {
        transform: translateY(30%);
        color: rgba(202, 200, 200, 0.219);
    }
}

@media (max-width: 900px) {
    .cover > .cover-mask > h1 {
        font-size: 8em;
    }
}
@media (max-width: 600px) {
    .cover > .cover-mask > h1 {
        font-size: 6em;
    }
}
</style>
