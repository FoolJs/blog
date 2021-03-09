const { Router } = require('express');
const formidable = require('formidable'); // 引入formidable模块处理上传的图片
const { checkToken } = require('../checkToken');
const UserDao = require('../../mongooseLib/dao/userDao');
const ArticleDao = require('../../mongooseLib/dao/articleDao');
const ArticleTypeDao = require('../../mongooseLib/dao/articleTypeDao');
const sendEmail = require('../../common/sendEmail');
const fs = require('fs');

const router = new Router();
const user = new UserDao();
const article = new ArticleDao();
const articleType = new ArticleTypeDao();

router.post('/write_article', checkToken, async (req, res) => {
    const UserName = req.UserName;

    try {
        let { Identify } = await user.findOne({ UserName }, { Identify: 1 });

        // 检查身份
        if (Identify != 'Admin') {
            res.send({
                err: -999,
                type: 'error',
                message: '服务器错误',
            });
        } else {
            const form = formidable({
                uploadDir: './public/article',
                keepExtensions: true,
            });

            form.parse(req, async (err, fields, files) => {
                if (err) {
                    console.log(err);
                    res.send({
                        err: -999,
                        type: 'error',
                        message: '服务器错误',
                    });
                    return;
                }

                // 以文章名创建一个目录并在里面创建一个cover目录和一个images目录
                await new Promise((resolve, reject) => {
                    fs.mkdir(
                        `./public/article/${fields.Title}`,
                        { recursive: true },
                        (err) => {
                            if (err) {
                                reject(err);
                            }
                            resolve();
                        }
                    );
                });
                // cover目录用于存封面
                await new Promise((resolve, reject) => {
                    fs.mkdir(
                        `./public/article/${fields.Title}/cover`,
                        { recursive: true },
                        (err) => {
                            if (err) {
                                reject(err);
                            }
                            resolve();
                        }
                    );
                });
                // images用于存可能存在的文章所需要的图片
                await new Promise((resolve, reject) => {
                    fs.mkdir(
                        `./public/article/${fields.Title}/images`,
                        {
                            recursive: true,
                        },
                        (err) => {
                            if (err) {
                                reject(err);
                            }
                            resolve();
                        }
                    );
                });

                // 将所有图片都先存储到images文件夹并将他们的名字改回原来的名字
                for (let file in files) {
                    await new Promise((resolve, reject) => {
                        fs.rename(
                            files[file].path,
                            `./public/article/${fields.Title}/images/${files[file].name}`,
                            (err) => {
                                if (err) {
                                    reject(err);
                                }
                                resolve();
                            }
                        );
                    });
                }

                let name = files.cover.name; // 封面的名字
                let coverExtension = name.split('.')[1]; // 获取封面图片的扩展名

                // 将封面图片重命名并移动
                await new Promise((resolve, reject) => {
                    fs.rename(
                        `./public/article/${fields.Title}/images/${name}`,
                        `./public/article/${fields.Title}/cover/cover_${fields.Title}.${coverExtension}`,
                        (err) => {
                            if (err) {
                                reject(err);
                            }
                            resolve();
                        }
                    );
                });

                const { Title, Type, Introduction, Content } = fields;
                const Cover = `/article/${fields.Title}/cover/cover_${fields.Title}.${coverExtension}`;

                // 将文章插入数据库
                await article.insertMany({
                    Title,
                    Type,
                    Introduction,
                    Content,
                    Cover,
                });

                // 获取该文章的_id
                const articleId = await article.findOne({ Title }, { _id: 1 });

                // 更新文章分类表
                if (await articleType.findOne({ Type })) {
                    await articleType.updateOne(
                        { Type },
                        {
                            $push: { Article: [articleId._id] },
                        }
                    );
                } else {
                    // 否则插入
                    await articleType.insertMany({
                        Type,
                        Article: [articleId._id],
                    });
                }

                res.send({
                    err: 0,
                    type: 'success',
                    message: '文章发布成功！',
                });

                // 想要接收新文章提醒的用户的Email
                const emailList = await user.find(
                    {
                        Identify: 'User',
                        ArticleSub: true,
                    },
                    {
                        Email: 1,
                    }
                );

                for (let i = 0; i < emailList.length; i++) {
                    let content = `<p>
                    博主的文章有更新，点击 <strong><a href="http://www.foolman.top/article/${Title}">${Title}</a></string> 去看一看吧
                    </p>`;
                    await sendEmail(emailList[i].Email, content);
                }
            });
        }
    } catch (error) {
        console.log(error);
        res.send({
            err: -999,
            type: 'error',
            message: '服务器错误',
        });
    }
});

module.exports = function () {
    return router;
};
