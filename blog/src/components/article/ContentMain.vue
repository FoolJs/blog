<template>
    <div :class="{ 'content-main': true, 'night-content-main': night }">
        <blockquote class="main-introduction">{{ introduction }}</blockquote>
        <div class="main-center" v-html="markedContent"></div>
    </div>
</template>

<script>
import marked from 'marked';
import Prism from 'prismjs';

export default {
    name: 'ContentMain',
    mounted() {
        Prism.highlightAll();
    },
    props: {
        mainContent: {
            type: String,
            required: true,
        },
        introduction: {
            type: String,
        },
    },
    computed: {
        markedContent() {
            return marked(this.mainContent);
        },
        night() {
            return this.$store.state.consoleStore.night;
        },
    },
};
</script>

<style lang="scss" scoped>
.content-main {
    width: 860px;
    margin: auto;

    padding: 0 1em;

    * {
        color: rgb(27, 27, 27);
    }

    .main-introduction {
        margin: 4em 0 2em 0;
    }

    blockquote {
        border-left: 4px solid rgb(194, 194, 194);
        padding: 0.2em 0 0.2em 1em;
        background: white;
    }
    .main-center::v-deep {
        h1,
        h2,
        h3,
        h4,
        h5,
        h6,
        ul,
        ol,
        blockquote,
        pre,
        table {
            margin: 2em 0;
        }

        p,
        ul,
        ol,
        table,
        h1,
        h2,
        h3,
        h4,
        h5,
        h6 {
            code {
                background-color: rgba(27, 31, 35, 0.05);
                font-size: 1em;
                font-weight: 600;
                padding: 2px 5px;
                color: #ed1c24;
            }
        }

        h1,
        h2,
        h3,
        h4,
        h5,
        h6 {
            font-weight: 400;
            position: relative;
        }

        h1,
        h2 {
            position: relative;
            transition: all 200ms;

            &::before {
                content: '#';
                position: absolute;
                color: #ed1c24;
                left: -0.9em;
                top: 0.4em;
                font-size: 80%;
            }

            &:hover {
                transform: translateX(5px);
            }
        }

        p {
            text-indent: 2em;
            line-height: 1.6em;
            letter-spacing: 2px;
        }

        hr {
            border: none;
            height: 0.1em;
            background: rgba(202, 200, 200, 0.356);
            width: 100%;
            margin: 3em 0;
        }

        blockquote {
            border-left: 4px solid rgb(194, 194, 194);
            padding: 0.2em 0 0.2em 1em;

            * {
                line-height: 180%;
            }
        }

        img {
            max-width: 100%;
        }

        table {
            border-collapse: collapse;

            td,
            th {
                text-align: center;
                padding: 0.5em 0;
                border: 2px solid rgb(223, 219, 219);
            }

            tr {
                &:hover {
                    background-color: rgba(230, 227, 227, 0.233);
                }
            }
        }

        ul,
        ol {
            line-height: 200%;
            margin-left: 2em !important;

            li {
                position: relative;

                &::before {
                    content: '';
                    position: absolute;
                    top: 0.7em;
                    left: -1.3em;
                    height: 6px;
                    width: 6px;
                    border-radius: 50%;
                    border: 3px solid rgb(194, 194, 194);
                }

                &:hover::before {
                    border-color: rgb(110, 110, 110);
                }
            }
        }
    }
}

.night-content-main {
    blockquote {
        background: black;
        color: rgb(187, 180, 180);
        border-left-color: rgb(88, 87, 87);
    }

    .main-center::v-deep {
        h1,
        h2,
        h3,
        h4,
        h5,
        h6 {
            color: rgb(231, 227, 227);
        }
        p,
        ul,
        li,
        blockquote {
            color: rgb(187, 180, 180);
        }
        blockquote {
            background: black;
            border-left-color: rgb(88, 87, 87);
        }

        pre,
        code,
        span {
            background: black;
        }
    }
}

@media (max-width: 900px) {
    .content-main {
        width: 90vw;
    }
}

@media (max-width: 770px) {
    .content-main {
        width: 95vw;
        padding: 0 1em;
    }
}
</style>
