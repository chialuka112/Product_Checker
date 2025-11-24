import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Prodadd = () => {
    
  const [formData, setFormData] = useState({
    productName: '',
    dateCreated: '',
    dateExpired: '',
    description: '',
    manufacturer: ''
  });
  const [generatedCode, setGeneratedCode] = useState('');
  const [showCode, setShowCode] = useState(false);
  const navigate = useNavigate();
  

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      if (!token) {
        // not authenticated — redirect to login
        navigate('/login');
        return;
      }

      const res = axios.get('https://prod-backend-1.onrender.com/save', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ ...formData })
      });

      if (res.status === 401) {
        // token invalid or expired
        navigate('/login');
        return;
      }

      const data = await res.json();
      if (res.ok) {
        setGeneratedCode(data.code);
        setShowCode(true);
      } else {
        console.error('Save failed:', data);
        alert(data.message || 'Failed to save product');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Error submitting form');
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedCode);
  };
   
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-3xl">
        <div className="bg-white rounded-lg shadow-lg p-8">
          {/* Header */}
          <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">
            Product Adding
          </h1>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            {/* Details Section */}
            <div className="bg-gray-200 rounded-lg p-6 mb-8">
              <h2 className="text-lg font-semibold text-gray-700 mb-6 text-center">
                Details
              </h2>

              <div className="space-y-4">
                {/* Product Name */}
                <div>
                  <label htmlFor="productName" className="block text-sm text-gray-600 mb-1">
                    Product name
                  </label>
                  <input
                    type="text"
                    id="productName"
                    name="productName"
                    value={formData.productName}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-white border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                {/* Manufacturer */}
                <div>
                  <label htmlFor="manufacturer" className="block text-sm text-gray-600 mb-1">
                    Manufacturer
                    </label>
                    <input
                    type="text"
                    id="manufacturer"
                    name="manufacturer"
                    value={formData.manufacturer}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-white border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                {/* Date Created */}
                <div>
                  <label htmlFor="dateCreated" className="block text-sm text-gray-600 mb-1">
                    Date created
                  </label>
                  <input
                    type="date"
                    id="dateCreated"
                    name="dateCreated"
                    value={formData.dateCreated}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-white border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                {/* Date Expired */}
                <div>
                  <label htmlFor="dateExpired" className="block text-sm text-gray-600 mb-1">
                    Date expired
                  </label>
                  <input
                    type="date"
                    id="dateExpired"
                    name="dateExpired"
                    value={formData.dateExpired}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-white border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                {/* Description */}
                <div>
                  <label htmlFor="description" className="block text-sm text-gray-600 mb-1">
                    Description of product
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows="4"
                    className="w-full px-4 py-2 bg-white border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    required
                  ></textarea>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="text-center mb-8">
              <button
                type="submit"
                className="bg-blue-600 text-white font-semibold px-12 py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition shadow-lg"
              >
                Submit and generate code
              </button>
            </div>
          </form>

          {/* Generated Code Section */}
          {showCode && (
            <div className="flex gap-0 max-w-sm">
              <div className="flex-1 bg-gray-200 px-4 py-3 rounded-l border-r border-gray-300">
                <div className="text-sm text-gray-600 mb-1">your code</div>
                <div className="font-mono font-semibold text-gray-800">
                  {generatedCode}
                </div>
              </div>
              <button
                onClick={copyToClipboard}
                className="bg-gray-300 px-6 py-3 rounded-r hover:bg-gray-400 transition text-sm font-medium text-gray-700"
              >
                copy code
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Prodadd;
