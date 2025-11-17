"use client";
import { useState } from 'react';
import { FiArrowLeft, FiPhone, FiMail, FiMapPin } from 'react-icons/fi';
import Link from 'next/link';
import Image from 'next/image';

const ProductDetailsPage = ({ params }) => {
  const [showNumber, setShowNumber] = useState(false);
  const [activeTab, setActiveTab] = useState('contact');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    quantity: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
    alert('Your inquiry has been sent to the farmer!');
  };

  // Replace with actual API call to fetch product by ID
  const product = {
    id: 1,
    name: 'Organic Tomatoes',
    price: 45,
    quantity: 500,
    location: 'Maharashtra',
    quality: 'Grade AA',
    contact: '+91 98765 43210',
    image: 'https://images.unsplash.com/photo-1582284540020-8acbe03f4924?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    description: 'Fresh organic tomatoes grown with natural fertilizers, perfect for salads and cooking'
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white p-4 sm:p-8">
      <div className="max-w-4xl mx-auto">
        <Link href="/weather" className="mb-4 inline-flex items-center text-green-600 hover:text-green-800">
          <FiArrowLeft className="mr-2" /> Back to Products
        </Link>

        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <div className="grid gap-8 md:grid-cols-2">
            <Image
              src={product.image}
              alt={product.name}
              width={400}
              height={256}
              className="w-full h-64 object-cover rounded-xl"
              onError={(e) => { e.target.src = '/fallback-product.jpg'; }}
            />
            
            <div className="space-y-4">
              <h1 className="text-3xl font-bold text-green-900">{product.name}</h1>
              <p className="text-lg text-gray-600">{product.description}</p>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-green-50 p-4 rounded-xl">
                  <p className="font-semibold text-green-700">Grade</p>
                  <p className="text-gray-600">{product.quality}</p>
                </div>
                <div className="bg-green-50 p-4 rounded-xl">
                  <p className="font-semibold text-green-700">Available Quantity</p>
                  <p className="text-gray-600">{product.quantity} kg</p>
                </div>
              </div>

              {/* Contact Tabs */}
              <div className="mt-6">
                <div className="flex border-b border-green-100">
                  <button
                    onClick={() => setActiveTab('contact')}
                    className={`px-4 py-2 font-medium ${activeTab === 'contact' ? 'border-b-2 border-green-600 text-green-700' : 'text-gray-500'}`}
                  >
                    Direct Contact
                  </button>
                  <button
                    onClick={() => setActiveTab('inquiry')}
                    className={`px-4 py-2 font-medium ${activeTab === 'inquiry' ? 'border-b-2 border-green-600 text-green-700' : 'text-gray-500'}`}
                  >
                    Send Inquiry
                  </button>
                </div>

                {activeTab === 'contact' ? (
                  <div className="bg-green-50 p-6 rounded-b-2xl">
                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <div className="bg-green-100 p-3 rounded-lg">
                          <FiPhone className="w-6 h-6 text-green-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Verified Contact Number</p>
                          {showNumber ? (
                            <a href={`tel:${product.contact}`} className="text-lg font-semibold text-green-700 hover:underline">
                              {product.contact}
                              <span className="ml-2 text-sm text-green-600">(Tap to call)</span>
                            </a>
                          ) : (
                            <button
                              onClick={() => setShowNumber(true)}
                              className="text-lg font-semibold text-green-600 hover:text-green-700 flex items-center gap-2"
                            >
                              <FiPhone className="w-5 h-5" />
                              Reveal Contact Number
                            </button>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="bg-green-100 p-3 rounded-lg">
                          <FiMapPin className="w-6 h-6 text-green-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Farm Location</p>
                          <p className="text-lg font-semibold text-green-700">{product.location}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="bg-green-50 p-6 rounded-b-2xl space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                      <input
                        type="text"
                        required
                        className="w-full px-4 py-2 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Your Email</label>
                      <input
                        type="email"
                        required
                        className="w-full px-4 py-2 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Desired Quantity (kg)</label>
                      <input
                        type="number"
                        min="1"
                        max={product.quantity}
                        className="w-full px-4 py-2 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        value={formData.quantity}
                        onChange={(e) => setFormData({...formData, quantity: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                      <textarea
                        rows="4"
                        required
                        className="w-full px-4 py-2 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                        placeholder="Enter your inquiry details..."
                      ></textarea>
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2"
                    >
                      <FiMail className="w-5 h-5" />
                      Send Inquiry
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;