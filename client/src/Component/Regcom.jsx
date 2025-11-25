import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Regcom = () => {
        const [formData, setFormData] = useState({
    name: '',
    password: '',
    location: ''
  });
 const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const timeoutRef = useRef(null);

  // Clear pending timeout if component unmounts before navigation runs
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

const handleChange = (e) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value
  });
};

const handleSubmit = async (e) => {
  e.preventDefault();
  console.log('Form submitted:', formData);
  // Add your submission logic here
   
  try {
    const result = axios.post("https://prod-backend-3gnb.onrender.com/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    console.log("Signup result:", result);
    const data = await result.json();
    console.log("Response body:", data);
    if (result.ok) {
      setMessage("Signup successful!");

      // Navigate to login after a short delay so the user sees the success message
      timeoutRef.current = setTimeout(() => {
        navigate("/login");
      }, 1200);
    } else {
      setMessage(data.message || "Signup failed.");
    }

  } catch (err) {
    console.error("Signup error:", err);
  }
};



  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-purple-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Register Company
            </h1>
            <p className="text-gray-600">Create your company account</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Input */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Company Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter company name"
                className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
                required
              />
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter password"
                className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
                required
              />
            </div>

            {/* Location Input */}
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                Location
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Enter location"
                className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition shadow-lg hover:shadow-xl"
            >
              Submit
            </button>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="text-blue-600 hover:text-blue-700 font-medium">
                Sign in
              </Link>
            </p>
          </div>
        </div>

         {/* Status */}
            {message && (
              <div className="mt-4 text-sm text-center text-gray-700">{message}</div>
            )}
            

        {/* Additional Info */}
        <div className="mt-6 text-center text-sm text-gray-600">
          <p>By registering, you agree to our Terms & Privacy Policy</p>
        </div>
      </div>
    </div>
    );
}
export default Regcom;