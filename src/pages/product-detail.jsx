import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Check, X, Minus, Plus, ShoppingCart } from 'lucide-react';
import { MOCK_PRODUCTS } from '../assets/products'; 
import ProductCard from '../components/ProductsCard';

const ProductDetail = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);

  const product = MOCK_PRODUCTS.find((p) => p.id === String(productId));
  const isOutOfStock = Boolean(product?.outOfStock);

  const handleIncrement = () => setQuantity((q) => q + 1);
  const handleDecrement = () => setQuantity((q) => Math.max(1, q - 1));

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [productId]);

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-center px-4">
        <h2 className="text-xl font-bold text-slate-800">Product Not Found</h2>
        <button onClick={() => navigate('/')} className="mt-4 text-green-600 font-bold hover:underline">
          Return to Shop
        </button>
      </div>
    );
  }

  const subtotal = (product.price * quantity).toFixed(2);
  const related = MOCK_PRODUCTS
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="max-w-5xl mx-auto px-6 py-8">
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center text-gray-400 hover:text-green-600 mb-6 transition-colors text-sm font-medium group"
      >
        <ArrowLeft size={16} className="mr-2 transition-transform group-hover:-translate-x-1" />
        Back
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start mb-16">
        
        {/* Product Image */}
        <div className={`bg-white rounded-2xl p-6 flex items-center justify-center border border-gray-100 shadow-sm relative ${isOutOfStock ? 'opacity-60 grayscale' : ''}`}>
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-auto max-h-[350px] object-contain rounded-xl" 
          />
          {isOutOfStock && (
            <div className="absolute bg-slate-900/80 text-white px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest">
              Out of Stock
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="flex flex-col">
          <span className="text-green-600 font-bold text-[10px] uppercase tracking-widest mb-1">
            {product.category}
          </span>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-2 tracking-tight">
            {product.name}
          </h1>
          
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xl font-bold text-slate-900">${product.price.toFixed(2)}</span>
            <span className="text-gray-400 text-xs">/ {product.unit}</span>
          </div>

          <div className={`flex items-center gap-1.5 font-semibold mb-6 text-[11px] ${isOutOfStock ? 'text-red-500' : 'text-green-500'}`}>
             <span className={`p-0.5 rounded-full ${isOutOfStock ? 'bg-red-100' : 'bg-green-100'}`}>
               {isOutOfStock ? <X size={10} /> : <Check size={10} />}
             </span> 
             {isOutOfStock ? 'Currently Unavailable' : 'In Stock'}
          </div>

          <p className="text-gray-500 text-sm leading-relaxed mb-8 max-w-sm">
            Fresh {product.name.toLowerCase()} delivered daily. Quality guaranteed and 
            sustainably sourced from our local partners.
          </p>

          {/* Action Box */}
          <div className={`bg-slate-50 rounded-2xl p-5 border border-slate-100 ${isOutOfStock ? 'pointer-events-none opacity-50' : ''}`}>
            <div className="flex items-center justify-between mb-6">
              <span className="font-bold text-slate-700 text-xs uppercase tracking-tight">Quantity</span>
              <div className="flex items-center bg-white border border-slate-200 rounded-lg overflow-hidden shadow-sm">
                <button 
                  disabled={isOutOfStock}
                  onClick={handleDecrement}
                  className="p-2 hover:bg-slate-50 text-slate-600 transition-colors border-r border-slate-100"
                >
                  <Minus size={14} />
                </button>
                <span className="px-4 font-bold text-slate-800 text-sm min-w-[36px] text-center">
                  {isOutOfStock ? 0 : quantity}
                </span>
                <button 
                  disabled={isOutOfStock}
                  onClick={handleIncrement}
                  className="p-2 hover:bg-slate-50 text-slate-600 transition-colors border-l border-slate-100"
                >
                  <Plus size={14} />
                </button>
              </div>
              <div className="text-right">
                <span className="text-gray-400 text-[10px] block uppercase font-bold tracking-tighter">Total</span>
                <span className="font-bold text-slate-900 text-base">${isOutOfStock ? "0.00" : subtotal}</span>
              </div>
            </div>

            <button 
              disabled={isOutOfStock}
              className={`w-full py-3 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${
                isOutOfStock 
                ? 'bg-slate-200 text-slate-400 cursor-not-allowed' 
                : 'bg-green-500 hover:bg-green-600 text-white shadow-md shadow-green-100 active:scale-[0.98]'
              }`}
            >
              <ShoppingCart size={16} />
              {isOutOfStock ? 'Unavailable' : 'Add to Cart'}
            </button>
          </div>
        </div>
      </div>

      {/* Related Products Section */}
      {related.length > 0 && (
        <section className="border-t border-gray-100 pt-10">
          <h3 className="text-lg font-bold text-slate-900 mb-6">Related Products</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {related.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ProductDetail;