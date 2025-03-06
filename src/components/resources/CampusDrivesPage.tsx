import React, { useState } from "react";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Briefcase,
  Building,
  Search,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

interface CampusDrive {
  id: string;
  companyName: string;
  logo?: string;
  date: string;
  time: string;
  location: string;
  description: string;
  eligibility: {
    departments: string[];
    minCGPA: number;
    otherCriteria?: string;
  };
  positions: {
    title: string;
    count: number;
    type: string;
    location: string;
    salary?: string;
  }[];
  process: string[];
  status: "upcoming" | "ongoing" | "completed";
  registrationDeadline: string;
  registeredCount: number;
}

const defaultCampusDrives: CampusDrive[] = [
  {
    id: "1",
    companyName: "TechCorp Solutions",
    logo: "https://api.dicebear.com/7.x/avataaars/svg?seed=TechCorp",
    date: "2023-08-15",
    time: "9:00 AM - 5:00 PM",
    location: "Main Auditorium",
    description:
      "TechCorp Solutions is visiting our campus to recruit final year students for various technical roles. The company is a leading provider of software solutions with offices across India.",
    eligibility: {
      departments: [
        "Computer Science",
        "Information Technology",
        "Electronics",
      ],
      minCGPA: 7.5,
      otherCriteria: "No active backlogs",
    },
    positions: [
      {
        title: "Software Development Engineer",
        count: 15,
        type: "Full-time",
        location: "Bangalore",
        salary: "₹10-12 LPA",
      },
      {
        title: "Data Analyst",
        count: 8,
        type: "Full-time",
        location: "Hyderabad",
        salary: "₹8-10 LPA",
      },
    ],
    process: ["Online Aptitude Test", "Technical Interview", "HR Interview"],
    status: "upcoming",
    registrationDeadline: "2023-08-10",
    registeredCount: 120,
  },
  {
    id: "2",
    companyName: "Global Finance Group",
    logo: "https://api.dicebear.com/7.x/avataaars/svg?seed=GlobalFinance",
    date: "2023-08-20",
    time: "10:00 AM - 4:00 PM",
    location: "Business School Seminar Hall",
    description:
      "Global Finance Group is a multinational financial services company looking to hire talented graduates for their management trainee program and analyst positions.",
    eligibility: {
      departments: ["Business Administration", "Finance", "Economics"],
      minCGPA: 8.0,
    },
    positions: [
      {
        title: "Management Trainee",
        count: 10,
        type: "Full-time",
        location: "Mumbai",
        salary: "₹9-11 LPA",
      },
      {
        title: "Financial Analyst",
        count: 5,
        type: "Full-time",
        location: "Delhi",
        salary: "₹8-10 LPA",
      },
    ],
    process: ["Group Discussion", "Case Study Analysis", "Personal Interview"],
    status: "upcoming",
    registrationDeadline: "2023-08-15",
    registeredCount: 85,
  },
  {
    id: "3",
    companyName: "Innovate Design Studios",
    logo: "https://api.dicebear.com/7.x/avataaars/svg?seed=InnovateDesign",
    date: "2023-08-05",
    time: "11:00 AM - 3:00 PM",
    location: "Design Department Conference Room",
    description:
      "Innovate Design Studios specializes in UI/UX design and is looking for creative graduates to join their team. They offer a dynamic work environment with opportunities for growth.",
    eligibility: {
      departments: ["Design", "Human-Computer Interaction", "Fine Arts"],
      minCGPA: 7.0,
    },
    positions: [
      {
        title: "UI/UX Designer",
        count: 6,
        type: "Full-time",
        location: "Pune",
        salary: "₹7-9 LPA",
      },
    ],
    process: ["Portfolio Review", "Design Challenge", "Interview"],
    status: "ongoing",
    registrationDeadline: "2023-07-30",
    registeredCount: 45,
  },
  {
    id: "4",
    companyName: "NextGen Engineering",
    logo: "https://api.dicebear.com/7.x/avataaars/svg?seed=NextGenEng",
    date: "2023-07-25",
    time: "9:30 AM - 6:00 PM",
    location: "Engineering Block Auditorium",
    description:
      "NextGen Engineering is a leading engineering solutions provider looking to recruit graduates for their R&D department and project teams.",
    eligibility: {
      departments: [
        "Mechanical Engineering",
        "Civil Engineering",
        "Electrical Engineering",
      ],
      minCGPA: 7.5,
      otherCriteria: "Knowledge of CAD software preferred",
    },
    positions: [
      {
        title: "Design Engineer",
        count: 8,
        type: "Full-time",
        location: "Chennai",
        salary: "₹8-10 LPA",
      },
      {
        title: "Project Engineer",
        count: 12,
        type: "Full-time",
        location: "Multiple Locations",
        salary: "₹7-9 LPA",
      },
    ],
    process: ["Technical Test", "Technical Interview", "HR Interview"],
    status: "completed",
    registrationDeadline: "2023-07-20",
    registeredCount: 150,
  },
  {
    id: "5",
    companyName: "Cloud Systems Inc.",
    logo: "https://api.dicebear.com/7.x/avataaars/svg?seed=CloudSystems",
    date: "2023-08-25",
    time: "10:00 AM - 5:00 PM",
    location: "Virtual (Online)",
    description:
      "Cloud Systems Inc. is a cloud solutions provider looking for talented engineers to join their growing team. They offer competitive packages and excellent growth opportunities.",
    eligibility: {
      departments: [
        "Computer Science",
        "Information Technology",
        "Electronics",
      ],
      minCGPA: 8.0,
      otherCriteria: "Knowledge of cloud platforms (AWS/Azure/GCP) preferred",
    },
    positions: [
      {
        title: "Cloud Engineer",
        count: 10,
        type: "Full-time",
        location: "Bangalore",
        salary: "₹12-15 LPA",
      },
      {
        title: "DevOps Engineer",
        count: 5,
        type: "Full-time",
        location: "Remote",
        salary: "₹10-14 LPA",
      },
    ],
    process: [
      "Online Assessment",
      "Technical Interview (2 rounds)",
      "HR Interview",
    ],
    status: "upcoming",
    registrationDeadline: "2023-08-20",
    registeredCount: 95,
  },
];

const CampusDrivesPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("upcoming");
  const [selectedDrive, setSelectedDrive] = useState<CampusDrive | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [registeredDrives, setRegisteredDrives] = useState<string[]>([]);

  const filteredDrives = defaultCampusDrives.filter((drive) => {
    const matchesSearch =
      drive.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      drive.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      drive.positions.some((pos) =>
        pos.title.toLowerCase().includes(searchTerm.toLowerCase()),
      );

    const matchesStatus = activeTab === "all" || drive.status === activeTab;

    return matchesSearch && matchesStatus;
  });

  const handleRegister = (driveId: string) => {
    setRegisteredDrives([...registeredDrives, driveId]);
    setDialogOpen(false);
    alert("You have successfully registered for this campus drive!");
  };

  const openDriveDetails = (drive: CampusDrive) => {
    setSelectedDrive(drive);
    setDialogOpen(true);
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString("en-IN", options);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "upcoming":
        return <Badge className="bg-blue-100 text-blue-800">Upcoming</Badge>;
      case "ongoing":
        return <Badge className="bg-green-100 text-green-800">Ongoing</Badge>;
      case "completed":
        return <Badge className="bg-gray-100 text-gray-800">Completed</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Campus Recruitment Drives</h1>
        <p className="text-muted-foreground">
          Stay updated with upcoming and ongoing campus recruitment activities
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search companies or positions..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full md:w-auto"
        >
          <TabsList>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="ongoing">Ongoing</TabsTrigger>
            <TabsTrigger value="completed">Past Drives</TabsTrigger>
            <TabsTrigger value="all">All</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {filteredDrives.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            No campus drives found matching your criteria.
          </p>
          <Button
            variant="link"
            onClick={() => {
              setSearchTerm("");
              setActiveTab("all");
            }}
          >
            Clear filters
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {filteredDrives.map((drive) => (
            <Card key={drive.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-start space-y-0 pb-2">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    {drive.logo && (
                      <div className="h-12 w-12 rounded-md overflow-hidden bg-muted">
                        <img
                          src={drive.logo}
                          alt={`${drive.companyName} logo`}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    )}
                    <div>
                      <CardTitle className="text-xl">
                        {drive.companyName}
                      </CardTitle>
                      <CardDescription className="text-base flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        {formatDate(drive.date)}
                        <span className="mx-1">•</span>
                        <Clock className="h-4 w-4" />
                        {drive.time}
                      </CardDescription>
                    </div>
                  </div>
                </div>
                {getStatusBadge(drive.status)}
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <div className="flex items-center text-sm mb-2">
                    <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>{drive.location}</span>
                  </div>
                  <p className="text-sm line-clamp-2">{drive.description}</p>
                </div>
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Positions:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {drive.positions.slice(0, 2).map((position, index) => (
                      <div
                        key={index}
                        className="flex items-center text-sm bg-muted/30 p-2 rounded-md"
                      >
                        <Briefcase className="mr-2 h-4 w-4 text-muted-foreground" />
                        <span>
                          {position.title} ({position.count} openings) -{" "}
                          {position.location}
                        </span>
                      </div>
                    ))}
                    {drive.positions.length > 2 && (
                      <div className="text-sm text-muted-foreground">
                        +{drive.positions.length - 2} more positions
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between items-center">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Users className="mr-2 h-4 w-4" />
                  <span>{drive.registeredCount} students registered</span>
                  <span className="mx-2">•</span>
                  <span>
                    Register by: {formatDate(drive.registrationDeadline)}
                  </span>
                </div>
                <Button
                  onClick={() => openDriveDetails(drive)}
                  disabled={drive.status === "completed"}
                >
                  {drive.status === "completed"
                    ? "View Details"
                    : "Register & Details"}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        {selectedDrive && (
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <div className="flex items-center gap-3 mb-2">
                {selectedDrive.logo && (
                  <div className="h-12 w-12 rounded-md overflow-hidden bg-muted">
                    <img
                      src={selectedDrive.logo}
                      alt={`${selectedDrive.companyName} logo`}
                      className="h-full w-full object-cover"
                    />
                  </div>
                )}
                <div>
                  <DialogTitle className="text-2xl">
                    {selectedDrive.companyName}
                  </DialogTitle>
                  <DialogDescription className="text-base">
                    Campus Recruitment Drive on {formatDate(selectedDrive.date)}
                  </DialogDescription>
                </div>
              </div>
            </DialogHeader>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-4">
              <div className="flex flex-col items-center justify-center p-3 bg-muted/50 rounded-md">
                <Calendar className="h-5 w-5 mb-1 text-primary" />
                <span className="text-sm font-medium">Date & Time</span>
                <span className="text-sm">
                  {formatDate(selectedDrive.date)}, {selectedDrive.time}
                </span>
              </div>

              <div className="flex flex-col items-center justify-center p-3 bg-muted/50 rounded-md">
                <MapPin className="h-5 w-5 mb-1 text-primary" />
                <span className="text-sm font-medium">Location</span>
                <span className="text-sm">{selectedDrive.location}</span>
              </div>

              <div className="flex flex-col items-center justify-center p-3 bg-muted/50 rounded-md">
                <Clock className="h-5 w-5 mb-1 text-primary" />
                <span className="text-sm font-medium">
                  Registration Deadline
                </span>
                <span className="text-sm">
                  {formatDate(selectedDrive.registrationDeadline)}
                </span>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">
                  About the Company
                </h3>
                <p className="text-sm">{selectedDrive.description}</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">
                  Eligibility Criteria
                </h3>
                <div className="bg-muted/30 p-3 rounded-md">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm font-medium">
                        Eligible Departments
                      </h4>
                      <ul className="list-disc pl-5 text-sm mt-1">
                        {selectedDrive.eligibility.departments.map(
                          (dept, index) => (
                            <li key={index}>{dept}</li>
                          ),
                        )}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">Minimum CGPA</h4>
                      <p className="text-sm mt-1">
                        {selectedDrive.eligibility.minCGPA}
                      </p>
                      {selectedDrive.eligibility.otherCriteria && (
                        <>
                          <h4 className="text-sm font-medium mt-3">
                            Other Criteria
                          </h4>
                          <p className="text-sm mt-1">
                            {selectedDrive.eligibility.otherCriteria}
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Open Positions</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedDrive.positions.map((position, index) => (
                    <div key={index} className="bg-muted/30 p-3 rounded-md">
                      <div className="flex items-center gap-2 mb-2">
                        <Briefcase className="h-5 w-5 text-primary" />
                        <h4 className="font-medium">{position.title}</h4>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <span className="text-muted-foreground">Type:</span>{" "}
                          {position.type}
                        </div>
                        <div>
                          <span className="text-muted-foreground">
                            Openings:
                          </span>{" "}
                          {position.count}
                        </div>
                        <div>
                          <span className="text-muted-foreground">
                            Location:
                          </span>{" "}
                          {position.location}
                        </div>
                        {position.salary && (
                          <div>
                            <span className="text-muted-foreground">
                              Salary:
                            </span>{" "}
                            {position.salary}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">
                  Selection Process
                </h3>
                <ol className="list-decimal pl-5 text-sm space-y-1">
                  {selectedDrive.process.map((step, index) => (
                    <li key={index}>{step}</li>
                  ))}
                </ol>
              </div>
            </div>

            <DialogFooter className="mt-6">
              <Button variant="outline" onClick={() => setDialogOpen(false)}>
                Close
              </Button>
              {selectedDrive.status !== "completed" && (
                <Button
                  onClick={() => handleRegister(selectedDrive.id)}
                  disabled={registeredDrives.includes(selectedDrive.id)}
                >
                  {registeredDrives.includes(selectedDrive.id)
                    ? "Already Registered"
                    : "Register Now"}
                </Button>
              )}
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
};

export default CampusDrivesPage;
