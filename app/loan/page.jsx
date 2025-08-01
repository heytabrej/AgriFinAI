import { banks } from "./bankData";
import Link from "next/link";
import { FiStar } from "react-icons/fi";

const LoanPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 bg-white/80 backdrop-blur-sm z-50 shadow-sm">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link href="/" className="text-3xl font-bold text-green-700">
              AgriFinAI
            </Link>
            <div className="hidden md:flex items-center space-x-8">
              <Link
                href="/"
                className="text-gray-600 hover:text-green-700 transition-colors font-medium"
              >
                Home
              </Link>
              <Link
                href="/weather"
                className="text-gray-600 hover:text-green-700 transition-colors font-medium"
              >
                Weather
              </Link>
              <Link
                href="/loan"
                className="text-green-700 border-b-2 border-green-700 font-semibold"
              >
                Loan
              </Link>
            </div>
            <div className="hidden md:flex items-center">
              <Link
                href="/login"
                className="bg-green-600 text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-green-700 transition-all"
              >
                Login / Register
              </Link>
            </div>
          </div>
        </nav>
      </header>

      <main className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
              Financial Solutions for Farmers
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Explore loan options from government-approved lenders to grow your
              agricultural business.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {banks.map((bank) => (
              <Link
                href={`/loan/${bank.id}`}
                key={bank.id}
                className="group block bg-white rounded-2xl shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl border border-gray-100"
              >
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center mr-4 p-2">
                      <img
                        src={bank.logo}
                        alt={`${bank.name} logo`}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-gray-800 group-hover:text-green-700 transition-colors">
                        {bank.name}
                      </h2>
                      <div className="flex items-center text-sm text-amber-600 mt-1">
                        <FiStar className="fill-current text-amber-500 mr-1" />
                        <span>{bank.rating} Rating</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm mb-4 h-10">
                    {bank.description}
                  </p>

                  <div className="bg-green-50 rounded-lg p-3 text-center">
                    <p className="text-xs text-gray-600">Interest Rate</p>
                    <p className="text-lg font-semibold text-green-700">
                      {bank.minInterest}% - {bank.maxInterest}%
                    </p>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {bank.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default LoanPage;