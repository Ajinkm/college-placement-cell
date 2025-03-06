import React, { useState } from "react";
import {
  Search,
  Filter,
  Briefcase,
  MapPin,
  Clock,
  Calendar,
  GraduationCap,
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Internship {
  id: string;
  title: string;
  company: string;
  location: string;
  duration: string;
  stipend: string;
  description: string;
  requirements: string[];
  postedDate: string;
  deadline: string;
  logo?: string;
}

const defaultInternships: Internship[] = [
  {
    id: "1",
    title: "Software Development Intern",
    company: "TechCorp",
    location: "Bangalore, India",
    duration: "3 months",
    stipend: "₹25,000/month",
    description:
      "Join our development team and work on real-world projects using the latest technologies. You'll gain hands-on experience in full-stack development and collaborate with experienced engineers.",
    requirements: [
      "Currently pursuing B.Tech/M.Tech in Computer Science or related field",
      "Knowledge of JavaScript, HTML, and CSS",
      "Familiarity with React or Angular is a plus",
      "Strong problem-solving skills",
    ],
    postedDate: "2023-06-15",
    deadline: "2023-07-15",
    logo: "https://api.dicebear.com/7.x/avataaars/svg?seed=TechCorp",
  },
  {
    id: "2",
    title: "Data Science Intern",
    company: "Analytics Pro",
    location: "Remote",
    duration: "6 months",
    stipend: "₹30,000/month",
    description:
      "Work with our data science team to analyze large datasets, build predictive models, and extract meaningful insights. You'll learn about machine learning algorithms and data visualization techniques.",
    requirements: [
      "Currently pursuing B.Tech/M.Tech in Computer Science, Statistics, or related field",
      "Knowledge of Python and data analysis libraries (Pandas, NumPy)",
      "Basic understanding of machine learning concepts",
      "Experience with SQL is a plus",
    ],
    postedDate: "2023-06-10",
    deadline: "2023-06-30",
    logo: "https://api.dicebear.com/7.x/avataaars/svg?seed=AnalyticsPro",
  },
  {
    id: "3",
    title: "Marketing Intern",
    company: "BrandBuilders",
    location: "Mumbai, India",
    duration: "4 months",
    stipend: "₹20,000/month",
    description:
      "Join our marketing team to assist with social media campaigns, content creation, and market research. You'll gain practical experience in digital marketing strategies and brand development.",
    requirements: [
      "Currently pursuing degree in Marketing, Communications, or related field",
      "Strong written and verbal communication skills",
      "Creativity and attention to detail",
      "Knowledge of social media platforms and basic design tools",
    ],
    postedDate: "2023-06-08",
    deadline: "2023-07-08",
    logo: "https://api.dicebear.com/7.x/avataaars/svg?seed=BrandBuilders",
  },
  {
    id: "4",
    title: "UI/UX Design Intern",
    company: "DesignHub",
    location: "Pune, India",
    duration: "3 months",
    stipend: "₹22,000/month",
    description:
      "Work with our design team to create user-centered designs for web and mobile applications. You'll be involved in user research, wireframing, prototyping, and usability testing.",
    requirements: [
      "Currently pursuing degree in Design, HCI, or related field",
      "Familiarity with design tools like Figma, Adobe XD, or Sketch",
      "Basic understanding of UI/UX principles",
      "Portfolio demonstrating design projects (even academic ones)",
    ],
    postedDate: "2023-06-12",
    deadline: "2023-07-10",
    logo: "https://api.dicebear.com/7.x/avataaars/svg?seed=DesignHub",
  },
  {
    id: "5",
    title: "Finance Intern",
    company: "Global Finance",
    location: "Delhi, India",
    duration: "6 months",
    stipend: "₹28,000/month",
    description:
      "Join our finance team to assist with financial analysis, reporting, and research. You'll gain practical experience in financial modeling, data analysis, and business strategy.",
    requirements: [
      "Currently pursuing B.Com, BBA, MBA, or related field",
      "Strong analytical and quantitative skills",
      "Proficiency in Excel and financial modeling",
      "Knowledge of accounting principles",
    ],
    postedDate: "2023-06-05",
    deadline: "2023-07-05",
    logo: "https://api.dicebear.com/7.x/avataaars/svg?seed=GlobalFinance",
  },
];

const InternshipsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState<string>("all");
  const [selectedInternship, setSelectedInternship] =
    useState<Internship | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const filteredInternships = defaultInternships.filter((internship) => {
    const matchesSearch =
      internship.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      internship.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      internship.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesLocation =
      locationFilter === "all" ||
      (locationFilter === "remote" &&
        internship.location.toLowerCase().includes("remote")) ||
      (locationFilter !== "remote" &&
        internship.location
          .toLowerCase()
          .includes(locationFilter.toLowerCase()));

    return matchesSearch && matchesLocation;
  });

  const handleApply = (internshipId: string) => {
    // Add the internship to the user's applications
    const selectedInternshipData = defaultInternships.find(
      (internship) => internship.id === internshipId,
    );
    if (selectedInternshipData) {
      // In a real implementation, this would call an API
      // For now, we'll just store it in localStorage
      const applications = JSON.parse(
        localStorage.getItem("applications") || "[]",
      );
      const newApplication = {
        id: Date.now().toString(),
        jobTitle: selectedInternshipData.title,
        companyName: selectedInternshipData.company,
        appliedDate: new Date().toISOString().split("T")[0],
        status: "pending",
        location: selectedInternshipData.location,
        description: selectedInternshipData.description,
      };
      applications.push(newApplication);
      localStorage.setItem("applications", JSON.stringify(applications));
    }

    setDialogOpen(false);
    alert("Application submitted successfully!");
  };

  const openInternshipDetails = (internship: Internship) => {
    setSelectedInternship(internship);
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

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Internship Opportunities</h1>
        <p className="text-muted-foreground">
          Find internships that match your skills and career goals
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by title, company, or keywords"
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="w-full md:w-64">
          <Select value={locationFilter} onValueChange={setLocationFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Locations</SelectItem>
              <SelectItem value="remote">Remote</SelectItem>
              <SelectItem value="bangalore">Bangalore</SelectItem>
              <SelectItem value="mumbai">Mumbai</SelectItem>
              <SelectItem value="delhi">Delhi</SelectItem>
              <SelectItem value="pune">Pune</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {filteredInternships.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            No internships found matching your criteria.
          </p>
          <Button
            variant="link"
            onClick={() => {
              setSearchTerm("");
              setLocationFilter("all");
            }}
          >
            Clear filters
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {filteredInternships.map((internship) => (
            <Card
              key={internship.id}
              className="hover:shadow-md transition-shadow"
            >
              <CardHeader className="flex flex-row items-start space-y-0 pb-2">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    {internship.logo && (
                      <div className="h-10 w-10 rounded-md overflow-hidden bg-muted">
                        <img
                          src={internship.logo}
                          alt={`${internship.company} logo`}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    )}
                    <div>
                      <CardTitle className="text-xl">
                        {internship.title}
                      </CardTitle>
                      <CardDescription className="text-base">
                        {internship.company}
                      </CardDescription>
                    </div>
                  </div>
                </div>
                <Badge variant="secondary">Internship</Badge>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-4">
                  <div className="flex items-center text-sm">
                    <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>{internship.location}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <GraduationCap className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>Duration: {internship.duration}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Briefcase className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>Stipend: {internship.stipend}</span>
                  </div>
                </div>
                <p className="text-sm line-clamp-2">{internship.description}</p>
              </CardContent>
              <CardFooter className="flex justify-between items-center">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Clock className="mr-2 h-4 w-4" />
                  <span>Apply by: {formatDate(internship.deadline)}</span>
                </div>
                <Button onClick={() => openInternshipDetails(internship)}>
                  View Details
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        {selectedInternship && (
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <div className="flex items-center gap-3 mb-2">
                {selectedInternship.logo && (
                  <div className="h-12 w-12 rounded-md overflow-hidden bg-muted">
                    <img
                      src={selectedInternship.logo}
                      alt={`${selectedInternship.company} logo`}
                      className="h-full w-full object-cover"
                    />
                  </div>
                )}
                <div>
                  <DialogTitle className="text-2xl">
                    {selectedInternship.title}
                  </DialogTitle>
                  <DialogDescription className="text-base">
                    {selectedInternship.company} • {selectedInternship.location}
                  </DialogDescription>
                </div>
              </div>
            </DialogHeader>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-4">
              <div className="flex flex-col items-center justify-center p-3 bg-muted/50 rounded-md">
                <GraduationCap className="h-5 w-5 mb-1 text-primary" />
                <span className="text-sm font-medium">Duration</span>
                <span className="text-sm">{selectedInternship.duration}</span>
              </div>

              <div className="flex flex-col items-center justify-center p-3 bg-muted/50 rounded-md">
                <Briefcase className="h-5 w-5 mb-1 text-primary" />
                <span className="text-sm font-medium">Stipend</span>
                <span className="text-sm">{selectedInternship.stipend}</span>
              </div>

              <div className="flex flex-col items-center justify-center p-3 bg-muted/50 rounded-md">
                <Clock className="h-5 w-5 mb-1 text-primary" />
                <span className="text-sm font-medium">Apply By</span>
                <span className="text-sm">
                  {formatDate(selectedInternship.deadline)}
                </span>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">
                  Internship Description
                </h3>
                <p className="text-sm">{selectedInternship.description}</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Requirements</h3>
                <ul className="list-disc pl-5 text-sm space-y-1">
                  {selectedInternship.requirements.map((req, index) => (
                    <li key={index}>{req}</li>
                  ))}
                </ul>
              </div>
            </div>

            <DialogFooter className="mt-6">
              <Button variant="outline" onClick={() => setDialogOpen(false)}>
                Close
              </Button>
              <Button onClick={() => handleApply(selectedInternship.id)}>
                Apply Now
              </Button>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
};

export default InternshipsPage;
