<template>
    <footer class="bottom-nav-bar">
        <ul class="contact-me">
            <li v-for="(item, index) of contactMe" :key="index">
                <a :href="item.href" target="_blank">
                    {{ item.name }}
                </a>
            </li>
        </ul>
        <div class="line"></div>
        <p class="blog-say">
            我是盲目痴愚之人
        </p>
        <a
            href="https://beian.miit.gov.cn/#/Integrated/index"
            class="beian"
            target="_blank"
        >
            豫ICP备2020028243号
        </a>
    </footer>
</template>

<script>
export default {
    name: 'BottomNavBar',
    data() {
        return {
            contactMe: [
                {
                    name: 'ZHIHU',
                    href:
                        'https://www.zhihu.com/people/xuan-yuan-shi-si-60/answers',
                },
                {
                    name: 'BILIBILi',
                    href:
                        'https://space.bilibili.com/190747712?from=search&seid=15146804509473617148',
                },
                { name: 'GITHUB', href: 'https://github.com/FoolJs' },
            ],
        };
    },
};
</script>

<style lang="scss" scoped>
.bottom-nav-bar {
    background: #06060b;
    color: #60606d;
    display: flex;
    flex-direction: column;
    align-items: center;

    height: 25vh;

    .contact-me {
        display: flex;
        margin-top: 1em;

        li {
            &:hover {
                color: rgb(219, 216, 216);
            }

            &:nth-child(2) {
                margin: 0 2em;
            }

            a {
                display: block;
                font-size: 0.9em;
            }
        }
    }
    .line {
        height: 0.1em;
        width: 100%;
        background: rgb(83, 83, 83);
        margin-top: 1em;
    }
    .blog-say {
        margin-top: auto;
    }
    .beian {
        margin-top: 1.5em;
        margin-bottom: 2em;

        &:hover {
            color: rgb(219, 216, 216);
        }
    }
}
</style>
