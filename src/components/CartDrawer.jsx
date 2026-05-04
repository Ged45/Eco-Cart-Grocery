import { useCart } from "../context/CartContext";
import { X, Trash2, ShoppingBag } from "lucide-react";

const CartDrawer = () => {
  const {
    cartItems,
    updateQuantity,
    removeItem,
    totalItems,
    isCartOpen,
    setIsCartOpen,
  } = useCart();

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div
      className={`fixed inset-0 z-50 ${
        isCartOpen ? "pointer-events-auto" : "pointer-events-none"
      }`}
    >
      {/* BACKDROP */}
      <div
        onClick={() => setIsCartOpen(false)}
        className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${
          isCartOpen ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* DRAWER */}
      <div
        className={`absolute right-0 top-0 h-full w-[360px] bg-white shadow-lg p-4 flex flex-col
        transform transition-transform duration-300 ease-in-out
        ${isCartOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* HEADER */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <ShoppingBag className="text-green-600" size={20} />
            <div>
              <h2 className="font-semibold">Your Cart</h2>
              <p className="text-sm text-gray-400">{totalItems} items</p>
            </div>
          </div>

          <button
            onClick={() => setIsCartOpen(false)}
            className="hover:text-gray-600 transition"
          >
            <X />
          </button>
        </div>

        {/* ITEMS */}
        <div className="flex-1 overflow-y-auto flex flex-col gap-4">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex gap-3 items-center bg-gray-50 p-3 rounded-lg"
            >
              <img
                src={item.image}
                className="w-14 h-14 object-cover rounded"
              />

              <div className="flex-1">
                <h3 className="text-sm font-medium">{item.name}</h3>
                <p className="text-xs text-gray-400">
                  ${item.price.toFixed(2)} / {item.unit}
                </p>

                <div className="flex items-center gap-2 mt-1">
                  <button
                    onClick={() => updateQuantity(item.id, -1)}
                    className="px-2 bg-gray-200 rounded hover:bg-gray-300 transition"
                  >
                    -
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    onClick={() => updateQuantity(item.id, 1)}
                    className="px-2 bg-gray-200 rounded hover:bg-gray-300 transition"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex flex-col items-end gap-1">
                <button
                  onClick={() => removeItem(item.id)}
                  className="text-gray-400 hover:text-red-500 transition"
                >
                  <Trash2 size={16} />
                </button>

                <p className="text-green-600 font-semibold text-sm">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* FOOTER */}
        <div className="border-t pt-4 mt-4">
          <div className="flex justify-between font-semibold mb-3">
            <span>Total</span>
            <span className="text-green-600">${subtotal.toFixed(2)}</span>
          </div>

          <button
            className="w-full inline-flex items-center justify-center
                       bg-green-600 hover:bg-green-700
                       text-white font-medium
                       py-3 rounded-xl
                       shadow-md hover:shadow-lg
                       transition-all duration-200
                       active:scale-95 cursor-pointer"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartDrawer;
