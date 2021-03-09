<template>
    <button id="captcha" @click="countDown" :class="{ disabled }">
        {{ code }}
    </button>
</template>

<script>
/**
 * *属性：
 * *'content'：按钮文字，默认发送验证码
 * *'num'：倒计时时长，默认60s
 *
 * *事件：
 * *'code-start'事件，倒计时开始时触发
 * *'code-end'事件，倒计时结束时触发
 * *'code-change'事件，验证码每跳转一次就会触发一次，并将值作为参数返回
 */

export default {
    name: 'Captcha',
    props: {
        content: {
            type: [String, Number],
            default: '发送',
        },
        num: {
            type: Number,
            default: 60,
        },
    },
    data() {
        let code = this.content;
        return {
            code,
            timerId: null,
            disabled: false,
        };
    },
    methods: {
        countDown() {
            if (this.code === this.content) {
                this.disabled = true;
                this.code = this.num;
                sessionStorage.setItem('code', this.code);
                this.$emit('code-start');
                this.$emit('code-change', this.code);
                this.timerId = setTimeout(this.go, 1000);
            } else {
                this.disabled = true;
                return;
            }
        },
        go() {
            if (this.code > 0) {
                this.code -= 1;
                sessionStorage.setItem('code', this.code);
                this.$emit('code-change', this.code);
                this.timerId = setTimeout(this.go, 1000);
            } else {
                this.code = this.content;
                sessionStorage.setItem('code', this.code);
                clearTimeout(this.timerId);
                this.$emit('code-end');
                this.disabled = false;
            }
        },
    },
    mounted() {
        let _this = this;
        if (sessionStorage.getItem('code') === this.content) {
            return;
        } else {
            this.code = +sessionStorage.getItem('code');
            this.timerId = setTimeout(this.go, 1000);
        }
    },
};
</script>

<style lang="scss" scoped>
#captcha {
    outline: 0;
    cursor: pointer;
}

.disabled {
    cursor: not-allowed !important;
}
</style>
