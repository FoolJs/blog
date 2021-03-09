<template>
    <div class="content-cover">
        <div
            class="content-cover-packing"
            :style="background"
            :class="{ 'cover-clear': coverClear }"
        ></div>
        <div class="content-cover-mask">
            <h1
                @mouseenter="coverClear = true"
                @mouseleave="coverClear = false"
                @click="goDown()"
            >
                {{ coverContent.Title }}
            </h1>
            <p class="article-introduce">
                发表于 {{ coverContent.CreateTime | conversionTime }} 日 |
                更新于 {{ coverContent.UpdateTime | conversionTime }} 日
            </p>
            <p class="article-introduce">
                {{ `已有 ${coverContent.CommentCount} 条评论 | 总计 ${coverContent.Count} 次阅读` }}
            </p>

            <div class="cover-tag" @click="goTypeArticle(coverContent.Type)">
                # {{ coverContent.Type }}
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ContentCover',
    props: {
        coverContent: {
            type: Object,
        },
    },
    data() {
        return {
            coverClear: false, // 控制图片是否清晰
            timerId: null,
        };
    },
    computed: {
        background() {
            const img = this.coverContent.Cover;
            return {
                backgroundImage: `url(${img})`,
            };
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
        goDown() {
            this.timerId = setTimeout(this.go, 0);
        },
        go() {
            let scrollTop = document.documentElement.scrollTop;

            if (scrollTop < 500) {
                document.documentElement.scrollTop += 40;
                this.timerId = setTimeout(this.go, 10);
            } else {
                clearTimeout(this.timerId);
            }
        },
        // 跳转到类型文章页面
        goTypeArticle(type) {
            this.$router.push({
                path: `/categories/${type}`,
            });
        },
    },
};
</script>

<style lang="scss" scoped>
.content-cover {
    width: 100%;
    height: 70vh;
    position: relative;

    .content-cover-packing {
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
        background-attachment: fixed;
        position: absolute;
        width: 100%;
        height: 100%;
        filter: blur(5px);
        transition: all 600ms;
    }

    .content-cover-mask {
        background: rgba(0, 0, 0, 0.425);
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        position: absolute;

        h1 {
            color: white;
            font-size: 2em;
            font-weight: 400;
            margin-bottom: 0.2em;
            margin-top: 2.6em;
            cursor: pointer;
        }
        .article-introduce {
            color: white;
            font-weight: 300;
            font-size: 0.9em;
            margin-bottom: 0.2em;
        }

        .cover-tag {
            cursor: pointer;
            color: white;
            margin-top: 1.5em;
            font-size: 0.8em;
            border-radius: 10px;
            padding: 0.4em 0.5em;
            background: $red-color;
            transition: all 400ms;

            &:hover {
                background: white;
                color: black;
            }
        }
    }

    .cover-clear {
        filter: blur(0px);
    }
}

@media (max-width: 900px) {
    .content-cover {
        .content-cover-mask {
            h1 {
                font-size: 1.8em;
            }
        }
    }
}

@media (max-width: 770px) {
    .content-cover {
        height: 100vh;

        .content-cover-mask {
            h1 {
                font-size: 1.5em;
            }
        }
    }
}
</style>
