/*

// REQUIRED

const express = require('express');
const mongoose = require('mongoose');
const Order = mongoose.model('Order');

const router = express.Router();


mongoose.set('findOneAndUpdate', false);

// -----> ROUTER <-----

router.get('/', (req, res) => {
    res.render('menu');
});

router.get('/cart', (req, res) => {
    res.render('cart');
});

router.get('/orders', (req, res) => {
    res.render('orders');
});

router.get('/admin', (req, res) => {
    Order.find((err, docs) => {
        if (!err) {
            res.render("admin", {
                order:docs
            });
        } else {
            console.log('Error in order: '+ err);
        }
    });
});

router.get('/order/:id', (req, res) => {
    Order.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("orders", {order:doc});
        } else {
            console.log('Error findById: '+ err);
        }
    });
});

router.get('/order/delete/:id', (req, res) => {
    Order.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/admin');
        } else {
            console.log('Error in delete: '+ err);
        }
    });
});

// -----> POST <-----

router.post('/cart', (req, res) => {
    insertOrder(req, res);
});

router.post('/order', (req, res) => {
    updateOrder(req, res);
});

// -----> Functions <-----

function updateOrder (req, res) {
    Order.findOneAndUpdate({_id:req.body._id}, req.body, {new:true}, (err, doc) => {
        if (!err) {
            res.redirect('/admin');
        } else {
            console.log('Update error '+err)
        }
    });
}

function insertOrder(req, res) {
    const d= new Date();
    const t=d.getTime();
    const counter = t;
    counter+=1;
    const order = new Order();
    order.total = req.body.total;
    order.order = counter;
    order.save((err, doc) => {
        if (!err) {
            console.log('order: '+order);
            res.redirect('/admin');
        } else {
            console.log('Error inserOrder: '+err);
        }
    })
}

module.exports = router;




// -----> USING ASYNC AND AWAIT

const express = require('express');
const mongoose = require('mongoose');
const Order = mongoose.model('Order');


const router = express.Router();
mongoose.set('useFindAndModify', false);

router.get('/', (req, res) => {
  res.render('menu');
});

router.get('/cart', (req, res) => {
  res.render('cart');
});

router.get('/orders', (req, res) => {
  res.render('orders');
});

router.get('/admin', async (req, res) => {
  try {
    const orders = await Order.find();
    res.render('admin', { orders });
  } catch (err) {
    console.log('Error in order:', err);
    res.status(500).send('Server Error');
  }
});

router.get('/order/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    res.render('orders', { order });
  } catch (err) {
    console.log('Error findById:', err);
    res.status(500).send('Server Error');
  }
});

router.get('/order/delete/:id', async (req, res) => {
  try {
    await Order.findByIdAndRemove(req.params.id);
    res.redirect('/admin');
  } catch (err) {
    console.log('Error in delete:', err);
    res.status(500).send('Server Error');
  }
});

router.post('/cart', async (req, res) => {
  try {
    const order = new Order({
      total: req.body.total,
      order: new Date().getTime(),
    });
    await order.save();
    res.redirect('/admin');
  } catch (err) {
    console.log('Error insertOrder:', err);
    res.status(500).send('Server Error');
  }
});

router.post('/order', async (req, res) => {
  try {
    const order = await Order.findOneAndUpdate(
      { _id: req.body._id },
      req.body,
      { new: true }
    );
    res.redirect('/admin');
  } catch (err) {
    console.log('Error updateOrder:', err);
    res.status(500).send('Server Error');
  }
});

module.exports = router;

*/

// ----> Another upgrade

const express = require('express');
const mongoose = require('mongoose');
//const Order = mongoose.model('Order');
const Order = require('../models/order.model');

const router = express.Router();

router.get('/', (req, res) => {
  res.render('menu');
});

router.get('/cart', (req, res) => {
  res.render('cart');
});

router.get('/orders', (req, res) => {
  res.render('orders');
});

router.get('/admin', async (req, res) => {
  try {
    const orders = await Order.find();
    res.render('admin', { orders });
  } catch (err) {
    console.log('Error in order:', err);
    res.status(500).send('Server Error');
  }
});

router.get('/order/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    res.render('orders', { order });
  } catch (err) {
    console.log('Error findById:', err);
    res.status(500).send('Server Error');
  }
});

router.get('/order/delete/:id', async (req, res) => {
  try {
    await Order.findOneAndRemove({ _id: req.params.id });
    res.redirect('/admin');
  } catch (err) {
    console.log('Error in delete:', err);
    res.status(500).send('Server Error');
  }
});

router.post('/cart', async (req, res) => {
  try {
    const order = new Order({
      total: req.body.total,
      order: new Date().getTime(),
    });
    await order.save();
    res.redirect('/admin');
  } catch (err) {
    console.log('Error insertOrder:', err);
    res.status(500).send('Server Error');
  }
});

router.post('/order', async (req, res) => {
  try {
    const order = await Order.findOneAndUpdate(
      { _id: req.body._id },
      req.body,
      { new: true }
    );
    res.redirect('/admin');
  } catch (err) {
    console.log('Error updateOrder:', err);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
