import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  User,
  Package,
  Heart,
  Settings,
  MapPin,
  CreditCard,
  Bell,
  LogOut
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function Account() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');

  const handleLogout = () => {
    navigate('/login');
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'orders', label: 'Orders', icon: Package },
    { id: 'favorites', label: 'Favorites', icon: Heart },
    { id: 'addresses', label: 'Addresses', icon: MapPin },
    { id: 'payment', label: 'Payment', icon: CreditCard },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const mockOrders = [
    { id: '12345', date: '2026-04-18', total: 54.32, status: 'Delivered', items: 8 },
    { id: '12344', date: '2026-04-12', total: 67.89, status: 'Delivered', items: 12 },
    { id: '12343', date: '2026-04-05', total: 42.15, status: 'Delivered', items: 6 },
  ];

  const mockFavorites = [
    { id: 1, name: 'Organic Bananas', price: 2.99 },
    { id: 10, name: 'Organic Apples', price: 4.49 },
    { id: 6, name: 'Organic Milk', price: 5.99 },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          My Account
        </h1>
        <p className="text-gray-600">
          Manage your profile, orders, and preferences
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-4 gap-8">
        
        {/* Sidebar */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-1"
        >
          <div className="bg-white rounded-xl shadow-md p-4 space-y-2">
            
            {tabs.map((tab) => {
              const Icon = tab.icon;

              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    activeTab === tab.id
                      ? 'bg-green-100 text-green-700'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{tab.label}</span>
                </button>
              );
            })}

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-all"
            >
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-3"
        >
          <div className="bg-white rounded-xl shadow-md p-8">

            {/* PROFILE */}
            {activeTab === 'profile' && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Profile Information</h2>

                <div className="space-y-6">
                  
                  <div className="flex items-center gap-6 mb-8">
                    <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center">
                      <User className="w-12 h-12 text-green-600" />
                    </div>

                    <div>
                      <h3 className="text-xl font-bold">John Doe</h3>
                      <p className="text-gray-600">john.doe@email.com</p>
                      <button className="text-green-600 text-sm mt-2">
                        Change Profile Picture
                      </button>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <input type="text" defaultValue="John" className="input" />
                    <input type="text" defaultValue="Doe" className="input" />
                    <input type="email" defaultValue="john.doe@email.com" className="input" />
                    <input type="tel" defaultValue="+1 (555) 123-4567" className="input" />
                  </div>

                  <motion.button className="btn">
                    Save Changes
                  </motion.button>

                </div>
              </div>
            )}

            {/* ORDERS */}
            {activeTab === 'orders' && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Order History</h2>

                {mockOrders.map(order => (
                  <div key={order.id} className="border p-4 rounded-lg mb-4">
                    <p>Order #{order.id}</p>
                    <p>{order.date}</p>
                    <p>${order.total}</p>
                  </div>
                ))}
              </div>
            )}

            {/* FAVORITES */}
            {activeTab === 'favorites' && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Favorites</h2>

                {mockFavorites.map(p => (
                  <div key={p.id} className="flex justify-between p-4 border rounded-lg mb-3">
                    <span>{p.name}</span>
                    <span>${p.price}</span>
                  </div>
                ))}
              </div>
            )}

            {/* OTHER TABS (unchanged UI logic) */}
            
          </div>
        </motion.div>

      </div>
    </div>
  );
}
export default Account;