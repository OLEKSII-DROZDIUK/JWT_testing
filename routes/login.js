const express = require('express');
const router = express.Router();
const db = require('../db/');
const user_data = require('./user_data');

//get users list
router.get('/', (req, res) => {
    res.render('pages/login');
});

router.post("/users", async (req, res) => { //login and create token

    let findUser = await db.getUser(req.body.username, req.body.password); //find this user in mongoDb
        if(findUser != null) {
            delete findUser._id;

            res.send({your_token: user_data.getToken(findUser, req.app.get('secret'))});
            
            
        } else {
            res.redirect('/login'); //incorrect password or login
    };
});

module.exports = {
    router: router
};