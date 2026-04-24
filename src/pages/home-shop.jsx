import { useState } from "react";
import { Search } from "lucide-react";
import { Leaf } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ProductCard from "../components/ProductsCard.jsx";
import { MOCK_PRODUCTS } from "../assets/products.js";

const categories = [
  "All",
  "Fruits",
  "Vegetables",
  "Bakery",
  "Dairy",
  "Meat",
  "Seafood",
];

const productsWithStock = MOCK_PRODUCTS.map((product) => ({
  ...product,
  outOfStock: Math.random() < 0.1, // 10% chance
}));

const HomeShop = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [organicOnly, setOrganicOnly] = useState(false);

  const filteredProducts = productsWithStock.filter((product) => {
    const matchesCategory =
      selectedCategory === "All" || product.category === selectedCategory;

    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesOrganic = organicOnly ? product.organic : true;

    return matchesCategory && matchesSearch && matchesOrganic;
  });

  return (
    <div
      className="flex flex-col bg-green-50 min-h-screen
                    px-4 sm:px-6 md:px-10 lg:px-20 xl:px-32
                    py-6 sm:py-8 md:py-10"
    >
      {/* Header */}
      <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2">
        Browse Products
      </h1>
      <h2 className="text-sm sm:text-base text-gray-500 max-w-2xl mb-8">
        Discover fresh, sustainable groceries delivered to your door
      </h2>

      <div className="relative w-full mb-4">
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          size={18}
        />

        <input
          type="text"
          placeholder="Search products..."
          className="w-full pl-10 pr-3 py-2 sm:py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-1 focus:ring-green-500 transition"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Categories */}
      <div className="flex gap-2 flex-wrap mb-4">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 sm:px-4 py-1 text-xs sm:text-sm rounded-full transition
              ${
                selectedCategory === cat
                  ? "bg-green-600 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Organic Filter */}
      <div className="flex flex-row mb-6 items-center gap-4 mt-2">
        <button
          onClick={() => setOrganicOnly(!organicOnly)}
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm transition
    ${
      organicOnly
        ? "bg-green-100 text-green-700"
        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
    }`}
        >
          <Leaf size={16} />
          Organic Only
        </button>
        {/* Product Count */}
        <p className="text-gray-500 text-sm">
          {filteredProducts.length} products found
        </p>
      </div>

      {/* Grid */}
      <motion.div
        layout
        className="grid gap-4 sm:gap-6
                   grid-cols-1 
                   sm:grid-cols-2 
                   md:grid-cols-3 
                   lg:grid-cols-4"
      >
        <AnimatePresence>
          {filteredProducts.map((product) => (
            <motion.div
              key={product.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{
                duration: 0.3,
                layout: { type: "spring", stiffness: 120, damping: 20 },
              }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default HomeShop;
