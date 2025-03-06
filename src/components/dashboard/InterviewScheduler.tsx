import React, { useState } from "react";
import {
  Calendar,
  Clock,
  MapPin,
  User,
  Users,
  Trash2,
  Plus,
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
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

interface Interview {
  id: string;
  candidateName: string;
  position: string;
  date: string;
  time: string;
  type: "online" | "in-person";
  location: string;
  interviewers: string[];
  status: "scheduled" | "completed" | "cancelled";
  notes?: string;
}

interface InterviewSchedulerProps {
  interviews?: Interview[];
}

const defaultInterviews: Interview[] = [
  {
    id: "1",
    candidateName: "Alex Johnson",
    position: "Software Engineer",
    date: "2023-07-15",
    time: "10:00 AM",
    type: "online",
    location: "Zoom Meeting",
    interviewers: ["Jane Smith (HR)", "Michael Brown (Tech Lead)"],
    status: "scheduled",
    notes: "Candidate has 3 years of experience with React and Node.js.",
  },
  {
    id: "2",
    candidateName: "Priya Sharma",
    position: "UX Designer",
    date: "2023-07-16",
    time: "2:30 PM",
    type: "in-person",
    location: "Office - Conference Room A",
    interviewers: ["Jane Smith (HR)", "Sarah Wilson (Design Lead)"],
    status: "scheduled",
    notes: "Review portfolio before the interview.",
  },
  {
    id: "3",
    candidateName: "Michael Brown",
    position: "Product Manager",
    date: "2023-07-10",
    time: "11:00 AM",
    type: "online",
    location: "Google Meet",
    interviewers: ["Jane Smith (HR)", "David Lee (VP Product)"],
    status: "completed",
    notes:
      "Strong candidate with good product sense. Recommended for next round.",
  },
  {
    id: "4",
    candidateName: "Sarah Wilson",
    position: "Data Analyst",
    date: "2023-07-08",
    time: "3:00 PM",
    type: "online",
    location: "Microsoft Teams",
    interviewers: ["Jane Smith (HR)", "Robert Chen (Data Science Lead)"],
    status: "cancelled",
    notes: "Candidate withdrew application.",
  },
];

const InterviewScheduler = ({
  interviews = defaultInterviews,
}: InterviewSchedulerProps) => {
  const [selectedTab, setSelectedTab] = useState("upcoming");
  const [selectedInterview, setSelectedInterview] = useState<Interview | null>(
    null,
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newInterview, setNewInterview] = useState({
    candidateName: "",
    position: "",
    date: "",
    time: "",
    type: "online",
    location: "",
    interviewers: "",
    notes: "",
  });

  const handleViewInterview = (interview: Interview) => {
    setSelectedInterview(interview);
    setIsDialogOpen(true);
  };

  const handleAddInterview = () => {
    // In a real implementation, this would add the interview to the database
    console.log("Adding new interview:", newInterview);
    setIsAddDialogOpen(false);

    // Reset form
    setNewInterview({
      candidateName: "",
      position: "",
      date: "",
      time: "",
      type: "online",
      location: "",
      interviewers: "",
      notes: "",
    });

    alert("Interview scheduled successfully!");
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setNewInterview((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "scheduled":
        return <Badge variant="default">Scheduled</Badge>;
      case "completed":
        return <Badge variant="secondary">Completed</Badge>;
      case "cancelled":
        return <Badge variant="destructive">Cancelled</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const filteredInterviews = interviews.filter((interview) => {
    const interviewDate = new Date(interview.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedTab === "upcoming") {
      return interviewDate >= today && interview.status === "scheduled";
    } else if (selectedTab === "past") {
      return interviewDate < today || interview.status === "completed";
    } else if (selectedTab === "cancelled") {
      return interview.status === "cancelled";
    }
    return true;
  });

  return (
    <div className="w-full h-full bg-background p-6">
      <Card className="w-full">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-2xl font-bold">
            Interview Scheduler
          </CardTitle>
          <DialogTrigger asChild onClick={() => setIsAddDialogOpen(true)}>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Schedule Interview
            </Button>
          </DialogTrigger>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="upcoming" onValueChange={setSelectedTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="upcoming">Upcoming Interviews</TabsTrigger>
              <TabsTrigger value="past">Past Interviews</TabsTrigger>
              <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
            </TabsList>

            <TabsContent value={selectedTab}>
              {filteredInterviews.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">
                    No {selectedTab} interviews found.
                  </p>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Candidate</TableHead>
                      <TableHead>Position</TableHead>
                      <TableHead>Date & Time</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredInterviews.map((interview) => (
                      <TableRow key={interview.id}>
                        <TableCell className="font-medium">
                          {interview.candidateName}
                        </TableCell>
                        <TableCell>{interview.position}</TableCell>
                        <TableCell>
                          {new Date(interview.date).toLocaleDateString()} at{" "}
                          {interview.time}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              interview.type === "online"
                                ? "outline"
                                : "secondary"
                            }
                          >
                            {interview.type === "online"
                              ? "Online"
                              : "In-Person"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {getStatusBadge(interview.status)}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleViewInterview(interview)}
                          >
                            View Details
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Interview Details Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        {selectedInterview && (
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle className="text-2xl">Interview Details</DialogTitle>
            </DialogHeader>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold">
                    {selectedInterview.candidateName}
                  </h3>
                  <p className="text-muted-foreground">
                    {selectedInterview.position}
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-3">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>
                      Date:{" "}
                      {new Date(selectedInterview.date).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>Time: {selectedInterview.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>
                      Location: {selectedInterview.location}
                      {selectedInterview.type === "online" && " (Online)"}
                    </span>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Interviewers</h4>
                  <div className="space-y-2">
                    {selectedInterview.interviewers.map(
                      (interviewer, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-2 text-sm"
                        >
                          <User className="h-4 w-4 text-muted-foreground" />
                          <span>{interviewer}</span>
                        </div>
                      ),
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Status</h4>
                  <div>{getStatusBadge(selectedInterview.status)}</div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Notes</h4>
                  <p className="text-sm">
                    {selectedInterview.notes || "No notes available."}
                  </p>
                </div>

                <div className="border rounded-md p-4 mt-4">
                  <h4 className="font-medium mb-2">Actions</h4>
                  <div className="flex flex-wrap gap-2">
                    <Button variant="outline" size="sm">
                      <Calendar className="mr-2 h-4 w-4" />
                      Reschedule
                    </Button>
                    <Button variant="outline" size="sm">
                      <Users className="mr-2 h-4 w-4" />
                      Change Interviewers
                    </Button>
                    <Button variant="destructive" size="sm">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Cancel Interview
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>

      {/* Add Interview Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">
              Schedule New Interview
            </DialogTitle>
          </DialogHeader>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Candidate Name</label>
                <Input
                  name="candidateName"
                  value={newInterview.candidateName}
                  onChange={handleInputChange}
                  placeholder="Enter candidate name"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Position</label>
                <Input
                  name="position"
                  value={newInterview.position}
                  onChange={handleInputChange}
                  placeholder="Enter position"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Date</label>
                <Input
                  name="date"
                  type="date"
                  value={newInterview.date}
                  onChange={handleInputChange}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Time</label>
                <Input
                  name="time"
                  type="time"
                  value={newInterview.time}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Interview Type</label>
                <Select
                  name="type"
                  value={newInterview.type}
                  onValueChange={(value) =>
                    handleInputChange({
                      target: { name: "type", value },
                    } as React.ChangeEvent<HTMLSelectElement>)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select interview type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="online">Online</SelectItem>
                    <SelectItem value="in-person">In-Person</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Location</label>
                <Input
                  name="location"
                  value={newInterview.location}
                  onChange={handleInputChange}
                  placeholder={
                    newInterview.type === "online"
                      ? "Zoom/Google Meet link"
                      : "Office location"
                  }
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Interviewers</label>
                <Input
                  name="interviewers"
                  value={newInterview.interviewers}
                  onChange={handleInputChange}
                  placeholder="Enter interviewers (comma separated)"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Notes</label>
                <Textarea
                  name="notes"
                  value={newInterview.notes}
                  onChange={handleInputChange}
                  placeholder="Add any notes about the interview"
                  className="min-h-[100px]"
                />
              </div>
            </div>
          </div>

          <DialogFooter className="mt-6">
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddInterview}>Schedule Interview</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default InterviewScheduler;
