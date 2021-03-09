// 权限路由列表

const adminJurisdictionRouter = [
    {
        routerId: 1,
        parentRouterId: 0,
        path: '/personal',
        name: 'Personal',
        title: '个人中心',
        meta: {
            title: '个人中心 - FOOLMAN',
        },
    },
    {
        routerId: 2,
        parentRouterId: 1,
        path: 'overview',
        name: 'Overview',
        title: '总览',
        icon: 'iconfont icon-yidongyunkongzhitaiicon01',
        meta: {
            title: '总览 - FOOLMAN',
        },
    },
    {
        routerId: 3,
        parentRouterId: 1,
        path: 'write_article',
        name: 'WriteArticle',
        title: '写文章',
        icon: 'iconfont icon-write',
        meta: {
            title: '写文章 - FOOLMAN',
        },
    },
    {
        routerId: 4,
        parentRouterId: 1,
        path: 'setting',
        name: 'Setting',
        title: '设置',
        icon: 'iconfont icon-shezhi',
        meta: {
            title: '设置 - FOOLMAN',
        },
    },

    {
        routerId: 5,
        parentRouterId: 2,
        path: 'user_manage',
        name: 'UserManage',
        title: '用户管理',
        icon: 'iconfont icon-guanli',
        meta: {
            title: '用户管理 - FOOLMAN',
        },
    },
    {
        routerId: 6,
        parentRouterId: 2,
        path: 'article_manage',
        name: 'ArticleManage',
        title: '文章管理',
        icon: 'iconfont icon-tubiaozhizuomoban-37',
        meta: {
            title: '文章管理 - FOOLMAN',
        },
    },
];

const userJurisdictionRouter = [
    {
        routerId: 1,
        parentRouterId: 0,
        path: '/personal',
        name: 'Personal',
        title: '个人中心',
        meta: {
            title: '个人中心 - FOOLMAN',
        },
    },
    {
        routerId: 4,
        parentRouterId: 1,
        path: 'setting',
        name: 'Setting',
        title: '设置',
        icon: 'iconfont icon-shezhi',
        meta: {
            title: '设置 - FOOLMAN',
        },
    },
];




module.exports = { adminJurisdictionRouter, userJurisdictionRouter };
