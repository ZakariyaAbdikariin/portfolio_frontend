import React from "react";
import { useSpring, animated } from "@react-spring/web";

const Footer: React.FC = () => {
  const wave = useSpring({
    from: { transform: "translateY(30px)", opacity: 0 },
    to: { transform: "translateY(0px)", opacity: 1 },
    config: { tension: 100, friction: 18 },
  });

  return (
    <animated.footer
      style={wave}
      className="w-full bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 py-6 mt-10 text-center shadow-lg border-t border-gray-700"
    >
      <p className="text-white text-lg font-medium">
        © {new Date().getFullYear()} Sakariye Abdikariin
      </p>
    </animated.footer>
  );
};

export default Footer;
