import React from "react";
import Header from "./components/Header";
import Projects from "./components/Projects";
import Profile from "./components/Profile";
import Footer from "./components/Footer";
import ZakImage from "./assets/Zak.jpg"; // adjust path based on your file structure

const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Main content */}
      <main className="flex-grow">
        {/* <Projects /> */}
      
      </main>
    <Profile />
      <Footer />
    </div>
  );
};

export default App;
