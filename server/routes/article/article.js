const { Router } = require( 'express' );
const ArticleDao = require( '../../mongooseLib/dao/articleDao' );

const router = new Router();
const article = new ArticleDao();

router.post( '/article', async ( req, res ) => {
    const Title = req.body.Title;

    try {
        // 获取对应文章
        const articleContent = await article.findOne(
            { Title },
            {
                Title: 1,
                Content: 1,
                CreateTime: 1,
                UpdateTime: 1,
                Type: 1,
                Introduction: 1,
                Count: 1,
                Cover: 1,
                CommentCount: 1,
            }
        );
        if( !articleContent ) {
            res.send({
                err: -250,
                message: '出现错误，请稍后重试！'
            });
        } else {
            // 文章浏览次数加一
            await article.updateOne(
                { Title },
                {
                    $inc: { Count: 1 },
                }
            );
            res.send({
                err: 0,
                article: articleContent
            });
        }
    } catch (error) {
        console.log(error);
        res.send({
            err: -999,
            message: '服务器错误，请稍候重试!'
        });
    }
});

module.exports = function() {
    return router;
}