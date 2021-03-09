const { verifyToken } = require('../common/jwt');

/**
 * @description 鉴定token的中间件函数
 * @param {object} req 请求对象
 * @param {object} res 响应对象
 * @param {object} next 执行下一个中间件
 */
function checkToken(req, res, next) {
    const token = String(req.headers.authorization);
    if( !token ) {
        res.send({err: -900, message: '登录过期，请重新登录', type: 'warning' });
    } else {
        verifyToken(token)
        .then( data => {
            req.UserName = data.UserName;
            next();
        })
        .catch( () => {
            res.send({ err: -900, message: '登录过期，请重新登录', type: 'warning' });
        })
    }
}

module.exports = {
    checkToken
};

