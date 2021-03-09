<template>
    <div id="mask-transition" v-if="isShow">
        <div class="circular" :style="playState">
            <svg viewBox="0 0 100 100">
                <path d="M 0,50 a 50,50 0 1,1 0,1 z" id="circle"/>
                <text class="asd">
                    <textPath xlink:href="#circle">
                        FOOLMANBLOG
                    </textPath>
                </text>
            </svg>
        </div>
        <span>努力加载中...</span>
    </div>
</template>

<script>
/**
 * *过渡遮罩层组件，
 * *在外部使用isShow的prop，
 * *控制该组件的显示和动画的播放，
 */
export default {
    name: 'MaskTransition',
    data() {
        return {
            
        }
    },
    props: {
        isShow: {
            type: Boolean,
            default: false
        }
    },
    methods: {

    },
    computed: {
        playState() {
            if( this.isShow ) {
                return {
                    animationPlayState: 'running'
                }
            } else {
                return {
                    animationPlayState: 'paused'
                }
            }
        }
    }
}
</script>

<style lang="scss" scoped>

#mask-transition {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: rgba(15, 15, 15, 0.966);
    z-index: 999;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    span {
        color: white;
        font-size: .8em;
        margin-top: 1.3em;
        margin-left: .7em;
    }
}

.circular {
    width: 1em;
    font-size: 2.2em;
    font-weight: 900;
    animation: rotation 1800ms linear forwards infinite;
    
    path {
        fill: none;
    }
    svg {
        display: block;
        overflow: visible;
    }

    .asd {
        fill: white;
    }

}


@keyframes rotation {
    from {
        transform: rotate(0);
    }
    to {
        transform: rotate(360deg);
    }
}

</style>