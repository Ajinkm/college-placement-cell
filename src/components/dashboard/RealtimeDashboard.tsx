import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bell, Briefcase, Calendar, Clock, User } from "lucide-react";
import { REALTIME_CHANNELS, subscribeToChannel } from "@/lib/supabase-db";

interface RealtimeDashboardProps {
  userRole: "student" | "recruiter" | "admin";
  userName?: string;
}

const RealtimeDashboard = ({
  userRole = "student",
  userName = "John Doe",
}: RealtimeDashboardProps) => {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [jobCount, setJobCount] = useState(5);
  const [applicantCount, setApplicantCount] = useState(42);
  const [interviewCount, setInterviewCount] = useState(8);
  const [placementCount, setPlacementCount] = useState(12);

  useEffect(() => {
    // Subscribe to job channel
    const jobsChannel = subscribeToChannel(
      REALTIME_CHANNELS.JOBS,
      (payload) => {
        console.log("Job channel event received:", payload);
        if (payload.event === "new-job") {
          // Add notification
          setNotifications((prev) => [
            {
              id: Date.now(),
              type: "job",
              message: `New job posted: ${payload.payload.title} at ${payload.payload.company}`,
              time: new Date().toLocaleTimeString(),
            },
            ...prev,
          ]);

          // Update job count
          setJobCount((prev) => prev + 1);
        }
      },
    );

    // Subscribe to applications channel
    const applicationsChannel = subscribeToChannel(
      REALTIME_CHANNELS.APPLICATIONS,
      (payload) => {
        console.log("Application channel event received:", payload);
        if (payload.event === "new-application") {
          // Add notification
          setNotifications((prev) => [
            {
              id: Date.now(),
              type: "application",
              message: `New application for ${payload.payload.jobTitle} from ${payload.payload.userId}`,
              time: new Date().toLocaleTimeString(),
            },
            ...prev,
          ]);

          // Update applicant count
          setApplicantCount((prev) => prev + 1);
        }
      },
    );

    // Subscribe to interviews channel
    const interviewsChannel = subscribeToChannel(
      REALTIME_CHANNELS.INTERVIEWS,
      (payload) => {
        console.log("Interview channel event received:", payload);
        if (payload.event === "new-interview") {
          // Add notification
          setNotifications((prev) => [
            {
              id: Date.now(),
              type: "interview",
              message: `Interview scheduled for ${payload.payload.candidateName} on ${payload.payload.date}`,
              time: new Date().toLocaleTimeString(),
            },
            ...prev,
          ]);

          // Update interview count
          setInterviewCount((prev) => prev + 1);
        }
      },
    );

    // Subscribe to placements channel
    const placementsChannel = subscribeToChannel(
      REALTIME_CHANNELS.PLACEMENTS,
      (payload) => {
        console.log("Placement channel event received:", payload);
        if (payload.event === "new-placement") {
          // Add notification
          setNotifications((prev) => [
            {
              id: Date.now(),
              type: "placement",
              message: `${payload.payload.studentName} placed at ${payload.payload.company}`,
              time: new Date().toLocaleTimeString(),
            },
            ...prev,
          ]);

          // Update placement count
          setPlacementCount((prev) => prev + 1);
        }
      },
    );

    // Cleanup subscriptions
    return () => {
      jobsChannel.unsubscribe();
      applicationsChannel.unsubscribe();
      interviewsChannel.unsubscribe();
      placementsChannel.unsubscribe();
    };
  }, []);

  // Simulate events for demonstration
  const simulateNewJob = async () => {
    try {
      const { broadcastToChannel, REALTIME_CHANNELS } = await import(
        "@/lib/supabase-db"
      );
      await broadcastToChannel(REALTIME_CHANNELS.JOBS, "new-job", {
        id: Date.now().toString(),
        title: "Frontend Developer",
        company: "Tech Innovations",
        location: "Remote",
        type: "Full-time",
        salary: "₹10-15 LPA",
        postedDate: new Date().toISOString(),
      });
    } catch (error) {
      console.error("Error simulating new job:", error);
    }
  };

  const simulateNewApplication = async () => {
    try {
      const { broadcastToChannel, REALTIME_CHANNELS } = await import(
        "@/lib/supabase-db"
      );
      await broadcastToChannel(
        REALTIME_CHANNELS.APPLICATIONS,
        "new-application",
        {
          id: Date.now().toString(),
          jobId: "job-123",
          userId: userName,
          jobTitle: "Software Engineer",
          companyName: "TechCorp",
          appliedDate: new Date().toISOString(),
          status: "pending",
        },
      );
    } catch (error) {
      console.error("Error simulating new application:", error);
    }
  };

  const simulateNewInterview = async () => {
    try {
      const { broadcastToChannel, REALTIME_CHANNELS } = await import(
        "@/lib/supabase-db"
      );
      await broadcastToChannel(REALTIME_CHANNELS.INTERVIEWS, "new-interview", {
        id: Date.now().toString(),
        jobId: "job-123",
        candidateId: "candidate-456",
        candidateName: userName,
        date: new Date().toISOString().split("T")[0],
        time: "10:00 AM",
        jobTitle: "Software Engineer",
        company: "TechCorp",
      });
    } catch (error) {
      console.error("Error simulating new interview:", error);
    }
  };

  const simulateNewPlacement = async () => {
    try {
      const { broadcastToChannel, REALTIME_CHANNELS } = await import(
        "@/lib/supabase-db"
      );
      await broadcastToChannel(REALTIME_CHANNELS.PLACEMENTS, "new-placement", {
        id: Date.now().toString(),
        studentId: "student-789",
        studentName: userName,
        jobId: "job-123",
        jobTitle: "Software Engineer",
        company: "TechCorp",
        salary: "₹12 LPA",
        joiningDate: new Date().toISOString().split("T")[0],
      });
    } catch (error) {
      console.error("Error simulating new placement:", error);
    }
  };

  return (
    <div className="w-full bg-background p-6">
      <h1 className="text-2xl font-bold mb-6">Real-Time Dashboard</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Jobs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{jobCount}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Total Applicants
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{applicantCount}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Interviews Scheduled
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{interviewCount}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Placements</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{placementCount}</div>
          </CardContent>
        </Card>
      </div>

      {/* Simulation Controls */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Simulate Real-Time Events</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            <Button onClick={simulateNewJob} variant="outline">
              <Briefcase className="mr-2 h-4 w-4" />
              Post New Job
            </Button>

            <Button onClick={simulateNewApplication} variant="outline">
              <User className="mr-2 h-4 w-4" />
              Submit Application
            </Button>

            <Button onClick={simulateNewInterview} variant="outline">
              <Calendar className="mr-2 h-4 w-4" />
              Schedule Interview
            </Button>

            <Button onClick={simulateNewPlacement} variant="outline">
              <Bell className="mr-2 h-4 w-4" />
              Record Placement
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Real-time Notifications */}
      <Card>
        <CardHeader>
          <CardTitle>Real-Time Notifications</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {notifications.length === 0 ? (
              <p className="text-muted-foreground text-center py-4">
                No notifications yet. Simulate an event to see real-time
                updates.
              </p>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className="flex items-start p-3 border rounded-md"
                >
                  {notification.type === "job" && (
                    <Briefcase className="h-5 w-5 mr-3 text-blue-500" />
                  )}
                  {notification.type === "application" && (
                    <User className="h-5 w-5 mr-3 text-green-500" />
                  )}
                  {notification.type === "interview" && (
                    <Calendar className="h-5 w-5 mr-3 text-purple-500" />
                  )}
                  {notification.type === "placement" && (
                    <Bell className="h-5 w-5 mr-3 text-orange-500" />
                  )}
                  <div className="flex-1">
                    <p>{notification.message}</p>
                    <div className="flex items-center mt-1">
                      <Clock className="h-3 w-3 mr-1 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">
                        {notification.time}
                      </span>
                    </div>
                  </div>
                  <Badge variant="outline">{notification.type}</Badge>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RealtimeDashboard;
