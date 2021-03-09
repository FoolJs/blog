import { http, createOption, uploadHttp } from './http';

/**
 * @description 获取用户头像
 */
function getUserAvatar(data) {
    let option = createOption('post', '/user_avatar');
    option.data = data;
    return http(option);
}

/**
 * 获取用户基本信息
 */
function getUserMessage(data) {
    let option = createOption('post', '/user_message');
    option.data = data;
    return http(option);
}

/**
 * @description 修改头像
 */
function replaceUserAvatar(data) {
    let option = createOption('post', '/replace_avatar');
    option.data = data;
    return uploadHttp(option);
}

/**
 * @description 修改用户信息
 */
function reviseUserMessage(data) {
    let option = createOption('post', '/revise_message');
    option.data = data;
    return http(option);
}

/**
 * @description 获取用户设置
 */
function getUserSettings(data) {
    let option = createOption('post', '/user_settings');
    option.data = data;
    return http(option);
}

/**
 * @description 提交用户设置
 */
function submitUserSettings(data) {
    let option = createOption('post', '/sub_user_settings');
    option.data = data;
    return http(option);
}


export {
    getUserAvatar,
    getUserMessage,
    replaceUserAvatar,
    reviseUserMessage,
    getUserSettings,
    submitUserSettings,
};
