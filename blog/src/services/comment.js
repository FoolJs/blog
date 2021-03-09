import { http, createOption } from './http';

/**
 * @description 发布评论
 */
function publishComment(data) {
    let option = createOption('post', '/publish_comment');
    option.data = data;
    return http(option);
}

/**
 * @description 获取评论内容
 */
function getCommentContent(data) {
    let option = createOption('post', '/comment_content');
    option.data = data;
    return http(option);
}

/**
 * @description 回复评论
 */
function replyComment(data) {
    let option = createOption('post', '/reply_comment');
    option.data = data;
    return http(option);
}

export { publishComment, getCommentContent, replyComment };
