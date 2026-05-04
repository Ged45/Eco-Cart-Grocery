import { useState } from "react";
import { useCart } from "../context/CartContext";

const ProductCard = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  return (
    <div
      className={`bg-white rounded-2xl p-4 flex flex-col gap-3 
      shadow-sm hover:shadow-xl/30 
      transform hover:-translate-y-1 
      transition duration-300 ease-in-out
      hover: cursor-pointer
      ${product.outOfStock ? "opacity-80" : ""}`}
    >
      <div className="relative overflow-hidden rounded-xl">
        <img
          src={product.image}
          alt={product.name}
          className={`w-full h-40 object-cover 
          transition duration-300 ease-in-out 
          ${product.outOfStock ? "grayscale" : "hover:scale-110"}`}
        />

        {product.organic && !product.outOfStock && (
          <span className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
            Organic
          </span>
        )}

        {product.outOfStock && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center rounded-xl">
            <span className="text-white font-semibold text-sm">
              Out of Stock
            </span>
          </div>
        )}
      </div>

      <div>
        <h3 className="font-semibold text-gray-800">{product.name}</h3>
        <p className="text-sm text-gray-400">{product.category}</p>
      </div>

      <p className="text-green-600 font-bold text-lg">
        ${product.price.toFixed(2)}{" "}
        <span className="text-gray-400 text-sm">/ {product.unit}</span>
      </p>

      <div className="flex items-center gap-2">
        <button
          disabled={product.outOfStock}
          onClick={() => setQuantity((q) => Math.max(1, q - 1))}
          className="px-3 py-1 bg-gray-100 rounded-lg disabled:opacity-50"
        >
          -
        </button>

        <span className="px-3">{quantity}</span>

        <button
          disabled={product.outOfStock}
          onClick={() => setQuantity((q) => q + 1)}
          className="px-3 py-1 bg-gray-100 rounded-lg disabled:opacity-50"
        >
          +
        </button>
      </div>

      <button
        disabled={product.outOfStock}
        onClick={() => addToCart(product, quantity)}
        className={`mt-auto py-2 rounded-xl text-white transition
        ${
          product.outOfStock
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-green-500 hover:bg-green-600"
        }`}
      >
        {product.outOfStock ? "Unavailable" : "Add to Cart"}
      </button>
    </div>
  );
};

export default ProductCard;
