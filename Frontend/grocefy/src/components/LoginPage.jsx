import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, ShoppingBasket } from "lucide-react"; 
import { useAuth } from "../context/AuthContext.jsx";

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setError("Please enter both email and password.");
      return;
    }
    setError("");
    
    login(formData); 
    navigate('/home');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 md:p-8 animate-fadeInUp">
      <div className="w-full max-w-6xl flex rounded-2xl shadow-2xl overflow-hidden">
        <div className="w-full md:w-1/2 flex flex-col justify-center bg-white p-10">
          <div className="w-full max-w-md mx-auto">
            <div className="mb-6 flex justify-center">
              <Link to="/" className="flex items-center gap-2">
                <ShoppingBasket className="w-10 h-10 text-green-500" />
                <span className="text-3xl font-bold text-gray-800">Grocefy</span>
              </Link>
            </div>

            <h1 className="text-3xl font-bold text-gray-900 text-center">Welcome back!</h1>
            <p className="text-gray-600 mt-2 text-center">
              Don't have an account?{" "}
              <Link to="/signup" className="font-medium text-green-500 hover:underline">
                Sign up
              </Link>
            </p>

            <form className="mt-8 space-y-6" onSubmit={handleSubmit} noValidate>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500" required />
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                  <div className="text-sm">
                    <a href="#" className="font-medium text-green-500 hover:underline">
                      Forgot your password?
                    </a>
                  </div>
                </div>
                <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500" required />
              </div>
              
              {error && <p className="text-red-500 text-sm text-center">{error}</p>}

              <div>
                <button type="submit" className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition">
                  Log In
                </button>
              </div>
            </form>
            
            <div className="my-6 flex items-center">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="mx-4 text-gray-500 text-sm">Or continue with</span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>

            <button type="button" className="w-full flex justify-center items-center gap-3 py-2.5 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition">
              <img src="https://www.google.com/images/branding/googleg/1x/googleg_standard_color_24dp.png" alt="Google" className="w-5 h-5" />
              Continue with Google
            </button>
          </div>
        </div>

        <div className="hidden md:flex w-1/2 bg-gray-900 text-white flex-col justify-center items-center p-12 relative overflow-hidden">
          <ShoppingCart strokeWidth={0.5} className="absolute -right-20 -bottom-20 w-80 h-80 text-white/5" />
          <div className="max-w-md w-full z-10">
            <h2 className="text-4xl font-bold leading-tight">Pick up where <br/> you left off.</h2>
            <p className="mt-4 text-gray-300">Access your shared lists, track recent expenses, and continue managing your household needs seamlessly.</p>
            <div className="mt-10 p-6 bg-black/20 rounded-lg border border-gray-700">
              <blockquote className="text-lg italic">"I love that I can just log in and see exactly what my family needs from the store. Grocefy is a lifesaver!"</blockquote>
              <p className="mt-4 text-right text-gray-400">- A Returning User</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

