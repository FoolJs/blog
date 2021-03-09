const { Router } = require( 'express' );
const UserDao = require( '../../mongooseLib/dao/userDao' );
const { checkToken  } = require( '../checkToken' );

const router = new Router();
const user = new UserDao();

router.post('/user_settings', checkToken, async (req, res) => {
    let UserName = req.UserName;

    try {
        const { ArticleSub } = await user.findOne({ UserName }, { ArticleSub: 1 });
        res.send({
            err: 0,
            ArticleSub
        });
    } catch (error) {
        res.send({
            err: -999,
            type: 'error',
            message: '系统错误，请稍候重试！'
        });
    }
});



module.exports = function() {
    return router;
}