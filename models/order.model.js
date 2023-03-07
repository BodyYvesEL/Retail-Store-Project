const mongoose = brequire('mongoose');

const orderSchema = new mongoose.Schema({
    order: {  type: String },
    total: { type: String }
});

mongoose.model('Order', orderSchema);