"use client";
import { useState } from 'react';
import Link from "next/link";
import Image from "next/image";
import { useTranslation } from 'react-i18next';
import { 
  FiMenu, FiX, FiSearch, FiUser, FiTruck, FiDollarSign, 
  FiMapPin, FiShoppingBag, FiMessageSquare, FiStar, FiPlus, FiMic 
} from "react-icons/fi";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function GeminiChatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setMessages([...messages, { role: "user", content: input }]);
    setInput("");
    try {
      const res = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=YOUR_GEMINI_API_KEY", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contents: [{ parts: [{ text: input }] }] })
      });
      const data = await res.json();
      const answer = data.candidates?.[0]?.content?.parts?.[0]?.text || "No response.";
      setMessages(msgs => [...msgs, { role: "bot", content: answer }]);
    } catch (err) {
      setMessages(msgs => [...msgs, { role: "bot", content: "Error fetching response." }]);
    }
    setLoading(false);
  };

  return (
    <>
      <button
        className="fixed bottom-6 right-6 bg-green-600 text-white p-4 rounded-full shadow-lg z-50 hover:bg-green-700"
        onClick={() => setOpen(true)}
        title="Chat with Agri AI"
      >
        💬
      </button>
      {open && (
        <div className="fixed bottom-20 right-6 bg-white rounded-xl shadow-2xl w-80 h-96 flex flex-col z-50 border border-green-600">
          <div className="flex justify-between items-center p-4 border-b">
            <span className="font-bold text-green-700">Agri AI Chatbot</span>
            <button onClick={() => setOpen(false)} className="text-gray-500 hover:text-red-500">✖️</button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-2">
            {messages.map((msg, idx) => (
              <div key={idx} className={`text-sm ${msg.role === "user" ? "text-right text-green-700" : "text-left text-gray-700"}`}>
                <span className="block">{msg.content}</span>
              </div>
            ))}
            {loading && <div className="text-gray-400 text-xs">Typing...</div>}
          </div>
          <div className="p-4 border-t flex gap-2">
            <input
              className="flex-1 border rounded px-2 py-1"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Ask about crops, loans, weather..."
              onKeyDown={e => e.key === "Enter" && sendMessage()}
              disabled={loading}
            />
            <button
              className="bg-green-600 text-white px-3 py-1 rounded"
              onClick={sendMessage}
              disabled={loading}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}

const HomePage = () => {
  const { t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-green-50">
      {/* Sticky Header */}
      <header className="sticky top-0 bg-white/95 backdrop-blur-sm border-b border-green-100 z-50">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-green-700 flex items-center gap-2">
            AgriFinAI
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-green-700 border-b-2 border-green-700 font-semibold">{t('Home')}</Link>
              <Link href="/weather" className="text-gray-600 hover:text-green-700 transition-colors font-medium">{t('Weather')}</Link>
              <Link href="/loan" className="text-gray-600 hover:text-green-700 transition-colors font-medium">{t('Loan')}</Link>
              <Link href="/soil-health" className="text-gray-600 hover:text-green-700 transition-colors font-medium">{t('Soil Health')}</Link>
            </div>

          {/* Right Section */}
          <div className="hidden md:flex items-center gap-4">
            <Link href="/login" className="p-2 hover:bg-green-50 rounded-full">
              <FiUser className="w-6 h-6 text-green-600" />
            </Link>
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 hover:bg-green-50 rounded-full"
            >
              <FiMenu className="w-6 h-6 text-green-600" />
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
          </button>
        </nav>
      </header>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-white z-50 p-6">
          <div className="space-y-6">
            <div className="border-b pb-6">
              <Link href="/" className="text-2xl font-bold text-green-700">AgriConnect</Link>
            </div>
            
            <div className="space-y-4">
              <Link href="/marketplace" className="block text-xl py-3 border-b">Marketplace</Link>
              <Link href="/weather" className="block text-xl py-3 border-b">Weather</Link>
              <Link href="/loan" className="block text-xl py-3 border-b">Loan</Link>
              <Link href="/news" className="block text-xl py-3 border-b">News</Link>
              <Link href="/contact" className="block text-xl py-3 border-b">Contact</Link>
            </div>
            
            <div className="pt-6">
              <Link 
                href="/login" 
                className="bg-green-600 text-white px-6 py-4 rounded-xl block text-center text-lg font-semibold"
              >
                Login / Sign Up
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Marketplace Header */}
        <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-green-900">Agri Marketplace</h1>
            <p className="text-green-600 mt-2">Direct from farms across India</p>
          </div>
        </div>

        {/* Sorting Bar */}
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-green-100 mb-6 flex flex-wrap gap-4 items-center">
          <span className="text-green-600">1,234 Listings Found</span>
          <select className="bg-green-50 px-4 py-2 rounded-lg">
            <option>Sort by: Newest First</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
            <option>Rating: Highest First</option>
          </select>
        </div>

        {/* Product Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1,2,3,4,5,6,7,8].map((item) => (
            <div key={item} className="bg-white rounded-2xl shadow-sm border border-green-100 overflow-hidden hover:shadow-md transition-shadow">
              <div className="aspect-square relative">
                <Image
                  src="https://images.unsplash.com/photo-1551754655-cd27e38d2076"
                  alt="Product"
                  fill
                  className="object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-green-900/60 p-4">
                  <div className="flex justify-between items-center">
                    <span className="text-white font-bold">₹2,500/Q</span>
                    <div className="flex items-center gap-1 text-amber-300">
                      <FiStar className="w-4 h-4 fill-current" />
                      <span className="text-sm">4.8</span>
                    </div>
                  </div>
                </div>
                <span className="absolute top-2 left-2 bg-green-600 text-white px-2 py-1 rounded-full text-xs">
                  Verified Seller
                </span>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg mb-1">Organic Wheat</h3>
                <div className="flex items-center gap-2 text-sm text-green-600 mb-2">
                  <FiUser className="w-4 h-4" />
                  <span>Rajesh Farms</span>
                  <FiMapPin className="w-4 h-4 ml-2" />
                  <span>Punjab</span>
                </div>
                <div className="flex gap-2 mt-4">
                  <button className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors">
                    Buy Now
                  </button>
                  <button className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg transition-colors">
                    <FiMessageSquare className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-8 flex justify-center gap-2">
          {[1,2,3,4].map((page) => (
            <button 
              key={page} 
              className={`w-10 h-10 rounded-lg ${page === 1 ? 'bg-green-600 text-white' : 'bg-green-50 text-green-600'}`}
            >
              {page}
            </button>
          ))}
        </div>

        {/* New CTA Section */}
        <section className="bg-green-100 py-12 mt-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-green-900 mb-4">
              Ready to Sell Your Farm Products?
            </h2>
            <p className="text-green-600 mb-8 max-w-xl mx-auto text-lg">
              Join thousands of farmers already growing their business on AgriConnect
            </p>
            <Link 
              href="/sell" 
              className="inline-block bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all shadow-lg"
            >
              Start Selling Now
            </Link>
          </div>
        </section>
      </main>

      {/* Floating Action Button */}
      <Link href="/sell" className="fixed bottom-4 right-4 bg-green-600 text-white p-4 rounded-full shadow-lg md:hidden">
        <FiPlus className="w-6 h-6" />
      </Link>

      {/* Footer */}
      <footer className="bg-green-900 text-white p-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h3 className="text-xl font-bold mb-2">Agri Marketplace</h3>
            <p className="text-green-200">Direct from farms across India</p>
          </div>
          
          <div className="grid grid-cols-2 gap-4 text-sm mb-6">
            <div>
              <h4 className="font-bold mb-2">Quick Links</h4>
              <ul className="space-y-1 text-green-200">
                <li><Link href="/about">About</Link></li>
                <li><Link href="/terms">Terms</Link></li>
                <li><Link href="/privacy">Privacy</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-2">Newsletter</h4>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Email"
                  className="flex-1 px-3 py-2 rounded text-gray-900"
                />
                <button className="bg-green-600 px-3 py-2 rounded">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
          
          <div className="text-center text-green-300 text-sm">
            © 2024 AgriConnect. Empowering farmers.
          </div>
        </div>
      </footer>
      <GeminiChatbot />
    </div>
  );
};

export default HomePage;