const { Router } = require('express');
const UserDao = require('../mongooseLib/dao/userDao');
const {
    adminJurisdictionRouter,
    userJurisdictionRouter,
} = require('../common/jurisdictionRouter');
const { checkToken } = require( './checkToken' );

const router = new Router();
const user = new UserDao();


router.post('/jurisdiction', checkToken, async (req, res) => {
    const UserName = req.UserName;

    try {
        const { Identify } = await user.findOne(
            {
                UserName
            },
            {
                Identify: 1
            }
        );
        res.send({
            err: 0,
            jurisdiction: Identify === 'Admin' ? adminJurisdictionRouter : userJurisdictionRouter
        });
    } catch (error) {
        console.log(error);
        res.send({
            err: -999
        });
    }
});


module.exports = function() {
    return router;
}