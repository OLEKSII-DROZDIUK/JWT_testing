const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');


const getToken = (userFromDb, secret) => {
    let token = jwt.sign(userFromDb, secret, {expiresIn:"2m"});
    return token;
};

const checkToken = (token, secret) => {
    return jwt.verify(token, secret)?jwt.verify(token, secret):"jwt expired";
};

router.all("*", function (req, res, next) {

    try {
        if(req.body.token != undefined) {
            let userFromLocalStorage = checkToken(req.body.token, req.app.get('secret')); 
        };
    } catch (e) {
        throw e;
    };
    next();
});

module.exports = {
    router: router,
    getToken: getToken,
    checkToken: checkToken
};