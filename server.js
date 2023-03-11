 
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



/*

/ JavaScript code that sets up the server to listen for incoming requests on a port 3000

// This line imports the app module from a file called app.js in the current directory. The app module contains the code for defining and configuring the server.
const app = require("./app");

// sets the PORT variable to either the value of the PORT environment variable (.env) or 3000 if the environment variable is not set.
// The process.env.PORT expression accesses the PORT environment variable that may be set by the hosting environment. 
// If the environment variable is not set, the expression returns undefined, so the || operator is used to default to 3000.
const PORT = process.env.PORT || 3000;
​
// This line calls the listen() method on the app object, which starts the server listening for incoming requests on the specified port. 
// The first argument to listen() is the port number to listen on, which is the PORT variable we defined earlier.
// The second argument is a callback function that will be executed when the server starts listening.
app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`);
});
*/