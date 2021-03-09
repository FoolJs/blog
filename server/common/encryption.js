const crypto = require('crypto');

/**
 * @description 加密函数，使用sha256对密码进行加密
 * @param {string} pwd 需要加密的密码
 * @param {String} name 用户名
 */

module.exports = function (pwd, name) {
    let str = name.slice(5);
    return crypto
        .createHash('sha256')
        .update(str + pwd)
        .digest('hex');
};
