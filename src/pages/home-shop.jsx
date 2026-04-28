import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom"; 
import { Search, Leaf } from "lucide-react";
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
  outOfStock: product.outOfStock ?? Math.random() < 0.2, 
}));

const HomeShop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get("category") || "All");
  const [search, setSearch] = useState("");
  const [organicOnly, setOrganicOnly] = useState(searchParams.get("organic") === "true");

 
  useEffect(() => {
    const categoryParam = searchParams.get("category");
    const organicParam = searchParams.get("organic");

    if (categoryParam) {
        setSelectedCategory(categoryParam);
    } else {
        setSelectedCategory("All");
    }
    
    setOrganicOnly(organicParam === "true");
  }, [searchParams]);

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
    <div className="flex flex-col bg-green-50 min-h-screen px-4 sm:px-6 md:px-10 lg:px-20 xl:px-32 py-6">
      <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2">Browse Products</h1>
      <h2 className="text-sm sm:text-base text-gray-500 max-w-2xl mb-8">
        Discover fresh, sustainable groceries delivered to your door
      </h2>

      <div className="relative w-full mb-8">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
        <input
          type="text"
          placeholder="Search products..."
          className="w-full pl-10 pr-3 py-3 rounded-xl border border-gray-300 focus:ring-1 focus:ring-green-500 outline-none"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="flex gap-2 flex-wrap mb-4">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSearchParams({ category: cat })}
            className={`px-4 py-1 rounded-full transition ${
              selectedCategory === cat ? "bg-green-600 text-white" : "bg-white border border-gray-300"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="flex flex-row mb-6 items-center gap-4 mt-2">
        <button
          onClick={() => setSearchParams({ organic: (!organicOnly).toString(), category: selectedCategory })}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm transition ${
            organicOnly ? "bg-green-100 text-green-700 border border-green-400" : "bg-white border border-gray-300"
          }`}
        >
          <Leaf size={16} /> Organic Only
        </button>
        <p className="text-gray-500 text-sm">{filteredProducts.length} products found</p>
      </div>

      <motion.div layout className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <AnimatePresence mode="popLayout">
          {filteredProducts.map((product) => (
            <motion.div
              key={product.id}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
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