import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { ScrollArea } from "../ui/scroll-area";
import { Badge } from "../ui/badge";
import {
  Home,
  User,
  Briefcase,
  FileText,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Calendar,
  BarChart4,
  Bell,
  Building,
} from "lucide-react";

interface DashboardSidebarProps {
  userType?: "student" | "recruiter" | "admin";
  userName?: string;
  userEmail?: string;
  userImage?: string;
  collapsed?: boolean;
  onToggleCollapse?: () => void;
  onNavigate?: (section: string) => void;
  activeSection?: string;
  notificationCount?: number;
}

const DashboardSidebar = ({
  userType = "student",
  userName = "John Doe",
  userEmail = "john.doe@example.com",
  userImage = "",
  collapsed = false,
  onToggleCollapse = () => {},
  onNavigate = () => {},
  activeSection = "dashboard",
  notificationCount = 3,
}: DashboardSidebarProps) => {
  const [isCollapsed, setIsCollapsed] = useState(collapsed);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
    onToggleCollapse();
  };

  const handleNavigate = (section: string) => {
    if (section === "logout") {
      // Handle logout action
      localStorage.removeItem("user");
      localStorage.removeItem("hasProfile");
      localStorage.removeItem("hasCompanyProfile");
      window.location.href = "/login";
    } else {
      onNavigate(section);
    }
  };

  // Navigation items based on user type
  const getNavigationItems = () => {
    const commonItems = [
      { id: "dashboard", label: "Dashboard", icon: <Home size={20} /> },
    ];

    const studentItems = [
      { id: "profile", label: "My Profile", icon: <User size={20} /> },
      { id: "jobs", label: "Job Listings", icon: <Briefcase size={20} /> },
      {
        id: "applications",
        label: "My Applications",
        icon: <FileText size={20} />,
      },
    ];

    const recruiterItems = [
      { id: "company", label: "Company Profile", icon: <Building size={20} /> },
      { id: "postings", label: "Job Postings", icon: <Briefcase size={20} /> },
      { id: "applicants", label: "Applicants", icon: <FileText size={20} /> },
    ];

    const adminItems = [
      { id: "analytics", label: "Analytics", icon: <BarChart4 size={20} /> },
      { id: "users", label: "User Management", icon: <User size={20} /> },
      {
        id: "approvals",
        label: "Job Approvals",
        icon: <Briefcase size={20} />,
      },
      { id: "announcements", label: "Announcements", icon: <Bell size={20} /> },
    ];

    switch (userType) {
      case "student":
        return [...studentItems, ...commonItems];
      case "recruiter":
        return [...recruiterItems, ...commonItems];
      case "admin":
        return [...adminItems, ...commonItems];
      default:
        return commonItems;
    }
  };

  const navigationItems = getNavigationItems();

  return (
    <div
      className={`h-full bg-background border-r flex flex-col transition-all duration-300 ${isCollapsed ? "w-20" : "w-64 md:w-80"}`}
    >
      <div className="p-4 flex items-center justify-between border-b">
        {!isCollapsed && (
          <div className="flex items-center space-x-2">
            <Avatar className="h-10 w-10">
              <AvatarImage src={userImage} alt={userName} />
              <AvatarFallback>
                {userName.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="font-medium text-sm">{userName}</span>
              <span className="text-xs text-muted-foreground">{userEmail}</span>
            </div>
          </div>
        )}
        {isCollapsed && (
          <Avatar className="h-10 w-10 mx-auto">
            <AvatarImage src={userImage} alt={userName} />
            <AvatarFallback>
              {userName.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleCollapse}
          className="ml-auto"
        >
          {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </Button>
      </div>

      <ScrollArea className="flex-1 py-4">
        <nav className="px-2 space-y-1">
          {navigationItems.map((item) => (
            <TooltipProvider key={item.id} delayDuration={300}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant={activeSection === item.id ? "secondary" : "ghost"}
                    className={`w-full justify-start mb-1 ${isCollapsed ? "px-2" : "px-3"}`}
                    onClick={() => handleNavigate(item.id)}
                  >
                    <span className="flex items-center">
                      {item.icon}
                      {!isCollapsed && (
                        <span className="ml-3">{item.label}</span>
                      )}
                    </span>
                    {!isCollapsed && item.badge && (
                      <Badge variant="destructive" className="ml-auto">
                        {item.badge}
                      </Badge>
                    )}
                    {isCollapsed && item.badge && (
                      <Badge
                        variant="destructive"
                        className="absolute top-1 right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
                      >
                        {item.badge}
                      </Badge>
                    )}
                  </Button>
                </TooltipTrigger>
                {isCollapsed && (
                  <TooltipContent side="right">
                    <p>{item.label}</p>
                    {item.badge && (
                      <p className="text-xs">({item.badge} new)</p>
                    )}
                  </TooltipContent>
                )}
              </Tooltip>
            </TooltipProvider>
          ))}
        </nav>
      </ScrollArea>

      <div className="p-4 border-t">
        <TooltipProvider delayDuration={300}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                className={`w-full justify-start ${isCollapsed ? "px-2" : "px-3"}`}
                onClick={() => handleNavigate("logout")}
              >
                <LogOut size={20} />
                {!isCollapsed && <span className="ml-3">Logout</span>}
              </Button>
            </TooltipTrigger>
            {isCollapsed && (
              <TooltipContent side="right">
                <p>Logout</p>
              </TooltipContent>
            )}
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default DashboardSidebar;
