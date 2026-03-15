import React from "react";
import { useSpring, animated, config } from "@react-spring/web";

const navLinks = ["Home", "CV", "Projects", "Achievement", "Hobbies"];

const Header: React.FC = () => {
  // Header slide-down & fade-in
  const headerSpring = useSpring({
    from: { transform: "translateY(-80px)", opacity: 0 },
    to: { transform: "translateY(0px)", opacity: 1 },
    config: config.wobbly,
  });

  // Logo + title float animation
  const floatSpring = useSpring({
    loop: { reverse: true },
    from: { translateY: -2 },
    to: { translateY: 2 },
    config: { duration: 2000 },
  });

  return (
    <animated.header
      style={headerSpring}
      className="w-full fixed top-0 z-50 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 shadow-xl backdrop-blur-md border-b border-gray-700"
    >
      <nav className="w-full px-6 py-3 flex justify-between items-center">
        {/* Left: Logo + Title */}
        <animated.div
          style={floatSpring}
          className="flex items-center gap-3 cursor-pointer"
        >
          {/* Neon Gradient SA Circle */}
          <div className="w-14 h-14 bg-gradient-to-tr from-cyan-400 to-pink-400 rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.6)] hover:shadow-[0_0_25px_rgba(255,0,255,0.8)] transition-shadow duration-500 transform hover:scale-110">
            <span className="bg-clip-text text-transparent bg-gradient-to-tr from-white to-pink-200 font-extrabold text-xl tracking-wider select-none">
              SA
            </span>
          </div>

          {/* Software Developer Title */}
          <span className="bg-clip-text text-transparent bg-gradient-to-tr from-cyan-300 to-pink-300 font-semibold text-lg tracking-wide select-none drop-shadow-[0_0_8px_rgba(255,255,255,0.5)] transition-transform duration-300 hover:scale-105">
            Software Developer
          </span>
        </animated.div>

        {/* Right: Navigation Links */}
        <ul className="flex gap-8">
          {navLinks.map((link) => (
            <li
              key={link}
              className="relative cursor-pointer font-semibold text-lg bg-clip-text text-transparent bg-gradient-to-tr from-cyan-300 to-pink-300 drop-shadow-[0_0_8px_rgba(255,255,255,0.5)] transition-transform duration-300 hover:scale-110 hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.8)]"
            >
              {link}
              {/* Sliding underline */}
              <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-cyan-400 transition-all duration-300 group-hover:w-full"></span>
            </li>
          ))}
        </ul>
      </nav>
    </animated.header>
  );
};

export default Header;
