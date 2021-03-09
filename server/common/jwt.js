const JWT = require( 'jsonwebtoken' );

// 密钥
const SECRET = 'fweyhrdujderujdeij';

/**
 * @description 创建一个token
 * @param {object} payload 想要传递的数据
 */
function createToken( payload ) {
    return JWT.sign(payload,SECRET, {
        expiresIn: 60 * 60 * 12 * 3
    });
}

/**
 * @description 验证token
 * @param {string} token token字符串
 */
function verifyToken( token ) {
    return new Promise( (resolve, reject) => {
        JWT.verify(token, SECRET, (err, decoded) => {
            if(err) {
                reject(err);
            } else {
                resolve(decoded);
            }
        });
    } )
}

module.exports = {
    createToken,
    verifyToken
};