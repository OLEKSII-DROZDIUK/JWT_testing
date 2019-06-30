const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
    res.render('pages/index');
});

router.post('/secret', function(req, res) {
    res.end();
});

router.get('/secret', function(req, res) {
    res.render('pages/secret');
});

module.exports = router;
