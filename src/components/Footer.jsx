import "../styles/footer.css";
function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        <div>
          <h4>Shop</h4>
          <p>All Products</p>
          <p>Categories</p>
        </div>

        <div>
          <h4>Customer Service</h4>
          <p>Contact Us</p>
          <p>About Us</p>
        </div>

        <div>
          <h4>Account</h4>
          <p>My Account</p>
          <p>Shopping Cart</p>
        </div>

        <div>
          <h4>Connect</h4>
          <p>Follow us on social media</p>
        </div>

      </div>

      <div className="footer-bottom">
        © 2026 Your Store. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;