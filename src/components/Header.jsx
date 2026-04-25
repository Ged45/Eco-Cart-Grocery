import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "../styles/header.css";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { totalItems, setIsCartOpen } = useCart();

  return (
    <header className="header">
      <div className="container">
        {/* Logo */}
        <div className="logo">
          <span className="logo-icon">🌿</span>
          <div>
            <h2 className="title">Eco-Cart Grocery</h2>
            <small className="subtitle">Fresh & Sustainable</small>
          </div>
        </div>

        {/* Hamburger Icon */}
        <button
          className="hamburger"
          aria-label="Toggle navigation menu"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? "✖" : "☰"}
        </button>

        {/* Navigation */}
        <nav className={`nav${menuOpen ? " nav-open" : ""}`}>
          <NavLink
            to="/"
            className="link hover"
            onClick={() => setMenuOpen(false)}
          >
            Shop
          </NavLink>
          <NavLink
            to="/categories"
            className="link hv"
            onClick={() => setMenuOpen(false)}
          >
            Categories
          </NavLink>
          <NavLink
            to="/cart"
            className="link hv"
            onClick={() => setMenuOpen(false)}
          >
            Cart
          </NavLink>
          <NavLink
            to="/about"
            className="link hv"
            onClick={() => setMenuOpen(false)}
          >
            About
          </NavLink>
          <NavLink
            to="/contact"
            className="link hv"
            onClick={() => setMenuOpen(false)}
          >
            Contact
          </NavLink>
          <NavLink
            to="/account"
            className="link hv"
            onClick={() => setMenuOpen(false)}
          >
            Account
          </NavLink>
        </nav>

        {/* Cart Icon with Badge */}
        <div
          className="relative cursor-pointer"
          onClick={() => setIsCartOpen(true)}
        >
          <span className="text-xl">🛒</span>

          {totalItems > 0 && (
            <span
              className="absolute -top-2 -right-2 bg-green-600 text-white text-xs 
                         w-5 h-5 flex items-center justify-center rounded-full"
            >
              {totalItems}
            </span>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
