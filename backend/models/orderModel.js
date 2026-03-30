const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    cartItems: Array,
    amount: String,
    status: String,
    paymentId: String,
    createdAt: Date
})

const orderModel = mongoose.model('Order', orderSchema)

module.exports = orderModel;