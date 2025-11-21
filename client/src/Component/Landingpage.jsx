import React from "react";
import { Link } from "react-router-dom";

const Landingpage = () => {
    return (
          <div className=" bg-gray-100">
      {/* Header */}
      <header className="bg-white border-b-2 border-blue-500 px-8 py-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" >
          <h1 className="text-2xl font-bold text-gray-800"> PRDcheck</h1>
          </Link>
          
          <nav className="flex items-center gap-8">
            <Link to="/register" className="text-gray-700 hover:text-blue-600 transition">
              Register company
            </Link>
            <Link to="/product" className="text-gray-700 hover:text-blue-600 transition">
              Product adding
            </Link>
            <Link to="/check" className="text-gray-700 hover:text-blue-600 transition">
              Check Product
            </Link>
            <Link to="/register">
            <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition">
              Get started
            </button>
            </Link>
          </nav>
        </div>
      </header>
    </div>
    );
}
export default Landingpage;