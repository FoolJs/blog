const { Router } = require('express');
const { checkToken } = require('../checkToken'); // 验证token
const { convertObjectId } = require('../../mongooseLib/connect/db'); // 将字符串转化为ObjectId
const CommentDao = require('../../mongooseLib/dao/commentDao'); // 评论表
const UserDao = require('../../mongooseLib/dao/userDao'); // 用户表
const ArticleDao = require('../../mongooseLib/dao/articleDao'); // 文章表

const router = new Router();
const comment = new CommentDao();
const user = new UserDao();
const article = new ArticleDao();

router.post('/publish_comment', checkToken, async (req, res) => {
    let articleId = convertObjectId(req.body.id); // 文章的_id

    let value = req.body.value; // 评论的内容
    let UserName = req.UserName; // 用户的用户名

    try {
        // 获取评论用户的信息
        const userMessage = await user.findOne(
            { UserName },
            {
                NickName: 1,
                Avatar: 1,
                Identify: 1,
            }
        );

        // 将各种信息插入评论表
        await comment.insertMany({
            CommentArticleId: articleId,
            CommentUserId: userMessage._id,
            CommentUserAvatar: userMessage.Avatar,
            CommentUserNickName: userMessage.NickName,
            CommentUserIdentify: userMessage.Identify,
            CommentContent: value,
            CommentTime: new Date(),
        });

        await article.updateOne(
            {
                _id: articleId,
            },
            {
                $inc: { CommentCount: 1 },
            }
        );

        res.send({
            err: 0,
            type: 'success',
            message: '发表成功！',
        });
    } catch (error) {
        res.send({
            err: -999,
            type: 'error',
            message: '系统错误，请稍候重试!',
        });
    }
});

module.exports = function () {
    return router;
};
