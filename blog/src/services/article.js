import { http, createOption } from './http';

/**
 * @description 获取某页文章列表
 */
function getPageArticle( data ) {
    let option = createOption( 'post', '/page_article' );
    option.data = data;
    return http( option );
}

/**
 * @description 获取文章内容
 */
function getArticleContent( data ) {
    let option = createOption( 'post', '/article');
    option.data = data;
    return http( option );
}

/**
 * @description 获取文章分类
 */
function getArticleCategories( data ) {
    let option = createOption('post', '/article_categories');
    option.data = data;
    return http( option );
}

/**
 * @description 获取对应类型的所有文章
 */
function getTypeArticle( data ) {
    let option = createOption( 'post', '/type_article' );
    option.data = data;
    return http( option );
}


export {
    getPageArticle,
    getArticleContent,
    getArticleCategories,
    getTypeArticle,
};