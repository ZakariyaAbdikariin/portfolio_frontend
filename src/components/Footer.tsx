import React from "react";
import { useSpring, animated, config } from "@react-spring/web";
import { Github, Linkedin, Facebook, X } from "lucide-react";

const Footer: React.FC = () => {
  // Footer slide-up & fade-in animation
  const footerSpring = useSpring({
    from: { transform: "translateY(40px)", opacity: 0 },
    to: { transform: "translateY(0px)", opacity: 1 },
    config: config.gentle,
  });

  const socialLinks = [
    {
      Icon: Github,
      href: "https://github.com/yourusername",
      color: "text-white",
      hover: "hover:text-cyan-400",
    },
    {
      Icon: X,
      href: "https://twitter.com/yourusername",
      color: "text-white",
      hover: "hover:text-cyan-400",
    },
    {
      Icon: Linkedin,
      href: "https://www.linkedin.com/in/yourusername",
      color: "text-white",
      hover: "hover:text-cyan-400",
    },
    {
      Icon: Facebook,
      href: "https://www.facebook.com/yourusername",
      color: "text-white",
      hover: "hover:text-cyan-400",
    },
  ];

  return (
    <animated.footer
      style={footerSpring}
      className="w-full bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 py-8 mt-10 text-center shadow-lg border-t border-gray-700"
    >
      {/* Copyright */}
      <p className="text-lg font-medium mb-4 tracking-wide bg-clip-text text-transparent bg-gradient-to-tr from-cyan-300 to-pink-300 drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]">
        © {new Date().getFullYear()} Sakariye Abdikariin. All rights reserved.
      </p>

      {/* Social Icons */}
      <div className="flex justify-center gap-8 mb-4">
        {socialLinks.map(({ Icon, href, color, hover }) => (
          <a
            key={href}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={`transition transform ${color} ${hover} hover:scale-125`}
          >
            <Icon size={28} />
          </a>
        ))}
      </div>

      {/* Built With */}
      <p className="text-sm tracking-wide drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]">
        <span className="bg-clip-text text-transparent bg-gradient-to-tr from-cyan-300 to-pink-300">
          Built with
        </span>{" "}
        ❤️{" "}
        <span className="bg-clip-text text-transparent bg-gradient-to-tr from-cyan-300 to-pink-300">
          using React and TailwindCSS
        </span>
      </p>
    </animated.footer>
  );
};

export default Footer;
