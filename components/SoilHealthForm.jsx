"use client";
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FiUploadCloud } from 'react-icons/fi';

const SoilHealthForm = ({ onSubmit, loading }) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    cropName: '',
    soilType: '',
    soilPH: '',
    symptoms: '',
    location: '',
    image: null,
  });
  const [fileName, setFileName] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setFormData(prev => ({ ...prev, image: e.target.files[0] }));
      setFileName(e.target.files[0].name);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">{t('Enter Crop & Soil Details')}</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="cropName" className="block text-sm font-medium text-gray-700 mb-1">{t('Crop Name')}</label>
          <input 
            type="text" 
            name="cropName" 
            id="cropName" 
            value={formData.cropName} 
            onChange={handleChange} 
            required 
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500" 
            placeholder={t('e.g., Tomato, Wheat')} 
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="soilType" className="block text-sm font-medium text-gray-700 mb-1">{t('Soil Type')}</label>
            <select 
              name="soilType" 
              id="soilType" 
              value={formData.soilType} 
              onChange={handleChange} 
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
            >
              <option value="">{t('Select Type')}</option>
              <option value="Loam">{t('Loam')}</option>
              <option value="Clay">{t('Clay')}</option>
              <option value="Sandy">{t('Sandy')}</option>
              <option value="Silt">{t('Silt')}</option>
              <option value="Peat">{t('Peat')}</option>
            </select>
          </div>
          <div>
            <label htmlFor="soilPH" className="block text-sm font-medium text-gray-700 mb-1">{t('Soil pH (if known)')}</label>
            <input 
              type="number" 
              step="0.1" 
              name="soilPH" 
              id="soilPH" 
              value={formData.soilPH} 
              onChange={handleChange} 
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500" 
              placeholder="e.g., 6.5" 
            />
          </div>
        </div>

        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">{t('Location (District, State)')}</label>
          <input 
            type="text" 
            name="location" 
            id="location" 
            value={formData.location} 
            onChange={handleChange} 
            required 
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500" 
            placeholder={t('e.g., Pune, Maharashtra')} 
          />
        </div>

        <div>
          <label htmlFor="symptoms" className="block text-sm font-medium text-gray-700 mb-1">{t('Describe Symptoms')}</label>
          <textarea 
            name="symptoms" 
            id="symptoms" 
            rows="4" 
            value={formData.symptoms} 
            onChange={handleChange} 
            required 
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500" 
            placeholder={t('e.g., Yellow leaves with brown spots, wilting, stunted growth...')}
          ></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">{t('Upload Photo (Optional)')}</label>
          <label htmlFor="image-upload" className="flex justify-center w-full h-32 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none">
            <span className="flex items-center space-x-2">
              <FiUploadCloud className="w-6 h-6 text-gray-600" />
              <span className="font-medium text-gray-600">
                {fileName || t('Drop files to attach, or browse')}
              </span>
            </span>
            <input 
              type="file" 
              id="image-upload" 
              name="image" 
              onChange={handleFileChange} 
              accept="image/*" 
              className="hidden" 
            />
          </label>
        </div>

        <button 
          type="submit" 
          disabled={loading} 
          className="w-full py-3 px-6 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition-all disabled:bg-green-400"
        >
          {loading ? t('Analyzing...') : t('Get Analysis')}
        </button>
      </form>
    </div>
  );
};

export default SoilHealthForm;