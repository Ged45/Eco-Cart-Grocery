import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { Trash2 } from "lucide-react";

const Cart = () => {
  const { cartItems, updateQuantity, removeItem } = useCart();
  const navigate = useNavigate();

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const tax = subtotal * 0.08;
  const shipping = subtotal > 50 ? 0 : 5.99;
  const total = subtotal + tax + shipping;

  // EMPTY CART
  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] text-center gap-4">
        <div className="text-5xl opacity-40">🛍️</div>
        <h2 className="text-xl font-semibold">Your cart is empty</h2>
        <p className="text-gray-500">Add some products to get started</p>

        <button
          onClick={() => navigate("/")}
          className="mt-4 inline-flex items-center justify-center
                     bg-green-600 hover:bg-green-700
                     text-white font-medium
                     px-6 py-3 rounded-xl
                     shadow-md hover:shadow-lg
                     transition-all duration-200
                     active:scale-95 cursor-pointer"
        >
          Start Shopping
        </button>
      </div>
    );
  }

  // FILLED CART
  return (
    <div className="flex flex-col lg:flex-row gap-8 px-6 py-10 bg-green-50 min-h-screen">
      {/* LEFT SIDE */}
      <div className="flex-1 flex flex-col gap-4">
        <h1 className="text-2xl font-bold">Shopping Cart</h1>
        <p className="text-gray-500">{cartItems.length} items in your cart</p>

        {cartItems.map((item) => (
          <div
            key={item.id}
            className="relative flex items-center justify-between bg-white p-4 rounded-xl shadow"
          >
            {/* TRASH ICON (TOP RIGHT) */}
            <button
              onClick={() => removeItem(item.id)}
              className="absolute top-3 right-3 text-gray-400 hover:text-red-500 transition cursor-pointer"
              aria-label="Remove item"
            >
              <Trash2 size={18} />
            </button>

            <div className="flex gap-4 items-center">
              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-20 object-cover rounded-lg"
              />

              <div>
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-gray-400 text-sm">{item.category}</p>

                <div className="flex items-center gap-2 mt-2">
                  <button
                    onClick={() => updateQuantity(item.id, -1)}
                    className="px-3 py-1 bg-gray-100 rounded hover:bg-gray-200 transition"
                  >
                    -
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    onClick={() => updateQuantity(item.id, 1)}
                    className="px-3 py-1 bg-gray-100 rounded hover:bg-gray-200 transition"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* PRICE SECTION */}
            <div className="text-right pr-6">
              <p className="font-bold">
                ${(item.price * item.quantity).toFixed(2)}
              </p>

              <p className="text-gray-400 text-sm">
                ${item.price.toFixed(2)} each
              </p>
            </div>
          </div>
        ))}

        {/* CONTINUE SHOPPING */}
        <div className="mt-2 ml-1">
          <button
            onClick={() => navigate("/")}
            className="text-green-600 font-medium hover:underline cursor-pointer"
          >
            ← Continue Shopping
          </button>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="w-full lg:w-1/3 bg-white p-6 rounded-xl shadow h-fit lg:mt-[86px]">
        <h2 className="text-lg font-semibold mb-4">Order Summary</h2>

        <div className="flex justify-between mb-2">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>

        <div className="flex justify-between mb-2">
          <span>Shipping</span>
          <span>${shipping.toFixed(2)}</span>
        </div>

        <div className="flex justify-between mb-2">
          <span>Tax (8%)</span>
          <span>${tax.toFixed(2)}</span>
        </div>

        <hr className="my-3" />

        <div className="flex justify-between font-bold text-lg">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>

        <button
          className="mt-4 w-full inline-flex items-center justify-center
                     bg-green-600 hover:bg-green-700
                     text-white font-medium
                     py-3 rounded-xl
                     shadow-md hover:shadow-lg
                     transition-all duration-200
                     active:scale-95 cursor-pointer"
        >
          Proceed to Checkout →
        </button>

        <p className="text-xs text-gray-400 mt-2 text-center">
          Free shipping on orders over $50
        </p>
      </div>
    </div>
  );
};

export default Cart;
