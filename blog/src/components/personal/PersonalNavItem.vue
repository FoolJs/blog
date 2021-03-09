<template>
    <div
        :class="{ 'personal-nav-item': true, 'night-personal-nav-item': night }"
        @click.self="changePath"
        @mouseover="childShow = true"
        @mouseout="childShow = false"
    >
        <i :class="item.icon" @click.self="changePath"></i>
        <span @click.self="changePath">
            {{ item.title }}
        </span>

        <transition name="child-tran">
            <div
                class="child-nav-packing"
                v-if="item.children"
                v-show="childShow"
            >
                <div
                    class="child-nav-item"
                    v-for="(childItem, childIndex) of item.children"
                    :key="childIndex"
                    @click="goPath(childItem.path)"
                >
                    <i :class="childItem.icon"></i>
                    <span>
                        {{ childItem.title }}
                    </span>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
export default {
    name: 'PersonalNavItem',

    props: {
        item: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            childShow: false,
        };
    },
    methods: {
        changePath() {
            this.$router.push({ path: '/personal/' }).catch((err) => {});
            if (this.item.children) {
                this.$router
                    .push({
                        path: `${this.item.path}/${this.item.children[0].path}`,
                    })
                    .catch((err) => {});
            } else {
                this.$router.push({ path: this.item.path }).catch((err) => {});
            }
        },
        // 子导航的跳转
        goPath(path) {
            this.$router.push({ path: `/personal/` }).catch((err) => {});
            this.$router
                .push({
                    path: `${this.item.path}/${path}`,
                })
                .catch((err) => {});
        },
    },
    computed: {
        night() {
            return this.$store.state.consoleStore.night;
        },
    },
};
</script>

<style lang="scss" scoped>
.personal-nav-item {
    color: rgb(37, 37, 37);
    padding: 0.6em 1.5em;
    cursor: pointer;
    position: relative;

    &:hover {
        border-bottom: 2px solid rgb(211, 209, 209);
    }

    .child-nav-packing {
        position: absolute;
        padding-top: 0.5em;
        top: 100%;
        left: 0;
        width: 100%;

        .child-nav-item {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-around;
            margin-bottom: 0.5em;
            background: white;
            padding: 0.3em;
            border-radius: 5px;
            border: 2px solid rgb(228, 227, 227);
            font-weight: 900 !important;

            i,
            span {
                font-size: 0.7em;
            }

            &:hover {
                background: rgb(250, 249, 248);
            }
        }
    }
}

.select-item {
    font-weight: 600;
    border-bottom: 2px solid orange;
}

.child-tran-leave-active,
.child-tran-enter-active {
    transition: all 300ms;
}

.child-tran-enter,
.child-tran-leave-to {
    opacity: 0;
}
.child-tran-enter-to,
.child-tran-leave {
    opacity: 1;
}

.night-personal-nav-item {
    color: white;

    .child-nav-packing {
        .child-nav-item {
            background: black;
            border-color: rgb(177, 174, 174);
            color: rgb(189, 184, 184);
        }
    }
}

@media (max-width: 770px) {
    .personal-nav-item {
        flex: 1;
    }
}
</style>
