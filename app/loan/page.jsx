import { banks } from "./bankData";
import Link from "next/link";

const LoanPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4 bg-gradient-to-r from-green-600 to-emerald-700 bg-clip-text text-transparent">
            Partner Financial Institutions
          </h1>
          <p className="text-xl text-gray-600">Select from 50+ government-approved lenders</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {banks.map((bank) => (
            <Link
              href={`/loan/${bank.id}`}
              key={bank.id}
              className="group relative bg-white rounded-2xl shadow-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
            >
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center mr-4">
                    <img src={bank.logo} alt={bank.name} className="w-12 h-12 object-contain" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-800 group-hover:text-green-700 transition-colors">
                    {bank.name}
                  </h2>
                </div>
                <p className="text-gray-600 text-sm mb-4">{bank.description}</p>
                
                <div className="flex justify-between items-center bg-green-50 rounded-lg p-3">
                  <div>
                    <p className="text-xs text-gray-600">Interest Rate</p>
                    <p className="text-lg font-semibold text-green-700">
                      {bank.minInterest}% - {bank.maxInterest}%
                    </p>
                  </div>
                  <span className="px-3 py-1 bg-green-600 text-white text-sm rounded-full">
                    {bank.rating} ★
                  </span>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {bank.tags.map((tag) => (
                    <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoanPage; 