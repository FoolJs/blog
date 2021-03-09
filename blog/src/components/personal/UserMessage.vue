<template>
    <div :class="{ 'user-message': true, 'night-user-message': night }">
        <div class="user-avatar">
            <input
                type="file"
                accept="image/*"
                ref="user-avatar"
                @change="changeAvatar"
            />
            <img :src="Avatar" alt="头像" />
        </div>
        <div class="gender">
            <i 
            class="iconfont icon-nan" 
            :class="{'point': pattern === 'S'}"
            :style="{color: 'rgb(28, 160, 248)'}"
            v-if="Gender === 'M'"
            @click="changeGender"
            ></i>
            <i 
            class="iconfont icon-nv" 
            :class="{'point': pattern === 'S'}"
            :style="{color: 'rgb(255, 38, 74)'}"
            v-if="Gender === 'F'"
            @click="changeGender"
            ></i>
        </div>
        <h2 :contenteditable="contenteditable" ref="nick-name">
            {{ NickName }}
        </h2>
        <p :contenteditable="contenteditable" ref="autograph">
            {{ Autograph }}
        </p>
        <div class="change-message-packing">
            <button
                class="change-message"
                v-if="pattern === 'S'"
                @click="requestSubmitMessage"
            >
                提交信息
            </button>
            <button
                class="change-message"
                v-if="pattern === 'C'"
                @click="changeMessage"
            >
                修改信息
            </button>
        </div>
        <button class="quit-login" @click="quitLogin">退出登录</button>
    </div>
</template>

<script>
import { Message } from 'element-ui';
import {
    getUserMessage,
    replaceUserAvatar,
    reviseUserMessage,
} from '../../services/user';

export default {
    name: 'UserMessage',
    data() {
        return {
            NickName: '', //昵称
            Autograph: '', //个性签名
            Avatar: '', // 头像
            Gender: '', // 性别
            pattern: 'C',
        };
    },
    computed: {
        token() {
            return this.$store.state.tokenStore.token;
        },
        night() {
            return this.$store.state.consoleStore.night;
        },
        contenteditable() {
            if (this.pattern === 'S') {
                return true;
            } else {
                return false;
            }
        },
    },
    watch: {
        token() {
            if (this.token) {
                this.requestUserMessage();
            }
        },
    },
    mounted() {
        this.requestUserMessage();
    },
    methods: {
        // 获取用户信息
        requestUserMessage() {
            this.$store.commit('openMask');
            getUserMessage({})
                .then((res) => {
                    this.$store.commit('closeMask');
                    if (res.data.err === 0) {
                        this.Autograph = res.data.userMessage.Autograph;
                        this.NickName = res.data.userMessage.NickName;
                        this.Avatar = res.data.userMessage.Avatar;
                        this.Gender = res.data.userMessage.Gender;
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        // 退出登录
        quitLogin() {
            this.$store.commit('deleteToken');
            this.$router.push({ path: '/' }).catch((err) => {});
            location.reload();
        },
        // 换头像
        changeAvatar() {
            let avatarFile = this.$refs['user-avatar'].files[0];

            let formData = new FormData();
            formData.append('file', avatarFile);

            replaceUserAvatar(formData)
                .then((res) => {
                    Message({
                        type: res.data.type,
                        message: res.data.message,
                    });
                    this.requestUserMessage();
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        // 修改信息
        changeMessage() {
            this.pattern = 'S';
        },
        // 提交信息
        requestSubmitMessage() {
            this.pattern = 'C';

            this.NickName = this.$refs['nick-name'].innerText;
            this.Autograph = this.$refs.autograph.innerText;

            if(this.NickName.length > 10) {
                this.NickName = this.NickName.slice(0, 10);
            }
            if(this.Autograph.length > 30) {
                this.Autograph = this.Autograph.slice(0, 20);
            }
            this.$store.commit('openMask');
            reviseUserMessage({
                NickName: this.NickName,
                Autograph: this.Autograph,
                Gender: this.Gender
            })
            .then(res => {
                this.$store.commit('closeMask');
                Message({
                    type: res.data.type,
                    message: res.data.message
                });
            })
            .catch(err => {
                this.$store.commit('closeMask');
                console.log(err);
            })
        },
        // 修改性别
        changeGender() {
            if( this.pattern === 'C' ) {
                return;
            } else if(this.pattern === 'S') {
                if( this.Gender === 'M' ) {
                    this.Gender = 'F';
                    return;
                }
                if( this.Gender === 'F' ) {
                    this.Gender = 'M';
                    return;
                }
            } else {
                return;
            }
        }
    },
};
</script>

<style lang="scss" scoped>
.user-message {
    flex: 3;
    display: flex;
    flex-direction: column;
    align-items: center;

    .user-avatar {
        width: 15em;
        height: 15em;
        border-radius: 50%;
        cursor: pointer;
        position: relative;
        overflow: hidden;

        &::before {
            content: '';
            position: absolute;
            left: 0;
            height: 100%;
            width: 2em;
            background: transparent;
            transform: skew(-20deg);
        }
        &:hover::before {
            transition: all 600ms;
            background: rgba(255, 255, 255, 0.384);
            transform: translateX(800%);
        }

        input {
            position: absolute;
            width: 100%;
            height: 100%;
            border-radius: 50%;
            top: 0;
            left: 0;
            opacity: 0;
            cursor: pointer;
        }

        img {
            width: 100%;
            border-radius: 50%;
            border: 3px solid rgb(199, 199, 199);
        }
    }

    .gender {
        width: 15em;
        display: flex;

        i {
            margin-left: auto;
            font-size: 2em;
        }
        .point {
            cursor: pointer;
        }
    }

    h2 {
        color: rgb(70, 68, 68);
        font-weight: 400;
        margin: .3em 0 0.5em 0;
        border: none;
        outline: none;
    }

    p {
        max-width: 15em;
        word-wrap: break-word;
        font-weight: 600;
        color: rgb(75, 73, 73);
        margin-bottom: 1em;
        border: none;
        outline: none;
    }
    .quit-login {
        box-sizing: border-box;
        outline: none;
        background: white;
        width: 60%;
        border: 1px solid rgb(202, 201, 201);
        padding: 0.5em 0;
        font-size: 0.9em;
        cursor: pointer;
        color: rgb(100, 100, 100);

        &:hover {
            background: rgb(240, 240, 240);
        }
    }
    .change-message-packing {
        width: 60%;
        display: flex;
        margin-bottom: 1em;

        .change-message {
            margin-left: auto;
            box-sizing: border-box;
            outline: none;
            border: none;
            background: rgb(39, 150, 240);
            color: white;
            padding: 0.5em 1em;
            border-radius: 6px;
            cursor: pointer;

            &:hover {
                background: rgb(6, 137, 245);
            }
        }
    }
}

.night-user-message {
    button {
        background: black;
        color: rgb(202, 199, 199);

        &:hover {
            background: rgb(32, 32, 32);
        }
    }
    img {
        filter: brightness(80%);
    }
}

@media (max-width: 900px) {
    .user-message {
        

        .user-avatar {
            width: 7em;
            height: 7em;
        }
        .gender {
            order: 1;
            justify-content: center;

            i {
                margin: 0;
            }
        }
    }
    .change-message-packing {
        order: -2;
        width: 90% !important;
    }
    .quit-login {
        order: 2;
        margin: 1em;
    }
}
</style>
