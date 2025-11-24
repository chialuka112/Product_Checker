import React from "react";
import { useState } from "react";
import axios from "axios";

const Checkprod = () => {
     const [inputCode, setInputCode] = useState('');
  const [productDetails, setProductDetails] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault(); 

    // Simulate code validation and product lookup
    if (!inputCode.trim()) {
      setError('Please enter a code');
      setProductDetails(null);
      return;
    }

    // mock product (used as fallback)
    const mockProduct = {
      code: inputCode,
      productName: 'Sample Product',
      dateCreated: '2024-01-15',
      dateExpired: '2025-12-31',
      description:
        'High-quality wireless headphones with noise cancellation, 30-hour battery life, and premium sound quality.',
      status: 'Active',
      manufacturer: 'TechCorp Industries',
    };

    try {
      // NOTE: use http and the same host/port your server runs on
      const res = axios.get(`https://prod-backend-1.onrender.com/product/${inputCode}`);

      if (!res.ok) {
        const errBody = await res.json().catch(() => ({}));
        setProductDetails(null);
        setError(errBody.message || 'Product not found');
        return;
      }

      const data = await res.json();

      // Map backend column names to the frontend shape
      const normalized = {
        code: data.code || data.code || inputCode,
        productName: data.productname || data.productName || data.product_name || '',
        manufacturer: data.manufacturer || data.manufacturer || '',
        dateCreated: data.datecreated || data.dateCreated || data.date_created || '',
        dateExpired: data.dateexpired || data.dateExpired || data.date_expired || '',
        description: data.description || '',
        status: data.status || 'Active',
      };

      setProductDetails(normalized);
    } catch (err) {
      // If fetch fails (server down / network), fall back to the mock product
      console.error('Fetch product error:', err);
      setProductDetails(mockProduct);
    }

    setError('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-10">
          Code generator
        </h1>

        {/* Input Section */}
        <form onSubmit={handleSubmit} className="mb-10">
          <div className="flex gap-0 max-w-lg mx-auto">
            <input
              type="text"
              value={inputCode}
              onChange={(e) => setInputCode(e.target.value)}
              placeholder="input code"
              className="flex-1 px-6 py-4 bg-gray-200 border-r border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
            />
            <button
              type="submit"
              className="px-8 py-4 bg-gray-200 rounded-r-lg hover:bg-gray-300 transition font-semibold text-blue-600"
            >
              submit
            </button>
          </div>
          {error && (
            <p className="text-red-500 text-center mt-2 text-sm">{error}</p>
          )}
        </form>

        {/* Display Details Section */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Display details</h2>
        </div>

        {/* Product Details Card */}
        {productDetails ? (
          <div className="bg-white rounded-lg shadow-xl p-8 max-w-3xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Product Code */}
              <div className="border-b border-gray-200 pb-4">
                <p className="text-sm text-gray-500 mb-1">Product Code</p>
                <p className="text-lg font-semibold text-gray-900">{productDetails.code}</p>
              </div>

              {/* Status */}
              <div className="border-b border-gray-200 pb-4">
                <p className="text-sm text-gray-500 mb-1">Status</p>
                <span className="inline-block px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                  {productDetails.status}
                </span>
              </div>

              {/* Product Name */}
              <div className="border-b border-gray-200 pb-4">
                <p className="text-sm text-gray-500 mb-1">Product Name</p>
                <p className="text-lg font-semibold text-gray-900">{productDetails.productName}</p>
              </div>

              {/* Manufacturer */}
              <div className="border-b border-gray-200 pb-4">
                <p className="text-sm text-gray-500 mb-1">Manufacturer</p>
                <p className="text-lg font-semibold text-gray-900">{productDetails.manufacturer}</p>
              </div>

              {/* Date Created */}
              <div className="border-b border-gray-200 pb-4">
                <p className="text-sm text-gray-500 mb-1">Date Created</p>
                <p className="text-lg font-semibold text-gray-900">{productDetails.dateCreated}</p>
              </div>

              {/* Date Expired */}
              <div className="border-b border-gray-200 pb-4">
                <p className="text-sm text-gray-500 mb-1">Date Expired</p>
                <p className="text-lg font-semibold text-gray-900">{productDetails.dateExpired}</p>
              </div>
            </div>

            {/* Description */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-500 mb-2">Description</p>
              <p className="text-gray-700 leading-relaxed">{productDetails.description}</p>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex gap-4 justify-center">
             
              <button className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition font-medium">
                Print Details
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-xl p-12 max-w-3xl mx-auto text-center">
            <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p className="text-gray-500 text-lg">Enter a product code to view details</p>
          </div>
        )}
      </div>
    </div>
  );
}
export default Checkprod;