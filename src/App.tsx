import React from "react";
import Header from "./components/Header";
import Profile from "./components/Profile";
import Footer from "./components/Footer";

const App: React.FC = () => {
  const profileId = 4; // Replace with your backend profile ID

  return (
    <div className="min-h-screen flex flex-col bg-black">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-grow pt-24">
        {/* pt-24 adds padding-top to account for fixed header */}
        <Profile id={profileId} />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default App;
