"use client";
import { useState } from 'react';
import Link from 'next/link';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

const faqs = [
  {
    question: "How do I sell my products on AgriConnect?",
    answer: "To sell your products, you need to register as a farmer on our platform. Once registered, you can list your produce, set prices, and connect directly with buyers. The process is designed to be simple and straightforward."
  },
  {
    question: "Are the weather forecasts accurate?",
    answer: "Our weather forecasts are powered by leading meteorological services and enhanced with AI to provide high accuracy. We provide real-time data and alerts to help you make informed decisions for your crops."
  },
  {
    question: "How do I apply for a loan?",
    answer: "You can browse through our list of partner financial institutions in the 'Loan' section. Once you choose a suitable loan product, you can start the application process directly through our platform, which simplifies document submission and tracking."
  },
  {
    question: "Is there a fee for using AgriConnect?",
    answer: "Basic registration and browsing are free for all users. We may charge a small commission on successful transactions to maintain and improve the platform. All charges are transparent and will be clearly communicated."
  },
];

const FaqItem = ({ faq }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-gray-200 py-4">
      <button onClick={() => setIsOpen(!isOpen)} className="w-full flex justify-between items-center text-left">
        <h3 className="text-lg font-semibold text-gray-800">{faq.question}</h3>
        {isOpen ? <FiChevronUp className="w-5 h-5 text-green-600" /> : <FiChevronDown className="w-5 h-5 text-gray-500" />}
      </button>
      {isOpen && (
        <div className="mt-4 text-gray-600">
          <p>{faq.answer}</p>
        </div>
      )}
    </div>
  );
};

const FaqPage = () => {
  return (
    <div className="bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 bg-white/80 backdrop-blur-sm z-50 shadow-sm">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link href="/" className="text-3xl font-bold text-green-700">AgriConnect</Link>
          </div>
        </nav>
      </header>

      <main className="py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">Frequently Asked Questions</h1>
            <p className="mt-4 text-lg md:text-xl text-gray-600">
              Find answers to common questions about our platform and services.
            </p>
          </div>

          <div className="mt-12 bg-white p-8 rounded-xl shadow-lg">
            {faqs.map((faq, index) => (
              <FaqItem key={index} faq={faq} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default FaqPage;