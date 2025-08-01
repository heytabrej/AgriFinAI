import Link from 'next/link';

const PrivacyPolicyPage = () => {
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
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Privacy Policy</h1>
            <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
              <p><strong>Last Updated:</strong> {new Date().toLocaleDateString()}</p>
              
              <h2 className="text-xl font-semibold">1. Introduction</h2>
              <p>Welcome to AgriConnect. We are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our platform.</p>

              <h2 className="text-xl font-semibold">2. Information We Collect</h2>
              <p>We may collect personal information such as your name, contact details, location, financial information for loan applications, and data related to your farm and produce.</p>

              <h2 className="text-xl font-semibold">3. How We Use Your Information</h2>
              <p>Your information is used to provide and improve our services, facilitate transactions, process loan applications, provide customer support, and send you relevant updates.</p>
              
              {/* Add more sections as required */}
              <h2 className="text-xl font-semibold">4. Contact Us</h2>
              <p>If you have any questions about this Privacy Policy, please contact us at <a href="mailto:privacy@agriconnect.com" className="text-green-600">privacy@agriconnect.com</a>.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PrivacyPolicyPage;