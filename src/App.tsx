import React from "react";
import Header from "./components/Header";
import Profile from "./components/Profile";
import Footer from "./components/Footer";

const App: React.FC = () => {
  const profileId = 4; // replace with the ID of the profile you want to show

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Main content: only the Profile page */}
      <main className="flex-grow">
        <Profile id={profileId} />
      </main>

      <Footer />
    </div>
  );
};

export default App;
