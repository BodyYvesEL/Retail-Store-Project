/*

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/retailOrders', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}).then(() => {
    console.log('MongoDB connected');
}).catch((err) => {
    console.log('Error connecting to MongoDB: '+ err);
});

require('./order.model');


//Another one

const mongoose = require('mongoose');

const url = 'mongodb://localhost:27017/retailOrders';

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('MongoDB connected successfully');
})
.catch((err) => {
    console.log(`Error connecting to MongoDB: ${err}`);
});

require('./order.model');

*/

const mongoose = require('mongoose');
const url = 'mongodb://127.0.0.1:27017/retailOrders';

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('MongoDB connected successfully');
})
.catch((err) => {
    console.log(`Error connecting to MongoDB: ${err}`);
});



module.exports = { url };
