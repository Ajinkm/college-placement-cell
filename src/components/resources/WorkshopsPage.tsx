import React, { useState } from "react";
import { Calendar, Clock, MapPin, Users, Filter, Search } from "lucide-react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Workshop {
  id: string;
  title: string;
  organizer: string;
  date: string;
  time: string;
  location: string;
  type: "technical" | "soft-skills" | "career" | "industry";
  description: string;
  speakers: {
    name: string;
    role: string;
    company: string;
  }[];
  capacity: number;
  registeredCount: number;
}

const defaultWorkshops: Workshop[] = [
  {
    id: "1",
    title: "Resume Building Workshop",
    organizer: "Career Development Center",
    date: "2023-07-15",
    time: "10:00 AM - 12:00 PM",
    location: "Main Auditorium",
    type: "career",
    description:
      "Learn how to create an impressive resume that stands out to recruiters. This workshop will cover resume formatting, content organization, highlighting achievements, and tailoring your resume for specific job applications.",
    speakers: [
      {
        name: "Priya Sharma",
        role: "HR Manager",
        company: "TechCorp",
      },
      {
        name: "Rahul Verma",
        role: "Career Counselor",
        company: "University Placement Cell",
      },
    ],
    capacity: 100,
    registeredCount: 65,
  },
  {
    id: "2",
    title: "Technical Interview Preparation",
    organizer: "Computer Science Department",
    date: "2023-07-20",
    time: "2:00 PM - 5:00 PM",
    location: "CS Seminar Hall",
    type: "technical",
    description:
      "Prepare for technical interviews with this comprehensive workshop. Topics include common coding questions, algorithm optimization, system design principles, and effective problem-solving techniques.",
    speakers: [
      {
        name: "Vikram Singh",
        role: "Senior Software Engineer",
        company: "Global Tech Solutions",
      },
    ],
    capacity: 50,
    registeredCount: 42,
  },
  {
    id: "3",
    title: "Communication Skills for Professionals",
    organizer: "Soft Skills Development Cell",
    date: "2023-07-25",
    time: "11:00 AM - 1:00 PM",
    location: "Conference Room B",
    type: "soft-skills",
    description:
      "Enhance your verbal and written communication skills essential for the workplace. This interactive workshop focuses on presentation techniques, email etiquette, active listening, and effective team communication.",
    speakers: [
      {
        name: "Anita Desai",
        role: "Communication Specialist",
        company: "Speak Well Institute",
      },
    ],
    capacity: 40,
    registeredCount: 25,
  },
  {
    id: "4",
    title: "Industry 4.0 and Future of Work",
    organizer: "Industry Relations Cell",
    date: "2023-08-05",
    time: "3:00 PM - 5:00 PM",
    location: "Main Auditorium",
    type: "industry",
    description:
      "Understand how Industry 4.0 is transforming the job market and what skills will be in demand. This workshop covers automation, AI, IoT, and how students can prepare for the changing landscape of work.",
    speakers: [
      {
        name: "Dr. Rajesh Kumar",
        role: "CTO",
        company: "Future Technologies Inc.",
      },
      {
        name: "Meera Patel",
        role: "Industry Analyst",
        company: "Tech Trends Research",
      },
    ],
    capacity: 120,
    registeredCount: 78,
  },
  {
    id: "5",
    title: "Group Discussion Techniques",
    organizer: "Placement Preparation Committee",
    date: "2023-08-10",
    time: "10:00 AM - 12:30 PM",
    location: "Seminar Hall 2",
    type: "soft-skills",
    description:
      "Master the art of group discussions, a critical component of many selection processes. Learn strategies for effective participation, leadership in discussions, handling conflicts, and making impactful contributions.",
    speakers: [
      {
        name: "Sanjay Mehta",
        role: "Recruitment Specialist",
        company: "HR Consultants",
      },
    ],
    capacity: 60,
    registeredCount: 45,
  },
];

const WorkshopsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [selectedWorkshop, setSelectedWorkshop] = useState<Workshop | null>(
    null,
  );
  const [dialogOpen, setDialogOpen] = useState(false);
  const [registeredWorkshops, setRegisteredWorkshops] = useState<string[]>([]);

  const filteredWorkshops = defaultWorkshops.filter((workshop) => {
    const matchesSearch =
      workshop.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      workshop.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      workshop.organizer.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType = typeFilter === "all" || workshop.type === typeFilter;

    return matchesSearch && matchesType;
  });

  const handleRegister = (workshopId: string) => {
    setRegisteredWorkshops([...registeredWorkshops, workshopId]);
    setDialogOpen(false);
    alert("You have successfully registered for this workshop!");
  };

  const openWorkshopDetails = (workshop: Workshop) => {
    setSelectedWorkshop(workshop);
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

  const getTypeColor = (type: string) => {
    switch (type) {
      case "technical":
        return "bg-blue-100 text-blue-800";
      case "soft-skills":
        return "bg-green-100 text-green-800";
      case "career":
        return "bg-purple-100 text-purple-800";
      case "industry":
        return "bg-amber-100 text-amber-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">
          Workshops & Training Programs
        </h1>
        <p className="text-muted-foreground">
          Enhance your skills and prepare for your career with our workshops
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search workshops..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="w-full md:w-64">
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="technical">Technical</SelectItem>
              <SelectItem value="soft-skills">Soft Skills</SelectItem>
              <SelectItem value="career">Career</SelectItem>
              <SelectItem value="industry">Industry</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {filteredWorkshops.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            No workshops found matching your criteria.
          </p>
          <Button
            variant="link"
            onClick={() => {
              setSearchTerm("");
              setTypeFilter("all");
            }}
          >
            Clear filters
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {filteredWorkshops.map((workshop) => (
            <Card
              key={workshop.id}
              className="hover:shadow-md transition-shadow"
            >
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl">{workshop.title}</CardTitle>
                    <CardDescription className="text-base">
                      Organized by: {workshop.organizer}
                    </CardDescription>
                  </div>
                  <Badge className={getTypeColor(workshop.type)}>
                    {workshop.type.charAt(0).toUpperCase() +
                      workshop.type.slice(1)}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-4">
                  <div className="flex items-center text-sm">
                    <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>{formatDate(workshop.date)}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>{workshop.time}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>{workshop.location}</span>
                  </div>
                </div>
                <p className="text-sm line-clamp-2">{workshop.description}</p>
              </CardContent>
              <CardFooter className="flex justify-between items-center">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Users className="mr-2 h-4 w-4" />
                  <span>
                    {workshop.registeredCount} / {workshop.capacity} registered
                  </span>
                </div>
                <Button onClick={() => openWorkshopDetails(workshop)}>
                  View Details
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        {selectedWorkshop && (
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle className="text-2xl">
                {selectedWorkshop.title}
              </DialogTitle>
              <DialogDescription className="text-base">
                Organized by: {selectedWorkshop.organizer}
              </DialogDescription>
            </DialogHeader>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-4">
              <div className="flex flex-col items-center justify-center p-3 bg-muted/50 rounded-md">
                <Calendar className="h-5 w-5 mb-1 text-primary" />
                <span className="text-sm font-medium">Date</span>
                <span className="text-sm">
                  {formatDate(selectedWorkshop.date)}
                </span>
              </div>

              <div className="flex flex-col items-center justify-center p-3 bg-muted/50 rounded-md">
                <Clock className="h-5 w-5 mb-1 text-primary" />
                <span className="text-sm font-medium">Time</span>
                <span className="text-sm">{selectedWorkshop.time}</span>
              </div>

              <div className="flex flex-col items-center justify-center p-3 bg-muted/50 rounded-md">
                <MapPin className="h-5 w-5 mb-1 text-primary" />
                <span className="text-sm font-medium">Location</span>
                <span className="text-sm">{selectedWorkshop.location}</span>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">
                  Workshop Description
                </h3>
                <p className="text-sm">{selectedWorkshop.description}</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Speakers</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedWorkshop.speakers.map((speaker, index) => (
                    <div
                      key={index}
                      className="flex items-start p-3 bg-muted/30 rounded-md"
                    >
                      <div>
                        <h4 className="font-medium">{speaker.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {speaker.role} at {speaker.company}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-muted/30 rounded-md">
                <div className="flex items-center">
                  <Users className="h-5 w-5 mr-2 text-primary" />
                  <span className="text-sm">
                    {selectedWorkshop.registeredCount} out of{" "}
                    {selectedWorkshop.capacity} spots filled
                  </span>
                </div>
                <div className="w-full max-w-xs bg-muted rounded-full h-2.5 ml-4">
                  <div
                    className="bg-primary h-2.5 rounded-full"
                    style={{
                      width: `${(selectedWorkshop.registeredCount / selectedWorkshop.capacity) * 100}%`,
                    }}
                  ></div>
                </div>
              </div>
            </div>

            <DialogFooter className="mt-6">
              <Button variant="outline" onClick={() => setDialogOpen(false)}>
                Close
              </Button>
              <Button
                onClick={() => handleRegister(selectedWorkshop.id)}
                disabled={registeredWorkshops.includes(selectedWorkshop.id)}
              >
                {registeredWorkshops.includes(selectedWorkshop.id)
                  ? "Already Registered"
                  : "Register Now"}
              </Button>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
};

export default WorkshopsPage;
