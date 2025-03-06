import React, { useState, useEffect } from "react";
import DashboardSidebar from "./DashboardSidebar";
import StudentProfile from "../profile/StudentProfile";
import JobListings from "../jobs/JobListings";
import ApplicationTracker from "../applications/ApplicationTracker";
import { Card, CardContent } from "@/components/ui/card";
import { Bell, Calendar, MessageSquare } from "lucide-react";

interface StudentDashboardProps {
  studentName?: string;
  studentEmail?: string;
  studentImage?: string;
  notificationCount?: number;
}

const StudentDashboard = ({
  studentName = "John Doe",
  studentEmail = "john.doe@university.edu",
  studentImage = "https://api.dicebear.com/7.x/avataaars/svg?seed=john",
  notificationCount = 3,
}: StudentDashboardProps) => {
  // State for user profile data
  const [displayName, setDisplayName] = useState(studentName);
  const [displayEmail, setDisplayEmail] = useState(studentEmail);
  const [displayImage, setDisplayImage] = useState(studentImage);
  const [profileData, setProfileData] = useState<any>(null);
  const [activeSection, setActiveSection] = useState("dashboard");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Load student profile from localStorage if available
  useEffect(() => {
    // Listen for application-added events
    const handleApplicationAdded = () => {
      loadApplications();
    };

    window.addEventListener("application-added", handleApplicationAdded);

    const storedProfile = localStorage.getItem("studentProfile");
    if (storedProfile) {
      try {
        const profile = JSON.parse(storedProfile);
        // Update student data if available
        setProfileData(profile);
        if (profile.name) setDisplayName(profile.name);
        if (profile.email) setDisplayEmail(profile.email);
        if (profile.profileImage) setDisplayImage(profile.profileImage);

        // Update user object in localStorage with the profile name
        const userStr = localStorage.getItem("user");
        if (userStr && profile.name) {
          const user = JSON.parse(userStr);
          user.name = profile.name;
          localStorage.setItem("user", JSON.stringify(user));
        }

        // Generate recommended jobs based on profile
        const recommendations = generateRecommendedJobs(profile);
        if (recommendations.length > 0) {
          recommendedJobs.length = 0; // Clear the array
          recommendedJobs.push(...recommendations);
        }
      } catch (e) {
        console.error("Error parsing profile:", e);
      }
    }

    // Load applications from localStorage
    loadApplications();

    // Cleanup
    return () => {
      window.removeEventListener("application-added", handleApplicationAdded);
    };
  }, []);

  const handleNavigate = (section: string) => {
    setActiveSection(section);
  };

  const handleToggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const renderDashboardContent = () => {
    switch (activeSection) {
      case "profile":
        return <StudentProfile studentData={profileData} />;
      case "jobs":
        return <JobListings />;
      case "applications":
        return <ApplicationTracker />;
      case "dashboard":
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <div className="flex h-screen w-full bg-background">
      <DashboardSidebar
        userType="student"
        userName={displayName}
        userEmail={displayEmail}
        userImage={displayImage}
        collapsed={sidebarCollapsed}
        onToggleCollapse={handleToggleSidebar}
        onNavigate={handleNavigate}
        activeSection={activeSection}
        notificationCount={notificationCount}
      />
      <main className="flex-1 overflow-auto p-6">
        {renderDashboardContent()}
      </main>
    </div>
  );
};

const DashboardOverview = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Student Dashboard</h1>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-muted-foreground">
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="rounded-full bg-primary/10 p-3">
                <Bell className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium">Upcoming Deadlines</p>
                <h3 className="text-2xl font-bold">5</h3>
              </div>
            </div>
            <div className="mt-4 space-y-2">
              <div className="flex justify-between items-center text-sm">
                <span>Software Engineer at TechCorp</span>
                <span className="text-red-500 font-medium">2 days left</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span>Data Analyst Intern at Analytics Pro</span>
                <span className="text-red-500 font-medium">5 days left</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span>Product Manager at InnovateTech</span>
                <span className="text-yellow-500 font-medium">1 week left</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="rounded-full bg-primary/10 p-3">
                <Calendar className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium">Scheduled Interviews</p>
                <h3 className="text-2xl font-bold">2</h3>
              </div>
            </div>
            <div className="mt-4 space-y-2">
              <div className="flex justify-between items-center text-sm">
                <div>
                  <p className="font-medium">Software Engineer - TechCorp</p>
                  <p className="text-xs text-muted-foreground">
                    Technical Interview
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-medium">Tomorrow</p>
                  <p className="text-xs text-muted-foreground">10:00 AM</p>
                </div>
              </div>
              <div className="flex justify-between items-center text-sm">
                <div>
                  <p className="font-medium">UX Designer - DesignHub</p>
                  <p className="text-xs text-muted-foreground">
                    Portfolio Review
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-medium">June 16, 2023</p>
                  <p className="text-xs text-muted-foreground">2:30 PM</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardContent className="p-6">
            <h3 className="mb-4 text-lg font-medium">Recent Applications</h3>
            <div className="space-y-4">
              {recentApplications.map((app, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0"
                >
                  <div>
                    <p className="font-medium">{app.position}</p>
                    <p className="text-sm text-muted-foreground">
                      {app.company}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm">{app.date}</p>
                    <p className={`text-xs ${getStatusColor(app.status)}`}>
                      {app.status}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="mb-4 text-lg font-medium">Recommended Jobs</h3>
            <div className="space-y-4">
              {recommendedJobs.map((job, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0"
                >
                  <div>
                    <p className="font-medium">{job.position}</p>
                    <p className="text-sm text-muted-foreground">
                      {job.company}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm">{job.location}</p>
                    <p className="text-xs text-muted-foreground">
                      Posted: {job.posted}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="p-6">
          <h3 className="mb-4 text-lg font-medium">Upcoming Events</h3>
          <div className="space-y-4">
            {upcomingEvents.map((event, index) => (
              <div
                key={index}
                className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0"
              >
                <div>
                  <p className="font-medium">{event.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {event.organizer}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm">{event.date}</p>
                  <p className="text-xs text-muted-foreground">{event.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case "pending":
      return "text-yellow-600";
    case "shortlisted":
      return "text-blue-600";
    case "rejected":
      return "text-red-600";
    case "accepted":
      return "text-green-600";
    default:
      return "text-gray-600";
  }
};

// Will be populated from actual applications
let recentApplications: Array<{
  position: string;
  company: string;
  date: string;
  status: string;
}> = [];

// Function to load applications from localStorage
const loadApplications = () => {
  const storedApplications = localStorage.getItem("applications");
  if (storedApplications) {
    try {
      const applications = JSON.parse(storedApplications);
      // Update recent applications
      recentApplications = []; // Clear the array

      // Get the most recent applications first
      const sortedApplications = [...applications].sort((a, b) => {
        return (
          new Date(b.appliedDate).getTime() - new Date(a.appliedDate).getTime()
        );
      });

      sortedApplications.slice(0, 3).forEach((app: any) => {
        recentApplications.push({
          position: app.jobTitle,
          company: app.companyName,
          date: new Date(app.appliedDate).toLocaleDateString(),
          status: app.status,
        });
      });
    } catch (e) {
      console.error("Error parsing applications:", e);
    }
  }
};

// Default recommended jobs
let recommendedJobs: Array<{
  position: string;
  company: string;
  location: string;
  posted: string;
}> = [
  {
    position: "Frontend Developer",
    company: "Web Innovations",
    location: "Remote",
    posted: "2 days ago",
  },
  {
    position: "Machine Learning Engineer",
    company: "AI Solutions",
    location: "Bangalore, India",
    posted: "1 week ago",
  },
  {
    position: "Product Manager Intern",
    company: "Product Labs",
    location: "Hybrid",
    posted: "3 days ago",
  },
];

// Function to generate recommended jobs based on profile
const generateRecommendedJobs = (profile: any) => {
  // Check if user has a profile with skills
  if (profile && profile.skills) {
    const skills = profile.skills.toLowerCase();
    const recommendations = [];

    // Match jobs based on skills in the profile
    if (
      skills.includes("javascript") ||
      skills.includes("react") ||
      skills.includes("web")
    ) {
      recommendations.push({
        position: "Frontend Developer",
        company: "Web Innovations",
        location: "Remote",
        posted: "2 days ago",
      });
    }

    if (
      skills.includes("python") ||
      skills.includes("machine learning") ||
      skills.includes("ai")
    ) {
      recommendations.push({
        position: "Machine Learning Engineer",
        company: "AI Solutions",
        location: "Bangalore, India",
        posted: "1 week ago",
      });
    }

    if (
      skills.includes("product") ||
      skills.includes("management") ||
      skills.includes("business")
    ) {
      recommendations.push({
        position: "Product Manager Intern",
        company: "Product Labs",
        location: "Hybrid",
        posted: "3 days ago",
      });
    }

    if (
      skills.includes("data") ||
      skills.includes("analysis") ||
      skills.includes("analytics")
    ) {
      recommendations.push({
        position: "Data Analyst",
        company: "DataTech Solutions",
        location: "Mumbai, India",
        posted: "5 days ago",
      });
    }

    return recommendations;
  }
  return [];
};

const upcomingEvents = [
  {
    title: "Tech Career Fair",
    organizer: "University Placement Cell",
    date: "June 10, 2023",
    time: "10:00 AM - 4:00 PM",
  },
  {
    title: "Resume Building Workshop",
    organizer: "Career Development Center",
    date: "May 25, 2023",
    time: "2:00 PM - 3:30 PM",
  },
  {
    title: "Mock Interview Session",
    organizer: "Industry Connect Program",
    date: "June 5, 2023",
    time: "11:00 AM - 1:00 PM",
  },
];

export default StudentDashboard;
