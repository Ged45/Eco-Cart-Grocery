import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function Checkout() {
  const [step, setStep] = useState(1);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-10 font-sans">
      <div className="w-full max-w-6xl">
        <p className="text-gray-500 cursor-pointer mb-2">← Back to Cart</p>
        <h1 className="text-3xl font-semibold mb-6">Checkout</h1>

        {/* Steps */}
        <div className="flex justify-center gap-10 mb-6">
          <Step label="Shipping" active={step === 1} />
          <Step label="Payment" active={step === 2} />
          <Step label="Review" active={step === 3} />
        </div>

        <div className="flex gap-6">
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
                  <Review onBack={() => setStep(2)} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* RIGHT */}
          <div className="flex-1 bg-white p-5 rounded-xl shadow-sm">
            <h3 className="font-semibold mb-4">Order Summary</h3>

            <div className="flex gap-3 items-center">
              <img src="https://via.placeholder.com/60" className="rounded" />
              <div>
                <p className="font-medium">Organic Spinach</p>
                <small className="text-gray-500">Qty: 1</small>
                <p>$3.99</p>
              </div>
            </div>

            <hr className="my-4" />

            <p>Subtotal: $3.99</p>
            <p>Shipping: $4.99</p>
            <p>Tax: $0.32</p>
            <h4 className="font-semibold mt-2">
              Total: <span className="text-green-600">$9.30</span>
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
}

/* STEP */
function Step({ label, active }) {
  return (
    <div className="flex items-center gap-2">
      <motion.div
        className="w-7 h-7 rounded-full"
        animate={{
          backgroundColor: active ? "#16a34a" : "#ddd",
          scale: active ? 1.2 : 1,
        }}
      />
      <span className={active ? "text-green-600" : "text-gray-400"}>
        {label}
      </span>
    </div>
  );
}

/* SHIPPING */
function Shipping({ onNext }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const validate = () => {
    let e = {};

    if (!form.name) e.name = "Required";
    if (!form.email) e.email = "Required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Invalid email";

    if (!form.phone) e.phone = "Required";
    if (!form.address) e.address = "Required";
    if (!form.city) e.city = "Required";
    if (!form.state) e.state = "Required";
    if (!form.zip) e.zip = "Required";

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm space-y-4">
      <h3 className="font-semibold">Shipping Information</h3>

      <div className="grid grid-cols-2 gap-3">
        <Field name="name" placeholder="Full Name" value={form.name} onChange={handleChange} error={errors.name} />
        <Field name="email" placeholder="Email" value={form.email} onChange={handleChange} error={errors.email} />
      </div>

      <Field name="phone" placeholder="Phone Number" value={form.phone} onChange={handleChange} error={errors.phone} />
      <Field name="address" placeholder="Street Address" value={form.address} onChange={handleChange} error={errors.address} />

      <div className="grid grid-cols-3 gap-3">
        <Field name="city" placeholder="City" value={form.city} onChange={handleChange} error={errors.city} />
        <Field name="state" placeholder="State" value={form.state} onChange={handleChange} error={errors.state} />
        <Field name="zip" placeholder="ZIP Code" value={form.zip} onChange={handleChange} error={errors.zip} />
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
  const [form, setForm] = useState({
    card: "",
    name: "",
    expiry: "",
    cvv: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const validate = () => {
    let e = {};

    if (!form.card || form.card.length < 12) e.card = "Invalid";
    if (!form.name) e.name = "Required";
    if (!form.expiry) e.expiry = "Required";
    if (!form.cvv || form.cvv.length < 3) e.cvv = "Invalid";

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm space-y-4">
      <h3 className="font-semibold">Payment Information</h3>

      <Field name="card" placeholder="Card Number" value={form.card} onChange={handleChange} error={errors.card} />
      <Field name="name" placeholder="Cardholder Name" value={form.name} onChange={handleChange} error={errors.name} />

      <div className="grid grid-cols-2 gap-3">
        <Field name="expiry" placeholder="MM/YY" value={form.expiry} onChange={handleChange} error={errors.expiry} />
        <Field name="cvv" placeholder="CVV" value={form.cvv} onChange={handleChange} error={errors.cvv} />
      </div>

      <div className="flex gap-3">
        <button className="flex-1 border rounded-lg py-3" onClick={onBack}>
          Back
        </button>
        <button
          className="flex-1 bg-green-600 text-white py-3 rounded-lg"
          onClick={() => validate() && onNext()}
        >
          Review Order →
        </button>
      </div>
    </div>
  );
}

/* REVIEW */
function Review({ onBack }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm space-y-4">
      <h3 className="font-semibold">Review Order</h3>

      <p>Shipping & Payment details look good.</p>

      <div className="flex gap-3">
        <button className="flex-1 border rounded-lg py-3" onClick={onBack}>
          Back
        </button>
        <button className="flex-1 bg-green-600 text-white py-3 rounded-lg">
          Place Order ✓
        </button>
      </div>
    </div>
  );
}

/* FIELD */
function Field({ name, placeholder, value, onChange, error }) {
  return (
    <div>
      <input
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`w-full p-3 rounded-lg border ${
          error ? "border-red-500" : "border-gray-200"
        }`}
      />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}

/* ANIMATION */
const animation = {
  initial: { opacity: 0, x: 60 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -60 },
};

export default Checkout;