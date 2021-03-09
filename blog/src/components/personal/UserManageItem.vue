<template>
    <div
        :class="{
            'user-manage-item': true,
            'admin-user-manage-item': userItem.Identify === 'Admin',
            'night-user-manage-item': night,
        }"
    >
        <message-box
            :isShow="messageBoxShow"
            @cancel="$store.commit('closeMessageBox')"
            @determine="requestRemoveUser(userItem.UserName)"
        >
            <template>
                <p class="content">
                    <i class="iconfont icon-guanyu"></i>
                    <span>此操作将删除该用户，是否继续？</span>
                </p>
            </template>
        </message-box>

        <slot name="header"></slot>
        <div class="avatar-packing">
            <img :src="userItem.Avatar" alt="用户头像" />
        </div>
        <p class="nickName">
            {{ userItem.NickName }}
        </p>
        <slot name="email"></slot>
        <slot name="autograph"></slot>
        <div class="gender">
            <i
                class="iconfont icon-nan"
                :style="{ color: 'rgb(28, 160, 248)' }"
                v-if="userItem.Gender === 'M'"
            ></i>
            <i
                class="iconfont icon-nv"
                :style="{ color: 'rgb(255, 38, 74)' }"
                v-if="userItem.Gender === 'F'"
            ></i>
        </div>
        <p class="bottom">
            <span class="userName">
                {{ userItem.UserName }}
            </span>
            <span class="createTime">
                {{ userItem.CreateTime | conversionTime }}
            </span>
        </p>
    </div>
</template>

<script>
import { removeUser } from '../../services/admin';
import { Message } from 'element-ui';

export default {
    name: 'UserManageItem',
    components: {
        MessageBox: () => import('../../views/MessageBox.vue'),
    },
    props: {
        userItem: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {};
    },
    computed: {
        night() {
            return this.$store.state.consoleStore.night;
        },
        messageBoxShow() {
            return this.$store.state.messageBoxStore.messageBoxShow;
        },
    },
    filters: {
        conversionTime(d) {
            let date = new Date(d);
            let year = date.getFullYear();
            let month =
                date.getMonth() + 1 < 10
                    ? '0' + (date.getMonth() + 1)
                    : date.getMonth() + 1;
            let day =
                date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
            return `${year}-${month}-${day}`;
        },
    },
    methods: {
        requestRemoveUser(UserName) {
            console.log(UserName);
            this.$store.commit('closeMessageBox');
            this.$store.commit('openMask');

            removeUser({UserName})
            .then( res => {
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
        }
    }
};
</script>

<style lang="scss" scoped>
.user-manage-item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 17em;
    padding: 0 1em 0 1em;
    position: relative;
    border: 2px solid rgb(230, 227, 227);
    background: white;
    border-radius: 6px;
    margin-bottom: 2em;

    .user-option {
        position: absolute;
        top: 0.1em;
        color: rgb(180, 176, 176);
        display: flex;
        width: 100%;
        justify-content: space-between;
        font-size: 0.9em;
        padding: 0 0.5em;
        transition: all 400ms;
        opacity: 0;

        span {
            cursor: pointer;
        }
    }

    &:hover .user-option {
        opacity: 1;
    }

    .avatar-packing {
        width: 5em;
        border-radius: 50%;
        margin-top: 1em;

        img {
            max-width: 100%;
            border-radius: 50%;
        }
    }
    .nickName {
        margin-top: 0.5em;
        font-size: 1.2em;
        font-weight: 600;
    }
    .email {
        margin-top: 0.5em;
        text-align: center;
        font-weight: 500;
    }
    .autograph {
        margin-top: 0.5em;
        text-align: center;
        color: rgb(36, 35, 35);
    }
    .gender {
        margin-top: 1em;
        margin-bottom: 0.9em;

        i {
            font-size: 2em;
        }
    }
    .bottom {
        display: flex;
        width: 100%;
        justify-content: space-between;
        margin-bottom: 0.7em;
        font-size: 0.9em;

        .userName {
            font-weight: 600;
        }
        .createTime {
            color: rgb(92, 91, 91);
        }
    }
}

.admin-user-manage-item {
    border: 2px solid orangered;
}
.night-user-manage-item {
    background: black;
    border: 2px solid rgb(48, 47, 47);

    .nickName,
    .userName,
    .email,
    .createTime,
    .autograph {
        color: rgb(175, 173, 173);
    }
}

@media (max-width: 600px) {
    .user-manage-item {
        width: 85%;
        margin-bottom: 2em;
    }
}
</style>
