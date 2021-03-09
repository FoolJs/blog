const { Router } = require( 'express' );
const UserDao = require( '../../mongooseLib/dao/userDao');
const { checkToken  } = require( '../checkToken' );

const router = new Router();
const user = new UserDao();

router.post('/sub_user_settings', checkToken, async(req, res) => {
    const UserName = req.UserName;
    const ArticleSub = JSON.parse(req.body.ArticleSub); //转化为布尔值
    try {
        await user.updateOne(
            { UserName },
            {
                $set: { ArticleSub: ArticleSub },
            }
        );

        res.send({
            err: 0,
            type: 'success',
            message: '修改成功！'
        });
    } catch (error) {
        console.log(error);
                res.send({
                    err: -999,
                    type: 'error',
                    message: '系统错误，请稍候重试！',
                });
    }
});


module.exports = function() {
    return router;
}