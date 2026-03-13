import React from "react";
import { useSpring, animated } from "@react-spring/web";

const navLinks = ["Home", "CV", "Projects", "Achievement", "Hobbies"];

const Header: React.FC = () => {
  const spring = useSpring({
    from: { transform: "translateY(-60px)", opacity: 0 },
    to: { transform: "translateY(0px)", opacity: 1 },
    config: { tension: 120, friction: 14 },
  });

  return (
    <animated.header
      style={spring}
      className="w-full fixed top-0 z-30 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 shadow-lg backdrop-blur-md border-b border-gray-700 transition"
    >
      <nav className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-wide text-cyan-400 hover:text-pink-400 transition-colors duration-300 cursor-pointer">
          Sakariye
        </h1>
        <ul className="flex gap-6">
          {navLinks.map((link) => (
            <li
              key={link}
              className="text-white cursor-pointer hover:text-cyan-400 transition-colors duration-300"
            >
              {link}
            </li>
          ))}
        </ul>
      </nav>
    </animated.header>
  );
};

export default Header;
