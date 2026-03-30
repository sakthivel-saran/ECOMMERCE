import { Fragment, useState, useEffect } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from 'react-redux';
import { clearCart } from '../slices/cartSlice';

export default function Payment() {
    const {cartItems} = useSelector((state) => state.cartState);
    const dispatch = useDispatch();
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const amount = cartItems.reduce((acc, item) => (acc + item.product.price * item.qty), 0);

    const submitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        if(!stripe || !elements) return;

        try {
            // First, place the order to get a 'pending' order in DB
            const orderRes = await fetch(process.env.REACT_APP_API_URL + '/order', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(cartItems)
            });
            const orderData = await orderRes.json();
            
            if (!orderRes.ok || !orderData.success) {
                toast.error(orderData.message || 'Order creation failed');
                setLoading(false);
                return;
            }

            const orderId = orderData.order._id;
            const paymentId = orderData.order.paymentId;
            
            // Next, create the payment intent on the backend with the amount and orderId
            const res = await fetch(process.env.REACT_APP_API_URL + '/payment/process', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ amount: amount, orderId: orderId, paymentId: paymentId })
            });
            const data = await res.json();
            
            if(!res.ok || !data.success) {
                toast.error(data.message || 'Payment intent creation failed');
                setLoading(false);
                return;
            }
            
            const clientSecret = data.client_secret;
            
            // Confirm card payment
            const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement),
                    billing_details: {
                        name: "Test User",
                    }
                }
            });

            if (result.error) {
                toast.error(result.error.message);
                setLoading(false);
            } else {
                if(result.paymentIntent.status === 'succeeded') {
                    // Update the order status to 'completed'
                    const updateRes = await fetch(process.env.REACT_APP_API_URL + '/order/' + orderId, {
                       method: 'PUT',
                       headers: { 'Content-Type': 'application/json' },
                       body: JSON.stringify({ status: 'completed' })
                    });
                    
                    if (!updateRes.ok) {
                        toast.error('Payment succeeded but order status update failed.');
                    } else {
                        toast.success("Payment Successful!");
                    }
                    
                    dispatch(clearCart());
                    navigate('/cart');
                }
            }

        } catch (error) {
            toast.error(error.message);
            setLoading(false);
        }
    };

    return (
        <Fragment>
            <div className="container container-fluid">
                <div className="row wrapper">
                    <div className="col-10 col-lg-5">
                        <form className="shadow-lg" onSubmit={submitHandler}>
                            <h1 className="mb-4">Card Info</h1>
                            <div className="form-group p-3 mb-3 border rounded">
                                <label htmlFor="card_field">Card Details</label>
                                <CardElement type="text" id="card_field" className="form-control" />
                            </div>
                            <button
                                id="pay_btn"
                                type="submit"
                                className="btn btn-primary btn-block py-3 mt-4"
                                disabled={loading || !stripe}
                            >
                                Pay - ${amount.toFixed(2)}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}
