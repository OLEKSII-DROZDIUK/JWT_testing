const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db/');

const app = express();

const routes = require('./routes/index');
const user_data = require('./routes/user_data');
const users = require('./routes/login');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/public', express.static(__dirname + '/public'));
app.set('view engine', 'ejs');
//jwt secret
app.set("secret", "p33oo&&pps dsllkj_kmpodqqqa");

app.use('/', user_data.router);
app.use('/', routes);
app.use('/login', users.router);




let port = process.env.PORT;
if (port === undefined) {
    port = 5000;
}
app.listen(port, () => console.log(`${port} is the magic port`));