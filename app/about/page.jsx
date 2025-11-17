import Link from 'next/link';
import Image from 'next/image';
import { 
  FiUsers, 
  FiTarget, 
  FiEye, 
  FiAward, 
  FiTrendingUp, 
  FiShield, 
  FiHeart,
  FiArrowRight,
  FiGlobe,
  FiCheckCircle
} from 'react-icons/fi';

const AboutPage = () => {
  const stats = [
    { number: "10,000+", label: "Farmers Connected" },
    { number: "₹50Cr+", label: "Transactions Facilitated" },
    { number: "500+", label: "Villages Reached" },
    { number: "15", label: "States Covered" }
  ];

  const features = [
    { icon: FiGlobe, title: "Direct Market Access", description: "Connect farmers directly with buyers, eliminating middlemen" },
    { icon: FiShield, title: "AI-Powered Insights", description: "Smart recommendations for crops, weather, and financial planning" },
    { icon: FiTrendingUp, title: "Financial Inclusion", description: "Easy access to loans, insurance, and government schemes" },
    { icon: FiHeart, title: "Community Support", description: "24/7 multilingual support and farmer community" }
  ];

  const team = [
    {
      name: "Tabrej",
      role: "Software Engineer and AI Specialist ",
      image: "https://media.licdn.com/dms/image/v2/D5603AQEBvyQZb1cs6g/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1675180873842?e=2147483647&v=beta&t=w8_M6CoXueWiSmiQE02fPKVjhLSS5cv3JM3gaMKm5EA",
      description: "Agricultural scientist with 10+ years of experience in rural development"
    }
  ];

  return (
    <div className="bg-gradient-to-br from-green-50 via-white to-blue-50 min-h-screen">
      {/* Header */}
      <header className="sticky top-0 bg-white/90 backdrop-blur-lg z-50 shadow-sm border-b border-green-100">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link href="/" className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent">
              AgriFinAI
            </Link>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-gray-600 hover:text-green-700 transition-all duration-300 font-medium">Home</Link>
              <Link href="/weather" className="text-gray-600 hover:text-green-700 transition-all duration-300 font-medium">Weather</Link>
              <Link href="/loan" className="text-gray-600 hover:text-green-700 transition-all duration-300 font-medium">Loan</Link>
              <Link href="/about" className="text-green-700 border-b-2 border-green-700 font-semibold">About</Link>
            </div>
            <Link 
              href="/contact" 
              className="hidden md:block bg-gradient-to-r from-green-600 to-emerald-500 text-white px-6 py-2.5 rounded-full font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              Get Started
            </Link>
          </div>
        </nav>
      </header>

      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden py-20 lg:py-32">
          <div className="absolute inset-0 bg-gradient-to-br from-green-600/10 via-transparent to-blue-600/10"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-green-100 text-green-700 text-sm font-semibold">
                  🌱 Empowering Indian Agriculture
                </div>
                <h1 className="text-5xl lg:text-7xl font-extrabold leading-tight">
                  <span className="bg-gradient-to-r from-green-600 via-emerald-500 to-blue-600 bg-clip-text text-transparent">
                    Revolutionizing
                  </span>
                  <br />
                  <span className="text-gray-900">Farm Life</span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed max-w-xl">
                  We're bridging the gap between traditional agriculture and modern technology, 
                  empowering farmers with AI-driven insights, direct market access, and financial inclusion.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link 
                    href="/weather" 
                    className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-500 text-white rounded-xl font-semibold hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  >
                    Explore Platform
                    <FiArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                  <Link 
                    href="#story" 
                    className="inline-flex items-center justify-center px-8 py-4 border-2 border-green-600 text-green-700 rounded-xl font-semibold hover:bg-green-50 transition-all duration-300"
                  >
                    Our Story
                  </Link>
                </div>
              </div>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-blue-500 rounded-3xl transform rotate-3 opacity-20"></div>
                <div className="relative bg-white rounded-3xl p-8 shadow-2xl">
                  <Image
                    src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&h=400&fit=crop"
                    alt="Modern farming technology"
                    width={600}
                    height={400}
                    className="rounded-2xl object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center group">
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 group-hover:shadow-lg transition-all duration-300">
                    <h3 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent">
                      {stat.number}
                    </h3>
                    <p className="text-gray-600 font-medium mt-2">{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mission, Vision, Values */}
        <section className="py-20 bg-gradient-to-br from-gray-50 to-green-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Our <span className="bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent">Foundation</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Built on strong principles and driven by a clear vision for the future of agriculture
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              <div className="group bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105">
                <div className="bg-gradient-to-br from-green-100 to-emerald-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <FiTarget className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
                <p className="text-gray-600 leading-relaxed">
                  To create a transparent, efficient, and profitable ecosystem for farmers by providing 
                  direct market access, AI-powered insights, and comprehensive financial tools.
                </p>
              </div>

              <div className="group bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105">
                <div className="bg-gradient-to-br from-blue-100 to-indigo-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <FiEye className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
                <p className="text-gray-600 leading-relaxed">
                  To be the most trusted digital partner for every farmer in India, fostering 
                  sustainable agriculture and ensuring food security for the nation.
                </p>
              </div>

              <div className="group bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105">
                <div className="bg-gradient-to-br from-purple-100 to-pink-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <FiUsers className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Values</h3>
                <p className="text-gray-600 leading-relaxed">
                  Integrity, Innovation, Farmer-Centricity, and Sustainability guide every decision 
                  we make in our journey to transform agriculture.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Why Choose <span className="bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent">AgriFinAI</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Comprehensive solutions designed specifically for the modern Indian farmer
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="group text-center">
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 mb-4 group-hover:shadow-lg transition-all duration-300">
                    <feature.icon className="w-12 h-12 text-green-600 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section id="story" className="py-20 bg-gradient-to-br from-green-900 to-emerald-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 text-green-200 text-sm font-semibold">
                  📖 Our Journey
                </div>
                <h2 className="text-4xl lg:text-5xl font-bold leading-tight">
                  The Story Behind <span className="text-green-300">AgriFinAI</span>
                </h2>
                <div className="space-y-6 text-green-100 leading-relaxed">
                  <p className="text-lg">
                    AgriFinAI was born from a simple yet powerful idea: to leverage cutting-edge AI 
                    technology to solve the age-old problems faced by Indian farmers.
                  </p>
                  <p>
                    From unpredictable weather patterns to exploitation by middlemen, from limited 
                    access to credit to lack of market information - the challenges were immense. 
                    We embarked on a journey, guided by the principles of Design Thinking and Human-Centered Innovation.
                  </p>
                  <p>
                    By talking to hundreds of farmers across 15 states, we understood their real needs: 
                    fair prices, reliable information, easy access to capital, and modern tools that 
                    actually work for them. This led to the creation of our AI-powered platform that 
                    serves as a true digital companion for farmers.
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <FiCheckCircle className="w-5 h-5 text-green-300" />
                    <span className="text-green-200">AI-Powered Insights</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <FiCheckCircle className="w-5 h-5 text-green-300" />
                    <span className="text-green-200">Direct Market Access</span>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-blue-400 rounded-3xl transform -rotate-3 opacity-20"></div>
                <Image
                  src="https://images.unsplash.com/photo-1595273670150-bd0c3c392e46?w=600&h=500&fit=crop"
                  alt="Farmers using technology"
                  width={600}
                  height={500}
                  className="relative rounded-3xl object-cover shadow-2xl"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Meet Our <span className="bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent">Team</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Passionate innovators dedicated to transforming agriculture
              </p>
            </div>

            <div className="flex justify-center">
              {team.map((member, index) => (
                <div key={index} className="group max-w-sm">
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-8 text-center group-hover:shadow-xl transition-all duration-500 transform group-hover:scale-105">
                    <div className="relative mb-6">
                      <Image
                        src={member.image}
                        alt={member.name}
                        width={120}
                        height={120}
                        className="rounded-full mx-auto shadow-lg"
                      />
                      <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-emerald-400 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{member.name}</h3>
                    <p className="text-green-600 font-semibold mb-4">{member.role}</p>
                    <p className="text-gray-600 leading-relaxed">{member.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-green-600 to-emerald-500">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Ready to Transform Your Farm?
            </h2>
            <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
              Join thousands of farmers who are already using AgriFinAI to grow their business 
              and improve their livelihoods.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/weather" 
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-green-600 rounded-xl font-semibold hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                Start Free Today
                <FiArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link 
                href="/contact" 
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white rounded-xl font-semibold hover:bg-white hover:text-green-600 transition-all duration-300"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AboutPage;