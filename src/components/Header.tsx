import React from "react";
import { useSpring, animated } from "@react-spring/web";

const navLinks = ["Home", "About", "Portfolio", "Contact"];

const Header: React.FC = () => {
  const spring = useSpring({
    from: { transform: "translateY(-50px)", opacity: 0 },
    to: { transform: "translateY(0px)", opacity: 1 },
    config: { tension: 120, friction: 14 },
  });

  return (
    <animated.header
      style={spring}
      className="w-full bg-gray-900/90 backdrop-blur-md shadow-md fixed top-0 z-20"
    >
      <nav className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-wide text-white">
          Sakariye
        </h1>

        <ul className="flex gap-6">
          {navLinks.map((link) => (
            <li
              key={link}
              className="text-white cursor-pointer hover:text-yellow-400 transition"
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
