"use client";

import { useEffect, useState } from "react";
import LoginPage from "./pages/LoginPage";
import InvoicePage from "./pages/InvoicePage";
import "./App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userSession = localStorage.getItem("userSession");
    if (userSession) {
      setIsLoggedIn(true);
    }
    setLoading(false);
  }, []);

  const handleLogin = (username) => {
    localStorage.setItem(
      "userSession",
      JSON.stringify({ username, loginTime: new Date() })
    );
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("userSession");
    setIsLoggedIn(false);
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="app">
      {isLoggedIn ? (
        <InvoicePage onLogout={handleLogout} />
      ) : (
        <LoginPage onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;
