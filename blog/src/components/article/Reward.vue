<template>
    <div id="reward">
        <hr />
        <i class="iconfont icon-V" @click="goQRCode"></i>
        <p>请老夫喝杯卡布奇诺</p>
        <div class="qr-code" v-if="list">
            <figure v-for="(item, index) of list" :key="index">
                <a :href="item.src" target="_blank" v-if="list">
                    <img
                        :src="item.src"
                        :alt="item.title"
                        :title="item.title"
                    />
                </a>
                <i :class="item.icon" v-if="list"></i>
            </figure>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Reward',
    data() {
        return {
            list: null,
        };
    },
    methods: {
        goQRCode() {
            let lists = [
                {
                    icon: 'iconfont icon-zhifubao',
                    src: '/money/zfb.png',
                    title: '支付宝',
                },
                {
                    icon: 'iconfont icon-gongzhonghao',
                    src: '/money/wx.png',
                    title: '微信',
                },
            ];
            if (this.list === null) {
                this.list = lists;
            } else {
                this.list = null;
            }
        },
    },
};
</script>

<style lang="scss" scoped>
#reward {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 850px;
    margin: auto;
    margin-top: 4em;

    > i {
        font-size: 2em;
        padding: 0.1em 0.2em;
        border-radius: 50%;
        overflow: hidden;
        color: $red-color;
        cursor: pointer;
        transition: all 1s;
        animation: shaw 1.5s infinite alternate;

        &:hover {
            background: rgba(238, 145, 145, 0.144);
        }
    }
    > p {
        text-indent: 0;
        color: black;
        font-weight: 600;
        margin-top: .5em;
    }
    .qr-code {
        display: flex;
        width: 100%;
        justify-content: space-around;
        margin: 2em 0 0 0;

        figure {
            display: flex;
            flex-direction: column;

            &:last-child i {
                color: green;
            }

            i {
                color: #00a3ee;
                font-size: 1.5em;
                margin-top: 0.5em;
                text-align: center;
            }
        }
        a {
            width: 15em;
            border: 1px solid rgb(206, 205, 205);
            padding: 0.5em;
            border-radius: 5px;

            img {
                max-width: 100%;
            }
        }
    }
}

@keyframes shaw {
    0% {
        box-shadow: 0 0 10px rgba(101, 101, 236, 0.671);
    }
    100% {
        box-shadow: 0 0 10px -10px rgba(240, 8, 8, 0.966);
    }
}


@media (max-width: 900px) {
    #reward {
        width: 95vw;
    }
    .qr-code {
        flex-direction: column;

        figure {
            justify-content: center;
            align-items: center;

            i {
                margin-bottom: 1em;
            }
        }
    }
}
</style>
