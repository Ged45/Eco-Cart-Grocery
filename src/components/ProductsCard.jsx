import { useState } from "react";

const ProductCard = ({ product }) => {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="bg-white rounded-2xl p-4 flex flex-col gap-3 
                    shadow-sm hover:shadow-xl/30 
                    transform hover:-translate-y-1 
                    transition duration-300 ease-in-out">
      
      <div className="relative overflow-hidden rounded-xl">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-40 object-cover 
                     transition duration-300 ease-in-out 
                     hover:scale-110"
        />

        {product.organic && (
          <span className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
            Organic
          </span>
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
          onClick={() => setQuantity((q) => Math.max(1, q - 1))}
          className="px-3 py-1 bg-gray-100 rounded-lg"
        >
          -
        </button>

        <span className="px-3">{quantity}</span>

        <button
          onClick={() => setQuantity((q) => q + 1)}
          className="px-3 py-1 bg-gray-100 rounded-lg"
        >
          +
        </button>
      </div>

      <button className="mt-auto bg-green-500 text-white py-2 rounded-xl hover:bg-green-600 transition">
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;