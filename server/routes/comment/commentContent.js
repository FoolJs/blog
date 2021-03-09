const { Router } = require('express');
const CommentDao = require('../../mongooseLib/dao/commentDao');
const { convertObjectId } = require('../../mongooseLib/connect/db');

const router = new Router();
const comment = new CommentDao();

router.post('/comment_content', async (req, res) => {
    let page = +req.body.page; // 想要到达的页码
    let pageSize = +req.body.pageSize; // 单页文章数量

    let articleId = convertObjectId(req.body.id);

    try {
        const commentList = await comment.jumpPaging(
            page,
            pageSize,
            {
                CommentUserNickName: 1,
                CommentUserAvatar: 1,
                CommentUserIdentify: 1,
                CommentContent: 1,
                CommentTime: 1,
                CommentOnComments: 1,
                CommentUserId: 1,
            },
            {
                CommentArticleId: articleId,
            }
        );

        const total = await comment.findCount({
            CommentArticleId: articleId,
        });

        res.send({
            err: 0,
            commentList,
            total,
        });
    } catch (error) {
        console.log(error);
    }
});

module.exports = function () {
    return router;
};
