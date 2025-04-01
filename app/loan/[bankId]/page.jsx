import { banks } from "../bankData";
import Link from "next/link";

const BankDetailPage = ({ params }) => {
  const bank = banks.find(b => b.id === Number(params.bankId));

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-8">
          <div className="flex items-center mb-6">
            <img src={bank.logo} alt={bank.name} className="w-20 h-20 object-contain mr-6" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{bank.name}</h1>
              <p className="text-gray-600 mt-2">{bank.description}</p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {bank.products.map((product) => (
            <div key={product.id} className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">{product.name}</h3>
                  <div className="mt-2 flex gap-4 text-sm text-gray-600">
                    <p>Amount: {product.amount}</p>
                    <p>Tenure: {product.tenure}</p>
                    <p className="text-green-600">Interest: {product.interest}</p>
                  </div>
                </div>
                <Link
                  href={`/loan/${bank.id}/apply/${product.id}`}
                  className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
                >
                  Apply Now
                </Link>
              </div>
              
              <div className="mt-4 border-t pt-4">
                <h4 className="text-sm font-semibold text-gray-900 mb-2">Key Features</h4>
                <ul className="grid grid-cols-2 gap-2">
                  {product.features.map((feature) => (
                    <li key={feature} className="flex items-center text-sm text-gray-600">
                      <svg className="w-4 h-4 mr-2 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BankDetailPage; 