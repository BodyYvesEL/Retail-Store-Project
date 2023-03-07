require('./models/db');

const express = express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const bodyparser = require('body-parser');
const orderController = require('./controllers/orderController');

const app = express();
app.use(bodyparser.urlencoded({
    extended: true
}));

app.use(bodyparser.json());
app.use(express.static(path.join(_dirname, '/public')));
app.set('views', path.join(_dirname, 'views'));
app.engine('hbs', exphbs({
    extname: 'hbs',
    defaultLayout: 'mainLayout',
    layoutsDir: _dirname+ '/views/'
}));

app.set('view engine', 'hbs');
app.listen(300, () => {
    console.log('Server on port: 3000');
});

app.use('/', orderController);
