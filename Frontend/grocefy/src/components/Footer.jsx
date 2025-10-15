import React from "react";
import { Link } from "react-router-dom"; // --- FIXED: Added missing import ---
import { Github, Linkedin, ShoppingBasket } from "lucide-react"; 

const Footer = () => {
  return (
    <footer className="w-full bg-gray-800 text-gray-300 py-12 px-6 mt-auto">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-1">
             <Link to="/" className="flex items-center gap-2 mb-2">
                <ShoppingBasket className="w-10 h-10 text-green-500" />
                {/* --- FIXED: Text color changed to white --- */}
                <span className="text-3xl font-bold text-white">Grocefy</span>
              </Link>
            <p className="text-gray-400 text-sm">
              Making grocery management simple for families everywhere.
            </p>
          </div>

          <div>
            <h5 className="font-semibold text-white mb-4">Product</h5>
            <ul className="space-y-3">
              <li><a href="#features" className="hover:text-green-500 transition">Features</a></li>
              <li><a href="#how" className="hover:text-green-500 transition">How It Works</a></li>
              <li><a href="#" className="hover:text-green-500 transition">Pricing</a></li>
            </ul>
          </div>

          <div>
            <h5 className="font-semibold text-white mb-4">Company</h5>
            <ul className="space-y-3">
              <li><a href="#" className="hover:text-green-500 transition">About Us</a></li>
              <li><a href="#" className="hover:text-green-500 transition">Contact</a></li>
              <li><a href="#" className="hover:text-green-500 transition">Careers</a></li>
            </ul>
          </div>

          <div>
            <h5 className="font-semibold text-white mb-4">Legal</h5>
            <ul className="space-y-3">
              <li><a href="#" className="hover:text-green-500 transition">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-green-500 transition">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-700 flex flex-col items-center gap-4">
          <div className="flex gap-6 text-gray-400">
            <a
              href="https://github.com/saachi032"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-green-500 transition"
            >
              <Github size={24} />
            </a>
            <a
              href="https://www.linkedin.com/in/saachi-mishra-51362229b/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-green-500 transition"
            >
              <Linkedin size={24} />
            </a>
          </div>
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} Grocefy. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;