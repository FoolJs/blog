const { Router } = require('express');
const UserDao = require('../../mongooseLib/dao/userDao');
const { checkToken } = require('../checkToken');

const router = new Router();
const user = new UserDao();

router.post('/remove_user', checkToken, async (req, res) => {
    const UserName = req.UserName;

    try {
        const { Identify } = await user.findOne({ UserName }, { Identify: 1 });

        if (Identify != 'Admin') {
            res.send({
                err: -999,
                type: 'error',
                message: '系统错误',
            });
        } else {
            await user.deleteOne({ UserName: req.body.UserName });
            res.send({
                err: 0,
                type: 'success',
                message: '删除成功！',
            });
        }
    } catch (error) {
        console.log(error);
        res.send({
            err: -999,
            type: 'error',
            message: '系统错误',
        });
    }
});


module.exports = function() {
    return router;
}