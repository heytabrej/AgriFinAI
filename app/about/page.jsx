import Link from 'next/link';
import { FiUsers, FiTarget, FiEye } from 'react-icons/fi';

const AboutPage = () => {
  return (
    <div className="bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 bg-white/80 backdrop-blur-sm z-50 shadow-sm">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link href="/" className="text-3xl font-bold text-green-700">AgriConnect</Link>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-gray-600 hover:text-green-700 transition-colors font-medium">Home</Link>
              <Link href="/weather" className="text-gray-600 hover:text-green-700 transition-colors font-medium">Weather</Link>
              <Link href="/loan" className="text-gray-600 hover:text-green-700 transition-colors font-medium">Loan</Link>
            </div>
          </div>
        </nav>
      </header>

      <main className="py-16 lg:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">About AgriConnect</h1>
            <p className="mt-4 text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              Empowering farmers by bridging the gap between traditional agriculture and modern technology.
            </p>
          </div>

          <div className="mt-16 grid md:grid-cols-3 gap-8 text-center">
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <FiTarget className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Our Mission</h2>
              <p className="text-gray-600">To create a transparent, efficient, and profitable ecosystem for farmers by providing direct market access, financial tools, and data-driven insights.</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <FiEye className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Our Vision</h2>
              <p className="text-gray-600">To be the most trusted digital partner for every farmer in India, fostering sustainable agriculture and ensuring food security for the nation.</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <FiUsers className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Our Values</h2>
              <p className="text-gray-600">Integrity, Innovation, Farmer-Centricity, and Sustainability are the core principles that guide every decision we make.</p>
            </div>
          </div>

          <div className="mt-20 bg-white p-10 rounded-xl shadow-lg">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">The Story Behind AgriConnect</h2>
            <div className="prose prose-lg max-w-none text-gray-700">
              <p>AgriConnect was born from a simple yet powerful idea: to leverage technology to solve the age-old problems faced by Indian farmers. From unpredictable weather patterns to exploitation by middlemen, the challenges were immense. We embarked on a journey, guided by the principles of Design Thinking, to build a platform that is not just a tool, but a true companion for farmers.</p>
              <p>By talking to hundreds of farmers, we understood their need for fair prices, reliable information, and access to capital. This led to the creation of our core features: a direct-to-market platform, AI-powered weather advisories, and a streamlined loan application process. We are committed to continuously evolving and innovating to serve the agricultural community better.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AboutPage;