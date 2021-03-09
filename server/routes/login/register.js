const { Router } = require('express');
const sendEmail = require('../../common/sendEmail'); // 发邮件的脚本
const encryption = require('../../common/encryption'); // 加密密码的脚本
const userDao = require('../../mongooseLib/dao/userDao');
const fs = require('fs');

const verifyCodeRouter = new Router(); // 验证码路由
const registerRouter = new Router(); // 注册路由
const user = new userDao();

const emialAndCode = new Map(); // 用于存储用户邮箱和验证码

verifyCodeRouter.post('/verify_code', async (req, res) => {
    const Email = req.body.Email; // 获取传来的Email

    try {
        // 查找电子邮箱是否已经注册
        const registerEmail = await user.findOne({ Email });
        if (registerEmail) {
            res.send({
                type: 'warning',
                message: '您的邮箱已经注册过了，一个邮箱只能注册一个账号哦',
                err: -250,
            });
        } else {
            const code = ranBit(4); // 随机出一个四位数
            const content = `<p>您的验证码是：<strong>${code}</strong>如非本人操作请忽略。</p>`; // 想要发送的内容
            await sendEmail(Email, content); // 发送
            emialAndCode.set(Email, code); // 存到map中

            // 60s后清除map中的该条数据
            const timerId = setTimeout(() => {
                emialAndCode.delete(Email);
                clearTimeout(timerId);
            }, 60000);

            res.send({
                type: 'success',
                message: '发送成功，请注意您的邮箱',
                err: 0,
            });
        }
    } catch (error) {
        console.log(error);
        res.send({
            type: 'error',
            message: '发送验证码失败，请稍候重试！',
            err: '-999',
        });
    }
});

registerRouter.post('/user_register', async (req, res) => {
    const registerInfo = req.body; // 获取请求数据

    try {
        // 检查用户名或邮箱是否已经存在
        // 检查验证码是否正确
        if (await user.findOne({ UserName: registerInfo.UserName })) {
            res.send({
                type: 'warning',
                message: '用户名已存在，请换一个吧！',
                err: -250,
            });
        } else if (await user.findOne({ Email: registerInfo.Email })) {
            res.send({
                type: 'warning',
                message: '您的邮箱已经注册过了，一个邮箱只能注册一个账号哦',
                err: -250,
            });
        } else if (registerInfo.Code != emialAndCode.get(registerInfo.Email)) {
            res.send({
                type: 'error',
                message: '验证码错误，请核对您的验证码！',
                err: -250,
            });
        } else {
            // 对密码进行加密
            registerInfo.PassWord = encryption(
                registerInfo.PassWord,
                registerInfo.UserName
            );
            await user.insertMany(registerInfo); // 将用户信息插入数据库
            const num = await user.findCount({}); // 获取用户数据库内的用户数量
            emialAndCode.delete(registerInfo.Email); // 删除map中保存的验证码

            await new Promise((resolve, reject) => {
                fs.mkdir(`./public/user/${registerInfo.UserName}`, {recursive: true} ,(err) => {
                    if (err) {
                        reject(err);
                    }
                    resolve();
                });
            });
            await new Promise((resolve, reject) => {
                fs.mkdir(`./public/user/${registerInfo.UserName}/avatar`, {recursive: true} ,(err) => {
                    if (err) {
                        reject(err);
                    }
                    resolve();
                });
            });

            res.send({
                err: 0,
                type: 'success',
                message: `注册成功，您是本博客系统的第${num}位用户！`,
            });
        }
    } catch (error) {
        console.log(error);
        res.send({
            err: -999,
            type: 'error',
            message: '注册失败，请稍候重试！',
        });
    }
});

// 随机四位数函数
function ranBit(ii) {
    let str = '';
    for (let i = 0; i < ii; i++) {
        str += Math.floor(Math.random() * (9 + 1));
    }
    return str;
}

module.exports = {
    verifyCodeRouter() {
        return verifyCodeRouter;
    },
    registerRouter() {
        return registerRouter;
    },
};
