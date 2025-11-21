import React from "react";

const Hero = () => {
    return (
        <div>
                  {/* Main Content */}
      <main className="max-w-7xl mx-auto px-8 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-blue-600 mb-4">
            Welcome to Your Product details
          </h2>
          <p className="text-gray-700 text-lg">
            Find the right product details without the hassle.
          </p>
          <p className="text-gray-700 text-lg">
            Fast, responsive, and designed for everyday users.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Register Company Card */}
          <div className="bg-gray-300 rounded-lg p-12 hover:bg-gray-400 transition cursor-pointer">
            <h3 className="text-xl font-semibold text-gray-800">
              Register company
            </h3>
          </div>

          {/* Product Adding Card */}
          <div className="bg-gray-300 rounded-lg p-12 hover:bg-gray-400 transition cursor-pointer">
            <h3 className="text-xl font-semibold text-gray-800">
              Product adding
            </h3>
          </div>

          {/* Check Product Card */}
          <div className="bg-gray-300 rounded-lg p-12 hover:bg-gray-400 transition cursor-pointer">
            <h3 className="text-xl font-semibold text-gray-800">
              Check product
            </h3>
          </div>
        </div>
      </main>
        </div>
    )
}

export default Hero;