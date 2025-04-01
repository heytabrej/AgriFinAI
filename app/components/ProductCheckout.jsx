import { useEffect, useState } from 'react';
import { FiX, FiPhone } from 'react-icons/fi';

const ProductCheckout = ({ product, onClose }) => {
  const [showNumber, setShowNumber] = useState(false);

  if (!product) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl p-6 max-w-md w-full relative">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <FiX className="w-6 h-6" />
        </button>
        
        <h2 className="text-2xl font-bold text-green-900 mb-4">{product.name}</h2>
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-48 object-cover rounded-xl mb-4"
        />
        <div className="space-y-2">
          <p><span className="font-semibold">Price:</span> ₹{product.price}/kg</p>
          <p><span className="font-semibold">Quantity Available:</span> {product.quantity} kg</p>
          <p><span className="font-semibold">Location:</span> {product.location}</p>
          <p><span className="font-semibold">Quality Grade:</span> {product.quality}</p>
        </div>
        
        <div className="mt-6">
          {!showNumber ? (
            <button
              onClick={() => setShowNumber(true)}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2"
            >
              <FiPhone className="w-5 h-5" />
              Show Contact Number
            </button>
          ) : (
            <a
              href={`tel:${product.contact}`}
              className="w-full bg-green-100 text-green-800 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-green-200"
            >
              <FiPhone className="w-5 h-5" />
              {product.contact}
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCheckout; 