import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./layout/Navbar";
import HeroSection from "./home/HeroSection";
import FeatureShowcase from "./home/FeatureShowcase";
import Footer from "./layout/Footer";
import AuthModal from "./auth/AuthModal";

function Home() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [activeAuthTab, setActiveAuthTab] = useState<"login" | "register">(
    "login",
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Check if user is already logged in on component mount
  useEffect(() => {
    const checkLoginStatus = () => {
      // In a real app, this would check localStorage, cookies, or a token
      const hasSession = localStorage.getItem("styleai_session");
      if (hasSession) {
        setIsLoggedIn(true);
      }
    };

    checkLoginStatus();
  }, []);

  const handleLogin = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      setError(null);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // In a real app, this would call an authentication service
      console.log("Login with", email, password);

      // Store session
      localStorage.setItem("styleai_session", "true");
      localStorage.setItem("styleai_user", JSON.stringify({ email }));

      setIsLoggedIn(true);
      setAuthModalOpen(false);
      navigate("/dashboard");
    } catch (err) {
      setError("Login failed. Please check your credentials.");
      console.error("Login error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (
    name: string,
    email: string,
    password: string,
  ) => {
    try {
      setIsLoading(true);
      setError(null);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // In a real app, this would call an authentication service
      console.log("Register with", name, email, password);

      // Store session
      localStorage.setItem("styleai_session", "true");
      localStorage.setItem("styleai_user", JSON.stringify({ name, email }));

      setIsLoggedIn(true);
      setAuthModalOpen(false);
      navigate("/dashboard");
    } catch (err) {
      setError("Registration failed. Please try again.");
      console.error("Registration error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    // Clear session
    localStorage.removeItem("styleai_session");
    localStorage.removeItem("styleai_user");
    setIsLoggedIn(false);
  };

  const openLoginModal = () => {
    setActiveAuthTab("login");
    setAuthModalOpen(true);
    setError(null);
  };

  const openRegisterModal = () => {
    setActiveAuthTab("register");
    setAuthModalOpen(true);
    setError(null);
  };

  return (
    <div className="w-full min-h-screen bg-background">
      <Navbar
        isLoggedIn={isLoggedIn}
        onLogin={openLoginModal}
        onRegister={openRegisterModal}
        onLogout={handleLogout}
      />

      <main className="pt-[70px]">
        <HeroSection
          onGetStarted={openRegisterModal}
          onLogin={openLoginModal}
        />
        <FeatureShowcase />
      </main>

      <Footer />

      <AuthModal
        open={authModalOpen}
        onOpenChange={setAuthModalOpen}
        onLogin={handleLogin}
        onRegister={handleRegister}
        isLoading={isLoading}
        error={error}
        defaultTab={activeAuthTab}
      />
    </div>
  );
}

export default Home;
