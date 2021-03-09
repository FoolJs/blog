const { Router } = require( 'express' );
const UserDao = require( '../../mongooseLib/dao/userDao' );
const { checkToken } = require( '../checkToken' );

const router = new Router();
const user = new UserDao();

router.post('/user_avatar', checkToken, async (req, res) => {
    const UserName = req.UserName;
    try {
        const src = await user.findOne(
            {UserName},
            {Avatar: 1}
        );
        res.send({
            err: 0,
            src: src.Avatar
        });
    } catch (error) {
        console.log(error);
        res.send({
            err: -999,
            src: ''
        });
    }
});


module.exports = function() {
    return router;
}