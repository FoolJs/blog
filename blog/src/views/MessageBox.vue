<template>
    <div id="message-box" v-if="isShow" @click.self="$emit('cancel')">
        <div class="box">
            <p class="top">
                <span>提示</span>
                <i
                    class="iconfont icon-xianxingshanchu"
                    @click="$emit('cancel')"
                ></i>
            </p>
            <slot></slot>
            <div class="bottom">
                <div class="cancel" @click="$emit('cancel')">取消</div>
                <div class="determine" @click="$emit('determine')">确定</div>
            </div>
        </div>
    </div>
</template>

<script>
/**
 *  determine事件：点击确定按钮时触发
 *  cancel事件：取消时触发
 */

export default {
    name: 'MessageBox',
    props: {
        // 是否显示
        isShow: {
            type: Boolean,
            default: false,
            required: true,
        },
    },
};
</script>

<style lang="scss" scoped>
#message-box {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.555);
    z-index: 999;
    display: flex;
    justify-content: center;
    align-items: center;

    .box {
        width: 450px;
        border-radius: 5px;
        background: white;
        padding: 0.7em 1em;

        .top {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 1em;

            i {
                cursor: pointer;
            }

            span {
                font-size: 1.2em;
            }
        }

        .content {
            display: flex;
            align-items: center;

            i {
                color: #e6a23c;
                font-size: 1.3em;
            }
            span {
                margin-left: 1em;
            }
        }

        .bottom {
            display: flex;
            justify-content: flex-end;
            margin-top: 1em;

            > div {
                font-size: 0.8em;
                padding: 0.5em 1.2em;
                border: 1px solid rgb(218, 216, 216);
                border-radius: 5px;
                cursor: pointer;
            }
            .determine {
                margin-left: 1em;
                background: #409eff;
                color: white;
                border-color: transparent;
            }
        }
    }
}

@media (max-width: 550px) {
    #message-box {
        
        .box {
            width: 90%;
        }
    }
}


</style>
