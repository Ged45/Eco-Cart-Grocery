import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Checkout() {
  const [step, setStep] = useState(1);

  return (
    <div className="px-10 py-6 bg-gray-50 min-h-screen">
      
      {/* Back */}
      <p className="text-gray-500 cursor-pointer mb-2">← Back to Cart</p>

      <h1 className="text-3xl font-semibold mb-6">Checkout</h1>

      {/* Stepper */}
      <div className="flex items-center justify-center gap-16 mb-10">
        <Step label="Shipping" active={step === 1} />
        <div className="w-24 h-[2px] bg-gray-300" />
        <Step label="Payment" active={step === 2} />
        <div className="w-24 h-[2px] bg-gray-300" />
        <Step label="Review" active={step === 3} />
      </div>

      <div className="grid grid-cols-3 gap-8">
        
        {/* LEFT */}
        <div className="col-span-2">
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

        {/* RIGHT - Order Summary */}
        <div className="bg-white rounded-xl shadow-sm p-5 h-fit">
          <h3 className="font-semibold mb-4">Order Summary</h3>

          <div className="flex gap-3 items-center">
            <img
              src="https://via.placeholder.com/60"
              className="w-14 h-14 rounded-lg"
            />
            <div>
              <p className="text-sm font-medium">Organic Spinach</p>
              <p className="text-xs text-gray-500">Qty: 1</p>
              <p className="text-sm">$3.99</p>
            </div>
          </div>

          <hr className="my-4" />

          <div className="text-sm space-y-2">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>$3.99</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>$4.99</span>
            </div>
            <div className="flex justify-between">
              <span>Tax</span>
              <span>$0.32</span>
            </div>
          </div>

          <div className="flex justify-between mt-4 font-semibold">
            <span>Total</span>
            <span className="text-green-600">$9.30</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------- ANIMATION ---------------- */

const animation = {
  initial: { opacity: 0, x: 40 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -40 },
  transition: { duration: 0.25 },
};

/* ---------------- STEPPER ---------------- */

function Step({ label, active }) {
  return (
    <div className="flex flex-col items-center">
      <motion.div
        className="w-10 h-10 rounded-full flex items-center justify-center"
        animate={{
          backgroundColor: active ? "#16a34a" : "#e5e7eb",
        }}
      >
        <div className="w-4 h-4 bg-white rounded-sm" />
      </motion.div>
      <span
        className={`text-sm mt-2 ${
          active ? "text-green-600 font-medium" : "text-gray-400"
        }`}
      >
        {label}
      </span>
    </div>
  );
}

/* ---------------- SHIPPING ---------------- */

function Shipping({ onNext }) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 space-y-4">
      <h3 className="font-semibold">Shipping Information</h3>

      <div className="grid grid-cols-2 gap-4">
        <Input placeholder="Full Name" />
        <Input placeholder="Email" />
      </div>

      <Input placeholder="Phone Number" />
      <Input placeholder="Street Address" />

      <div className="grid grid-cols-3 gap-4">
        <Input placeholder="City" />
        <Input placeholder="State" />
        <Input placeholder="ZIP Code" />
      </div>

      <button
        onClick={onNext}
        className="w-full bg-green-600 text-white py-3 rounded-lg mt-2 hover:bg-green-700"
      >
        Continue to Payment →
      </button>
    </div>
  );
}

/* ---------------- PAYMENT ---------------- */

function Payment({ onNext, onBack }) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 space-y-4">
      <h3 className="font-semibold">Payment Information</h3>

      <Input placeholder="Card Number" />
      <Input placeholder="Cardholder Name" />

      <div className="grid grid-cols-2 gap-4">
        <Input placeholder="MM/YY" />
        <Input placeholder="CVV" />
      </div>

      <div className="flex gap-4 mt-2">
        <button
          onClick={onBack}
          className="flex-1 border rounded-lg py-3"
        >
          Back
        </button>

        <button
          onClick={onNext}
          className="flex-1 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700"
        >
          Review Order →
        </button>
      </div>
    </div>
  );
}

/* ---------------- REVIEW ---------------- */

function Review({ onBack }) {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex justify-between">
          <h3 className="font-semibold">Shipping Address</h3>
          <span className="text-green-600 cursor-pointer text-sm">Edit</span>
        </div>

        <div className="text-sm text-gray-600 mt-2">
          <p>John Doe</p>
          <p>Addis Ababa, Ethiopia</p>
          <p>john@email.com</p>
          <p>+251900000000</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex justify-between">
          <h3 className="font-semibold">Payment Method</h3>
          <span className="text-green-600 cursor-pointer text-sm">Edit</span>
        </div>

        <p className="text-sm text-gray-600 mt-2">
          Card ending in 1234
        </p>
      </div>

      <div className="flex gap-4">
        <button
          onClick={onBack}
          className="flex-1 border rounded-lg py-3"
        >
          Back
        </button>

        <button className="flex-1 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700">
          Place Order ✓
        </button>
      </div>
    </div>
  );
}

/* ---------------- INPUT ---------------- */

function Input({ placeholder }) {
  return (
    <input
      placeholder={placeholder}
      className="border rounded-lg px-4 py-3 w-full outline-none focus:ring-2 focus:ring-green-500"
    />
  );
}