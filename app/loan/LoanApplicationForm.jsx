"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { banks } from './bankData';

const LoanApplicationForm = ({ bankId, loanId, loanDetails }) => {
  const [formData, setFormData] = useState({
    bankId,
    loanId,
    fullName: '',
    aadhaarNumber: '',
    panNumber: '',
    loanAmount: loanDetails?.amount.split(' ')[2] || '',
    tenure: loanDetails?.tenure.split(' ')[0] || '',
    purpose: '',
    documents: [],
    termsAccepted: false
  });

  useEffect(() => {
    if(loanDetails) {
      setFormData(prev => ({
        ...prev,
        loanAmount: loanDetails.amount.split(' ')[2],
        tenure: loanDetails.tenure.split(' ')[0]
      }));
    }
  }, [loanDetails]);

  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    router.push('/loan/success');
  };

  const handleFileUpload = (e, docType) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        documents: [...prev.documents, { type: docType, file, preview: URL.createObjectURL(file) }]
      }));
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-2xl p-8">
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Personal Information */}
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Personal Information</h3>
          <div className="form-group">
            <label className="block text-sm font-medium text-gray-700 mb-2">Full Legal Name</label>
            <input
              type="text"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
              onChange={(e) => setFormData({...formData, fullName: e.target.value})}
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 mb-2">Aadhaar Number</label>
              <input
                type="text"
                pattern="\d{12}"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                onChange={(e) => setFormData({...formData, aadhaarNumber: e.target.value})}
              />
            </div>
            
            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 mb-2">PAN Number</label>
              <input
                type="text"
                pattern="[A-Z]{5}[0-9]{4}[A-Z]{1}"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                onChange={(e) => setFormData({...formData, panNumber: e.target.value})}
              />
            </div>
          </div>
        </div>

        {/* Loan Details */}
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Loan Details</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 mb-2">Loan Amount (₹)</label>
              <div className="relative">
                <input
                  type="number"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 pr-16"
                  value={formData.loanAmount}
                  onChange={(e) => setFormData({...formData, loanAmount: e.target.value})}
                />
                <span className="absolute right-4 top-3.5 text-gray-500">INR</span>
              </div>
            </div>

            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 mb-2">Tenure (Months)</label>
              <select 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                value={formData.tenure}
                onChange={(e) => setFormData({...formData, tenure: e.target.value})}
              >
                <option value="">Select Tenure</option>
                <option value="6">6 Months</option>
                <option value="12">1 Year</option>
                <option value="24">2 Years</option>
                <option value="60">5 Years</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="block text-sm font-medium text-gray-700 mb-2">Loan Purpose</label>
            <textarea
              rows="4"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
              placeholder="Describe your agricultural needs..."
              value={formData.purpose}
              onChange={(e) => setFormData({...formData, purpose: e.target.value})}
            />
          </div>
        </div>

        {/* Document Upload */}
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Document Upload</h3>
          <div className="bg-green-50 p-6 rounded-xl">
            <div className="grid md:grid-cols-2 gap-4">
              {['Aadhaar Card', 'PAN Card', 'Land Record', 'Bank Statement'].map((doc) => (
                <div key={doc} className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                  <input
                    type="file"
                    id={doc}
                    className="hidden"
                    onChange={(e) => handleFileUpload(e, doc)}
                    accept=".pdf,.jpg,.png"
                  />
                  <label htmlFor={doc} className="cursor-pointer">
                    <div className="text-gray-600 mb-2">
                      <svg className="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                    </div>
                    <span className="text-sm text-green-600 font-medium">Upload {doc}</span>
                    <p className="text-xs text-gray-500 mt-1">PDF, JPG, PNG (Max 5MB)</p>
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Terms and Submission */}
        <div className="space-y-6">
          <div className="flex items-start">
            <input
              type="checkbox"
              required
              className="mt-1 mr-3 w-5 h-5 text-green-600 border-gray-300 rounded focus:ring-green-500"
              checked={formData.termsAccepted}
              onChange={(e) => setFormData({...formData, termsAccepted: e.target.checked})}
            />
            <p className="text-sm text-gray-600">
              I agree to the <a href="/terms" className="text-green-600 hover:underline">terms and conditions</a> and 
              confirm that all information provided is accurate
            </p>
          </div>

          <button
            type="submit"
            className="w-full py-4 px-6 bg-gradient-to-r from-green-600 to-emerald-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all"
          >
            Submit Application
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoanApplicationForm; 