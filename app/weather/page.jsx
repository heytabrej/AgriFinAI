"use client";
import { useState } from 'react';
import { FiMapPin, FiSearch, FiSun, FiDroplet, FiWind, FiCloudRain, FiThermometer, FiArrowRight } from 'react-icons/fi';
import Link from 'next/link';

// A more robust component to parse simple markdown (bold and list items)
const SimpleMarkdownParser = ({ text }) => {
  const lines = text.split('\n');
  const elements = [];

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i];

    // Handle list items
    if (line.trim().startsWith('* ') || line.trim().startsWith('- ')) {
      const itemContent = line.trim().substring(2);
      const parts = itemContent.split(/(\*\*.*?\*\*)/g); // Split by bold tags
      elements.push(
        <li key={i} className="ml-5 list-disc text-gray-700">
          {parts.map((part, j) =>
            part.startsWith('**') && part.endsWith('**') ? (
              <strong key={j} className="font-semibold text-gray-800">{part.slice(2, -2)}</strong>
            ) : (
              part
            )
          )}
        </li>
      );
      continue;
    }

    // Handle bold-only lines as headings
    if (line.trim().startsWith('**') && line.trim().endsWith('**')) {
      elements.push(
        <h3 key={i} className="font-bold text-lg text-green-900 mt-4 mb-2">{line.trim().slice(2, -2)}</h3>
      );
      continue;
    }
    
    // Handle regular paragraphs
    if (line.trim()) {
       const parts = line.split(/(\*\*.*?\*\*)/g);
       elements.push(
         <p key={i} className="my-1 text-gray-700">
           {parts.map((part, j) =>
             part.startsWith('**') && part.endsWith('**') ? (
               <strong key={j} className="font-semibold text-gray-800">{part.slice(2, -2)}</strong>
             ) : (
               part
             )
           )}
         </p>
       );
    }
  }
  return <div>{elements}</div>;
};


const WeatherPage = () => {
  const [location, setLocation] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchGeminiRecommendations = async (location, forecast) => {
    try {
      const geminiApiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
      const startDate = new Date();
      const endDate = new Date();
      endDate.setMonth(startDate.getMonth() + 3);
      const dateRange = `${startDate.toLocaleDateString()} to ${endDate.toLocaleDateString()}`;
      
      const prompt = `
You are an expert agronomist and AI advisor for Indian farmers.
Based on the weather forecast for ${location} from ${dateRange}, provide a crop growing plan for the next 3 months.

For each month, list:
- Recommended crops (based on weather and seasonality)
- Key actions (land prep, sowing, irrigation, fertilization, pest/disease management, harvesting)
- Any important local advice for ${location}

Requirements:
- Limit your answer to 200-250 words.
- Format your answer using markdown: use double asterisks (**) for headings and bold text, bullet points for lists.
- Always cite your sources (public datasets, government portals, etc.) and explain your reasoning for reliability.
- If possible, respond in the user's local language if specified.

Weather data: ${JSON.stringify(forecast)}
`;

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
      if (result.candidates && result.candidates.length > 0) {
        return result.candidates[0].content.parts[0].text;
      }
      throw new Error("Failed to get recommendation from AI.");
    } catch (err) {
      console.error("Error fetching Gemini recommendations:", err);
      return "Could not load AI recommendations at this time.";
    }
  };

  const fetchWeatherData = async () => {
    if (!location) {
      setError('Please enter a location.');
      return;
    }
    setLoading(true);
    setError('');
    setWeatherData(null);

    try {
      const weatherApiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
      const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${weatherApiKey}&units=metric`);
      if (!response.ok) throw new Error('Location not found. Please try again.');
      
      const data = await response.json();
      
      const dailyData = data.list.reduce((acc, entry) => {
        const date = entry.dt_txt.split(' ')[0];
        if (!acc[date]) {
          acc[date] = [];
        }
        acc[date].push(entry);
        return acc;
      }, {});

      const dailyForecast = Object.keys(dailyData).slice(0, 7).map(date => {
        const dayEntries = dailyData[date];
        const entry = dayEntries.find(e => e.dt_txt.includes("12:00:00")) || dayEntries[0];
        return {
          day: new Date(entry.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' }),
          temp: Math.round(entry.main.temp),
          humidity: entry.main.humidity,
          rainfall: entry.rain?.['3h'] || 0,
          wind: entry.wind.speed,
          description: entry.weather[0].description,
          icon: `https://openweathermap.org/img/wn/${entry.weather[0].icon}@2x.png`
        };
      });

      const geminiRecommendation = await fetchGeminiRecommendations(location, dailyForecast);

      setWeatherData({
        city: data.city.name,
        country: data.city.country,
        forecast: dailyForecast,
        recommendations: geminiRecommendation
      });
    } catch (err) {
      setError(err.message || 'Failed to fetch weather data');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchWeatherData();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 bg-white/80 backdrop-blur-sm z-50 shadow-sm">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link href="/" className="text-3xl font-bold text-green-700">AgriConnect</Link>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-gray-600 hover:text-green-700 transition-colors font-medium">Home</Link>
              <Link href="/weather" className="text-green-700 border-b-2 border-green-700 font-semibold">Weather</Link>
              <Link href="/loan" className="text-gray-600 hover:text-green-700 transition-colors font-medium">Loan</Link>
              <Link href="/contact" className="text-gray-600 hover:text-green-700 transition-colors font-medium">Contact</Link>
            </div>
          </div>
        </nav>
      </header>

      <main className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        {/* Search Section */}
        <section className="bg-white rounded-2xl shadow-lg p-8 mb-8 border border-gray-100">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Weather & Crop Advisory</h1>
          <p className="text-gray-600 mb-6">Get real-time weather forecasts and AI-powered farming recommendations.</p>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-grow">
              <FiMapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Enter your city or district..."
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all disabled:bg-green-400"
            >
              {loading ? 'Loading...' : <><FiSearch /><span>Get Forecast</span></>}
            </button>
          </form>
          {error && <p className="text-red-500 mt-4">{error}</p>}
        </section>

        {/* Weather Display Section */}
        {weatherData ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column: Forecast */}
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">7-Day Forecast for {weatherData.city}</h2>
                <div className="space-y-4">
                  {weatherData.forecast.map((day, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <img src={day.icon} alt={day.description} className="w-10 h-10" />
                        <div>
                          <p className="font-bold text-gray-800">{day.day}</p>
                          <p className="text-sm text-gray-500 capitalize">{day.description}</p>
                        </div>
                      </div>
                      <p className="font-bold text-lg text-gray-800">{day.temp}°C</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Recommendations */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-2xl font-bold text-green-800 mb-4">AI-Powered Growing Recommendations</h2>
                <div className="p-4 bg-green-50/50 rounded-lg border-l-4 border-green-500">
                   <SimpleMarkdownParser text={weatherData.recommendations} />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-2xl shadow-lg">
            <FiSun className="mx-auto h-16 w-16 text-gray-300" />
            <h3 className="mt-4 text-xl font-semibold text-gray-800">Your Weather Insights Await</h3>
            <p className="mt-2 text-gray-500">Enter a location above to get started.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default WeatherPage;