import React from "react";

const Header: React.FC = () => {
  return (
    <header className="w-full bg-gradient-to-r from-blue-900 via-gray-800 to-teal-700 text-white shadow-lg sticky top-0 z-50">
      {/* Main container: centers content and adds horizontal padding */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between py-6">
          {/* LEFT: Profile */}
          <div className="flex items-center gap-4">
            <div className="flex flex-col">
              <h1 className="text-2xl font-extrabold tracking-tight">
                Sakariye Abdikariin
              </h1>
              <h2 className="text-sm">Software Developer</h2>
            </div>
          </div>

          {/* RIGHT: Navigation */}
          <nav className="flex gap-6 text-lg">
            {["Home", "CV", "Projects", "Achievements", "Hobbies"].map(
              (link, index) => (
                <a
                  key={index}
                  href={`#${link.toLowerCase()}`}
                  className="hover:text-yellow-300 transition duration-300 ease-in-out"
                >
                  {link}
                </a>
              ),
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
