const { Router } = require('express');
const ArticleDao = require('../../mongooseLib/dao/articleDao');

const router = new Router();
const article = new ArticleDao();

router.post('/type_article', async (req, res) => {
    let page = +req.body.page; // 想要到达的页码
    let pageSize = +req.body.pageSize; // 单页文章数量
    let Type = req.body.Type; // 想要查找的类型

    try {
        let list = await article.jumpPaging(
            page,
            pageSize,
            {
                CreateTime: 1,
                Title: 1,
                Introduction: 1,
            },
            {
                Type,
            }
        );

        let total = await article.findCount({ Type });

        res.send({
            err: 0,
            list,
            total,
        });
    } catch (error) {
        console.log(error);
    }
});

module.exports = function () {
    return router;
};
