import Link from 'next/link'
import { Icon } from '@iconify/react'
import dynamic from 'next/dynamic'
import { useState } from 'react'

const LoanCalculator = dynamic(() => import('@/components/LoanCalculator'))
const MarketTicker = dynamic(() => import('@/components/MarketTicker'))
const SuccessStories = dynamic(() => import('@/components/SuccessStories'))
const LoanComparator = dynamic(() => import('@/components/LoanComparator'))

const banks = [
  {
    id: 'bank-a',
    name: 'Krishi Vikas Bank',
    features: ['Crop-specific loans', 'Weather insurance', 'Harvest credit'],
    logo: 'mdi:sprout',
    specialties: ['Dairy Farming', 'Crop Rotation'],
    interestRange: '4% - 7%'
  },
  {
    id: 'bank-b',
    name: 'Gramin Financial Services',
    features: ['No collateral', 'Women Farmer Focus', 'Equipment financing'],
    logo: 'mdi:account-group',
    specialties: ['Organic Farming', 'Micro Irrigation'],
    interestRange: '5.5% - 8%'
  }
]

const LoanPage = ({ banks }) => {
  const [selectedFeatures, setSelectedFeatures] = useState([]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-emerald-50">
      {/* Market Ticker */}
      <MarketTicker />
      
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Page Header */}
        <div className="text-center mb-16">
          <div className="inline-block bg-green-100 rounded-full px-6 py-2 mb-4">
            <span className="text-green-700 font-semibold">Financial Empowerment for Farmers</span>
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4 font-serif">
            Agri-Finance Solutions
          </h1>
        </div>

        {/* Feature Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-green-50">
            <Icon icon="mdi:shield-check" className="w-12 h-12 text-green-600 mb-4" />
            <h3 className="text-2xl font-bold mb-2">Crop Insurance</h3>
            <p className="text-gray-600 mb-4">Comprehensive coverage for natural disasters and crop failures</p>
            <button className="text-green-600 font-semibold flex items-center">
              Learn More <Icon icon="mdi:arrow-right" className="ml-2" />
            </button>
          </div>
          
          {/* Add similar blocks for other features */}
        </div>

        {/* Loan Calculator */}
        <LoanCalculator className="mb-16" />

        {/* Enhanced Bank Cards */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {banks.map(bank => (
            <div key={bank.id} className="bg-white rounded-2xl shadow-lg overflow-hidden transition-transform hover:scale-[1.02]">
              <div className="p-8 pb-4">
                <div className="flex items-center justify-between mb-6">
                  <Icon icon={bank.logo} className="w-16 h-16 text-green-600 p-3 bg-green-50 rounded-xl" />
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">⭐ Top Rated</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{bank.name}</h2>
                <div className="flex items-center mb-6">
                  <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm mr-2">🚜 {bank.specialties[0]}</span>
                  <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm">💧 {bank.specialties[1]}</span>
                </div>
                {/* Rest of bank card content */}
              </div>
            </div>
          ))}
        </div>

        {/* New Features Section */}
        <div className="mt-16 grid gap-8 md:grid-cols-2">
          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <h3 className="text-2xl font-bold mb-6">Application Progress</h3>
            <div className="space-y-4">
              <div className="flex items-center bg-green-50 p-4 rounded-lg">
                <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center mr-4">1</div>
                <span className="font-medium">Basic Information</span>
              </div>
              {/* Add other steps */}
            </div>
          </div>
          
          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <h3 className="text-2xl font-bold mb-6">Loan Comparison Tool</h3>
            <LoanComparator loans={banks} />
          </div>
        </div>

        {/* Success Stories */}
        <SuccessStories className="mt-16" />
      </div>

      {/* Chat Widget */}
      <ChatWidget />
    </div>
  )
}

export async function getStaticProps() {
  // Fetch banks data from API or local JSON
  const banks = await fetchBanksData();
  return { props: { banks } };
}

export default LoanPage 