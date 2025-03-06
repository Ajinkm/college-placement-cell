import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Calendar,
  Clock,
  FileText,
  MapPin,
  MessageSquare,
  User,
} from "lucide-react";

interface Application {
  id: string;
  jobTitle: string;
  companyName: string;
  appliedDate: string;
  status:
    | "pending"
    | "shortlisted"
    | "interview"
    | "rejected"
    | "offered"
    | "accepted";
  location: string;
  description: string;
}

interface Interview {
  id: string;
  jobTitle: string;
  companyName: string;
  date: string;
  time: string;
  type: "online" | "in-person";
  location: string;
  interviewers: string[];
  notes: string;
}

interface ApplicationTrackerProps {
  applications?: Application[];
  interviews?: Interview[];
}

const statusColors = {
  pending: "bg-yellow-100 text-yellow-800",
  shortlisted: "bg-blue-100 text-blue-800",
  interview: "bg-purple-100 text-purple-800",
  rejected: "bg-red-100 text-red-800",
  offered: "bg-green-100 text-green-800",
  accepted: "bg-emerald-100 text-emerald-800",
};

const ApplicationTracker = ({
  applications = [], // Start with empty applications
  interviews = [], // Start with empty interviews
}: ApplicationTrackerProps) => {
  const [selectedApplication, setSelectedApplication] =
    useState<Application | null>(null);
  const [selectedInterview, setSelectedInterview] = useState<Interview | null>(
    null,
  );

  // State to store applications
  const [applicationsList, setApplicationsList] = useState<Application[]>([]);

  // Load applications from localStorage
  React.useEffect(() => {
    const storedApplications = localStorage.getItem("applications");
    if (storedApplications) {
      try {
        const parsedApplications = JSON.parse(storedApplications);
        // Create a new array of applications
        const newApplications: Application[] = parsedApplications.map(
          (app: any) => ({
            id: app.id || Date.now().toString(),
            jobTitle: app.jobTitle,
            companyName: app.companyName,
            appliedDate: app.appliedDate,
            status: app.status || "pending",
            location: app.location || "",
            description: app.description || "",
          }),
        );

        // Update the state with the new applications
        setApplicationsList(newApplications);
      } catch (e) {
        console.error("Error parsing applications:", e);
        setApplicationsList([]);
      }
    }
  }, []);

  return (
    <div className="w-full h-full bg-white p-6 rounded-lg">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          Application Tracker
        </h1>
        <p className="text-gray-600">
          Track your job applications and upcoming interviews
        </p>
      </div>

      <Tabs defaultValue="applications" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="applications">Applications</TabsTrigger>
          <TabsTrigger value="interviews">Upcoming Interviews</TabsTrigger>
        </TabsList>

        <TabsContent value="applications" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Job Applications</CardTitle>
                  <CardDescription>
                    Track the status of your job applications
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Job Title</TableHead>
                        <TableHead>Company</TableHead>
                        <TableHead>Applied Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {applicationsList.length > 0 ? (
                        applicationsList.map((application) => (
                          <TableRow key={application.id}>
                            <TableCell className="font-medium">
                              {application.jobTitle}
                            </TableCell>
                            <TableCell>{application.companyName}</TableCell>
                            <TableCell>
                              {new Date(
                                application.appliedDate,
                              ).toLocaleDateString()}
                            </TableCell>
                            <TableCell>
                              <Badge
                                className={statusColors[application.status]}
                              >
                                {application.status.charAt(0).toUpperCase() +
                                  application.status.slice(1)}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex space-x-2">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() =>
                                    setSelectedApplication(application)
                                  }
                                >
                                  View Details
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-red-500 hover:text-red-700"
                                  onClick={() => {
                                    const storedApplications =
                                      localStorage.getItem("applications");
                                    if (storedApplications) {
                                      try {
                                        const applications =
                                          JSON.parse(storedApplications);
                                        const updatedApplications =
                                          applications.filter(
                                            (app) => app.id !== application.id,
                                          );
                                        localStorage.setItem(
                                          "applications",
                                          JSON.stringify(updatedApplications),
                                        );
                                        setApplicationsList(
                                          applicationsList.filter(
                                            (app) => app.id !== application.id,
                                          ),
                                        );
                                        if (
                                          selectedApplication &&
                                          selectedApplication.id ===
                                            application.id
                                        ) {
                                          setSelectedApplication(null);
                                        }
                                        alert(
                                          "Application removed successfully!",
                                        );
                                      } catch (e) {
                                        console.error(
                                          "Error removing application:",
                                          e,
                                        );
                                      }
                                    }
                                  }}
                                >
                                  Remove
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={5} className="text-center py-6">
                            <p className="text-muted-foreground">
                              No applications found. Apply for jobs to see them
                              here.
                            </p>
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>

            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Application Details</CardTitle>
                  <CardDescription>
                    View detailed information about your application
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {selectedApplication ? (
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-lg font-semibold">
                          {selectedApplication.jobTitle}
                        </h3>
                        <p className="text-gray-600">
                          {selectedApplication.companyName}
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <Badge
                          className={statusColors[selectedApplication.status]}
                        >
                          {selectedApplication.status.charAt(0).toUpperCase() +
                            selectedApplication.status.slice(1)}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-1 gap-3">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-gray-500" />
                          <span>
                            Applied:{" "}
                            {new Date(
                              selectedApplication.appliedDate,
                            ).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-gray-500" />
                          <span>{selectedApplication.location}</span>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium mb-1">Job Description</h4>
                        <p className="text-sm text-gray-600">
                          {selectedApplication.description}
                        </p>
                      </div>

                      <div>
                        <h4 className="font-medium mb-1">Application Status</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span>Application Received</span>
                            <Badge
                              variant="outline"
                              className="bg-green-100 text-green-800"
                            >
                              Completed
                            </Badge>
                          </div>
                          <div className="flex justify-between items-center">
                            <span>Resume Screening</span>
                            <Badge
                              variant="outline"
                              className={
                                selectedApplication.status !== "pending"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-yellow-100 text-yellow-800"
                              }
                            >
                              {selectedApplication.status !== "pending"
                                ? "Completed"
                                : "In Progress"}
                            </Badge>
                          </div>
                          <div className="flex justify-between items-center">
                            <span>Interview Invitation</span>
                            <Badge
                              variant="outline"
                              className={
                                selectedApplication.status === "interview" ||
                                selectedApplication.status === "offered"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-gray-100 text-gray-800"
                              }
                            >
                              {selectedApplication.status === "interview" ||
                              selectedApplication.status === "offered"
                                ? "Completed"
                                : "Pending"}
                            </Badge>
                          </div>
                          <div className="flex justify-between items-center">
                            <span>Final Decision</span>
                            <Badge
                              variant="outline"
                              className={
                                selectedApplication.status === "offered" ||
                                selectedApplication.status === "rejected"
                                  ? selectedApplication.status === "offered"
                                    ? "bg-green-100 text-green-800"
                                    : "bg-red-100 text-red-800"
                                  : "bg-gray-100 text-gray-800"
                              }
                            >
                              {selectedApplication.status === "offered"
                                ? "Accepted"
                                : selectedApplication.status === "rejected"
                                  ? "Rejected"
                                  : "Pending"}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-6 text-gray-500">
                      <FileText className="h-12 w-12 mx-auto mb-2 opacity-50" />
                      <p>Select an application to view details</p>
                    </div>
                  )}
                </CardContent>
                {selectedApplication && (
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" size="sm">
                      Update Status
                    </Button>
                    <Button variant="outline" size="sm">
                      Add Notes
                    </Button>
                  </CardFooter>
                )}
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="interviews" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Interviews</CardTitle>
                  <CardDescription>
                    Manage your scheduled interviews
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {interviews.length > 0 ? (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Job Title</TableHead>
                          <TableHead>Company</TableHead>
                          <TableHead>Date & Time</TableHead>
                          <TableHead>Type</TableHead>
                          <TableHead>Action</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {interviews.map((interview) => (
                          <TableRow key={interview.id}>
                            <TableCell className="font-medium">
                              {interview.jobTitle}
                            </TableCell>
                            <TableCell>{interview.companyName}</TableCell>
                            <TableCell>
                              {new Date(interview.date).toLocaleDateString()} at{" "}
                              {interview.time}
                            </TableCell>
                            <TableCell>
                              <Badge
                                variant={
                                  interview.type === "online"
                                    ? "secondary"
                                    : "default"
                                }
                              >
                                {interview.type === "online"
                                  ? "Online"
                                  : "In-Person"}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setSelectedInterview(interview)}
                              >
                                View Details
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <p>No upcoming interviews scheduled</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Interview Details</CardTitle>
                  <CardDescription>
                    View detailed information about your interview
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {selectedInterview ? (
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-lg font-semibold">
                          {selectedInterview.jobTitle}
                        </h3>
                        <p className="text-gray-600">
                          {selectedInterview.companyName}
                        </p>
                      </div>

                      <div className="grid grid-cols-1 gap-3">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-gray-500" />
                          <span>
                            Date:{" "}
                            {new Date(
                              selectedInterview.date,
                            ).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-gray-500" />
                          <span>Time: {selectedInterview.time}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-gray-500" />
                          <span>{selectedInterview.location}</span>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium mb-1">Interviewers</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          {selectedInterview.interviewers.map(
                            (interviewer, index) => (
                              <li
                                key={index}
                                className="flex items-center gap-2"
                              >
                                <User className="h-3 w-3 text-gray-500" />
                                {interviewer}
                              </li>
                            ),
                          )}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-medium mb-1">Notes</h4>
                        <p className="text-sm text-gray-600">
                          {selectedInterview.notes}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-6 text-gray-500">
                      <MessageSquare className="h-12 w-12 mx-auto mb-2 opacity-50" />
                      <p>Select an interview to view details</p>
                    </div>
                  )}
                </CardContent>
                {selectedInterview && (
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" size="sm">
                      Add to Calendar
                    </Button>
                    <Button variant="outline" size="sm">
                      Prepare Notes
                    </Button>
                  </CardFooter>
                )}
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ApplicationTracker;
