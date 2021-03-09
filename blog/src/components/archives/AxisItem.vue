<template>
    <div :class="{ 'axis-item': true, 'night-axis-item': night }">
        <time>{{ axisContent.CreateTime | conversionTime }}</time>
        <div class="card">
            <header>
                <span @click="goArticle(axisContent.Title)">{{
                    axisContent.Title
                }}</span>
            </header>
            <p>{{ axisContent.Introduction }}</p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'AxisItem',
    props: {
        axisContent: {
            type: Object,
            required: true,
        },
    },
    computed: {
        night() {
            return this.$store.state.consoleStore.night;
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
        // 跳转到文章内容页面
        goArticle(title) {
            this.$router.push({
                name: 'ArticleContent',
                params: {
                    title: title,
                },
            });
        },
    },
};
</script>

<style lang="scss" scoped>
.axis-item {
    border-left: 3px solid rgba(201, 199, 199, 0.37);
    padding: 0 0 1em 1em;
    position: relative;
    width: 800px;

    > time {
        font-size: 0.8em;
        color: rgb(179, 175, 175);
    }

    .card {
        margin-top: 1em;
        padding: 1em;
        box-shadow: 0 4px 8px 6px rgba(103, 103, 104, 0.06);
        background: white;

        > header {
            margin: 1em 0;
            color: #555;

            > span {
                cursor: pointer;
                transition: all 500ms;

                &:hover {
                    color: gray;
                }
            }
        }
        > p {
            margin-bottom: 2em;
            color: rgb(136, 133, 133);
            font-size: 0.9em;
        }
    }
    &::before {
        content: '';
        position: absolute;
        width: 0.8em;
        height: 0.8em;
        border-radius: 50%;
        background: rgba(219, 219, 219, 0.959);
        top: -6px;
        left: -8px;
        transition: all 600ms;
    }
    &:hover::before {
        background: rgb(129, 129, 129);
    }
}

.night-axis-item {
    .card {
        background: black;
    }
    &::before {
        background: rgb(224, 222, 222);
    }
}

@media (max-width: 900px) {
    .axis-item {
        width: 80vw;
    }
}
@media (max-width: 770px) {
    .axis-item {
        width: 90vw;
    }
}
</style>
