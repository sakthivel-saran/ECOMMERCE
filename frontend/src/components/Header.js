import Search from './Search.js'
import {Link} from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Header () {
    const {cartItems} = useSelector((state) => state.cartState);
    return <nav className="navbar row">
      <div className="col-12 col-md-3">
        <div className="navbar-brand">
          <Link to="/"> <img width="70px" src="https://th.bing.com/th/id/OIP.sQ5JeinAeHGawvijLgL9TQHaHa?w=156&h=150&c=6&o=7&dpr=1.3&pid=1.7&rm=3" /></Link>
         
        </div>
      </div>

      <div className="col-12 col-md-6 mt-2 mt-md-0">
       <Search />
      </div>

      <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
        <Link to={"/cart"}>
          <span id="cart" className="ml-3">Cart</span>
          <span className="ml-1" id="cart_count">{cartItems.length}</span>
        </Link>
      
      </div>
          </nav>
          
}