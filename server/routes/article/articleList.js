const { Router } = require('express');
const ArticleDao = require('../../mongooseLib/dao/articleDao');


const router = new Router();
const article = new ArticleDao();

router.post('/page_article', async (req, res) => {
    let page = +req.body.page; // 想要到达的页码
    let pageSize = +req.body.pageSize; // 单页文章数量

    // 需要的字段
    let obj = {
        Title: 1,
        UpdateTime: 1,
        CreateTime: 1,
        Type: 1,
        Introduction: 1,
        Cover: 1,
        Count: 1,
        CommentCount: 1
    };

    try {
        let list = await article.jumpPaging(page, pageSize, obj, {Title: {$ne: '留言'}}); // 获取某页文章列表


        let total = await article.findCount();                        // 获取文章总数
        res.send({
            err: 0,
            list,
            total
        });
    } catch (error) {
        console.log(error);
        res.send({
            err: -999,
            message: '服务器错误，请稍候重试.',
            type: 'error'
        });
    }
});

module.exports = function () {
    return router;
};
