import React from 'react';
import { useNavigate } from 'react-router-dom';
import CategoryCard from '../components/CategoryCard';
import { MOCK_PRODUCTS } from '../assets/products'; 
import "../styles/Categories.css";

const Categories = () => {
  const navigate = useNavigate();
  
  const categoryDefinitions = [
    { title: 'Fruits', description: 'Browse our fresh fruits', icon: '🍎' },
    { title: 'Vegetables', description: 'Browse our fresh vegetables', icon: '🥦' },
    { title: 'Bakery', description: 'Browse our fresh bakery', icon: '🥐' },
    { title: 'Dairy', description: 'Browse our fresh dairy', icon: '🥛' },
    { title: 'Meat', description: 'Browse our fresh meat', icon: '🥩' },
    { title: 'Seafood', description: 'Browse our fresh seafood', icon: '🐟' },
  ];

  const categoriesWithCounts = categoryDefinitions.map((cat) => {
    const count = MOCK_PRODUCTS.filter(p => p.category === cat.title).length;
    return { ...cat, count };
  });

  return (
    <section className="categories-container">
      <header className="categories-header">
        <h1>Shop by Category</h1>
        <p>Explore our carefully curated selections</p>
      </header>

      <div className="categories-grid">
        {categoriesWithCounts.map((cat, index) => (
          <CategoryCard 
            key={index} 
            title={cat.title} 
            description={cat.description} 
            count={cat.count} 
            icon={cat.icon} 
           
          />
        ))}
      </div>

      <div className="organic-banner">
        <div className="banner-text">
          <h2>Organic Collection</h2>
          <p>Discover our premium selection of certified organic products</p>
        </div>
        
        <button 
          className="view-btn"
          
          onClick={() => navigate('/?organic=true')}
        >
          View Organic Products
        </button>
      </div>
    </section>
  );
};

export default Categories;