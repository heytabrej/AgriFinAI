"use client";
import { useState, useEffect } from 'react';
import Link from "next/link";
import Image from "next/image";
import { useTranslation } from 'react-i18next';
import { 
  FiMenu, FiX, FiSearch, FiUser, FiTruck, FiDollarSign, 
  FiMapPin, FiShoppingBag, FiMessageSquare, FiStar, FiPlus, 
  FiMic, FiHeart, FiEye, FiFilter, FiGrid, FiList, FiTrendingUp,
  FiAward, FiShield, FiClock, FiPhone, FiMail
} from "react-icons/fi";
import ProductImage from '@/components/ProductImage';
import { foodItems } from '@/assets/assets';
import '@/i18n';

const HomePage = () => {
  const { t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(foodItems);
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('newest');
  const [selectedCategory, setSelectedCategory] = useState('all');
  // Add inquiry modal state
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showInquiryModal, setShowInquiryModal] = useState(false);
  const [inquiryForm, setInquiryForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    quantity: ''
  });

  const categories = ['all', 'vegetables', 'fruits', 'grains', 'dairy'];
  
  useEffect(() => {
    let filtered = foodItems;
    
    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => 
        product.category.toLowerCase() === selectedCategory
      );
    }
    
    // Filter by search query
    if (searchQuery.trim()) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.origin.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Sort products
    filtered = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'price-low': return parseFloat(a.price.replace(/[^\d.]/g, '')) - parseFloat(b.price.replace(/[^\d.]/g, ''));
        case 'price-high': return parseFloat(b.price.replace(/[^\d.]/g, '')) - parseFloat(a.price.replace(/[^\d.]/g, ''));
        case 'rating': return b.rating - a.rating;
        default: return b.id - a.id;
      }
    });
    
    setFilteredProducts(filtered);
  }, [searchQuery, selectedCategory, sortBy]);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSortBy('newest');
  };

  // Handle product click to open inquiry modal
  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setShowInquiryModal(true);
  };

  // Handle inquiry form submission
  const handleInquirySubmit = (e) => {
    e.preventDefault();
    // Here you can add your form submission logic
    console.log('Inquiry submitted:', {
      product: selectedProduct,
      inquiry: inquiryForm
    });
    alert('Your inquiry has been sent to the farmer successfully!');
    
    // Reset form and close modal
    setInquiryForm({
      name: '',
      email: '',
      phone: '',
      message: '',
      quantity: ''
    });
    setShowInquiryModal(false);
    setSelectedProduct(null);
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    setInquiryForm({
      ...inquiryForm,
      [e.target.name]: e.target.value
    });
  };

  // Close modal
  const closeModal = () => {
    setShowInquiryModal(false);
    setSelectedProduct(null);
    setInquiryForm({
      name: '',
      email: '',
      phone: '',
      message: '',
      quantity: ''
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
      {/* Inquiry Modal */}
      {showInquiryModal && selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center gap-4">
                <ProductImage 
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{selectedProduct.name}</h2>
                  <p className="text-green-600 font-semibold">{selectedProduct.price}</p>
                </div>
              </div>
              <button 
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600 p-2"
              >
                <FiX className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Send Inquiry to Farmer</h3>
              
              <form onSubmit={handleInquirySubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Your Name *</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={inquiryForm.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={inquiryForm.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={inquiryForm.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      placeholder="Enter your phone number"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Quantity Needed</label>
                    <input
                      type="text"
                      name="quantity"
                      value={inquiryForm.quantity}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      placeholder="e.g., 10 kg"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Message *</label>
                  <textarea
                    name="message"
                    required
                    rows="4"
                    value={inquiryForm.message}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder="Please describe your requirements, preferred delivery date, etc."
                  ></textarea>
                </div>

                {/* Product Details Summary */}
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-900 mb-2">Product Details:</h4>
                  <div className="text-sm text-green-800 space-y-1">
                    <p><span className="font-medium">Product:</span> {selectedProduct.name}</p>
                    <p><span className="font-medium">Price:</span> {selectedProduct.price}</p>
                    <p><span className="font-medium">Origin:</span> {selectedProduct.origin}</p>
                    <p><span className="font-medium">Category:</span> {selectedProduct.category}</p>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-500 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <FiMail className="w-5 h-5" />
                    Send Inquiry
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Enhanced Header */}
      <header className="sticky top-0 bg-white/95 backdrop-blur-lg border-b border-green-100 z-50 shadow-sm">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-green-600 to-emerald-500 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">A</span>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent">
                AgriFinAI
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              <Link href="/" className="text-green-700 border-b-2 border-green-700 font-semibold px-2 py-1">
                {t('Home')}
              </Link>
              <Link href="/weather" className="text-gray-600 hover:text-green-700 transition-all duration-300 font-medium px-2 py-1 rounded-lg hover:bg-green-50">
                {t('Weather')}
              </Link>
              <Link href="/loan" className="text-gray-600 hover:text-green-700 transition-all duration-300 font-medium px-2 py-1 rounded-lg hover:bg-green-50">
                {t('Loan')}
              </Link>
              <Link href="/soil-health" className="text-gray-600 hover:text-green-700 transition-all duration-300 font-medium px-2 py-1 rounded-lg hover:bg-green-50">
                {t('Soil Health')}
              </Link>
            </div>

            {/* Right Section */}
            <div className="hidden lg:flex items-center space-x-4">
              <div className="relative">
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-gray-50 w-64"
                />
              </div>
              <Link href="/profile" className="p-2 hover:bg-green-50 rounded-lg transition-colors">
                <FiUser className="w-5 h-5 text-green-600" />
              </Link>
              <Link href="/sell" className="bg-gradient-to-r from-green-600 to-emerald-500 text-white px-6 py-2.5 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                Sell Products
              </Link>
            </div>

            {/* Mobile Menu Toggle */}
            <button 
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-white z-50 lg:hidden">
          <div className="p-6">
            <div className="flex justify-between items-center mb-8">
              <span className="text-2xl font-bold text-green-700">AgriFinAI</span>
              <button onClick={() => setIsMenuOpen(false)}>
                <FiX className="w-6 h-6" />
              </button>
            </div>
            
            <div className="space-y-6">
              <div className="relative mb-6">
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500"
                />
              </div>
              
              <nav className="space-y-4">
                <Link href="/" className="block text-xl py-3 text-green-700 font-semibold border-b border-green-100">Home</Link>
                <Link href="/weather" className="block text-xl py-3 text-gray-700 border-b border-gray-100">Weather</Link>
                <Link href="/loan" className="block text-xl py-3 text-gray-700 border-b border-gray-100">Loan</Link>
                <Link href="/soil-health" className="block text-xl py-3 text-gray-700 border-b border-gray-100">Soil Health</Link>
              </nav>
              
              <div className="pt-6">
                <Link 
                  href="/sell" 
                  className="block w-full bg-green-600 text-white px-6 py-4 rounded-xl text-center text-lg font-semibold"
                >
                  Start Selling
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative overflow-hidden py-16 lg:py-24">
        <div className="absolute inset-0 bg-gradient-to-r from-green-600/10 to-emerald-600/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                🌱 India's Leading Agri Marketplace
              </div>
              <h1 className="text-4xl lg:text-6xl font-extrabold leading-tight">
                <span className="bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent">
                  Farm Fresh
                </span>
                <br />
                <span className="text-gray-900">Direct to You</span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed max-w-xl">
                Connect directly with local farmers. Get the freshest produce at fair prices while supporting sustainable agriculture.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  href="#marketplace" 
                  className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-500 text-white rounded-xl font-semibold hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  Browse Products
                  <FiShoppingBag className="ml-2 w-5 h-5" />
                </Link>
                <Link 
                  href="/sell" 
                  className="inline-flex items-center justify-center px-8 py-4 border-2 border-green-600 text-green-700 rounded-xl font-semibold hover:bg-green-50 transition-all duration-300"
                >
                  Become a Seller
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-400 rounded-3xl transform rotate-3 opacity-20"></div>
              <Image
                src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&h=400&fit=crop"
                alt="Fresh produce"
                width={600}
                height={400}
                className="relative rounded-3xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { number: "5,000+", label: "Active Farmers", icon: FiUser },
              { number: "₹2Cr+", label: "Transactions", icon: FiDollarSign },
              { number: "50+", label: "Cities", icon: FiMapPin },
              { number: "4.8★", label: "Rating", icon: FiStar }
            ].map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 group-hover:shadow-lg transition-all duration-300">
                  <stat.icon className="w-8 h-8 text-green-600 mx-auto mb-4" />
                  <h3 className="text-2xl lg:text-3xl font-bold text-green-700 mb-2">
                    {stat.number}
                  </h3>
                  <p className="text-gray-600 font-medium">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Marketplace Section */}
      <section id="marketplace" className="py-16 lg:py-24 bg-gradient-to-br from-gray-50 to-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Fresh <span className="bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent">Marketplace</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover premium quality produce directly from verified farmers across India
            </p>
          </div>

          {/* Filters & Controls */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
            <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
              {/* Category Filters */}
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                      selectedCategory === category
                        ? 'bg-green-600 text-white shadow-lg'
                        : 'bg-gray-100 text-gray-700 hover:bg-green-100 hover:text-green-700'
                    }`}
                  >
                    {category === 'all' ? 'All Products' : category.charAt(0).toUpperCase() + category.slice(1)}
                  </button>
                ))}
              </div>

              {/* Sort & View Controls */}
              <div className="flex items-center gap-4">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 bg-white"
                >
                  <option value="newest">Newest First</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>

                <div className="flex bg-gray-100 rounded-lg">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-white shadow-sm' : ''}`}
                  >
                    <FiGrid className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-white shadow-sm' : ''}`}
                  >
                    <FiList className="w-5 h-5" />
                  </button>
                </div>

                {(selectedCategory !== 'all' || searchQuery) && (
                  <button
                    onClick={clearFilters}
                    className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    Clear Filters
                  </button>
                )}
              </div>
            </div>

            {/* Results Info */}
            <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
              <span>{filteredProducts.length} products found</span>
              {searchQuery && (
                <span>Showing results for "{searchQuery}"</span>
              )}
            </div>
          </div>

          {/* Products Grid/List */}
          {filteredProducts.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl shadow-lg">
              <FiShoppingBag className="mx-auto h-16 w-16 text-gray-300 mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">No products found</h3>
              <p className="text-gray-500 mb-6">Try adjusting your filters or search terms</p>
              <button
                onClick={clearFilters}
                className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
              >
                Show All Products
              </button>
            </div>
          ) : (
            <div className={`grid ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1'} gap-8`}>
              {filteredProducts.map((product) => (
                <div key={product.id} className={`bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2 group cursor-pointer ${viewMode === 'list' ? 'flex' : ''}`}>
                  <div 
                    onClick={() => handleProductClick(product)}
                    className={`relative ${viewMode === 'list' ? 'w-48 flex-shrink-0' : ''}`}
                  >
                    <ProductImage 
                      src={product.image}
                      alt={product.name}
                      className={`object-cover ${viewMode === 'list' ? 'h-full w-full' : 'h-56 w-full'}`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    <span className="absolute top-4 left-4 bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                      <FiShield className="w-3 h-3" />
                      Verified
                    </span>
                    <button className="absolute top-4 right-4 p-2 bg-white/90 rounded-full hover:bg-white transition-colors">
                      <FiHeart className="w-4 h-4 text-gray-600 hover:text-red-500" />
                    </button>
                    {viewMode === 'grid' && (
                      <div className="absolute bottom-4 left-4 text-white">
                        <h3 className="text-lg font-bold">{product.name}</h3>
                        <p className="text-sm opacity-90 flex items-center gap-1">
                          <FiMapPin className="w-3 h-3" /> {product.origin}
                        </p>
                      </div>
                    )}
                  </div>
                  
                  <div 
                    onClick={() => handleProductClick(product)}
                    className={`p-6 ${viewMode === 'list' ? 'flex-1 flex flex-col justify-between' : ''}`}
                  >
                    {viewMode === 'list' && (
                      <div className="mb-4">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{product.name}</h3>
                        <p className="text-gray-600 flex items-center gap-1 mb-2">
                          <FiMapPin className="w-4 h-4" /> {product.origin}
                        </p>
                      </div>
                    )}
                    
                    <div className={viewMode === 'list' ? 'mb-4' : 'mb-6'}>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {product.description}
                      </p>
                    </div>
                    
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-1 text-amber-500">
                        <FiStar className="w-4 h-4 fill-current" />
                        <span className="font-bold text-gray-700">{product.rating}</span>
                        <span className="text-xs text-gray-500">(120 reviews)</span>
                      </div>
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-semibold">
                        {product.category}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <p className="text-2xl font-bold text-green-700">{product.price}</p>
                        <p className="text-sm text-gray-500">per kg</p>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <FiClock className="w-4 h-4" />
                        <span>Fresh today</span>
                      </div>
                    </div>
                    
                    <div className="flex gap-3">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleProductClick(product);
                        }}
                        className="flex-1 bg-gradient-to-r from-green-600 to-emerald-500 text-white text-center py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
                      >
                        <FiMail className="w-4 h-4" />
                        Send Inquiry
                      </button>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleProductClick(product);
                        }}
                        className="px-4 py-3 border-2 border-green-600 text-green-600 rounded-xl hover:bg-green-50 transition-colors"
                      >
                        <FiMessageSquare className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Load More */}
          {filteredProducts.length > 0 && (
            <div className="text-center mt-12">
              <button className="bg-white border-2 border-green-600 text-green-600 px-8 py-4 rounded-xl font-semibold hover:bg-green-50 transition-all duration-300">
                Load More Products
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Why Choose <span className="bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent">AgriFinAI</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience the future of agriculture with our comprehensive platform
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: FiShield,
                title: "Verified Farmers",
                description: "All our farmers are verified and follow sustainable farming practices"
              },
              {
                icon: FiTruck,
                title: "Fast Delivery",
                description: "Get fresh produce delivered to your doorstep within 24 hours"
              },
              {
                icon: FiDollarSign,
                title: "Best Prices",
                description: "Fair prices for farmers and competitive rates for buyers"
              },
              {
                icon: FiAward,
                title: "Quality Assured",
                description: "Premium quality products with satisfaction guarantee"
              },
              {
                icon: FiMessageSquare,
                title: "Direct Communication",
                description: "Chat directly with farmers to know your food's story"
              },
              {
                icon: FiTrendingUp,
                title: "Support Local",
                description: "Help local farmers grow their business and community"
              }
            ].map((feature, index) => (
              <div key={index} className="group text-center p-6">
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:shadow-lg transition-all duration-300 group-hover:scale-110">
                  <feature.icon className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-emerald-500">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Ready to Transform Agriculture?
          </h2>
          <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
            Join thousands of farmers and buyers who are already part of our sustainable agriculture ecosystem.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/sell" 
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-green-600 rounded-xl font-semibold hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              Start Selling Today
              <FiPlus className="ml-2 w-5 h-5" />
            </Link>
            <Link 
              href="/contact" 
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white rounded-xl font-semibold hover:bg-white hover:text-green-600 transition-all duration-300"
            >
              Contact Us
              <FiMail className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-green-600 to-emerald-500 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-lg">A</span>
                </div>
                <span className="text-2xl font-bold">AgriFinAI</span>
              </div>
              <p className="text-gray-400 leading-relaxed">
                Connecting farmers with buyers for a sustainable agricultural future.
              </p>
              <div className="flex space-x-4">
                <Link href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-green-600 transition-colors">
                  <span className="text-sm">f</span>
                </Link>
                <Link href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-green-600 transition-colors">
                  <span className="text-sm">t</span>
                </Link>
                <Link href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-green-600 transition-colors">
                  <span className="text-sm">in</span>
                </Link>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link href="/about" className="text-gray-400 hover:text-white transition-colors">About Us</Link></li>
                <li><Link href="/weather" className="text-gray-400 hover:text-white transition-colors">Weather</Link></li>
                <li><Link href="/loan" className="text-gray-400 hover:text-white transition-colors">Loans</Link></li>
                <li><Link href="/soil-health" className="text-gray-400 hover:text-white transition-colors">Soil Health</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Support</h3>
              <ul className="space-y-2">
                <li><Link href="/help" className="text-gray-400 hover:text-white transition-colors">Help Center</Link></li>
                <li><Link href="/contact" className="text-gray-400 hover:text-white transition-colors">Contact Us</Link></li>
                <li><Link href="/faq" className="text-gray-400 hover:text-white transition-colors">FAQ</Link></li>
                <li><Link href="/terms" className="text-gray-400 hover:text-white transition-colors">Terms of Service</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <FiPhone className="w-5 h-5 text-green-500" />
                  <span className="text-gray-400">+91 123 456 7890</span>
                </div>
                <div className="flex items-center gap-3">
                  <FiMail className="w-5 h-5 text-green-500" />
                  <span className="text-gray-400">hello@agrifinai.com</span>
                </div>
                <div className="flex items-center gap-3">
                  <FiMapPin className="w-5 h-5 text-green-500" />
                  <span className="text-gray-400">Mumbai, India</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center">
            <p className="text-gray-400">
              © {new Date().getFullYear()} AgriFinAI. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;