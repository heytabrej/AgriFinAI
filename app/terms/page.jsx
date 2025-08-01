import Link from 'next/link';

const TermsOfServicePage = () => {
  return (
    <div className="bg-gray-50">
      <header className="sticky top-0 bg-white/80 backdrop-blur-sm z-50 shadow-sm">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link href="/" className="text-3xl font-bold text-green-700">AgriConnect</Link>
          </div>
        </nav>
      </header>

      <main className="py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white p-10 rounded-xl shadow-lg">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Terms of Service</h1>
            <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
              <p><strong>Last Updated:</strong> {new Date().toLocaleDateString()}</p>
              
              <h2 className="text-xl font-semibold">1. Agreement to Terms</h2>
              <p>By using the AgriConnect platform, you agree to be bound by these Terms of Service. If you do not agree, do not use the platform.</p>

              <h2 className="text-xl font-semibold">2. User Responsibilities</h2>
              <p>You are responsible for the accuracy of the information you provide, including product listings and personal details. You agree to use the platform for lawful purposes only.</p>

              <h2 className="text-xl font-semibold">3. Limitation of Liability</h2>
              <p>AgriConnect is a platform that connects farmers and buyers. We are not responsible for the quality of products, payment disputes, or any other issues arising from transactions between users.</p>
              
              {/* Add more sections as required */}
              <h2 className="text-xl font-semibold">4. Contact Us</h2>
              <p>If you have any questions about these Terms, please contact us at <a href="mailto:legal@agriconnect.com" className="text-green-600">legal@agriconnect.com</a>.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TermsOfServicePage;