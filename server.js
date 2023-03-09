 

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

/*

const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const orderController = require('./controllers/orderController');
const mongoose = require('mongoose');
const db = require('./models/db');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/user');

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

// Session setup
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
}));

// Passport setup
app.use(passport.initialize());
app.use(passport.session());

// Local Strategy
passport.use(new LocalStrategy({usernameField: 'email'}, (email, password, done) => {
    User.findOne({ email: email }, (err, user) => {
        if (err) { return done(err); }
        if (!user) {
            return done(null, false, { message: 'Incorrect email.' });
        }
        if (!user.validPassword(password)) {
            return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
    });
}));

// Session management
passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});

// Login route
app.get('/login', (req, res) => {
    res.render('login');
});

app.post('/login', passport.authenticate('local', { successRedirect: '/dashboard', failureRedirect: '/login' }));

// Logout route
app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

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

// Middleware for authentication
function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}

// Dashboard route (example of authenticated route)
app.get('/dashboard', ensureAuthenticated, (req, res) => {
    res.render('dashboard');
});

app.use('/', orderController);

*/

