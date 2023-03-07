/*

require('./models/db');

const express = require('express');
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

*/

const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const orderController = require('./controllers/orderController');
const mongoose = require('mongoose');
const db = require('./models/db');



const app = express();
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '/public')));
app.set('views', path.join(__dirname, 'views'));
app.engine('hbs', exphbs.create({
    extname: 'hbs',
    defaultLayout: 'mainLayout',
    layoutsDir: path.join(__dirname, 'views/layouts')
}).engine);

app.set('view engine', 'hbs');

mongoose.connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    //useFindAndModify: false,
    //useCreateIndex: true
})
.then(() => {
    console.log('MongoDB connected successfully');
    app.listen(3000, () => {
        console.log('Server on port: 3000');
    });
})
.catch((err) => {
    console.log(`Error connecting to MongoDB: ${err}`);
});
app.use('/', orderController);