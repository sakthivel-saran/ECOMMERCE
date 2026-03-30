import { Fragment, useState } from "react";
import {Link, useNavigate} from 'react-router-dom';
import { toast } from "react-toastify";
import {loadStripe} from '@stripe/stripe-js';

import { useDispatch, useSelector } from 'react-redux';
import { increaseCartItemQty, decreaseCartItemQty, removeItemFromCart } from '../slices/cartSlice';

export default function Cart() {
    const {cartItems} = useSelector((state) => state.cartState);
    const dispatch = useDispatch();
    const [complete, setComplete] = useState(false);
    const navigate = useNavigate();
    
          function increaseQty(item) {
             dispatch(increaseCartItemQty(item.product._id));
        }

        function decreaseQty(item) {
             dispatch(decreaseCartItemQty(item.product._id));
        }

        function removeItem(item) {
             dispatch(removeItemFromCart(item.product._id));
        }

        function checkoutHandler() {
            navigate('/payment');
        }



    return   cartItems.length > 0 ?<Fragment> 
                 <div className="container container-fluid">
        <h2 className="mt-5">Your Cart: <b>{cartItems.length} items</b></h2>
        
        <div className="row d-flex justify-content-between">
            <div className="col-12 col-lg-8">
                {cartItems.map((item) =>
                (<Fragment>
                    <hr />
         <div className="cart-item">
                    <div className="row">
                        <div className="col-4 col-lg-3">
                            <img src={item.product.images[0].image} alt={item.product.name} height="90" width="115"/>
                        </div>

                        <div className="col-5 col-lg-3">
                            <Link to={"/product/"+item.product._id} href="">{item.product.name}</Link>
                        </div>


                        <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                            <p id="card_item_price">{item.product.price}</p>
                        </div>

                        <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                            <div className="stockCounter d-inline">
                                <span className="btn btn-danger minus" onClick={() => decreaseQty(item)}>-</span>
                                <input type="number" className="form-control count d-inline" value={item.qty} readOnly />

								<span className="btn btn-primary plus" onClick={() => increaseQty(item)}>+</span>
                            </div>
                        </div>

                        <div className="col-4 col-lg-1 mt-4 mt-lg-0">
                            <i id="delete_cart_item" className="fa fa-trash btn btn-danger" onClick={() => removeItem(item)}></i>
                        </div>

                    </div>
                </div>
                
                </Fragment>)
                )}
                
             
            </div>

            <div className="col-12 col-lg-3 my-4">
                <div id="order_summary">
                    <h4>Order Summary</h4>
                    <hr />
                    <p>Subtotal:  <span className="order-summary-values">{cartItems.reduce((acc, item) => (acc + item.qty), 0)} (Units)</span></p>
                    <p>Est. total: <span className="order-summary-values">${cartItems.reduce((acc, item) => (acc + item.product.price * item.qty), 0)}</span></p>
    
                    <hr />
                    <button id="checkout_btn" className="btn btn-primary btn-block" onClick={checkoutHandler}>Place Order</button>
                </div>
            </div>
        </div>
                 </div>
             </Fragment> : (!complete ? <h2 className="mt-5"> your cart is empty</h2>
              : <Fragment>
                <h2 className="mt-5">order complete</h2>
                <p>your order has been placed successfully</p>
                </Fragment>)
}