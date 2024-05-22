import React from 'react';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <img src="https://web.furrl.in/_next/static/media/Furrl.13550a62.svg" alt="furrl-logo"/>
      <div className="nav-buttons">
        <a href="https://furrl.in/wishlist" className="nav-icon"><img src="	https://web.furrl.in/_next/static/media/Whislist.2ac94d87.svg" alt="wishlist-icon"/></a>
        <a href="https://furrl.in/cart" className="nav-icon"><img src="https://web.furrl.in/_next/static/media/Bag.b94fa005.svg" alt="cart-icon"/></a>
      </div>
    </nav>
  );
};

export default Navbar;