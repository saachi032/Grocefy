import React from "react";
import { Github, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="w-full bg-gray-800 text-gray-300 py-12 px-6 mt-auto">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24"
                fill="currentColor"
                className="w-8 h-8 text-green-500"
              >
                <path d="M11.25,4.5A5.25,5.25,0,0,0,6,9.75v.25a.75.75,0,0,0,1.5,0V9.75a3.75,3.75,0,0,1,7.5,0v.25a.75.75,0,0,0,1.5,0V9.75A5.25,5.25,0,0,0,11.25,4.5Z" />
                <path d="M6.16,12.47a.75.75,0,0,1,1.06,0l1.22,1.22a.75.75,0,0,0,1.06,0l2.72-2.72a.75.75,0,0,1,1.06,1.06l-2.72,2.72a2.25,2.25,0,0,1-3.18,0l-1.22-1.22a.75.75,0,0,1,0-1.06ZM18,10.5a.75.75,0,0,1,.75.75v8.25a.75.75,0,0,1-1.5,0V11.25A.75.75,0,0,1,18,10.5Z" />
              </svg>
              <span className="text-2xl font-bold text-white">Grocefy</span>
            </div>
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

