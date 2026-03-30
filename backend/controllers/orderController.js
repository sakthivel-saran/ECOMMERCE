const orderModel = require('../models/orderModel');
const crypto = require('crypto');
//
exports.createOrder = async (req, res, next) => {
    const cartItems = req.body;
    const amount = Number(cartItems.reduce((acc, item) => (acc + item.product.price * item.qty), 0)).toFixed(2);
    const status = 'pending';
    const paymentId = crypto.randomBytes(16).toString('hex');
    const order = await orderModel.create({cartItems, amount, status, paymentId})


    res.json(
        {
            success:true,
            order
        }
    )
}

exports.updateOrderStatus = async (req, res, next) => {
    try {
        const order = await orderModel.findByIdAndUpdate(
            req.params.id,
            { status: req.body.status || 'completed' },
            { new: true, runValidators: true }
        );

        if (!order) {
            return res.status(404).json({ success: false, message: 'Order not found' });
        }

        res.status(200).json({
            success: true,
            order
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}