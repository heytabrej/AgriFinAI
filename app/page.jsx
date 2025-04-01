"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FiPhone, FiChevronRight, FiMapPin, FiShoppingBag, FiSun, FiDroplet, FiNavigation, FiX, FiSearch } from 'react-icons/fi';
import Image from 'next/image';
import ProductImage from '../components/ProductImage';

const LandingPage = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [locationError, setLocationError] = useState('');
  const [isLocating, setIsLocating] = useState(false);
  const [detectedArea, setDetectedArea] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([
    {
      id: 1,
      name: 'Organic Tomatoes',
      grade: 'Grade AA',
      quantity: '500 kg',
      location: 'Maharashtra',
      contact: '+91 98765 43210',
      image: 'https://images.unsplash.com/photo-1582284540020-8acbe03f4924?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=600&q=80',
      description: 'Fresh organic tomatoes grown with natural fertilizers, perfect for salads and cooking'
    },
    {
      id: 2,
      name: 'Premium Potatoes',
      grade: 'Grade A',
      quantity: '1200 kg',
      location: 'Punjab',
      contact: '+91 98765 43211',
      image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba654?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=600&q=80',
      description: 'High-quality potatoes with low moisture content, ideal for frying and baking'
    },
    {
      id: 3,
      name: 'Fresh Spinach',
      grade: 'Grade AAA',
      quantity: '300 kg',
      location: 'Karnataka',
      contact: '+91 98765 43212',
      image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=600&q=80',
      description: 'Tender spinach leaves packed with nutrients, harvested daily'
    },
    {
      id: 4,
      name: 'Carrots',
      grade: 'Grade AA',
      quantity: '800 kg',
      location: 'Uttar Pradesh',
      contact: '+91 98765 43213',
      image: 'https://images.unsplash.com/photo-1447175008436-054170c2e979?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=600&q=80',
      description: 'Sweet and crunchy carrots rich in beta-carotene'
    },
    {
      id: 5,
      name: 'Cauliflower',
      grade: 'Grade A',
      quantity: '600 kg',
      location: 'Gujarat',
      contact: '+91 98765 43214',
      image: 'https://images.unsplash.com/photo-159428817964-5d1467f493e9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=600&q=80',
      description: 'Fresh white cauliflower heads, pesticide-free'
    },
    {
      id: 6,
      name: 'Brinjal',
      grade: 'Grade AA',
      quantity: '400 kg',
      location: 'Tamil Nadu',
      contact: '+91 98765 43215',
      image: 'https://images.unsplash.com/photo-1594287389-0a81a734b5a1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=600&q=80',
      description: 'Purple brinjals with firm texture, perfect for curries'
    },
    {
      id: 7,
      name: 'Capsicum',
      grade: 'Grade AAA',
      quantity: '350 kg',
      location: 'Haryana',
      contact: '+91 98765 43216',
      image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=600&q=80',
      description: 'Colorful capsicums available in red, yellow, and green varieties'
    },
    {
      id: 8,
      name: 'Okra',
      grade: 'Grade A',
      quantity: '450 kg',
      location: 'Rajasthan',
      contact: '+91 98765 43217',
      image: 'https://images.unsplash.com/photo-1602848592593-95c5a09a00d0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=600&q=80',
      description: 'Tender okra with minimal fiber content'
    },
    {
      id: 9,
      name: 'Cabbage',
      grade: 'Grade AA',
      quantity: '700 kg',
      location: 'West Bengal',
      contact: '+91 98765 43218',
      image: 'https://images.unsplash.com/photo-1572357015441-81e1eb8e98c3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=600&q=80',
      description: 'Compact cabbage heads with crisp leaves'
    },
    {
      id: 10,
      name: 'Green Beans',
      grade: 'Grade AAA',
      quantity: '250 kg',
      location: 'Kerala',
      contact: '+91 98765 43219',
      image: 'https://images.unsplash.com/photo-1592614521197-ff0b46cda57c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=600&q=80',
      description: 'Tender green beans with high nutritional value'
    }
  ]);

  const products = [
    {
      id: 1,
      name: 'Organic Tomatoes',
      grade: 'Grade AA',
      quantity: '500 kg',
      location: 'Maharashtra',
      contact: '+91 98765 43210',
      image: 'https://images.unsplash.com/photo-1582284540020-8acbe03f4924?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=600&q=80',
      description: 'Fresh organic tomatoes grown with natural fertilizers, perfect for salads and cooking'
    },
    {
      id: 2,
      name: 'Premium Potatoes',
      grade: 'Grade A',
      quantity: '1200 kg',
      location: 'Punjab',
      contact: '+91 98765 43211',
      image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba654?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=600&q=80',
      description: 'High-quality potatoes with low moisture content, ideal for frying and baking'
    },
    {
      id: 3,
      name: 'Fresh Spinach',
      grade: 'Grade AAA',
      quantity: '300 kg',
      location: 'Karnataka',
      contact: '+91 98765 43212',
      image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=600&q=80',
      description: 'Tender spinach leaves packed with nutrients, harvested daily'
    },
    {
      id: 4,
      name: 'Carrots',
      grade: 'Grade AA',
      quantity: '800 kg',
      location: 'Uttar Pradesh',
      contact: '+91 98765 43213',
      image: 'https://images.unsplash.com/photo-1447175008436-054170c2e979?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=600&q=80',
      description: 'Sweet and crunchy carrots rich in beta-carotene'
    },
    {
      id: 5,
      name: 'Cauliflower',
      grade: 'Grade A',
      quantity: '600 kg',
      location: 'Gujarat',
      contact: '+91 98765 43214',
      image: 'https://images.unsplash.com/photo-159428817964-5d1467f493e9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=600&q=80',
      description: 'Fresh white cauliflower heads, pesticide-free'
    },
    {
      id: 6,
      name: 'Brinjal',
      grade: 'Grade AA',
      quantity: '400 kg',
      location: 'Tamil Nadu',
      contact: '+91 98765 43215',
      image: 'https://images.unsplash.com/photo-1594287389-0a81a734b5a1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=600&q=80',
      description: 'Purple brinjals with firm texture, perfect for curries'
    },
    {
      id: 7,
      name: 'Capsicum',
      grade: 'Grade AAA',
      quantity: '350 kg',
      location: 'Haryana',
      contact: '+91 98765 43216',
      image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=600&q=80',
      description: 'Colorful capsicums available in red, yellow, and green varieties'
    },
    {
      id: 8,
      name: 'Okra',
      grade: 'Grade A',
      quantity: '450 kg',
      location: 'Rajasthan',
      contact: '+91 98765 43217',
      image: 'https://images.unsplash.com/photo-1602848592593-95c5a09a00d0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=600&q=80',
      description: 'Tender okra with minimal fiber content'
    },
    {
      id: 9,
      name: 'Cabbage',
      grade: 'Grade AA',
      quantity: '700 kg',
      location: 'West Bengal',
      contact: '+91 98765 43218',
      image: 'https://images.unsplash.com/photo-1572357015441-81e1eb8e98c3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=600&q=80',
      description: 'Compact cabbage heads with crisp leaves'
    },
    {
      id: 10,
      name: 'Green Beans',
      grade: 'Grade AAA',
      quantity: '250 kg',
      location: 'Kerala',
      contact: '+91 98765 43219',
      image: 'https://images.unsplash.com/photo-1592614521197-ff0b46cda57c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=600&q=80',
      description: 'Tender green beans with high nutritional value'
    }
  ];

  // Get user's location
  const getLocation = () => {
    setIsLocating(true);
    setLocationError('');
    
    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by your browser');
      setIsLocating(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          // Reverse geocoding to get city/state
          const response = await fetch(
            `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}`
          );
          const data = await response.json();
          
          if (data.length > 0) {
            const area = data[0].state || data[0].name;
            setDetectedArea(area);
            filterProductsByLocation(area);
          }
        } catch (error) {
          setLocationError('Could not detect your location');
        }
        setIsLocating(false);
      },
      (error) => {
        setLocationError('Please enable location access to see local products');
        setIsLocating(false);
      }
    );
  };

  // Filter products by location
  const filterProductsByLocation = (area) => {
    const filtered = products.filter(product => 
      product.location.toLowerCase().includes(area.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  const handleManualSearch = () => {
    if (searchQuery.trim()) {
      filterProductsByLocation(searchQuery.trim());
      setDetectedArea(searchQuery.trim());
    }
  };

  // Add clear filters function
  const clearFilters = () => {
    setFilteredProducts(products);
    setDetectedArea('');
    setSearchQuery('');
  };

  const handleImageError = (e) => {
    e.target.src = '/fallback-product.jpg'; // Create this image in public folder
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Location Detection Banner */}
      <div className="bg-green-50 p-4">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <FiMapPin className="text-green-600" />
            {detectedArea ? (
              <span className="font-medium">Showing products near {detectedArea}</span>
            ) : (
              <span>Discover local produce in your area</span>
            )}
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Enter location (e.g. Maharashtra)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-4 py-2 border rounded-lg flex-1"
            />
            <button
              onClick={handleManualSearch}
              className="bg-green-600 text-white px-4 py-2 rounded-lg"
            >
              Search
            </button>
          </div>
          <button
            onClick={getLocation}
            disabled={isLocating}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 disabled:opacity-50"
          >
            <FiNavigation className="w-4 h-4" />
            {isLocating ? 'Detecting...' : 'Use My Location'}
          </button>
        </div>
      </div>

      {/* Error Message */}
      {locationError && (
        <div className="bg-red-50 p-4 text-red-700 text-center">
          {locationError}
        </div>
      )}

      {/* Header */}
      <header className="bg-white shadow-sm fixed w-full z-50">
        <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0">
              <span className="text-2xl font-bold text-green-700">AgriConnect</span>
            </div>
            <div className="hidden md:flex space-x-8">
              <Link href="/" className="text-gray-600 hover:text-green-700 transition-colors">Home</Link>
              <Link href="/weather" className="text-gray-600 hover:text-green-700 transition-colors">Weather</Link>
              <Link href="/loan" className="text-gray-600 hover:text-green-700 transition-colors">Loan</Link>
              <Link href="/contact" className="text-gray-600 hover:text-green-700 transition-colors">Contact</Link>
            </div>
            <button className="md:hidden p-2">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="flex-grow pt-16">
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                Connecting Farmers Directly with Buyers
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Discover fresh produce straight from local farms
              </p>
              
              {/* Location Search Integration */}
              <div className="max-w-2xl mx-auto">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1 relative">
                    <FiMapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Enter your location (e.g. Maharashtra)"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={handleManualSearch}
                      className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-colors"
                    >
                      <FiSearch className="w-5 h-5" />
                      Search
                    </button>
                    <button
                      onClick={getLocation}
                      disabled={isLocating}
                      className="bg-green-100 hover:bg-green-200 text-green-700 px-6 py-3 rounded-lg flex items-center gap-2 transition-colors disabled:opacity-50"
                    >
                      <FiNavigation className="w-5 h-5" />
                      {isLocating ? 'Detecting...' : 'Use My Location'}
                    </button>
                  </div>
                </div>
                
                {detectedArea && (
                  <div className="mt-4 text-green-700 flex items-center justify-center gap-2">
                    <FiMapPin className="w-5 h-5" />
                    Showing results for: {detectedArea}
                    <button 
                      onClick={clearFilters}
                      className="text-red-600 hover:text-red-700 ml-2"
                    >
                      <FiX className="w-5 h-5" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Featured Products */}
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900">Fresh Produce Available</h2>
              {detectedArea && (
                <button 
                  onClick={clearFilters}
                  className="text-green-600 hover:text-green-800 flex items-center gap-2"
                >
                  <span>Clear Filters</span>
                  <FiX className="w-4 h-4" />
                </button>
              )}
            </div>
            
            {filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-500 mb-4">No products found in {detectedArea}</div>
                <button
                  onClick={clearFilters}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg"
                >
                  Show All Products
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProducts.map((product) => (
                  <div key={product.id} className="bg-white rounded-2xl shadow-lg overflow-hidden transition-transform hover:scale-105">
                    <ProductImage 
                      src={product.image}
                      alt={product.name}
                    />
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{product.name}</h3>
                      <div className="space-y-2 text-gray-600">
                        <div className="flex items-center gap-2">
                          <FiSun className="text-green-600" />
                          <span>{product.grade}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <FiShoppingBag className="text-green-600" />
                          <span>{product.quantity}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <FiMapPin className="text-green-600" />
                          <span>{product.location}</span>
                        </div>
                      </div>
                      <Link href={`/products/${product.id}`} className="mt-4 inline-flex items-center text-green-700 hover:text-green-900">
                        <span>Contact Seller</span>
                        <FiChevronRight className="ml-1" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">AgriConnect</h3>
              <p className="text-gray-400">Connecting farmers and buyers directly since 2023</p>
            </div>
            <div>
              <h4 className="text-sm font-semibold uppercase mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link href="/about" className="text-gray-400 hover:text-white">About Us</Link></li>
                <li><Link href="/contact" className="text-gray-400 hover:text-white">Contact</Link></li>
                <li><Link href="/faq" className="text-gray-400 hover:text-white">FAQ</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold uppercase mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><Link href="/privacy" className="text-gray-400 hover:text-white">Privacy Policy</Link></li>
                <li><Link href="/terms" className="text-gray-400 hover:text-white">Terms of Service</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold uppercase mb-4">Connect</h4>
              <div className="flex space-x-4">
                <Link href="#" className="text-gray-400 hover:text-white">
                  <span className="sr-only">Facebook</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </Link>
                {/* Add other social icons */}
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
            <p>&copy; 2023 AgriConnect. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage; 