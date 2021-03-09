/**
 * @description 将后端传来的数组格式化成一个树形结构
 * @param {Array} data 后端传来的routers数组
 */
function formatRouterTree(data) {
    let parents = data.filter((p) => p.parentRouterId === 0),
        children = data.filter((c) => c.parentRouterId !== 0);

    dataToTree(parents, children);

    function dataToTree(parents, children) {
        parents.map((p) => {
            children.map((c, i) => {
                if (c.parentRouterId === p.routerId) {
                    let _c = JSON.parse(JSON.stringify(children));
                    _c.splice(i, 1);
                    dataToTree([c], _c);

                    if (p.children) {
                        p.children.push(c);
                    } else {
                        p.children = [c];
                    }
                }
            });
        });
    }

    return parents;
}

/**
 * @description 返回一个routers
 * @param {Array} routerTree 树形结构router
 */
function generateRouter(routerTree) {
    let newRouter = routerTree.map((r) => {
        let routes = {
            path: r.path,
            name: r.name,
            meta: r.meta,
            component: () => import(`@/views/${r.name}`),
        };

        if (r.children) {
            routes.children = generateRouter(r.children);
        }
        return routes;
    });

    return newRouter;
}

/**
 * @description 返回导航列表
 */
function generateNav(routerTree) {
    let newRouter = routerTree.map((r) => {
        let routes = {
            path: r.path,
            title: r.title,
            icon: r.icon
        };

        if (r.children) {
            routes.children = generateNav(r.children);
        }
        return routes;
    });

    return newRouter;
}








export { formatRouterTree, generateRouter, generateNav };
