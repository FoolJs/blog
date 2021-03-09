const { Router } = require('express');
const CommentDao = require('../../mongooseLib/dao/commentDao');
const { checkToken } = require('../checkToken'); // 验证token
const { convertObjectId } = require('../../mongooseLib/connect/db'); // 将字符串转化为ObjectId
const UserDao = require('../../mongooseLib/dao/userDao'); // 用户表
const ArticleDao = require('../../mongooseLib/dao/articleDao'); // 文章表

const router = new Router();
const comment = new CommentDao();
const user = new UserDao();
const article = new ArticleDao();

router.post('/reply_comment', checkToken, async (req, res) => {
    let UserName = req.UserName; // 回复者的用户名
    let value = req.body.value; // 回复的内容
    let commentUserId = convertObjectId(req.body.commentUserId); // 被回复者的_id
    let commentId = convertObjectId(req.body.commentId); // 被回复的评论的_id
    let articleId = convertObjectId(req.body.id); // 文章的_id

    try {
        // 回复者的信息
        const userMessage = await user.findOne(
            { UserName },
            {
                NickName: 1,
                Avatar: 1,
                Identify: 1,
            }
        );

        // 被回复者的信息
        const commentUserMessage = await user.findOne(
            {
                _id: commentUserId,
            },
            {
                NickName: 1,
            }
        );

        // 更新评论
        await comment.updateOne(
            { _id: commentId },
            {
                $push: {
                    CommentOnComments: [
                        {
                            CommentTime: new Date(),
                            CommentUserId: userMessage._id,
                            CommentUserAvatar: userMessage.Avatar,
                            CommentUserNickName: userMessage.NickName,
                            CommentContent: `<span class="reply-is">@${commentUserMessage.NickName}</span> ${value}`,
                            CommentTarget: commentUserId,
                            CommentUserIdentify: userMessage.Identify,
                        },
                    ],
                },
            }
        );

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
            message: '回复成功！',
            type: 'success',
        });
    } catch (error) {
        console.log(error);
        res.send({
            err: -999,
            message: '系统错误，请稍候重试！',
            type: 'error',
        });
    }
});

module.exports = function () {
    return router;
};
