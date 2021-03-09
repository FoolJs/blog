import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import tokenStore from '../store/tokenStore';
import store from '../store/index';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        meta: {
            title: 'FOOLMAN',
        },
    },
    {
        path: '/article/:title',
        name: 'ArticleContent',
        component: () => import('../components/article/ArticleContent.vue'),
        props: true,
    },
    {
        path: '/categories',
        name: 'Categories',
        component: () => import('../views/Categories.vue'),
        meta: {
            title: '分类 - FOOLMAN',
        },
    },
    {
        path: '/categories/:type',
        name: 'CategoriesType',
        component: () => import('../components/categories/CategoriesType.vue'),
        props: true,
    },
    {
        path: '/archives',
        name: 'Archives',
        component: () => import('../views/Archives.vue'),
        meta: {
            title: '归档 - FOOLMAN',
        },
    },
    {
        path: '/message',
        name: 'Message',
        component: () => import('../views/Message.vue'),
        meta: {
            title: '留言 - FOOLMAN',
        },
    },
    {
        path: '/about',
        name: 'About',
        component: () => import('../views/About.vue'),
        meta: {
            title: '关于我 - FOOLMAN',
        },
    },
    {
        path: '*',
        name: 'NotFount',
        component: () => import('../views/NotFount.vue'),
        meta: {
            title: '找不到页面 - FOOLMAN',
        },
    },
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
    // 路由变化的滚动行为
    scrollBehavior(to, from, savedPosition) {
        // 通过浏览器前进后退按钮时路由的滚动行为
        if (savedPosition) {
            return savedPosition;
        } else {
            return {x: 0, y: 0}
        }
    },
});

router.beforeEach(async (to, from, next) => {
    // 动态改变title
    if (to.meta.title) {
        document.title = to.meta.title;
    }

    // 使页面刷新token不消失
    if (!tokenStore.state.token) {
        tokenStore.state.token = localStorage.getItem('token');
    }

    // 根据token和jurisdictionRouter来判断和获取权限路由
    if (tokenStore.state.token) {
        let jurisdictionRouter = tokenStore.state.jurisdictionRouter;

        // 如果Vuex的jurisdictionRouter为空，怎么还没有获得权限路由或者页面刷新了
        if (jurisdictionRouter.length == 0) {
            await store.dispatch('getJurisdiction'); // 获取权限路由
            router.addRoutes(tokenStore.state.jurisdictionRouter); // 添加路由到路由表
            next(to.path);
        } else {
            next();
        }
    } else {
        next();
    }
});

export default router;
