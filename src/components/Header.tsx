import React from "react";

const Header: React.FC = () => {
  return (
    <header className="w-full bg-gradient-to-r from-indigo-500 via-sky-500 from-10% to-emerald-500 to-90% text-white shadow-lg sticky top-0 z-50">
      <div className="flex items-center justify-between py-6 px-6 max-w-full">
        {/* LEFT: Profile far left */}
        <div className="flex items-center gap-4">
          <img
            src="https://imgproxy.attic.sh/insecure/f:webp/q:90/w:1920/plain/https://attic.sh/n1aj2r6n2jupn1htuy1ky9ldzvse"
            alt="Profile"
            className="w-16 h-16 rounded-full border-4 border-white shadow-lg"
          />
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
    </header>
  );
};

export default Header;
