import React from 'react';
import "../styles/Categories.css"


const CategoryCard = ({ icon, title, description, count, onClick }) => {
  return (
  
    <div className="category-card" onClick={onClick}>
      <div className="card-top">
        <div className="icon-badge">
          {icon}
        </div>
        <span className="count-label">{count} products</span>
      </div>
      <div className="card-bottom">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default CategoryCard;