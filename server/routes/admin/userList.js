const { Router } = require('express');
const UserDao = require('../../mongooseLib/dao/userDao');
const { checkToken } = require('../checkToken');

const router = new Router();
const user = new UserDao();

router.post('/page_user', checkToken, async (req, res) => {
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
            const { page, pageSize } = req.body;
            
            const list = await user.jumpPaging(+page, +pageSize);
            const total = await user.findCount({});

            res.send({
                err: 0,
                list,
                total
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