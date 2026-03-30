const express = require('express');
const { createOrder, updateOrderStatus } = require('../controllers/orderController');
const router = express.Router();

router.route('/order').post(createOrder);
router.route('/order/:id').put(updateOrderStatus);

module.exports = router;