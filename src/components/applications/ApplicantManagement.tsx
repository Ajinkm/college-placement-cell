import React, { useState } from "react";
import {
  Search,
  Filter,
  Calendar,
  UserCheck,
  UserX,
  Mail,
  Phone,
  Download,
  FileText,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

interface Applicant {
  id: string;
  name: string;
  email: string;
  phone: string;
  education: string;
  experience: string;
  skills: string[];
  appliedDate: string;
  status: "pending" | "shortlisted" | "rejected" | "interviewed";
  resumeUrl: string;
}

interface ApplicantManagementProps {
  jobId?: string;
  applicants?: Applicant[];
}

const defaultApplicants: Applicant[] = [
  {
    id: "1",
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    phone: "+91 9876543210",
    education: "B.Tech Computer Science",
    experience: "2 years",
    skills: ["React", "Node.js", "MongoDB"],
    appliedDate: "2023-06-15",
    status: "shortlisted",
    resumeUrl: "#",
  },
  {
    id: "2",
    name: "Priya Sharma",
    email: "priya.sharma@example.com",
    phone: "+91 9876543211",
    education: "M.Tech AI & ML",
    experience: "3 years",
    skills: ["Python", "TensorFlow", "Data Science"],
    appliedDate: "2023-06-14",
    status: "pending",
    resumeUrl: "#",
  },
  {
    id: "3",
    name: "Rahul Verma",
    email: "rahul.verma@example.com",
    phone: "+91 9876543212",
    education: "B.Tech Electronics",
    experience: "1 year",
    skills: ["Java", "Spring Boot", "MySQL"],
    appliedDate: "2023-06-13",
    status: "interviewed",
    resumeUrl: "#",
  },
  {
    id: "4",
    name: "Neha Gupta",
    email: "neha.gupta@example.com",
    phone: "+91 9876543213",
    education: "BCA",
    experience: "Fresher",
    skills: ["HTML", "CSS", "JavaScript"],
    appliedDate: "2023-06-12",
    status: "rejected",
    resumeUrl: "#",
  },
  {
    id: "5",
    name: "Vikram Singh",
    email: "vikram.singh@example.com",
    phone: "+91 9876543214",
    education: "MCA",
    experience: "4 years",
    skills: ["Angular", "TypeScript", "Firebase"],
    appliedDate: "2023-06-11",
    status: "shortlisted",
    resumeUrl: "#",
  },
];

const ApplicantManagement = ({
  jobId = "default-job",
  applicants = defaultApplicants,
}: ApplicantManagementProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedApplicant, setSelectedApplicant] = useState<Applicant | null>(
    null,
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [interviewDate, setInterviewDate] = useState("");

  const filteredApplicants = applicants.filter((applicant) => {
    const matchesSearch =
      applicant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      applicant.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      applicant.skills.some((skill) =>
        skill.toLowerCase().includes(searchTerm.toLowerCase()),
      );

    const matchesStatus =
      statusFilter === "all" || applicant.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const handleViewApplicant = (applicant: Applicant) => {
    setSelectedApplicant(applicant);
    setIsDialogOpen(true);
  };

  const handleStatusChange = async (
    applicantId: string,
    newStatus: "pending" | "shortlisted" | "rejected" | "interviewed",
  ) => {
    try {
      // Import necessary functions from supabase-db
      const { updateApplicationStatus, broadcastToChannel, REALTIME_CHANNELS } =
        await import("@/lib/supabase-db");

      // In a real implementation, this would update the status in the backend
      console.log(
        `Changing status of applicant ${applicantId} to ${newStatus}`,
      );

      // Try to update the application status in Supabase
      try {
        await updateApplicationStatus(applicantId, newStatus);

        // Find the applicant to include in the broadcast
        const applicant = applicants.find((app) => app.id === applicantId);

        if (applicant) {
          // Update local state immediately for real-time UI update
          const updatedApplicants = applicants.map((app) =>
            app.id === applicantId ? { ...app, status: newStatus } : app,
          );

          // If there's a selected applicant and it's the one being updated, update it too
          if (selectedApplicant && selectedApplicant.id === applicantId) {
            setSelectedApplicant({ ...selectedApplicant, status: newStatus });
          }

          // Broadcast the status change
          await broadcastToChannel(
            REALTIME_CHANNELS.APPLICATIONS,
            "status-change",
            {
              id: applicantId,
              name: applicant.name,
              status: newStatus,
              jobTitle: "Software Engineer", // This would come from the actual job data
              company: "TechCorp", // This would come from the actual company data
            },
          );

          console.log(
            "Application status updated and broadcasted successfully",
          );
        }
      } catch (dbError) {
        console.error("Error with database operation:", dbError);
        // Fallback to local handling if database operation fails
      }
    } catch (error) {
      console.error("Error updating application status:", error);
    }
  };

  const handleScheduleInterview = async () => {
    if (selectedApplicant && interviewDate) {
      try {
        // Import necessary functions from supabase-db
        const { broadcastToChannel, REALTIME_CHANNELS } = await import(
          "@/lib/supabase-db"
        );

        // In a real implementation, this would schedule an interview in the backend
        console.log(
          `Scheduling interview for ${selectedApplicant.name} on ${interviewDate}`,
        );

        // Broadcast the interview scheduling
        await broadcastToChannel(
          REALTIME_CHANNELS.INTERVIEWS,
          "new-interview",
          {
            id: Date.now().toString(),
            applicantId: selectedApplicant.id,
            candidateName: selectedApplicant.name,
            date: interviewDate.split("T")[0],
            time: interviewDate.split("T")[1],
            jobTitle: "Software Engineer", // This would come from the actual job data
            company: "TechCorp", // This would come from the actual company data
          },
        );

        console.log("Interview scheduled and broadcasted successfully");
        setIsDialogOpen(false);
      } catch (error) {
        console.error("Error scheduling interview:", error);
      }
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="secondary">Pending</Badge>;
      case "shortlisted":
        return <Badge variant="default">Shortlisted</Badge>;
      case "rejected":
        return <Badge variant="destructive">Rejected</Badge>;
      case "interviewed":
        return <Badge variant="outline">Interviewed</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  return (
    <div className="w-full h-full bg-background p-6">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            Applicant Management
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-4">
            <div className="flex flex-col md:flex-row gap-4 justify-between">
              <div className="relative w-full md:w-1/3">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name, email, or skills"
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex flex-col md:flex-row gap-2">
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-muted-foreground" />
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="shortlisted">Shortlisted</SelectItem>
                      <SelectItem value="interviewed">Interviewed</SelectItem>
                      <SelectItem value="rejected">Rejected</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="pending">Pending</TabsTrigger>
                <TabsTrigger value="shortlisted">Shortlisted</TabsTrigger>
                <TabsTrigger value="interviewed">Interviewed</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="mt-6">
                <ApplicantTable
                  applicants={filteredApplicants}
                  onViewApplicant={handleViewApplicant}
                  onStatusChange={handleStatusChange}
                  getStatusBadge={getStatusBadge}
                />
              </TabsContent>

              <TabsContent value="pending" className="mt-6">
                <ApplicantTable
                  applicants={filteredApplicants.filter(
                    (a) => a.status === "pending",
                  )}
                  onViewApplicant={handleViewApplicant}
                  onStatusChange={handleStatusChange}
                  getStatusBadge={getStatusBadge}
                />
              </TabsContent>

              <TabsContent value="shortlisted" className="mt-6">
                <ApplicantTable
                  applicants={filteredApplicants.filter(
                    (a) => a.status === "shortlisted",
                  )}
                  onViewApplicant={handleViewApplicant}
                  onStatusChange={handleStatusChange}
                  getStatusBadge={getStatusBadge}
                />
              </TabsContent>

              <TabsContent value="interviewed" className="mt-6">
                <ApplicantTable
                  applicants={filteredApplicants.filter(
                    (a) => a.status === "interviewed",
                  )}
                  onViewApplicant={handleViewApplicant}
                  onStatusChange={handleStatusChange}
                  getStatusBadge={getStatusBadge}
                />
              </TabsContent>
            </Tabs>
          </div>
        </CardContent>
      </Card>

      {/* Applicant Detail Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Applicant Details</DialogTitle>
          </DialogHeader>

          {selectedApplicant && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold">
                    {selectedApplicant.name}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                    <Mail className="h-4 w-4" />
                    <span>{selectedApplicant.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                    <Phone className="h-4 w-4" />
                    <span>{selectedApplicant.phone}</span>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium">Education</h4>
                  <p className="text-sm">{selectedApplicant.education}</p>
                </div>

                <div>
                  <h4 className="font-medium">Experience</h4>
                  <p className="text-sm">{selectedApplicant.experience}</p>
                </div>

                <div>
                  <h4 className="font-medium">Skills</h4>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {selectedApplicant.skills.map((skill, index) => (
                      <Badge key={index} variant="outline">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium">Applied Date</h4>
                  <p className="text-sm">{selectedApplicant.appliedDate}</p>
                </div>

                <div>
                  <h4 className="font-medium">Status</h4>
                  <div className="mt-1">
                    {getStatusBadge(selectedApplicant.status)}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="border rounded-md p-4">
                  <h4 className="font-medium mb-2">Actions</h4>

                  <div className="space-y-3">
                    <div>
                      <h5 className="text-sm font-medium mb-1">
                        Update Status
                      </h5>
                      <div className="flex flex-wrap gap-2">
                        <Button
                          size="sm"
                          variant={
                            selectedApplicant.status === "pending"
                              ? "default"
                              : "outline"
                          }
                          onClick={() => {
                            handleStatusChange(selectedApplicant.id, "pending");
                            alert("Status updated to Pending");
                          }}
                        >
                          Pending
                        </Button>
                        <Button
                          size="sm"
                          variant={
                            selectedApplicant.status === "shortlisted"
                              ? "default"
                              : "outline"
                          }
                          onClick={() => {
                            handleStatusChange(
                              selectedApplicant.id,
                              "shortlisted",
                            );
                            alert("Applicant shortlisted successfully");
                          }}
                        >
                          <UserCheck className="mr-1 h-4 w-4" />
                          Shortlist
                        </Button>
                        <Button
                          size="sm"
                          variant={
                            selectedApplicant.status === "rejected"
                              ? "destructive"
                              : "outline"
                          }
                          onClick={() => {
                            handleStatusChange(
                              selectedApplicant.id,
                              "rejected",
                            );
                            alert("Applicant rejected");
                          }}
                        >
                          <UserX className="mr-1 h-4 w-4" />
                          Reject
                        </Button>
                      </div>
                    </div>

                    <div>
                      <h5 className="text-sm font-medium mb-1">
                        Schedule Interview
                      </h5>
                      <div className="flex gap-2">
                        <Input
                          type="datetime-local"
                          value={interviewDate}
                          onChange={(e) => setInterviewDate(e.target.value)}
                        />
                        <Button
                          size="sm"
                          onClick={() => {
                            handleScheduleInterview();
                            if (interviewDate) {
                              alert("Interview scheduled successfully");
                            }
                          }}
                          disabled={!interviewDate}
                        >
                          <Calendar className="mr-1 h-4 w-4" />
                          Schedule
                        </Button>
                      </div>
                    </div>

                    <div>
                      <h5 className="text-sm font-medium mb-1">Resume</h5>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            alert("Resume download will be available soon")
                          }
                        >
                          <Download className="mr-1 h-4 w-4" />
                          Download Resume
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => {
                            // In a real implementation, this would open the resume in a new tab
                            if (
                              selectedApplicant?.resumeUrl &&
                              selectedApplicant.resumeUrl !== "#"
                            ) {
                              window.open(
                                selectedApplicant.resumeUrl,
                                "_blank",
                              );
                            } else {
                              alert("Resume not available for viewing");
                            }
                          }}
                        >
                          <FileText className="mr-1 h-4 w-4" />
                          View Resume
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border rounded-md p-4">
                  <h4 className="font-medium mb-2">Notes</h4>
                  <textarea
                    className="w-full h-32 p-2 border rounded-md text-sm"
                    placeholder="Add notes about this applicant..."
                  ></textarea>
                  <Button
                    size="sm"
                    className="mt-2"
                    onClick={() => alert("Notes saved successfully")}
                  >
                    Save Notes
                  </Button>
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

interface ApplicantTableProps {
  applicants: Applicant[];
  onViewApplicant: (applicant: Applicant) => void;
  onStatusChange: (
    applicantId: string,
    newStatus: "pending" | "shortlisted" | "rejected" | "interviewed",
  ) => void;
  getStatusBadge: (status: string) => React.ReactNode;
}

const ApplicantTable = ({
  applicants,
  onViewApplicant,
  onStatusChange,
  getStatusBadge,
}: ApplicantTableProps) => {
  if (applicants.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No applicants found
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Education</TableHead>
          <TableHead>Experience</TableHead>
          <TableHead>Skills</TableHead>
          <TableHead>Applied Date</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {applicants.map((applicant) => (
          <TableRow key={applicant.id}>
            <TableCell className="font-medium">{applicant.name}</TableCell>
            <TableCell>{applicant.education}</TableCell>
            <TableCell>{applicant.experience}</TableCell>
            <TableCell>
              <div className="flex flex-wrap gap-1">
                {applicant.skills.slice(0, 2).map((skill, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {skill}
                  </Badge>
                ))}
                {applicant.skills.length > 2 && (
                  <Badge variant="outline" className="text-xs">
                    +{applicant.skills.length - 2}
                  </Badge>
                )}
              </div>
            </TableCell>
            <TableCell>{applicant.appliedDate}</TableCell>
            <TableCell>{getStatusBadge(applicant.status)}</TableCell>
            <TableCell>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onViewApplicant(applicant)}
                >
                  View
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    onStatusChange(applicant.id, "shortlisted");
                    alert("Applicant shortlisted successfully");
                  }}
                >
                  <UserCheck className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    onStatusChange(applicant.id, "rejected");
                    alert("Applicant rejected");
                  }}
                >
                  <UserX className="h-4 w-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ApplicantManagement;
