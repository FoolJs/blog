const { Router } = require( 'express' );
const ArticleTypeDao = require( '../../mongooseLib/dao/articleTypeDao' );

const router = new Router();
const articleType = new ArticleTypeDao();

router.post('/article_categories', async ( req, res ) => {
    try {
        const articleTypeList = await articleType.find({});
        if( articleTypeList ) {
            res.send({
                err: 0,
                articleTypeList,
            });
        }
    } catch (error) {
        console.log(error);
        res.send({
            err: -999,
        });
    }
});

module.exports = function() {
    return router;
}