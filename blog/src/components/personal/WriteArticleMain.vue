<template>
    <div
        :class="{
            'write-article-main': true,
            'night-write-article-main': night,
        }"
    >
        <div class="packing article-title">
            <input type="text" placeholder="标题" v-model="Title" />
        </div>
        <div class="packing article-type">
            <div class="type-select">
                <input
                    type="text"
                    placeholder="分类"
                    v-model="typeObj.Type"
                    @click="changeTypeList"
                />
                <ul v-show="typeObj.typeListShow">
                    <li
                        v-for="(item, index) of typeObj.typeList"
                        :key="index"
                        @click.self="selectThat(item.Type)"
                    >
                        <span>{{ item.Type }}</span>
                        <i
                            class="iconfont iconxianxingshanchu"
                            @click="removeType(item.Type)"
                        ></i>
                    </li>
                </ul>
            </div>
        </div>

        <div class="packing article-introduction">
            <input type="text" placeholder="引言" v-model="Introduction" />
        </div>

        <div class="packing upload-cover">
            <div class="upload-packing">
                <div class="upload-input-packing">
                    <div class="upload-input">
                        <button>
                            选择封面
                        </button>

                        <input
                            type="file"
                            accept="image/*"
                            ref="upload-cover"
                            @change="choiceCover"
                        />
                    </div>

                    <div class="upload-input">
                        <button>
                            添加图片
                        </button>

                        <input
                            type="file"
                            accept="image/*"
                            ref="upload-image"
                            @change="addImage"
                        />
                    </div>
                </div>

                <div class="upload-list">
                    <ul>
                        <li v-for="(item, index) in coverFile" :key="index">
                            <span>{{ item.name }}</span>
                            <i
                                class="iconfont iconxianxingshanchu"
                                @click="removeChoice"
                            ></i>
                        </li>
                    </ul>
                    <ul>
                        <li v-for="(item, index) in imageFiles" :key="index">
                            <i
                                class="iconfont iconxianxingshanchu"
                                @click="removeImage(index)"
                            ></i>
                            <span>{{ item.name }}</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>

        <div class="packing article-content">
            <div contenteditable="true" ref="article-content"></div>
        </div>

        <div class="packing release-article">
            <div>
                <button @click="sendArticle">提交文章</button>
            </div>
        </div>
    </div>
</template>

<script>
import { getArticleCategories } from '../../services/article';
import { writeArticle } from '../../services/admin';
import { Message } from 'element-ui';

export default {
    name: 'WriteArticleMain',
    data() {
        return {
            Title: '', // 标题
            Introduction: '', // 引言
            // type相关属性
            typeObj: {
                Type: '', // 类型
                typeList: [], // 类型列表
                typeListShow: false,
            },
            coverFile: {}, //封面图片文件
            imageFiles: [], // 文章内图片文件
        };
    },
    mounted() {
        this.requestArticleType();
    },
    computed: {
        token() {
            return this.$store.state.tokenStore.token;
        },
        night() {
            return this.$store.state.consoleStore.night;
        },
    },
    methods: {
        // 获取type列表
        requestArticleType() {
            getArticleCategories({})
                .then((res) => {
                    this.typeObj.typeList = res.data.articleTypeList;
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        // 设置Type
        selectThat(type) {
            this.typeObj.Type = type;
            this.typeObj.typeListShow = false;
        },

        // 改变typelist
        changeTypeList() {
            this.typeObj.typeListShow = !this.typeObj.typeListShow;
            if (this.typeObj.typeListShow) {
                let type = this.typeObj.Type;
                let list = this.typeObj.typeList;

                if (type == '') {
                    return;
                } else if (
                    list.find((i) => {
                        if (type === i.Type) {
                            return true;
                        }
                    }) != undefined
                ) {
                    return;
                } else {
                    this.typeObj.typeList.push({ Type: type });
                    console.log(this.typeObj.typeList);
                }
            }
        },
        // 删除对应的Type
        removeType(type) {
            this.typeObj.typeList.forEach((item, index) => {
                if (item.Type === type) {
                    this.typeObj.typeList.splice(index, 1);
                }
            });
        },
        // 选择封面
        choiceCover() {
            let uploadCover = this.$refs['upload-cover'];
            this.coverFile = uploadCover.files;
        },
        // 添加文章中需要的图片
        addImage() {
            let uploadImage = this.$refs['upload-image'];
            this.imageFiles.push(uploadImage.files[0]);
        },
        // 删除选中封面
        removeChoice() {
            this.coverFile = {};
        },
        // 删除选中图片
        removeImage(index) {
            this.imageFiles.splice(index, 1);
        },
        // 发送文章
        sendArticle() {
            if (Object.keys(this.coverFile).length === 0) {
                Message({
                    type: 'warning',
                    message: '封面为空，请选择封面',
                });
                return;
            }

            let formData = new FormData();
            formData.append('cover', this.coverFile[0]);
            formData.append('Title', this.Title);
            formData.append('Introduction', this.Introduction);
            formData.append('Type', this.typeObj.Type);
            formData.append('Content', this.$refs['article-content'].innerText);

            // 如果有文章所需要的图片，将他们添加到foemdata内
            if (this.imageFiles.length !== 0) {
                this.imageFiles.forEach((i) => {
                    formData.append(i.name.split('.')[0], i);
                });
            }
            this.$store.commit('openMask');
            writeArticle(formData)
                .then((res) => {
                    this.$store.commit('closeMask');
                    if (res.data.err === 0) {
                        this.Title = '';
                        this.Introduction = '';
                        this.typeObj.Type = '';
                        this.coverFile = {};
                        this.imageFiles = [];
                        this.$router.push({ path: '/' }).catch((err) => {});
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
    },
};
</script>

<style lang="scss" scoped>
.write-article-main {
    margin-top: 3em;

    input {
        outline: none;
    }

    .packing {
        width: 100%;
        display: flex;
        justify-content: center;
        margin-bottom: 2em;

        input {
            padding: 1em;
            border: 1px solid rgb(230, 228, 228);
            border-radius: 3px;
            font-size: 0.9em;
        }
    }

    .upload-cover {
        .upload-packing {
            width: 80%;

            .upload-input-packing {
                width: 100%;
                display: flex;
                justify-content: space-between;

                .upload-input {
                    width: 10em;
                    height: 3em;
                    position: relative;

                    button {
                        padding: 0;
                        margin: 0;
                        position: absolute;
                        width: 10em;
                        height: 3em;
                        outline: none;
                        top: 0;
                        left: 0;
                        bottom: 0;
                        right: 0;
                        background: white;
                        outline: none;
                        border: 1px solid rgb(230, 228, 228);
                        cursor: pointer;
                        border-radius: 5px;
                    }
                    input {
                        padding: 0;
                        position: absolute;
                        width: 100%;
                        height: 100%;
                        top: 0;
                        left: 0;
                        bottom: 0;
                        right: 0;
                        opacity: 0;
                        cursor: pointer;
                        z-index: 1;
                    }
                }
            }
            .upload-list {
                display: flex;
                justify-content: space-between;

                ul {
                    width: 48%;

                    li {
                        display: flex;
                        justify-content: space-between;
                        width: 100%;
                        padding: 5px 5px 5px 1em;
                        border-radius: 5px;
                        background: rgb(247, 244, 244);
                        align-items: center;
                        transition: all 300ms;
                        margin-bottom: 0.5em;

                        span {
                            color: rgb(71, 70, 70);
                        }

                        i {
                            font-size: 0.9em;
                            cursor: pointer;
                        }

                        &:hover {
                            background: rgb(236, 230, 230);
                        }
                    }
                }
            }
        }
    }

    .article-title {
        input {
            width: 80%;
            text-align: center;
        }
    }

    .article-type {
        .type-select {
            position: relative;
            width: 80%;

            > input {
                width: 100%;
                cursor: pointer;
                text-align: center;
            }

            > ul {
                position: absolute;
                width: 100%;
                background: white;
                margin-top: 0.7em;
                box-shadow: 1px 1px 2px rgb(233, 230, 230),
                    -1px -1px 2px rgb(233, 230, 230);
                border-radius: 3px;

                li {
                    padding: 1em 1em 1em 1.5em;
                    font-size: 0.9em;
                    color: rgb(75, 74, 74);
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;

                    &:hover {
                        background: rgba(241, 240, 240, 0.548);
                    }

                    span {
                        margin-left: auto;
                    }

                    i {
                        margin-left: auto;
                        font-size: 0.5em;
                        color: rgb(221, 217, 217);

                        &:hover {
                            color: red;
                        }
                    }
                }

                &::before {
                    position: absolute;
                    content: '';
                    width: 0;
                    height: 0;
                    border: 5px solid transparent;
                    border-bottom-color: rgb(241, 240, 240);
                    top: -10px;
                    left: 2em;
                }
            }
        }
    }

    .article-introduction {
        input {
            width: 80%;
        }
    }

    .article-content {
        > div {
            width: 80%;
            min-height: 40vh;
            border: 1px solid rgb(230, 228, 228);
            outline: none;
            background: white;
            font-size: 1.2em;
            line-height: 1.5em;
            padding: 1em;
            border-radius: 3px;
        }
    }

    .release-article {
        > div {
            width: 80%;
            display: flex;
        }

        button {
            outline: none;
            border: none;
            width: 30%;
            padding: 1em;
            margin-left: auto;
            border-radius: 3px;
            background: #fd9460;
            color: white;
            font-size: 0.9em;
            cursor: pointer;

            &:hover {
                background: orange;
            }
        }
    }
}

.night-write-article-main {
    input,
    button {
        background: black;
        border: 1px solid rgb(49, 49, 49) !important;
    }
    .upload-cover {
        button {
            background: black !important;
            color: rgb(138, 136, 136);
        }
    }
    .article-content {
        div {
            background: black;
            border: 1px solid rgb(49, 49, 49) !important;
            color: rgb(214, 208, 208);
        }
    }
    .article-type {
        .type-select {
            ul {
                background: black;
            }
        }
    }
}
</style>
