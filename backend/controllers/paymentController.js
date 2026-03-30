let stripe;

const getStripe = () => {
    if (!stripe) {
        if (!process.env.STRIPE_SECRET_KEY) {
            throw new Error('STRIPE_SECRET_KEY is not set');
        }
        stripe = require('stripe')(process.env.STRIPE_SECRET_KEY.trim());
    }
    return stripe;
};

exports.processPayment = async (req, res, next) => {
    try {
        const stripeInstance = getStripe();

        const paymentIntent = await stripeInstance.paymentIntents.create({
            amount: req.body.amount,
            currency: 'usd',
            description: 'Shopping MERN Order Payment',
            metadata: { integration_check: 'accept_a_payment', order_id: req.body.orderId, payment_id: req.body.paymentId }
        });

        res.status(200).json({
            success: true,
            client_secret: paymentIntent.client_secret
        });
    } catch (error) {
        console.error('Stripe payment error:', error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

exports.sendStripeApi = async (req, res, next) => {
    if (!process.env.STRIPE_PUBLISHABLE_KEY) {
        return res.status(500).json({
            success: false,
            message: 'Stripe publishable key not configured'
        });
    }

    res.status(200).json({
        stripeApiKey: process.env.STRIPE_PUBLISHABLE_KEY.trim()
    });
};
