import React, { useState } from "react";
// Import useNavigate to handle redirection
import { Link, useNavigate } from "react-router-dom"; 
import { ShoppingCart } from "lucide-react";

const SignUpPage = () => {
  // Initialize the navigate function
  const navigate = useNavigate(); 

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    agree: false,
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name) newErrors.name = "Full Name is required.";
    if (!formData.email) newErrors.email = "Email address is required.";
    if (!formData.phone) newErrors.phone = "Phone Number is required.";
    if (!formData.password) newErrors.password = "Password is required.";
    if (!formData.confirmPassword) newErrors.confirmPassword = "Please confirm your password.";

    if (formData.phone && !/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Phone Number must be exactly 10 digits.";
    }
    
    if (formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    if (!formData.agree) {
      newErrors.agree = "You must agree to the Terms and Privacy Policy to sign up.";
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      console.log("Sign up successful with data:", formData);
      alert("Account created successfully!");
      
      // --- REDIRECT LOGIC ---
      // On successful submission, navigate to the home page ('/')
      navigate("/"); 
    } else {
      console.log("Validation failed:", validationErrors);
    }
  };


  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-6xl flex rounded-2xl shadow-2xl overflow-hidden animate-fadeInUp">
        <div className="w-full md:w-1/2 flex flex-col justify-center bg-white p-10">
          <div className="w-full max-w-md mx-auto">
            <div className="mb-6 flex justify-center">
              <Link to="/" className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24"
                  fill="currentColor"
                  className="w-10 h-10 text-green-500"
                >
                  <path d="M11.25,4.5A5.25,5.25,0,0,0,6,9.75v.25a.75.75,0,0,0,1.5,0V9.75a3.75,3.75,0,0,1,7.5,0v.25a.75.75,0,0,0,1.5,0V9.75A5.25,5.25,0,0,0,11.25,4.5Z" />
                  <path
                    fillRule="evenodd"
                    d="M6.16,12.47a.75.75,0,0,1,1.06,0l1.22,1.22a.75.75,0,0,0,1.06,0l2.72-2.72a.75.75,0,0,1,1.06,1.06l-2.72,2.72a2.25,2.25,0,0,1-3.18,0l-1.22-1.22a.75.75,0,0,1,0-1.06ZM18,10.5a.75.75,0,0,1,.75.75v8.25a.75.75,0,0,1-1.5,0V11.25A.75.75,0,0,1,18,10.5Z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-3xl font-bold text-gray-800">Grocefy</span>
              </Link>
            </div>

            <h1 className="text-3xl font-bold text-gray-900 text-center">Create your account</h1>
            <p className="text-gray-600 mt-2 text-center">
              Already have an account?{" "}
              <Link to="/login" className="font-medium text-green-500 hover:underline">
                Log in
              </Link>
            </p>

            <form className="mt-6 space-y-4" onSubmit={handleSubmit} noValidate>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500" />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500" />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
                <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500" />
                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500" />
                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
              </div>
              <div>
                <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">Confirm Password</label>
                <input type="password" id="confirm-password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500" />
                {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
              </div>

              <div>
                <div className="flex items-center">
                  <input id="agree" name="agree" type="checkbox" checked={formData.agree} onChange={handleChange} className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded" />
                  <label htmlFor="agree" className="ml-2 block text-sm text-gray-900">
                    I agree to the{" "}
                    <a href="#" className="font-medium text-green-500 hover:underline">Terms</a> and{" "}
                    <a href="#" className="font-medium text-green-500 hover:underline">Privacy Policy</a>.
                  </label>
                </div>
                {errors.agree && <p className="text-red-500 text-xs mt-1">{errors.agree}</p>}
              </div>
              
              <div className="pt-1">
                <button type="submit" className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition">
                  Sign Up
                </button>
              </div>
            </form>
            
            <div className="my-4 flex items-center">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="mx-4 text-gray-500 text-sm">Or continue with</span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>

            <button type="button" className="w-full flex justify-center items-center gap-3 py-2.5 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition">
              <img src="https://www.google.com/images/branding/googleg/1x/googleg_standard_color_24dp.png" alt="Google" className="w-5 h-5" />
              Sign up with Google
            </button>
          </div>
        </div>
        
        <div className="hidden md:flex w-1/2 bg-gray-900 text-white flex-col justify-center items-center p-12 relative overflow-hidden">
          <ShoppingCart strokeWidth={0.5} className="absolute -right-20 -bottom-20 w-80 h-80 text-white/5" />
          <div className="max-w-md w-full z-10">
            <h2 className="text-4xl font-bold leading-tight">Simplify your <br /> groceries & expenses.</h2>
            <p className="mt-4 text-gray-300">Join Grocefy and stay on top of grocery lists, track expenses, and manage household needs — all in one app.</p>
            <div className="mt-10 p-6 bg-black/20 rounded-lg border border-gray-700">
              <blockquote className="text-lg italic">"Grocefy has made our family's shopping trips so much more organized and stress-free!"</blockquote>
              <p className="mt-4 text-right text-gray-400">- A Happy Family</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;