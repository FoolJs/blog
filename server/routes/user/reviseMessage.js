const { Router } = require( 'express' );
const UserDao = require( '../../mongooseLib/dao/userDao' );
const { checkToken } = require( '../checkToken' );

const router = new Router();
const user = new UserDao();

router.post('/revise_message', checkToken, async (req, res) => {
    const UserName = req.UserName;
    const { NickName, Autograph, Gender } = req.body;

    try {
        await user.updateOne(
            {UserName},
            {
                $set: {NickName, Autograph, Gender}
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
            message: '系统错误，请稍候重试！'
        });
    }
});

module.exports = function() {
    return router;
}