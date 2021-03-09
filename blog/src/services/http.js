import axios from 'axios'; // 引入axios
import qs from 'qs'; // 引入QS序列化数据
import { Message } from 'element-ui'; // 引入element-UI的提示组件
import tokenStore from '../store/tokenStore'; // VueX的tokenStore

//axios.defaults.baseURL = '/api'; // 请求响应的URL
//axios.defaults.baseURL = 'http://localhost:4040/'; // 请求响应的URL
axios.defaults.baseURL = 'http://www.foolman.top'; // 请求响应的URL
axios.defaults.timeout = 10000; // 超时时长
axios.defaults.headers.post['Content-Type'] =
    'application/x-www-form-urlencoded;charset=UTF-8'; // post请求时的请求头

const http = axios.create(); // 创建一个Axios实例

// 请求拦截器
http.interceptors.request.use(
    (config) => {
        if (config.method === 'post') {
            config.data = qs.stringify(config.data); // 如果是POST请求使用qs序列化数据

            const token = tokenStore.state.token; // 获取VueX中的token

            // 将token放到请求头的'Authorization'属性
            if (token) {
                config.headers['Authorization'] = token;
            }
        }
        return config;
    },
    (err) => {
        return Promise.reject(err);
    }
);

// 响应拦截器
http.interceptors.response.use(
    (response) => {
        if (response.status === 200) {
            // err为900证明登录过期或token非法
            if( response.data.err === -900 ) {
                Message({
                    type: response.data.type,
                    message: response.data.message
                });
                // 删除token
                localStorage.removeItem('token');
            }
            return response;
        }
    },
    (err) => {
        switch (err.response.status) {
            case 404:
                Message({
                    message: '网络错误诶，请检查一下网络连接叭！',
                    type: 'error',
                });
                break;
        }
        return Promise.reject(err);
    }
);

/**
 * @description 生成一个axios实例配置项
 * @param {string} method 请求方法
 * @param {string} url 请求的url
 * @returns {object} 返回一个配置对象
 */
function createOption(method, url) {
    return {
        method,
        url,
    };
}



// 用于上传文件图片等的axios
const uploadHttp = axios.create({
    headers: { 'Content-Type': 'multipart/form-data' },
});

uploadHttp.interceptors.request.use(
    (config) => {
        if (config.method === 'post') {

            const token = tokenStore.state.token; // 获取VueX中的token
            // 将token放到请求头的'Authorization'属性
            if (token) {
                config.headers['Authorization'] = token;
            }
        }
        return config;
    },
    (err) => {
        return Promise.reject(err);
    }
);



export { http, createOption, uploadHttp };
