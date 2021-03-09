import { http, createOption, uploadHttp } from './http';



/**
 * @description 写文章
 */
function writeArticle(data)  {
    let option = createOption('post', '/write_article');
    option.data = data;
    return uploadHttp( option );
}


/**
 * @description 获取用户信息列表
 */
function getUserList(data) {
    let option = createOption('post', '/page_user');
    option.data = data;
    return http(option);
}

/**
 * @description 删除用户
 */
function removeUser(data) {
    let option = createOption( 'post', '/remove_user' );
    option.data = data;
    return http( option );
}


export { writeArticle, getUserList, removeUser };