import { http, createOption } from './http';

/**
 * @description 获取验证码
 */
function getCode( data ) {
    let option = createOption('post', '/verify_code');
    option.data = data;
    return http( option );
}

/**
 * @description 用户注册
 */
function register( data ) {
    let option = createOption( 'post', '/user_register' );
    option.data = data;
    return http( option );
}

/**
 * @description 用户登录
 */
function login( data ) {
    let option = createOption( 'post', '/user_login' );
    option.data = data;
    return http( option );
}








export { getCode, register, login };