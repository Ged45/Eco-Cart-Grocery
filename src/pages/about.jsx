import { motion } from "framer-motion";
import { Leaf, Heart, TruckIcon, Award } from "lucide-react";

 function About() {
  const values = [
    {
      icon: Leaf,
      title: "Sustainable Sourcing",
      description:
        "We partner with local organic farms committed to sustainable and eco-friendly practices.",
    },
    {
      icon: Heart,
      title: "Quality First",
      description:
        "Every product is handpicked and quality-checked to ensure you receive only the best.",
    },
    {
      icon: TruckIcon,
      title: "Fast Delivery",
      description:
        "Fresh groceries delivered to your door within 24 hours of harvest.",
    },
    {
      icon: Award,
      title: "Certified Organic",
      description:
        "Our organic products are certified and meet the highest standards of quality.",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          About Eco-Cart Grocery
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Your trusted partner for fresh, sustainable, and organic groceries.
        </p>
      </motion.div>

      {/* Mission */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-gradient-to-r from-green-600 to-green-500 rounded-2xl p-12 text-white mb-16"
      >
        <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
        <p className="text-lg text-green-50 leading-relaxed">
          We make sustainable, healthy food accessible while supporting local farmers
          and protecting the environment.
        </p>
      </motion.div>

      {/* Values */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mb-16"
      >
        <h2 className="text-3xl font-bold text-center mb-8">
          Our Values
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, index) => {
            const Icon = value.icon;

            return (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="bg-white p-6 rounded-xl shadow-md"
              >
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-green-600" />
                </div>

                <h3 className="font-bold mb-2">{value.title}</h3>
                <p className="text-gray-600 text-sm">
                  {value.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="bg-white p-12 rounded-2xl shadow-md mb-16"
      >
        <h2 className="text-3xl text-center mb-8">Our Impact</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <Stat value="50+" label="Local Farms" />
          <Stat value="10k+" label="Customers" />
          <Stat value="100%" label="Organic" />
          <Stat value="24hr" label="Delivery" />
        </div>
      </motion.div>

      {/* Story */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="max-w-3xl mx-auto text-center"
      >
        <h2 className="text-3xl mb-6">Our Story</h2>

        <p className="text-gray-600 mb-4">
          Eco-Cart started in 2020 to make organic groceries accessible
          while supporting local farmers.
        </p>

        <p className="text-gray-600">
          Today, we serve thousands of families while staying committed
          to sustainability and quality.
        </p>
      </motion.div>
    </div>
  );
}

/* Small reusable component */
function Stat({ value, label }) {
  return (
    <div>
      <div className="text-4xl font-bold text-green-600 mb-2">
        {value}
      </div>
      <div className="text-gray-600">{label}</div>
    </div>
  );
}
export default About;