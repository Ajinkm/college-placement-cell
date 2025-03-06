import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

interface MainLayoutProps {
  children?: React.ReactNode;
  isLoggedIn?: boolean;
  userType?: "student" | "recruiter" | "admin";
  userName?: string;
  userImage?: string;
  notificationCount?: number;
}

const MainLayout = ({
  children,
  isLoggedIn: propIsLoggedIn = false,
  userType: propUserType = "student",
  userName: propUserName = "John Doe",
  userImage = "",
  notificationCount = 0,
}: MainLayoutProps) => {
  const { user } = useAuth();

  // Use auth context if available, otherwise use props
  const isLoggedIn = user ? true : propIsLoggedIn;
  const userType = user?.role || propUserType;
  const userName = user?.name || propUserName;

  // Update user name from profile if available
  useEffect(() => {
    const storedProfile = localStorage.getItem("studentProfile");
    if (storedProfile) {
      const profile = JSON.parse(storedProfile);
      if (profile.name) {
        // Update the displayed name
        const userStr = localStorage.getItem("user");
        if (userStr) {
          const user = JSON.parse(userStr);
          user.name = profile.name;
          localStorage.setItem("user", JSON.stringify(user));
        }
      }
    }
  }, []);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    // In a real implementation, this would toggle a class on the document body
    // or use a theme context to manage the theme state
    if (!isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <div
      className={`min-h-screen flex flex-col bg-background ${isDarkMode ? "dark" : ""}`}
    >
      <Navbar
        isLoggedIn={isLoggedIn}
        userType={userType}
        userName={userName}
        userImage={userImage}
        notificationCount={notificationCount}
        isDarkMode={isDarkMode}
        onToggleTheme={toggleTheme}
      />
      <main className="flex-1">{children || <Outlet />}</main>
      <Footer />
    </div>
  );
};

export default MainLayout;
