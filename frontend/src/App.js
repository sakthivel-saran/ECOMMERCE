import Home from './pages/Home';
import Header from './components/Header';
import Footer from './components/Footer';
import ProductDetails from './pages/ProductDetail';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import ProductDetail from './pages/ProductDetail';
import { useState } from 'react';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cart from './pages/Cart';
import Payment from './pages/Payment';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useEffect } from 'react';

function App() {
const [stripeApiKey, setStripeApiKey] = useState("");


useEffect(() => {
  fetch(process.env.REACT_APP_API_URL + '/stripeapi')
    .then(res => res.json())
    .then(data => setStripeApiKey(data.stripeApiKey))
    .catch(err => console.error(err));
}, []);

  return (
    <div className="App">
      <Router>
        <div>
          <ToastContainer theme='dark' position='top-center'/>
          <Header />
        <Routes>
          <Route path="/" element={<Home />}/>
           <Route path="/Search" element={<Home />}/>
           <Route path="/product/:id" element={<ProductDetail />}/>
           <Route path="/cart" element={<Cart />}/>
           {stripeApiKey && <Route path="/payment" element={
              <Elements stripe={loadStripe(stripeApiKey)}>
                <Payment />
              </Elements>
           }/>}
        </Routes>

        </div>
       
      </Router>
      
     
      <Footer />
    </div>
  );
}

export default App;
