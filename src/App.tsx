import React from "react";
import Header from "./components/Header";
import Projects from "./components/Projects";

const App: React.FC = () => {
  return (
    <div className="w-full">
      {/* Navbar */}
      <Header />

      {/* Hero / Intro Section */}
      <section className="w-full bg-gradient-to-r from-gray-600 via-gray-500 to-gray-400 text-white py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-extrabold mb-4">
            Hi, I'm Sakariye Abdikariin
          </h1>
          <p className="text-xl text-white/90">Software Developer</p>
        </div>
      </section>

      {/* Projects Section */}
      <Projects />
    </div>
  );
};

export default App;
