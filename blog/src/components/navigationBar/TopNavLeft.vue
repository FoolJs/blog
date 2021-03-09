<template>
    <div class="portrait">
        <div @click="jumpPage()">
            <span v-if="!src">user</span>
            <img v-else :src="src" alt="用户头像" />
        </div>
    </div>
</template>

<script>
import { getUserAvatar } from '../../services/user';

export default {
    name: 'TopNavLeft',
    computed: {
        token() {
            return this.$store.state.tokenStore.token;
        },
        jurisdictionNav() {
            return this.$store.state.tokenStore.jurisdictionNav;
        },
    },
    data() {
        return {
            src: '', // 用户头像
        };
    },
    watch: {
        token(newValue, oldValue) {
            if (newValue) {
                this.requestAvatar();
            } else {
                this.src = '';
            }
        },
    },
    mounted() {
        if (this.token) {
            this.requestAvatar();
        } else {
            this.src = '';
        }
    },
    methods: {
        requestAvatar() {
            getUserAvatar({})
                .then((res) => {
                    this.src = res.data.src;
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        // 根据是否登录决定是打开登录框还是跳转到个人中心页面
        jumpPage() {
            if (this.token) {
                if (this.jurisdictionNav[0].children[0].children) {
                    this.$router
                        .push({
                            path: `/personal/${this.jurisdictionNav[0].children[0].path}/${this.jurisdictionNav[0].children[0].children[0].path}`,
                        })
                        .catch((err) => {});
                    return;
                }

                this.$router
                    .push({
                        path: `/personal/${this.jurisdictionNav[0].children[0].path}`,
                    })
                    .catch((err) => {});
            } else {
                this.$store.commit('changeBox');
            }
        },
    },
};
</script>

<style lang="scss" scoped>
.portrait {
    display: flex;
    justify-content: center;
    align-items: center;

    > div {
        width: 2.9em;
        height: 2.9em;
        margin: 0.3em;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;

        border: 1px dashed #dedede;
        background: #fafafa;
        color: rgb(128, 126, 126);

        img {
            max-width: 100%;
            border-radius: 50%;
        }

        position: relative;
        overflow: hidden;

        &::before {
            content: '';
            position: absolute;
            left: 0;
            height: 100%;
            width: 10px;
            background: transparent;
            transform: skew(-20deg);
        }
        &:hover::before {
            transition: all 800ms;
            background: rgba(255, 255, 255, 0.658);
            transform: translateX(500%);
        }
    }
}
</style>
