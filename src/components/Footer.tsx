import React from "react";
import { useSpring, animated } from "@react-spring/web";

const Footer: React.FC = () => {
  const wave = useSpring({
    from: { transform: "translateY(20px)", opacity: 0 },
    to: { transform: "translateY(0px)", opacity: 1 },
    config: { tension: 100, friction: 18 },
  });

  return (
    <animated.footer
      style={wave}
      className="w-full bg-gray-900/80 backdrop-blur-md py-6 mt-10 text-center border-t border-gray-700"
    >
      <p className="text-gray-300">
        © {new Date().getFullYear()} Sakariye Abdikariin
      </p>
    </animated.footer>
  );
};

export default Footer;
