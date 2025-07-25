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

  const fetchGeminiRecommendations = async (location, forecast) => {
    try {
      const geminiApiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
      // Get today's date and 3 months ahead
      const startDate = new Date();
      const endDate = new Date();
      endDate.setMonth(startDate.getMonth() + 3);
      const dateRange = `${startDate.toLocaleDateString()} to ${endDate.toLocaleDateString()}`;

      const prompt = `You are an expert agronomist. Based on the weather forecast for ${location} from ${dateRange}, provide a detailed crop growing plan for the next 3 months. 
For each month, list:
- Recommended crops (based on weather and seasonality)
- Key actions (land prep, sowing, irrigation, fertilization, pest/disease management, harvesting)
- Any important local advice for ${location}
Weather data: ${JSON.stringify(forecast)}.
Format your answer as clear bullet points grouped by month, with month headings in bold (e.g., **Month 1: July 25th - August 24th**).`;

      const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-goog-api-key': geminiApiKey
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }]
        })
      });
      const result = await response.json();
      return result?.candidates?.[0]?.content?.parts?.[0]?.text || 'No recommendation available';
    } catch (err) {
      return 'Failed to fetch recommendations from Gemini';
    }
  };

  const fetchWeatherData = async () => {
    try {
      setLoading(true);
      const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${apiKey}&units=metric`
      );
      if (!response.ok) {
        const errorData = await response.json();
        console.error('API Error:', errorData);
        throw new Error('City not found');
      }
      const data = await response.json();

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

      // Get recommendations from Gemini LLM
      const geminiRecommendation = await fetchGeminiRecommendations(location, dailyForecast);
      console.log('Gemini Recommendation:', geminiRecommendation);

      const transformedData = {
        forecast: dailyForecast,
        recommendations: [geminiRecommendation]
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
              <div className="space-y-8">
                {weatherData.recommendations[0]
                  .split(/\n(?=\*\*Month)/) // Split at each month heading
                  .map((section, idx) => {
                    const headingMatch = section.match(/\*\*(Month.*)\*\*/);
                    const heading = headingMatch ? headingMatch[1] : null;
                    // Extract crop recommendations block
                    const cropRecMatch = section.match(/Recommended Crops[\s\S]*?(?=Key Actions|$)/i);
                    const cropRec = cropRecMatch ? cropRecMatch[0] : null;
                    // Extract local advice block
                    const adviceMatch = section.match(/Local Advice[\s\S]*?(?=\*\*Month|\nMonth|$)/i);
                    const advice = adviceMatch ? adviceMatch[0] : null;
                    // Extract bullet/action points
                    const points = section
                      .split('\n')
                      .filter(line =>
                        line.trim().startsWith('-') ||
                        line.trim().startsWith('•') ||
                        line.trim().startsWith('*')
                      );
                    return (
                      <div key={idx} className="p-6 bg-green-50 rounded-xl border-l-4 border-green-600 shadow space-y-4">
                        {heading && (
                          <h3 className="text-green-900 font-bold text-xl mb-2 flex items-center gap-2">
                            <FiSun className="text-green-600" />
                            {heading}
                          </h3>
                        )}
                        {cropRec && (
                          <div className="bg-green-100 rounded-lg p-4 mb-2">
                            <h4 className="font-semibold text-green-800 mb-2">Crop Recommendations</h4>
                            <ul className="list-none pl-0 space-y-2">
                              {cropRec.split('\n').filter(l => l.trim().length > 0 && !l.toLowerCase().includes('recommended crops')).map((l, i) => {
                                const boldMatch = l.match(/\*\*(.+?)\*\*/);
                                if (boldMatch) {
                                  const title = boldMatch[1].replace(/:$/, '').trim();
                                  const rest = l.replace(/\*\*(.+?)\*\*/, '').replace(/^[-•*]\s*/, '').trim();
                                  return (
                                    <li key={i} className="mb-1">
                                      <span className="text-green-900 font-bold">{title}</span>
                                      {rest && <span className="text-green-700 ml-2">{rest}</span>}
                                    </li>
                                  );
                                }
                                return (
                                  <li key={i} className="text-green-700">{l.replace(/^[-•*]\s*/, '')}</li>
                                );
                              })}
                            </ul>
                          </div>
                        )}
                        <ul className="list-disc pl-5 space-y-2">
                          {points.map((point, i) => {
                            // Detect and extract bolded headings (e.g., **Pulses:**)
                            const boldMatch = point.match(/\*\*(.+?)\*\*/);
                            if (boldMatch) {
                              const title = boldMatch[1].replace(/:$/, '').trim();
                              const rest = point.replace(/\*\*(.+?)\*\*/, '').replace(/^[-•*]\s*/, '').trim();
                              return (
                                <li key={i} className="text-green-900 font-bold text-base mb-1">
                                  {title}
                                  {rest && <span className="text-green-800 font-normal ml-2">{rest}</span>}
                                </li>
                              );
                            }
                            return (
                              <li key={i} className="text-green-800">{point.replace(/^[-•*]\s*/, '')}</li>
                            );
                          })}
                        </ul>

                      </div>
                    );
                  })}
                {/* Disclaimer */}
               
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherPage;