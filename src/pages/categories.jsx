import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Apple, Carrot, Croissant, Milk, Beef, Fish } from 'lucide-react';
import { CATEGORIES, MOCK_PRODUCTS } from '../assets/products.js';

const categoryIcons = {
  Fruits: Apple,
  Vegetables: Carrot,
  Bakery: Croissant,
  Dairy: Milk,
  Meat: Beef,
  Seafood: Fish,
};

export function Categories() {
  const getCategoryCount = (category) => {
    return MOCK_PRODUCTS.filter((p) => p.category === category).length;
  };

  const categories = CATEGORIES.filter((c) => c !== 'All');

  return (
    <div className="w-full max-w-screen-xl 2xl:max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 py-8">
      
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 text-center sm:text-left"
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
          Shop by Category
        </h2>
        <p className="text-gray-600">
          Explore our carefully curated selections
        </p>
      </motion.div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
        {categories.map((category, index) => {
          const Icon = categoryIcons[category];
          const count = getCategoryCount(category);

          return (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link to={`/?category=${category}`}>
                <motion.div
                  whileHover={{ scale: 1.03, y: -5 }}
                  whileTap={{ scale: 0.97 }}
                  className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 p-6 sm:p-8 cursor-pointer border border-gray-100 h-full"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 bg-green-100 rounded-full flex items-center justify-center">
                      {Icon && <Icon className="w-7 h-7 sm:w-8 sm:h-8 text-green-600" />}
                    </div>
                    <span className="text-xs sm:text-sm text-gray-500">
                      {count} products
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">
                    {category}
                  </h3>

                  <p className="text-gray-600 text-sm">
                    Browse our fresh {category.toLowerCase()}
                  </p>
                </motion.div>
              </Link>
            </motion.div>
          );
        })}
      </div>

      {/* Featured Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mt-10 sm:mt-12 bg-gradient-to-r from-green-600 to-green-500 rounded-2xl p-6 sm:p-8 text-white text-center sm:text-left"
      >
        <h3 className="text-xl sm:text-2xl font-bold mb-2">
          Organic Collection
        </h3>

        <p className="mb-4 text-green-50 text-sm sm:text-base">
          Discover our premium selection of certified organic products
        </p>

        <Link to="/?organic=true">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-green-600 px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors"
          >
            View Organic Products
          </motion.button>
        </Link>
      </motion.div>
    </div>
  );
}

export default Categories;