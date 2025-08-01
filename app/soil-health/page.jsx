"use client";
import { useState } from 'react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { FiLoader, FiAlertTriangle } from 'react-icons/fi';
import SoilHealthForm from '../../components/SoilHealthForm';
import SoilHealthReport from '../../components/SoilHealthReport';

const SoilHealthPage = () => {
  const { t } = useTranslation();
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAnalysisRequest = async (formData) => {
    setLoading(true);
    setError('');
    setAnalysis(null);

    try {
      const geminiApiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
      if (!geminiApiKey) {
        throw new Error("Gemini API key is not configured.");
      }

      const prompt = `
        You are an expert agricultural scientist and plant pathologist. A farmer has provided the following information about a crop issue. Analyze the data and provide a detailed report.

        **Farmer's Input:**
        - **Crop:** ${formData.cropName}
        - **Soil Type:** ${formData.soilType}
        - **Soil pH:** ${formData.soilPH || 'Not provided'}
        - **Observed Symptoms:** ${formData.symptoms}
        - **Region/Location:** ${formData.location}
        - **Image of affected plant provided:** ${formData.image ? 'Yes' : 'No'}

        **Your Task:**
        1.  **Potential Diagnosis:** Based on the symptoms and crop type, list the most likely diseases, nutrient deficiencies, or pest infestations. Provide a probability or confidence level for each.
        2.  **Detailed Explanation:** For the most likely cause, explain why you think it's the problem, referencing the farmer's input.
        3.  **Actionable Recommendations:** Provide a clear, step-by-step plan for the farmer to follow. This should include:
            - **Immediate Actions:** What to do right now.
            - **Treatment Options:** Suggest both organic and chemical treatments if applicable, including specific product names or active ingredients and application instructions.
            - **Preventive Measures:** How to prevent this issue in the future.
        4.  **Disclaimer:** Add a disclaimer that this is an AI-generated analysis and consulting a local agricultural expert is recommended for confirmation.

        Format your response using clear headings with Markdown (**Bold** for headings, bullet points for lists).
      `;

      const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-goog-api-key': geminiApiKey
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }]
        })
      });

      if (!response.ok) {
        const errorBody = await response.json();
        throw new Error(errorBody.error?.message || 'Failed to get AI analysis.');
      }

      const data = await response.json();
      const resultText = data.candidates?.[0]?.content?.parts?.[0]?.text;
      
      if (!resultText) {
        throw new Error("Received an empty response from the AI.");
      }

      setAnalysis(resultText);

    } catch (err) {
      console.error("Soil Health Analysis Error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 bg-white/80 backdrop-blur-sm z-50 shadow-sm">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link href="/" className="text-3xl font-bold text-green-700">AgriConnect</Link>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-gray-600 hover:text-green-700 transition-colors font-medium">{t('Home')}</Link>
              <Link href="/weather" className="text-gray-600 hover:text-green-700 transition-colors font-medium">{t('Weather')}</Link>
              <Link href="/loan" className="text-gray-600 hover:text-green-700 transition-colors font-medium">{t('Loan')}</Link>
              <Link href="/soil-health" className="text-green-700 border-b-2 border-green-700 font-semibold">{t('Soil Health')}</Link>
            </div>
          </div>
        </nav>
      </header>

      <main className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">{t('AI Crop & Soil Health Analysis')}</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t('Provide details about your crop and soil to get an AI-powered health assessment and recommendations.')}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <SoilHealthForm onSubmit={handleAnalysisRequest} loading={loading} />
          
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 min-h-[400px]">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">{t('Analysis Report')}</h2>
            {loading && (
              <div className="flex flex-col items-center justify-center h-full">
                <FiLoader className="animate-spin text-green-600 w-12 h-12" />
                <p className="mt-4 text-gray-600">{t('Analyzing... Please wait.')}</p>
              </div>
            )}
            {error && (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <FiAlertTriangle className="text-red-500 w-12 h-12" />
                <p className="mt-4 text-red-600 font-semibold">{t('An error occurred')}</p>
                <p className="text-gray-500 text-sm">{error}</p>
              </div>
            )}
            {analysis && !loading && <SoilHealthReport report={analysis} />}
            {!analysis && !loading && !error && (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <p className="text-gray-500">{t('Your report will appear here after you submit the form.')}</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default SoilHealthPage;