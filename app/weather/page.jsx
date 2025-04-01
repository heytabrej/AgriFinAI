"use client";
import { useState } from 'react';
import { FiSearch, FiSun, FiDroplet, FiWind, FiCloudRain } from 'react-icons/fi';
import Link from 'next/link';

const WeatherPage = () => {
  const [location, setLocation] = useState('');
  const [query, setQuery] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [products, setProducts] = useState([]);

  const fetchWeatherData = async () => {
    try {
      setLoading(true);
      const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${apiKey}&units=metric`
      );
      
      if (!response.ok) throw new Error('City not found');
      const data = await response.json();

      // Process 5-day forecast data
      const dailyForecast = data.list.reduce((acc, entry) => {
        const date = new Date(entry.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' });
        if (!acc.find(item => item.day === date)) {
          acc.push({
            day: date,
            temp: entry.main.temp,
            humidity: entry.main.humidity,
            rainfall: entry.rain?.['3h'] || 0,
            wind: entry.wind.speed
          });
        }
        return acc;
      }, []).slice(0, 5);

      // Generate recommendations based on forecast
      const maxRainfall = Math.max(...dailyForecast.map(day => day.rainfall));
      const maxWind = Math.max(...dailyForecast.map(day => day.wind));
      const avgTemp = dailyForecast.reduce((sum, day) => sum + day.temp, 0) / dailyForecast.length;

      const transformedData = {
        forecast: dailyForecast,
        recommendations: [
          avgTemp > 25 ? 'Provide shade for heat-sensitive plants' : 'Suitable for cool-weather crops',
          maxRainfall > 10 ? 'Install drainage system for heavy rain' : 'Regular irrigation recommended',
          maxWind > 15 ? 'Secure plants and use windbreaks' : 'Normal wind conditions expected'
        ]
      };

      setWeatherData(transformedData);
      setError('');
    } catch (err) {
      setError(err.message || 'Failed to fetch weather data');
    } finally {
      setLoading(false);
    }
  };

  const mockProducts = [
    {
      id: 1,
      name: 'Organic Tomatoes',
      price: 45,
      quantity: 500,
      location: 'Maharashtra',
      quality: 'Grade AA',
      contact: '+91 98765 43210',
      image: 'https://images.unsplash.com/photo-1582284540020-8acbe03f4924?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    },
    // Add more mock products as needed
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (location && query) {
      await fetchWeatherData();
      // Replace with actual API call for products
      setProducts(mockProducts);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white p-4 sm:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Search Section */}
        <form onSubmit={handleSubmit} className="mb-8 bg-white rounded-3xl p-8 shadow-xl border border-green-100">
          <h1 className="text-3xl font-bold text-green-900 mb-6 text-center">FarmConnect Marketplace</h1>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="relative">
              <FiSun className="absolute left-3 top-4 text-green-600 w-6 h-6" />
              <input
                type="text"
                placeholder="Enter location (e.g., Maharashtra)"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border-2 border-green-100 rounded-2xl focus:border-green-500 text-lg"
              />
            </div>
            <div className="relative">
              <FiSearch className="absolute left-3 top-4 text-green-600 w-6 h-6" />
              <input
                type="text"
                placeholder="Search crops (e.g., Tomatoes)"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border-2 border-green-100 rounded-2xl focus:border-green-500 text-lg"
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="mt-6 bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-2xl font-bold text-lg w-full transition-all"
          >
            {loading ? 'Searching...' : 'Find Local Produce'}
          </button>
        </form>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        {/* Product List */}
        {products.length > 0 && (
          <div className="bg-white rounded-2xl p-6 shadow-lg mb-8">
            <h2 className="text-2xl font-bold text-green-900 mb-6">Available {query} near {location}</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {products.map((product) => (
                <Link 
                  href={`/products/${product.id}`}
                  key={product.id}
                  className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 group"
                >
                  <div className="aspect-video overflow-hidden rounded-xl mb-4">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-green-900 mb-2">{product.name}</h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-green-700">
                      <FiSun className="flex-shrink-0" />
                      <span>{product.quality} Grade</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <FiDroplet className="flex-shrink-0" />
                      <span>{product.quantity} kg available</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <FiWind className="flex-shrink-0" />
                      <span>{product.location}</span>
                    </div>
                  </div>
                  <div className="mt-4 bg-green-50 px-4 py-2 rounded-full w-fit text-sm font-semibold text-green-700">
                    Contact Seller →
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Weather Forecast */}
        {weatherData && (
          <div className="space-y-8">
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h2 className="text-2xl font-bold text-green-900 mb-6">7-Day Weather Forecast</h2>
              <div className="grid grid-cols-2 sm:grid-cols-7 gap-2">
                {weatherData.forecast.map((day, index) => (
                  <div key={index} className="bg-green-50 p-4 rounded-xl text-center">
                    <h3 className="font-semibold mb-2">{day.day}</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-1 justify-center">
                        <FiSun className="text-amber-500" />
                        <span>{day.temp}°C</span>
                      </div>
                      <div className="flex items-center gap-1 justify-center">
                        <FiDroplet className="text-blue-500" />
                        <span>{day.humidity}%</span>
                      </div>
                      <div className="flex items-center gap-1 justify-center">
                        <FiCloudRain className="text-blue-300" />
                        <span>{day.rainfall}mm</span>
                      </div>
                      <div className="flex items-center gap-1 justify-center">
                        <FiWind className="text-gray-500" />
                        <span>{day.wind}km/h</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommendations */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h2 className="text-2xl font-bold text-green-900 mb-6">Growing Recommendations</h2>
              <div className="space-y-4">
                {weatherData.recommendations.map((rec, index) => (
                  <div key={index} className="flex items-start gap-3 p-4 bg-green-50 rounded-xl">
                    <div className="bg-green-600 text-white p-2 rounded-lg">
                      <FiSun className="w-5 h-5" />
                    </div>
                    <p className="flex-1 text-green-800">{rec}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherPage; 