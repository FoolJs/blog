<template>
    <div class="setting-main">
        <div class="setting-packing">
            <div class="subscribe" :class="{ 'select-input': ArticleSub }">
                <span>文章订阅</span>
                <div class="article-sub-packing">
                    <input type="checkbox" v-model="ArticleSub" />
                </div>
            </div>
            <p>
                打开后博主有文章更新时会通过邮件提醒您哦
            </p>
            <button @click="requestSubmitSettings">提交修改</button>
        </div>
    </div>
</template>

<script>
import { getUserSettings, submitUserSettings } from '../../services/user';
import { Message } from 'element-ui';

export default {
    name: 'SettingMain',
    data() {
        return {
            ArticleSub: false, // 文章订阅设置
        };
    },
    mounted() {
        this.requestUserSettings();
    },
    methods: {
        // 获取用户设置
        requestUserSettings() {
            this.$store.commit('openMask');
            getUserSettings({})
                .then((res) => {
                    this.$store.commit('closeMask');
                    if (res.data.err === 0) {
                        this.ArticleSub = res.data.ArticleSub;
                    } else {
                        Message({
                            type: res.data.type,
                            message: res.data.message,
                        });
                    }
                })
                .catch((err) => {
                    this.$store.commit('closeMask');
                    console.log(err);
                });
        },
        requestSubmitSettings() {
            this.$store.commit('openMask');
            submitUserSettings({
                ArticleSub: this.ArticleSub,
            })
                .then((res) => {
                    this.$store.commit('closeMask');
                    Message({
                        type: res.data.type,
                        message: res.data.message
                    });
                })
                .catch((err) => {
                    console.log(err);
                    this.$store.commit('closeMask');
                });
        },
    },
};
</script>

<style lang="scss" scoped>
.setting-main {
    margin-top: 3em;
    display: flex;
    justify-content: center;
    min-height: 70vh;
    background: white;

    .setting-packing {
        width: 80%;
        display: flex;
        flex-direction: column;
    }
    .subscribe {
        display: flex;
        align-items: center;
        margin-bottom: 1em;

        span {
            margin-right: 0.5em;
            font-weight: 600;
        }

        .article-sub-packing {
            background: rgb(212, 211, 211);
            width: 3.2em;
            height: 1.7em;
            position: relative;
            padding: 0.1em 0.2em;
            display: flex;
            align-items: center;
            cursor: pointer;

            input {
                position: absolute;
                width: 100%;
                height: 100%;
                opacity: 0;
                cursor: pointer;
            }

            &::before {
                content: '';
                background: white;
                width: 1.2em;
                height: 1.2em;
            }
        }
    }

    button {
        outline: none;
        margin-top: auto;
        margin-left: auto;

        border: none;
        width: 30%;
        padding: 1em;
        border-radius: 3px;
        background: #fd9460;
        color: white;
        font-size: 0.9em;
        cursor: pointer;

        &:hover {
            background: orange;
        }
    }

    .select-input {
        .article-sub-packing {
            background: #2196f3;

            &::before {
                margin-left: auto;
            }
        }
    }
}
</style>
