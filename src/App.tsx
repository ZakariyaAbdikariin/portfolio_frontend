import React from "react";
import { useSpring, animated } from "@react-spring/web";
import Header from "./components/Header";
import Profile from "./components/Profile";
import Footer from "./components/Footer";

const App: React.FC = () => {
  const profileId = 4; // Replace with your backend profile ID

  // Smooth page fade-in animation
  const pageSpring = useSpring({
    from: { opacity: 0, transform: "translateY(20px)" },
    to: { opacity: 1, transform: "translateY(0px)" },
    config: { tension: 120, friction: 20 },
  });

  return (
    <animated.div
      style={pageSpring}
      className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700"
    >
      <Header />
      <main className="flex-grow pt-24 px-4 md:px-6 lg:px-12">
        <Profile id={profileId} />
      </main>
      <Footer />
    </animated.div>
  );
};

export default App;
