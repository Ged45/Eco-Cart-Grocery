import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Checkout() {
  const [step, setStep] = useState(1);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const navigate = useNavigate();
  const { cartItems, placeOrder } = useCart();

  const handlePlaceOrder = () => {
    if (cartItems.length === 0) return;
    setOrderPlaced(true);
    placeOrder();
  };

  useEffect(() => {
    if (!orderPlaced) return;
    const timer = setTimeout(() => {
      navigate("/account?tab=orders");
    }, 1500);
    return () => clearTimeout(timer);
  }, [orderPlaced, navigate]);

  useEffect(() => {
    if (cartItems.length === 0 && !orderPlaced) {
      navigate("/cart");
    }
  }, [cartItems.length, orderPlaced, navigate]);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + (item?.price ?? 0) * (item?.quantity ?? 0),
    0
  );
  const shipping = subtotal > 50 ? 0 : 5.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  return (
    <div className="min-h-screen bg-gray-100 px-4 sm:px-6 lg:px-10 py-6 sm:py-10">
      <div className="w-full max-w-6xl mx-auto">
        <p
          className="text-gray-500 cursor-pointer mb-2 hover:text-gray-700 text-sm sm:text-base"
          onClick={() => navigate("/cart")}
        >
          ← Back to Cart
        </p>

        <h1 className="text-2xl sm:text-3xl font-semibold mb-6">
          Checkout
        </h1>

        {/* Steps */}
        <div className="flex flex-wrap justify-center gap-6 sm:gap-10 mb-6">
          <Step label="Shipping" active={step === 1} />
          <Step label="Payment" active={step === 2} />
          <Step label="Review" active={step === 3} />
        </div>

        {/* MAIN */}
        <div className="flex flex-col lg:flex-row gap-6">
          
          {/* LEFT */}
          <div className="flex-[3]">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div key="shipping" {...animation}>
                  <Shipping onNext={() => setStep(2)} />
                </motion.div>
              )}

              {step === 2 && (
                <motion.div key="payment" {...animation}>
                  <Payment
                    onNext={() => setStep(3)}
                    onBack={() => setStep(1)}
                  />
                </motion.div>
              )}

              {step === 3 && (
                <motion.div key="review" {...animation}>
                  <Review
                    onBack={() => setStep(2)}
                    onPlaceOrder={handlePlaceOrder}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* RIGHT (Order Summary) */}
          <div className="flex-1 bg-white p-4 sm:p-5 rounded-xl shadow-sm">
            <h3 className="font-semibold mb-4">Order Summary</h3>

            <div className="space-y-3 mb-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex gap-3 items-center">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded object-cover"
                  />
                  <div className="flex-1">
                    <p className="font-medium text-sm">{item.name}</p>
                    <small className="text-gray-500">
                      Qty: {item.quantity}
                    </small>
                  </div>
                  <p className="font-medium text-sm">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>

            <hr className="my-4" />

            <div className="space-y-2 text-sm sm:text-base">
              <p>Subtotal: ${subtotal.toFixed(2)}</p>
              <p>Shipping: ${shipping.toFixed(2)}</p>
              <p>Tax: ${tax.toFixed(2)}</p>
              <h4 className="font-semibold mt-2">
                Total:{" "}
                <span className="text-green-600">
                  ${total.toFixed(2)}
                </span>
              </h4>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL */}
      {orderPlaced && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="max-w-sm w-full bg-white rounded-3xl p-6 text-center shadow-2xl">
            <h2 className="text-xl sm:text-2xl font-bold text-green-700 mb-2">
              Order Placed!
            </h2>
            <p className="text-gray-600 mb-4 text-sm sm:text-base">
              Your order was placed successfully.
            </p>
            <p className="text-sm text-gray-500">
              Redirecting to your orders...
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

/* STEP */
function Step({ label, active }) {
  return (
    <div className="flex items-center gap-2">
      <motion.div
        className="w-6 h-6 sm:w-7 sm:h-7 rounded-full"
        animate={{
          backgroundColor: active ? "#16a34a" : "#ddd",
          scale: active ? 1.2 : 1,
        }}
      />
      <span className={`text-sm sm:text-base ${active ? "text-green-600" : "text-gray-400"}`}>
        {label}
      </span>
    </div>
  );
}

/* SHIPPING */
function Shipping({ onNext }) {
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const validate = () => {
    let e = {};
    if (!form.name) e.name = "Required";
    if (!form.email) e.email = "Required";
    if (!form.phone) e.phone = "Required";
    if (!form.address) e.address = "Required";
    if (!form.city) e.city = "Required";
    if (!form.state) e.state = "Required";
    if (!form.zip) e.zip = "Required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  return (
    <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm space-y-4">
      <h3 className="font-semibold">Shipping Information</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Field name="name" placeholder="Full Name" onChange={handleChange} error={errors.name} />
        <Field name="email" placeholder="Email" onChange={handleChange} error={errors.email} />
      </div>

      <Field name="phone" placeholder="Phone Number" onChange={handleChange} error={errors.phone} />
      <Field name="address" placeholder="Street Address" onChange={handleChange} error={errors.address} />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <Field name="city" placeholder="City" onChange={handleChange} error={errors.city} />
        <Field name="state" placeholder="State" onChange={handleChange} error={errors.state} />
        <Field name="zip" placeholder="ZIP Code" onChange={handleChange} error={errors.zip} />
      </div>

      <button
        className="w-full bg-green-600 text-white py-3 rounded-lg"
        onClick={() => validate() && onNext()}
      >
        Continue to Payment →
      </button>
    </div>
  );
}

/* PAYMENT */
function Payment({ onNext, onBack }) {
  return (
    <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm space-y-4">
      <h3 className="font-semibold">Payment Information</h3>

      <Field name="card" placeholder="Card Number" />
      <Field name="name" placeholder="Cardholder Name" />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Field name="expiry" placeholder="MM/YY" />
        <Field name="cvv" placeholder="CVV" />
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <button className="flex-1 border rounded-lg py-3" onClick={onBack}>
          Back
        </button>
        <button
          className="flex-1 bg-green-600 text-white py-3 rounded-lg"
          onClick={onNext}
        >
          Review Order →
        </button>
      </div>
    </div>
  );
}

/* REVIEW */
function Review({ onBack, onPlaceOrder }) {
  return (
    <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm space-y-4">
      <h3 className="font-semibold">Review Order</h3>

      <div className="flex flex-col sm:flex-row gap-3">
        <button className="flex-1 border rounded-lg py-3" onClick={onBack}>
          Back
        </button>
        <button
          className="flex-1 bg-green-600 text-white py-3 rounded-lg"
          onClick={onPlaceOrder}
        >
          Place Order ✓
        </button>
      </div>
    </div>
  );
}

/* FIELD */
function Field({ name, placeholder, onChange, error }) {
  return (
    <div>
      <input
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        className={`w-full p-3 rounded-lg border ${
          error ? "border-red-500" : "border-gray-200"
        }`}
      />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}

const animation = {
  initial: { opacity: 0, x: 60 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -60 },
};

export default Checkout;