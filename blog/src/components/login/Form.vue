<template>
    <form
        @click.prevent
        :class="{ 'login-form': true, 'night-login-form': night }"
    >
        <p class="close">
            <i class="iconfont icon-icon-qihuan" @click="changePattern"></i>
            <i
                class="iconfont icon-xianxingshanchu"
                @click="$store.commit('changeBox')"
            ></i>
        </p>
        <div class="fieldset-wrapper">
            <fieldset>
                <legend>
                    {{ pattern === 'LOGIN' ? '登录' : '注册' }}
                </legend>
                <p class="welcome">欢迎来到FOOLMANBLOG</p>

                <transition-group name="show">
                    <div
                        v-for="(item, index) in list"
                        :key="index"
                        v-show="registerShow(item.pattern)"
                        :class="{
                            field: true,
                            'field-emial': item.name === 'Email',
                        }"
                    >
                        <p>
                            <input
                                :type="item.type"
                                :placeholder="item.placeholder"
                                :maxlength="item.maxlength"
                                v-model="item.model"
                                @blur="ruleChecking(item.name)"
                            />
                            <captcha
                                v-if="item.name === 'Email'"
                                @code-start="requestCode()"
                            ></captcha>
                        </p>

                        <transition name="show">
                            <span class="warn" v-show="item.rule">
                                {{ item.rule }}
                            </span>
                        </transition>
                    </div>
                </transition-group>

                <div class="field field-subbit">
                    <p>
                        <button @click="loginOrRegister()">
                            {{ pattern === 'LOGIN' ? '登录' : '注册' }}
                        </button>
                    </p>
                </div>
            </fieldset>
        </div>
    </form>
</template>

<script>
import { getCode, register, login } from '../../services/login';
import { Message } from 'element-ui';

export default {
    name: 'LoginRegister',
    components: {
        Captcha: () => import('./Captcha.vue'),
    },
    data() {
        return {
            pattern: 'LOGIN', // 模式
            list: {
                UserName: {
                    name: 'UserName',
                    placeholder: '用户名',
                    model: '',
                    rule: '',
                    type: 'text',
                    maxlength: '8',
                    pattern: 'LOGIN',
                },
                PassWord: {
                    name: 'PassWord',
                    placeholder: '密码',
                    model: '',
                    rule: '',
                    type: 'password',
                    maxlength: '18',
                    pattern: 'LOGIN',
                },
                NickName: {
                    name: 'NickName',
                    placeholder: '昵称',
                    model: '',
                    rule: '',
                    type: 'text',
                    maxlength: '10',
                    pattern: 'REGISTER',
                },
                Email: {
                    name: 'Email',
                    placeholder: '电子邮箱',
                    model: '',
                    rule: '',
                    type: 'email',
                    maxlength: '25',
                    pattern: 'REGISTER',
                },
                Code: {
                    name: 'Code',
                    placeholder: '验证码',
                    model: '',
                    rule: '',
                    type: 'text',
                    maxlength: '4',
                    pattern: 'REGISTER',
                },
            },
        };
    },
    computed: {
        night() {
            return this.$store.state.consoleStore.night;
        },
        jurisdictionRouter() {
            return this.$store.state.tokenStore.jurisdictionRouter;
        },
    },
    methods: {
        // 切换登录注册模式
        changePattern() {
            if (this.pattern === 'REGISTER') {
                this.pattern = 'LOGIN';
            } else if (this.pattern === 'LOGIN') {
                this.pattern = 'REGISTER';
            }
        },
        // 注册的input是否显示
        registerShow(value) {
            if (this.pattern === 'REGISTER') {
                return true;
            } else if (this.pattern === 'LOGIN') {
                if (value === 'LOGIN') {
                    return true;
                } else {
                    return false;
                }
            }
        },
        // 请求验证码
        requestCode() {
            this.$store.commit('openMask');
            getCode({ Email: this.list.Email.model })
                .then((res) => {
                    this.$store.commit('closeMask');
                    Message({
                        type: res.data.type,
                        message: res.data.message,
                    });

                    if (res.data.err === 0) {
                        const timerId = setTimeout(() => {
                            Message({
                                type: 'success',
                                message: '如果没找到，请看一下邮件垃圾箱TNT',
                            });
                            clearTimeout(timerId);
                        }, 3000);
                    }
                })
                .catch((err) => {
                    this.$store.commit('closeMask');
                    console.log(err);
                });
        },
        // 登录或注册
        loginOrRegister() {
            if (this.pattern === 'LOGIN') {
                this.checkUserName();
                this.checkPassWord();

                if (
                    this.list.UserName.rule != '' ||
                    this.list.PassWord.rule != ''
                ) {
                    return;
                } else {
                    this.requestLogin();
                }
            } else if (this.pattern === 'REGISTER') {
                this.checkUserName();
                this.checkPassWord();
                this.checkEmail();
                this.checkCode();

                for (let i in this.list) {
                    if (this.list[i].rule != '') {
                        return;
                    }
                }
                this.requestRegister();
            }
        },
        // 请求登录
        requestLogin() {
            this.$store.commit('openMask');
            login({
                UserName: this.list.UserName.model,
                PassWord: this.list.PassWord.model,
            })
                .then((res) => {
                    this.$store.commit('closeMask');
                    Message({
                        type: res.data.type,
                        message: res.data.message,
                    });
                    if (res.data.err === 0) {
                        this.$store.commit('setToken', {
                            token: res.data.token,
                        });
                        this.$store.commit('changeBox');
                        this.$router.push({name: 'NotFount'}).catch(err => {})
                        this.$router.push({path: '/'}).catch(err => {})
                    }
                })
                .catch((err) => {
                    this.$store.commit('closeMask');
                    console.log(err);
                });
        },
        // 请求注册
        requestRegister() {
            this.$store.commit('openMask');
            register({
                UserName: this.list.UserName.model,
                PassWord: this.list.PassWord.model,
                Code: this.list.Code.model,
                Email: this.list.Email.model,
                NickName: this.list.NickName.model,
            })
                .then((res) => {
                    this.$store.commit('closeMask');
                    Message({
                        type: res.data.type,
                        message: res.data.message,
                    });
                    if (res.data.err === 0) {
                        this.pattern = 'LOGIN';
                    }
                })
                .catch((err) => {
                    this.$store.commit('closeMask');
                    console.log(err);
                });
        },
        // 在input失焦时候触发输入的合法性验证
        ruleChecking(name) {
            switch (name) {
                case 'UserName':
                    this.checkUserName();
                    break;
                case 'PassWord':
                    this.checkPassWord();
                    break;
                case 'Email':
                    this.checkEmail();
                    break;
                case 'Code':
                    this.checkCode();
                    break;
                case 'NickName':
                    this.checkNickName();
                    break;
            }
        },
        // 用户名的合法性验证
        checkUserName() {
            let UserName = this.list.UserName.model;
            if (UserName === '') {
                this.list.UserName.rule = '请输入用户名';
            } else if (UserName.length <= 4 || UserName.length > 8) {
                this.list.UserName.rule = '用户名需大于4位且小于8位';
            } else if (!/^[a-zA-Z0-9\u4e00-\u9fa5-_]+$/.test(UserName)) {
                this.list.UserName.rule =
                    '用户名只能包含中文、英文、数字、下划线等字符';
            } else {
                this.list.UserName.rule = '';
            }
        },
        // 密码的合法性验证
        checkPassWord() {
            let PassWord = this.list.PassWord.model;
            if (!/^[a-zA-Z]\w{5,17}$/.test(PassWord)) {
                this.list.PassWord.rule =
                    '密码需以字母开头，6位以上，不能包含特殊字符';
            } else {
                this.list.PassWord.rule = '';
            }
        },
        // 昵称的合法性验证
        checkNickName() {
            let NickName = this.list.NickName.model;

            if (NickName === '') {
                this.list.NickName.rule = '请输入昵称';
            } else if (!/^[a-zA-Z0-9\u4e00-\u9fa5-_]+$/.test(NickName)) {
                this.list.NickName.rule =
                    '昵称只能包含中文、英文、数字、下划线等字符';
            } else {
                this.list.NickName.rule = '';
            }
        },
        // 电子邮箱的合法性验证
        checkEmail() {
            let Email = this.list.Email.model;
            if (
                !/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(
                    Email
                )
            ) {
                this.list.Email.rule = '请输入合法的电子邮箱';
            } else {
                this.list.Email.rule = '';
            }
        },
        // 验证码的合法性验证
        checkCode() {
            let Code = this.list.Code.model;
            if (Code === '') {
                this.list.Code.rule = '请输入验证码';
            } else if (Code.length != 4) {
                this.list.Code.rule = '验证码为4位';
            } else {
                this.list.Code.rule = '';
            }
        },
    },
};
</script>

<style lang="scss" scoped>
// 去除默认样式
fieldset {
    border: 0;
    padding: 0.01px 0 0 0;
    margin: 0;
    min-width: 0;
    display: table-cell;
    width: 100%;
    height: 100%;
}
legend {
    padding: 0 0 0.5em 0;
    display: table;
}
input {
    border: 1px solid rgb(209, 208, 208);
    outline: 0;
}
button {
    border: 1px solid rgb(209, 208, 208);
    background: none;

    outline: none;
}

.login-form {
    background: white;
    position: absolute;
    top: 20%;
    left: calc(50% - 15vw);
    width: 30vw;
    border-radius: 10px;

    .close {
        display: flex;
        justify-content: space-between;

        > i {
            margin: 0.5em 0.5em 0 0;
            font-size: 1.4em;
            cursor: pointer;
            transition: all 150ms;

            &:hover {
                transform: rotate(90deg);
            }

            &:first-child {
                margin: 0.5em 0 0 0.5em;

                &:hover {
                    transform: rotate(180deg);
                }
            }
        }
    }

    .fieldset-wrapper {
        width: 100%;
        height: 100%;
        padding: 0.5em 3em 0 3em;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        legend {
            text-align: center;
            font-size: 1.2em;
        }
        .welcome {
            text-align: center;
            margin-bottom: 1.5em;
        }
        .field {
            display: flex;
            flex-direction: column;
            height: 4.3em;

            input {
                width: 100%;
                padding: 0.8em 1em;
            }
            .warn {
                margin-top: 0.45em;
                font-size: 0.8em;
                color: $red-color;
            }
        }
        .field-emial {
            p {
                display: flex;

                input {
                    flex: 4;
                }
                button {
                    flex: 2;
                    margin-left: 1em;
                }
            }
        }
        .field-subbit {
            margin-top: 0.2em;

            button {
                width: 100%;
                padding: 0.7em;
                cursor: pointer;
            }
        }
    }
    button {
        position: relative;

        &::before {
            content: '';
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            width: 0;
            background-color: rgba(128, 128, 128, 0.041);
            transition: width 200ms ease;
        }
        &::after {
            content: '';
            position: absolute;
            top: 0;
            bottom: 0;
            width: 0;
            background-color: rgba(128, 128, 128, 0.041);
            transition: width 100ms;
            right: 0;
        }
        &:hover::before {
            width: 100%;
        }
        &:hover::after {
            width: 100%;
        }
    }
}

// input的消失与显示的过渡动效
.show-leave-active,
.show-enter-active {
    transition: opacity 300ms linear;
}
.show-enter,
.show-leave-to {
    opacity: 0;
}
.show-enter-to,
.show-leave {
    opacity: 1;
}

@media (max-width: 1400px) {
    .login-form {
        width: 35vw;
        left: calc(50% - 17.5vw);
    }
}
@media (max-width: 1200px) {
    .login-form {
        width: 40vw;
        left: calc(50% - 20vw);
    }
}
@media (max-width: 1000px) {
    .login-form {
        width: 50vw;
        left: calc(50% - 25vw);
    }
}
@media (max-width: 900px) {
    .login-form {
        width: 70vw;
        left: calc(50% - 35vw);
    }
}
@media (max-width: 600px) {
    .login-form {
        width: 94vw;
        left: calc(50% - 47vw);
    }
}

.night-login-form {
    @extend %night;
    @extend %article-linear;
    z-index: 2;
    legend,
    p,
    button {
        color: rgba(194, 190, 190, 0.979) !important;
    }
    i {
        color: rgb(128, 126, 126);
    }
    input,
    button {
        border: 2px solid rgb(41, 41, 41);
    }
}
</style>
