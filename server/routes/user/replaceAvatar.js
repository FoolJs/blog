const fs = require('fs');
const { Router } = require('express');
const UserDao = require('../../mongooseLib/dao/userDao');
const formidable = require('formidable');
const { checkToken } = require('../checkToken');

const router = new Router();
const user = new UserDao();

router.post('/replace_avatar', checkToken, async (req, res) => {
    const UserName = req.UserName;

    try {
        // 获取avator文件夹内的文件列表
        let fileList = await new Promise((resolve, reject) => {
            fs.readdir(`./public/user/${UserName}/avatar`, (err, fileList) => {
                if (err) {
                    reject(err);
                }
                resolve(fileList);
            });
        });

        // 证明里面已经有图片了，删除里面的图片
        if (fileList.length !== 0) {
            await new Promise((resolve, reject) => {
                fs.unlink(
                    `./public/user/${UserName}/avatar/${fileList[0]}`,
                    (err) => {
                        if (err) {
                            reject(err);
                        }
                        resolve();
                    }
                );
            });
        }
        let form = new formidable.IncomingForm();
        form.uploadDir = `./public/user/${UserName}/avatar`; // 设置图片上传的地址
        form.keepExtensions = true; // 保留后缀

        form.parse(req, async (err, fields, files) => {
            if (err) {
                console.log(err);
                res.send({
                    err: -999,
                    type: 'error',
                    message: '系统错误，请稍候重试！',
                });
                return;
            }
            let path = files.file.path;
            let name = files.file.name;
            // 获取扩展名
            let extension = name.split('.')[1];

            // 重命名头像文件名
            await new Promise((resolve, reject) => {
                fs.rename(
                    path,
                    `./public/user/${UserName}/avatar/${UserName}.${extension}`,
                    (err) => {
                        if (err) {
                            reject(err);
                        }
                        resolve();
                    }
                );
            });

            // 修改数据库该用户的头像路径
            await user.updateOne(
                { UserName },
                {
                    $set: {
                        Avatar: `/user/${UserName}/avatar/${UserName}.${extension}`,
                    },
                }
            );

            res.send({
                err: 0,
                type: 'success',
                message: '修改成功！',
                Avatar: `/user/${UserName}/avatar/${UserName}.${extension}`,
            });
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

module.exports = function () {
    return router;
};
