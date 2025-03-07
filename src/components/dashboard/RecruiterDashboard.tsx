import React, { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Briefcase, Plus, Users, BarChart2, Calendar } from "lucide-react";

import DashboardSidebar from "./DashboardSidebar";
import CompanyProfile from "../profile/CompanyProfile";
import JobPostingForm from "../jobs/JobPostingForm";
import ApplicantManagement from "../applications/ApplicantManagement";

interface RecruiterDashboardProps {
  userName?: string;
  userEmail?: string;
  userImage?: string;
  companyName?: string;
  activeSection?: string;
  notificationCount?: number;
}

const RecruiterDashboard = ({
  userName = "Jane Smith",
  userEmail = "jane.smith@company.com",
  userImage = "https://api.dicebear.com/7.x/avataaars/svg?seed=jane",
  companyName = "Acme Corporation",
  activeSection = "dashboard",
  notificationCount = 3,
}: RecruiterDashboardProps) => {
  // Load company profile from localStorage if available
  useEffect(() => {
    const storedProfile = localStorage.getItem("companyProfile");
    if (storedProfile) {
      const profile = JSON.parse(storedProfile);
      // Update company name and user name if available
      if (profile.companyName) companyName = profile.companyName;
      if (profile.hrName) userName = profile.hrName;
    }

    // Check if this is a new recruiter who needs to create a company profile
    const hasCompanyProfile = localStorage.getItem("hasCompanyProfile");
    if (!hasCompanyProfile && activeSection === "dashboard") {
      setCurrentSection("company");
    }
  }, []);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [currentSection, setCurrentSection] = useState(activeSection);

  const handleSidebarToggle = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const handleNavigate = (section: string) => {
    setCurrentSection(section);

    // If this is a new recruiter, mark that they've visited the company profile page
    if (section === "company" && !localStorage.getItem("hasCompanyProfile")) {
      localStorage.setItem("hasCompanyProfile", "true");
    }
  };

  // Dashboard summary data
  const dashboardData = {
    activeJobs: 5,
    totalApplicants: 42,
    interviewsScheduled: 8,
    upcomingInterviews: [
      {
        id: "1",
        position: "Software Engineer",
        candidate: "Alex Johnson",
        date: "2023-07-15",
        time: "10:00 AM",
      },
      {
        id: "2",
        position: "UX Designer",
        candidate: "Priya Sharma",
        date: "2023-07-16",
        time: "2:30 PM",
      },
      {
        id: "3",
        position: "Product Manager",
        candidate: "Michael Brown",
        date: "2023-07-18",
        time: "11:00 AM",
      },
    ],
    recentApplicants: [
      {
        id: "1",
        name: "Alex Johnson",
        position: "Software Engineer",
        appliedDate: "2023-07-10",
      },
      {
        id: "2",
        name: "Priya Sharma",
        position: "UX Designer",
        appliedDate: "2023-07-09",
      },
      {
        id: "3",
        name: "Michael Brown",
        position: "Product Manager",
        appliedDate: "2023-07-08",
      },
      {
        id: "4",
        name: "Sarah Wilson",
        position: "Data Analyst",
        appliedDate: "2023-07-07",
      },
    ],
  };

  const renderDashboardContent = () => {
    switch (currentSection) {
      case "dashboard":
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold">Recruiter Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome back to your recruiter dashboard, {userName}.
            </p>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">
                    Active Job Postings
                  </CardTitle>
                  <Briefcase className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {dashboardData.activeJobs}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    +2 from last month
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Applicants
                  </CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {dashboardData.totalApplicants}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    +15 from last month
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">
                    Interviews Scheduled
                  </CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {dashboardData.interviewsScheduled}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    +3 from last month
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Dashboard Tabs */}
            <Tabs defaultValue="upcoming" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="upcoming">
                  <Calendar className="h-4 w-4 mr-2" />
                  Upcoming Interviews
                </TabsTrigger>
                <TabsTrigger value="recent">
                  <Users className="h-4 w-4 mr-2" />
                  Recent Applicants
                </TabsTrigger>
              </TabsList>
              <TabsContent value="upcoming" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Upcoming Interviews</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {dashboardData.upcomingInterviews.length > 0 ? (
                      <div className="space-y-4">
                        {dashboardData.upcomingInterviews.map((interview) => (
                          <div
                            key={interview.id}
                            className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                          >
                            <div>
                              <h3 className="font-medium">
                                {interview.position}
                              </h3>
                              <p className="text-sm text-muted-foreground">
                                Candidate: {interview.candidate}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="text-sm font-medium">
                                {new Date(interview.date).toLocaleDateString()}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {interview.time}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-6">
                        <p className="text-muted-foreground">
                          No upcoming interviews scheduled.
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="recent" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Applicants</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {dashboardData.recentApplicants.length > 0 ? (
                      <div className="space-y-4">
                        {dashboardData.recentApplicants.map((applicant) => (
                          <div
                            key={applicant.id}
                            className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                          >
                            <div>
                              <h3 className="font-medium">{applicant.name}</h3>
                              <p className="text-sm text-muted-foreground">
                                {applicant.position}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="text-sm text-muted-foreground">
                                Applied:{" "}
                                {new Date(
                                  applicant.appliedDate,
                                ).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-6">
                        <p className="text-muted-foreground">
                          No recent applicants.
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            {/* Quick Actions */}
            <div className="mt-6">
              <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button
                  variant="outline"
                  className="h-auto py-4 flex flex-col items-center justify-center"
                  onClick={() => handleNavigate("postings")}
                >
                  <Plus className="h-5 w-5 mb-2" />
                  <span>Post New Job</span>
                </Button>
                <Button
                  variant="outline"
                  className="h-auto py-4 flex flex-col items-center justify-center"
                  onClick={() => handleNavigate("applicants")}
                >
                  <Users className="h-5 w-5 mb-2" />
                  <span>View Applicants</span>
                </Button>
                <Button
                  variant="outline"
                  className="h-auto py-4 flex flex-col items-center justify-center"
                  onClick={() => handleNavigate("company")}
                >
                  <BarChart2 className="h-5 w-5 mb-2" />
                  <span>Company Profile</span>
                </Button>
              </div>
            </div>
          </div>
        );
      case "company":
        return <CompanyProfile />;
      case "postings":
        return <JobPostingForm />;
      case "applicants":
        return <ApplicantManagement />;
      default:
        return (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold">Section Not Found</h2>
            <p className="text-muted-foreground mt-2">
              The requested section could not be found.
            </p>
            <Button
              className="mt-4"
              onClick={() => setCurrentSection("dashboard")}
            >
              Return to Dashboard
            </Button>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen bg-background">
      <DashboardSidebar
        userType="recruiter"
        userName={userName}
        userEmail={userEmail}
        userImage={userImage}
        collapsed={sidebarCollapsed}
        onToggleCollapse={handleSidebarToggle}
        onNavigate={handleNavigate}
        activeSection={currentSection}
        notificationCount={notificationCount}
      />
      <main className="flex-1 overflow-y-auto p-6">
        {renderDashboardContent()}
      </main>
    </div>
  );
};

export default RecruiterDashboard;
