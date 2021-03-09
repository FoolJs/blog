<template>
    <div class="user-manage-list">
        <div class="user-manage-item-packing">
            <user-manage-item
                v-for="(item, index) of list"
                :key="index"
                :userItem="item"
            >
                <template #header>
                    <p class="user-option">
                        <span>修改</span>
                        <span @click="$store.commit('openMessageBox')">删除</span>
                    </p>
                </template>
                <template #autograph>
                    <p class="autograph">
                        {{ item.Autograph }}
                    </p>
                </template>
                <template #email>
                    <p class="email">
                        {{ item.Email }}
                    </p>
                </template>
            </user-manage-item>
        </div>

        <el-pagination
            :page-size="pageSize"
            :total="total"
            @current-change="requestUserList"
            layout="prev,pager,next"
        >
        </el-pagination>
    </div>
</template>

<script>
import { getUserList } from '../../services/admin';

export default {
    name: 'UserManageList',
    components: {
        UserManageItem: () => import('./UserManageItem.vue'),
    },
    data() {
        return {
            list: [], // 本页的用户列表
            pageSize: 6, // 单页用户数量
            total: 0, // 用户总数量
        };
    },
    mounted() {
        this.requestUserList(1);
    },
    methods: {
        // 获取某页用户信息
        requestUserList(page) {
            this.$store.commit('openMask');
            getUserList({
                page,
                pageSize: this.pageSize,
            })
                .then((res) => {
                    this.$store.commit('closeMask');
                    if (res.data.err === 0) {
                        this.list = res.data.list;
                        this.total = res.data.total;
                    }
                })
                .catch((err) => {
                    this.$store.commit('closeMask');
                    console.log(err);
                });
        },
    },
};
</script>

<style lang="scss" scoped>
.user-manage-list {
    width: 100%;

    .user-manage-item-packing {
        width: 100%;
        display: flex;
        justify-content: space-around;
        flex-wrap: wrap;
        align-content: space-between;
    }
}

.user-manage-list::v-deep .el-pagination {
    width: 100%;
    display: flex;
    justify-content: center;
    margin: 3em 0 1em 0;

    button {
        width: 15%;
        background: transparent;
    }
    ul {
        width: 70%;
        display: flex;
        justify-content: center;
        li {
            background: transparent;
        }
    }
}
</style>
