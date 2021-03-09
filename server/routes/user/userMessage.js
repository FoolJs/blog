const { Router } = require('express'),
    UserDao = require('../../mongooseLib/dao/userDao'),
    { checkToken } = require( '../checkToken' ),
    router = new Router(),
    user = new UserDao;


    router.post( '/user_message', checkToken, async ( req, res ) => {
        let { UserName } = req;

        try {
            
            const userMessage = await user.findOne(
                {
                    UserName,
                },
                {
                    UserName: 1,
                    NickName: 1,
                    Avatar: 1,
                    Autograph: 1,
                    Gender: 1
                }
            );

            res.send({
                err: 0,
                userMessage
            });

        } catch (error) {
            res.send({
                err: -400,
            });
        }
    });



    module.exports = function() {
        return router;
    }