import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-gradient-to-r from-blue-900 via-gray-800 to-teal-700 text-white mt-16">
      {/* Main container */}
      <div className="max-w-7xl mx-auto px-6 py-8 flex items-center justify-center">
        <div className="text-sm opacity-90 text-center">
          © {new Date().getFullYear()} Sakariye Abdikariin. All rights reserved
        </div>
      </div>
    </footer>
  );
};

export default Footer;
