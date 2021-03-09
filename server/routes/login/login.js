const { Router } = require('express');
const UserDao = require('../../mongooseLib/dao/userDao');
const encryption = require('../../common/encryption'); // 加密密码的脚本
const { createToken } = require('../../common/jwt'); // 创建token的脚本

const router = new Router();
const user = new UserDao();

router.post('/user_login', async (req, res) => {
    const loginInfo = req.body;
    // 将加密后的密码赋给原来的值
    loginInfo.PassWord = encryption(loginInfo.PassWord, loginInfo.UserName);

    try {
        // 检查用户名密码是否匹配，返回对应的用户的Identify字段
        const Identify = await user.findOne(loginInfo, { Identify: 1 });

        if (!Identify) {
            res.send({
                err: -250,
                type: 'warning',
                message: '用户名或密码错误，请检查您的用户名或密码！',
            });
        } else {
            // 使用用户的用户名创建一个token
            const token = createToken({ UserName: loginInfo.UserName });
            res.send({
                err: 0,
                type: 'success',
                message: '登录成功！',
                token,
            });
        }
    } catch (error) {
        console.log(error);
        res.send({
            err: -999,
            type: 'error',
            message: '登录错误，请稍候重试！',
        });
    }
});

module.exports = function () {
    return router;
};
