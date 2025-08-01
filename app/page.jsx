"use client";
import '../i18n';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FiPhone, FiChevronRight, FiMapPin, FiShoppingBag, FiSun, FiDroplet, FiNavigation, FiX, FiSearch, FiStar, FiArrowRight, FiMenu } from 'react-icons/fi';
import ProductImage from '../components/ProductImage';
import { foodItems } from '../assets/assets';
import i18n from 'i18next';
import { useTranslation } from 'react-i18next';

const stateToLanguage = {
  "Maharashtra": "mr",
  "Punjab": "pa",
  "Gujarat": "gu",
  "West Bengal": "bn",
  "Tamil Nadu": "ta",
  "Karnataka": "kn",
  "Uttar Pradesh": "hi",
};

const LandingPage = () => {
  const { t } = useTranslation();
  const [locationError, setLocationError] = useState('');
  const [isLocating, setIsLocating] = useState(false);
  const [detectedArea, setDetectedArea] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(foodItems);

  useEffect(() => {
    if (navigator.language) {
      const browserLanguage = navigator.language.substring(0, 2);
      if (i18n.language !== browserLanguage) {
        i18n.changeLanguage(browserLanguage);
      }
    }
  }, []);

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
          const response = await fetch(
            `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}`
          );
          const data = await response.json();
          if (data.length > 0) {
            const area = data[0].state || data[0].name;
            setDetectedArea(area);
            filterProductsByLocation(area);
          } else {
            setLocationError("Could not determine location from coordinates.");
          }
        } catch (error) {
          setLocationError('Could not detect your location');
          console.error("Location detection error:", error);
        }
        setIsLocating(false);
      },
      (error) => {
        setLocationError('Please enable location access to see local products');
        setIsLocating(false);
        console.error("Geolocation error:", error);
      }
    );
  };

  const filterProductsByLocation = (area) => {
    const filtered = foodItems.filter(product =>
      product.origin && product.origin.toLowerCase().includes(area.toLowerCase())
    );
    setFilteredProducts(filtered);
    const lang = stateToLanguage[area];
    if (lang && i18n.language !== lang) {
      i18n.changeLanguage(lang);
    }
  };

  const handleManualSearch = () => {
    if (searchQuery.trim()) {
      filterProductsByLocation(searchQuery.trim());
      setDetectedArea(searchQuery.trim());
    }
  };

  const clearFilters = () => {
    setFilteredProducts(foodItems);
    setDetectedArea('');
    setSearchQuery('');
    if (i18n.language !== 'en') {
      i18n.changeLanguage('en');
    }
  };

  return (
    <div className="bg-gray-50 text-gray-800">
      {/* Header */}
      <header className="sticky top-0 bg-white/80 backdrop-blur-sm z-50 shadow-sm">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link href="/" className="text-3xl font-bold text-green-700">
              AgriFinAI
            </Link>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-green-700 border-b-2 border-green-700 font-semibold">{t('Home')}</Link>
              <Link href="/weather" className="text-gray-600 hover:text-green-700 transition-colors font-medium">{t('Weather')}</Link>
              <Link href="/loan" className="text-gray-600 hover:text-green-700 transition-colors font-medium">{t('Loan')}</Link>
              <Link href="/soil-health" className="text-gray-600 hover:text-green-700 transition-colors font-medium">{t('Soil Health')}</Link>
            </div>
            <div className="hidden md:flex items-center">
              <Link href="/login" className="bg-green-600 text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-green-700 transition-all">
                {t('Login / Register')}
              </Link>
            </div>
            <button className="md:hidden p-2">
              <FiMenu className="h-6 w-6 text-gray-600" />
            </button>
          </div>
        </nav>
      </header>

      <main>
        {/* Hero Section */}
        <section className="relative bg-green-50/50 pt-24 pb-32">
          <div className="absolute inset-0 bg-[url('/hero-bg-pattern.svg')] opacity-5"></div>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
            <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
              <span className="bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent">{t('Connecting Farmers')}</span> {t('Directly with Buyers')}
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-10">
              {t('Discover fresh produce straight from local farms. Quality, transparency, and fair prices, all in one place.')}
            </p>
            
            <div className="max-w-2xl mx-auto bg-white p-4 rounded-xl shadow-lg flex items-center gap-2">
              <FiSearch className="text-gray-400 w-5 h-5 ml-2" />
              <input
                type="text"
                placeholder={t('Enter location or product...')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleManualSearch()}
                className="w-full p-2 bg-transparent focus:outline-none text-lg"
              />
              <button
                onClick={getLocation}
                disabled={isLocating}
                className="p-3 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors disabled:opacity-50"
                aria-label={t('Use My Location')}
              >
                <FiNavigation className="w-5 h-5 text-gray-600" />
              </button>
              <button
                onClick={handleManualSearch}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition-colors"
              >
                <span>{t('Search')}</span>
              </button>
            </div>
            {locationError && <p className="mt-4 text-red-500">{locationError}</p>}
          </div>
        </section>

        {/* Products Section */}
        <section className="py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center mb-12">
              <div>
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">{t('Fresh Produce Available')}</h2>
                {detectedArea && (
                  <p className="mt-2 text-lg text-green-700 font-medium flex items-center gap-2">
                    <FiMapPin />
                    {t('Showing products near')} {detectedArea}
                  </p>
                )}
              </div>
              {detectedArea && (
                <button 
                  onClick={clearFilters}
                  className="mt-4 md:mt-0 text-gray-500 hover:text-red-600 flex items-center gap-2 transition-colors"
                >
                  <span>{t('Clear Filters')}</span>
                  <FiX className="w-5 h-5" />
                </button>
              )}
            </div>

            {filteredProducts.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-xl shadow-sm">
                <FiShoppingBag className="mx-auto h-16 w-16 text-gray-300" />
                <h3 className="mt-4 text-xl font-semibold text-gray-800">{t('No products found')}</h3>
                <p className="mt-2 text-gray-500">{detectedArea ? `${t('Try a different location or')} ` : ''}{t('show all products')}.</p>
                <button
                  onClick={clearFilters}
                  className="mt-6 bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-all"
                >
                  {t('Show All Products')}
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {filteredProducts.map((product) => (
                  <div key={product.id} className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group">
                    <div className="relative">
                      <ProductImage 
                        src={product.image}
                        alt={product.name}
                        className="h-56 w-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      <span className="absolute top-4 left-4 bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-semibold">{t(product.category)}</span>
                      <div className="absolute bottom-4 left-4 text-white">
                        <h3 className="text-xl font-bold">{t(product.name)}</h3>
                        <p className="text-sm opacity-90 flex items-center gap-1"><FiMapPin size={14} /> {t(product.origin)}</p>
                      </div>
                    </div>
                    <div className="p-5">
                      <p className="text-gray-600 text-sm mb-4 h-10 overflow-hidden">{t(product.description)}</p>
                      <div className="flex justify-between items-center">
                        <p className="text-2xl font-bold text-green-700">{t(product.price)}</p>
                        <div className="flex items-center gap-1 text-amber-500">
                          <FiStar className="fill-current" />
                          <span className="font-bold text-gray-700">{product.rating}</span>
                        </div>
                      </div>
                      <Link href={`/foods/${product.id}`} className="mt-5 block w-full bg-green-50 text-green-700 text-center py-3 rounded-lg font-semibold hover:bg-green-100 hover:text-green-800 transition-colors">
                        {t('View Details')}
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
        
        {/* How It Works Section */}
        <section className="bg-white py-16 lg:py-24">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">{t('Simple Steps to Fresh Produce')}</h2>
              <p className="mt-4 text-lg text-gray-600">{t('Connecting farms to your table has never been easier.')}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="p-6">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mx-auto mb-5">
                  <FiSearch className="w-8 h-8 text-green-700" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{t('1. Search & Discover')}</h3>
                <p className="text-gray-600">{t('Find local farmers and the freshest produce in your area with a simple search.')}</p>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mx-auto mb-5">
                  <FiPhone className="w-8 h-8 text-green-700" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{t('2. Connect Directly')}</h3>
                <p className="text-gray-600">{t('Contact farmers directly to ask questions, negotiate prices, and arrange pickup.')}</p>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mx-auto mb-5">
                  <FiShoppingBag className="w-8 h-8 text-green-700" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{t('3. Enjoy Freshness')}</h3>
                <p className="text-gray-600">{t('Enjoy high-quality, farm-fresh products, knowing you’re supporting local agriculture.')}</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">AgriConnect</h3>
              <p className="text-gray-400 text-sm">{t('Connecting farmers and buyers directly since 2023')}</p>
            </div>
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-4">{t('Quick Links')}</h4>
              <ul className="space-y-2">
                <li><Link href="/about" className="text-gray-300 hover:text-white text-sm">{t('About Us')}</Link></li>
                <li><Link href="/contact" className="text-gray-300 hover:text-white text-sm">{t('Contact')}</Link></li>
                <li><Link href="/faq" className="text-gray-300 hover:text-white text-sm">{t('FAQ')}</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-4">{t('Legal')}</h4>
              <ul className="space-y-2">
                <li><Link href="/privacy" className="text-gray-300 hover:text-white text-sm">{t('Privacy Policy')}</Link></li>
                <li><Link href="/terms" className="text-gray-300 hover:text-white text-sm">{t('Terms of Service')}</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-4">{t('Connect')}</h4>
              <div className="flex space-x-4">
                <Link href="#" className="text-gray-400 hover:text-white"><span className="sr-only">Facebook</span><svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg></Link>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500 text-sm">
            <p>&copy; {new Date().getFullYear()} AgriConnect. {t('All rights reserved.')}</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;