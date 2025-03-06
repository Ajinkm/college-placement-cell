import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { Link } from "react-router-dom";
import { Menu, X, User, LogIn, Search, Bell, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

interface NavbarProps {
  isLoggedIn?: boolean;
  userType?: "student" | "recruiter" | "admin";
  userName?: string;
  userImage?: string;
  notificationCount?: number;
  isDarkMode?: boolean;
  onToggleTheme?: () => void;
}

const Navbar = ({
  isLoggedIn: propIsLoggedIn = false,
  userType: propUserType = "student",
  userName: propUserName = "John Doe",
  userImage: propUserImage = "",
  notificationCount = 0,
  isDarkMode = false,
  onToggleTheme = () => {},
}: NavbarProps) => {
  const { user, logout } = useAuth();

  // Use props if provided, otherwise use auth context
  const isLoggedIn = user ? true : propIsLoggedIn;
  const userType = user?.role || propUserType;
  const userName = user?.name || propUserName;
  const userImage = propUserImage; // Keep using prop for image
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const getDashboardLink = () => {
    switch (userType) {
      case "student":
        return "/student-dashboard";
      case "recruiter":
        return "/recruiter-dashboard";
      case "admin":
        return "/admin-dashboard";
      default:
        return "/";
    }
  };

  return (
    <nav className="w-full h-20 bg-background border-b border-border sticky top-0 z-50">
      <div className="container mx-auto h-full px-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <div className="h-10 w-10 rounded-md bg-primary flex items-center justify-center mr-2">
              <span className="text-primary-foreground font-bold text-xl">
                P
              </span>
            </div>
            <span className="text-xl font-bold hidden sm:inline-block">
              PlacementPortal
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-1">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link to="/" className={navigationMenuTriggerStyle()}>
                  Home
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Opportunities</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid gap-3 p-4 w-[400px]">
                    <div className="grid grid-cols-2 gap-3">
                      <Link
                        to="/jobs"
                        className="group flex h-24 items-start p-3 rounded-md hover:bg-accent"
                      >
                        <div>
                          <div className="font-medium">Jobs</div>
                          <p className="text-sm text-muted-foreground">
                            Find full-time positions matching your skills
                          </p>
                        </div>
                      </Link>
                      <Link
                        to="/internships"
                        className="group flex h-24 items-start p-3 rounded-md hover:bg-accent"
                      >
                        <div>
                          <div className="font-medium">Internships</div>
                          <p className="text-sm text-muted-foreground">
                            Discover internship opportunities for students
                          </p>
                        </div>
                      </Link>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <Link
                        to="/campus-drives"
                        className="group flex h-24 items-start p-3 rounded-md hover:bg-accent"
                      >
                        <div>
                          <div className="font-medium">Campus Drives</div>
                          <p className="text-sm text-muted-foreground">
                            Upcoming recruitment events at your campus
                          </p>
                        </div>
                      </Link>
                      <Link
                        to="/workshops"
                        className="group flex h-24 items-start p-3 rounded-md hover:bg-accent"
                      >
                        <div>
                          <div className="font-medium">Workshops</div>
                          <p className="text-sm text-muted-foreground">
                            Skill development and training programs
                          </p>
                        </div>
                      </Link>
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid gap-3 p-4 w-[300px]">
                    <Link
                      to="/resume-builder"
                      className="group flex p-3 rounded-md hover:bg-accent"
                    >
                      <div>
                        <div className="font-medium">Resume Builder</div>
                        <p className="text-sm text-muted-foreground">
                          Create and optimize your resume
                        </p>
                      </div>
                    </Link>
                    <Link
                      to="/interview-prep"
                      className="group flex p-3 rounded-md hover:bg-accent"
                    >
                      <div>
                        <div className="font-medium">Interview Preparation</div>
                        <p className="text-sm text-muted-foreground">
                          Resources to ace your interviews
                        </p>
                      </div>
                    </Link>
                    <Link
                      to="/career-guidance"
                      className="group flex p-3 rounded-md hover:bg-accent"
                    >
                      <div>
                        <div className="font-medium">Career Guidance</div>
                        <p className="text-sm text-muted-foreground">
                          Expert advice for your career path
                        </p>
                      </div>
                    </Link>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/about" className={navigationMenuTriggerStyle()}>
                  About
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/contact" className={navigationMenuTriggerStyle()}>
                  Contact
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Right side actions */}
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleTheme}
            className="hidden sm:flex"
          >
            {isDarkMode ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>

          <Button variant="ghost" size="icon" className="hidden sm:flex">
            <Search className="h-5 w-5" />
          </Button>

          {isLoggedIn ? (
            <>
              <Button
                variant="ghost"
                size="icon"
                className="relative"
                onClick={() => alert("Notifications feature coming soon!")}
              >
                <Bell className="h-5 w-5" />
                {notificationCount > 0 && (
                  <span className="absolute top-0 right-0 h-4 w-4 rounded-full bg-destructive text-destructive-foreground text-xs flex items-center justify-center">
                    {notificationCount}
                  </span>
                )}
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="flex items-center gap-2 pl-2 pr-3"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src={
                          userImage ||
                          `https://api.dicebear.com/7.x/avataaars/svg?seed=${userName}`
                        }
                        alt={userName}
                      />
                      <AvatarFallback>
                        {userName.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <span className="hidden sm:inline-block">{userName}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Link to={getDashboardLink()} className="flex w-full">
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link to="/profile" className="flex w-full">
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link to="/settings" className="flex w-full">
                      Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout}>
                    <span className="flex w-full">Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <div className="flex items-center space-x-2">
              <Button variant="ghost" asChild>
                <Link
                  to="/login"
                  onClick={(e) => {
                    e.preventDefault();
                    window.location.href = "/login";
                  }}
                >
                  <LogIn className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline-block">Login</span>
                </Link>
              </Button>
              <Button asChild>
                <Link
                  to="/register"
                  onClick={(e) => {
                    e.preventDefault();
                    window.location.href = "/register";
                  }}
                >
                  <User className="h-4 w-4 mr-2 sm:mr-2" />
                  <span className="hidden sm:inline-block">Register</span>
                </Link>
              </Button>
            </div>
          )}

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={toggleMobileMenu}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-background border-b border-border">
          <div className="px-4 py-3 space-y-1">
            <Link
              to="/"
              className="block py-2 px-3 rounded-md hover:bg-accent"
              onClick={toggleMobileMenu}
            >
              Home
            </Link>
            <Link
              to="/jobs"
              className="block py-2 px-3 rounded-md hover:bg-accent"
              onClick={toggleMobileMenu}
            >
              Jobs
            </Link>
            <Link
              to="/internships"
              className="block py-2 px-3 rounded-md hover:bg-accent"
              onClick={toggleMobileMenu}
            >
              Internships
            </Link>
            <Link
              to="/campus-drives"
              className="block py-2 px-3 rounded-md hover:bg-accent"
              onClick={toggleMobileMenu}
            >
              Campus Drives
            </Link>
            <Link
              to="/resume-builder"
              className="block py-2 px-3 rounded-md hover:bg-accent"
              onClick={toggleMobileMenu}
            >
              Resume Builder
            </Link>
            <Link
              to="/about"
              className="block py-2 px-3 rounded-md hover:bg-accent"
              onClick={toggleMobileMenu}
            >
              About
            </Link>
            <Link
              to="/contact"
              className="block py-2 px-3 rounded-md hover:bg-accent"
              onClick={toggleMobileMenu}
            >
              Contact
            </Link>
            <div className="pt-2 border-t border-border">
              <Button
                variant="ghost"
                size="sm"
                onClick={onToggleTheme}
                className="w-full justify-start"
              >
                {isDarkMode ? (
                  <Sun className="h-4 w-4 mr-2" />
                ) : (
                  <Moon className="h-4 w-4 mr-2" />
                )}
                {isDarkMode ? "Light Mode" : "Dark Mode"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
