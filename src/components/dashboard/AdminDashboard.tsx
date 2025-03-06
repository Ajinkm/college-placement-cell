import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import DashboardSidebar from "../dashboard/DashboardSidebar";
import AnalyticsDashboard from "../admin/AnalyticsDashboard";
import UserManagement from "../admin/UserManagement";
import JobApproval from "../admin/JobApproval";
import AnnouncementCreator from "../admin/AnnouncementCreator";

interface AdminDashboardProps {
  userName?: string;
  userEmail?: string;
  userImage?: string;
  activeSection?: string;
  notificationCount?: number;
}

const AdminDashboard = ({
  userName = "Admin User",
  userEmail = "admin@university.edu",
  userImage = "https://api.dicebear.com/7.x/avataaars/svg?seed=admin",
  activeSection = "analytics",
  notificationCount = 5,
}: AdminDashboardProps) => {
  const [currentSection, setCurrentSection] = useState(activeSection);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const handleNavigate = (section: string) => {
    setCurrentSection(section);
  };

  const handleToggleCollapse = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  // Render the appropriate content based on the current section
  const renderContent = () => {
    switch (currentSection) {
      case "analytics":
        return <AnalyticsDashboard />;
      case "users":
        return <UserManagement />;
      case "approvals":
        return <JobApproval />;
      case "announcements":
        return <AnnouncementCreator />;
      case "settings":
        return (
          <div className="w-full h-full p-6 bg-background">
            <Card>
              <CardHeader>
                <CardTitle>Settings</CardTitle>
                <CardDescription>
                  Manage your account settings and preferences
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>Settings content will be implemented here.</p>
              </CardContent>
            </Card>
          </div>
        );
      case "notifications":
        return (
          <div className="w-full h-full p-6 bg-background">
            <Card>
              <CardHeader>
                <CardTitle>Notifications</CardTitle>
                <CardDescription>
                  View and manage your notifications
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>Notifications content will be implemented here.</p>
              </CardContent>
            </Card>
          </div>
        );
      default:
        return <AnalyticsDashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-background">
      <DashboardSidebar
        userType="admin"
        userName={userName}
        userEmail={userEmail}
        userImage={userImage}
        collapsed={sidebarCollapsed}
        onToggleCollapse={handleToggleCollapse}
        onNavigate={handleNavigate}
        activeSection={currentSection}
        notificationCount={notificationCount}
      />
      <div className="flex-1 overflow-auto">{renderContent()}</div>
    </div>
  );
};

export default AdminDashboard;
