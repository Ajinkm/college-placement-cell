import React, { useState } from "react";
import {
  Search,
  Filter,
  Briefcase,
  MapPin,
  Clock,
  Calendar,
  ExternalLink,
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
  DialogTrigger,
} from "@/components/ui/dialog";

interface JobListing {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string; // Full-time, Part-time, Internship
  salary?: string;
  description: string;
  requirements: string[];
  postedDate: string;
  deadline: string;
  logo?: string;
}

interface JobListingsProps {
  jobs?: JobListing[];
  onApply?: (jobId: string) => void;
}

const defaultJobs: JobListing[] = [
  {
    id: "1",
    title: "Software Engineer",
    company: "TechCorp",
    location: "Bangalore, India",
    type: "Full-time",
    salary: "₹12-18 LPA",
    description:
      "We are looking for a skilled software engineer to join our development team. You will be responsible for designing, coding, and modifying applications according to client specifications.",
    requirements: [
      "B.Tech/M.Tech in Computer Science or related field",
      "2+ years of experience in software development",
      "Proficiency in JavaScript, React, and Node.js",
      "Experience with database systems like MongoDB and PostgreSQL",
    ],
    postedDate: "2023-06-15",
    deadline: "2023-07-15",
    logo: "https://api.dicebear.com/7.x/avataaars/svg?seed=TechCorp",
  },
  {
    id: "2",
    title: "Data Analyst Intern",
    company: "Analytics Pro",
    location: "Remote",
    type: "Internship",
    salary: "₹25,000/month",
    description:
      "Join our data team for a 6-month internship program where you will assist in analyzing large datasets and creating meaningful visualizations.",
    requirements: [
      "Currently pursuing B.Tech/M.Tech in Computer Science, Statistics or related field",
      "Knowledge of SQL and data visualization tools",
      "Basic understanding of machine learning concepts",
      "Good communication skills",
    ],
    postedDate: "2023-06-10",
    deadline: "2023-06-30",
    logo: "https://api.dicebear.com/7.x/avataaars/svg?seed=AnalyticsPro",
  },
  {
    id: "3",
    title: "Product Manager",
    company: "InnovateTech",
    location: "Hyderabad, India",
    type: "Full-time",
    salary: "₹18-25 LPA",
    description:
      "We are seeking an experienced product manager to lead our product development initiatives and drive product strategy.",
    requirements: [
      "B.Tech with MBA or equivalent",
      "4+ years of experience in product management",
      "Strong understanding of software development lifecycle",
      "Excellent leadership and communication skills",
    ],
    postedDate: "2023-06-05",
    deadline: "2023-07-05",
    logo: "https://api.dicebear.com/7.x/avataaars/svg?seed=InnovateTech",
  },
  {
    id: "4",
    title: "UI/UX Designer",
    company: "DesignHub",
    location: "Mumbai, India",
    type: "Part-time",
    salary: "₹40,000/month",
    description:
      "Looking for a creative UI/UX designer to work on various projects and create intuitive user interfaces for web and mobile applications.",
    requirements: [
      "Degree in Design, Fine Arts, or related field",
      "Portfolio demonstrating UI/UX projects",
      "Proficiency in Figma, Adobe XD, and Sketch",
      "Understanding of user-centered design principles",
    ],
    postedDate: "2023-06-12",
    deadline: "2023-07-10",
    logo: "https://api.dicebear.com/7.x/avataaars/svg?seed=DesignHub",
  },
  {
    id: "5",
    title: "Machine Learning Engineer",
    company: "AI Solutions",
    location: "Pune, India",
    type: "Full-time",
    salary: "₹15-22 LPA",
    description:
      "Join our AI team to develop and implement machine learning models for solving complex business problems.",
    requirements: [
      "M.Tech/PhD in Computer Science, AI, or related field",
      "Strong background in machine learning algorithms",
      "Experience with Python, TensorFlow, and PyTorch",
      "Knowledge of deep learning frameworks",
    ],
    postedDate: "2023-06-08",
    deadline: "2023-07-08",
    logo: "https://api.dicebear.com/7.x/avataaars/svg?seed=AISolutions",
  },
];

const JobListings: React.FC<JobListingsProps> = ({
  jobs = defaultJobs,
  onApply = () => {},
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [jobType, setJobType] = useState<string>("all");
  const [selectedJob, setSelectedJob] = useState<JobListing | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType = jobType === "all" || job.type === jobType;

    return matchesSearch && matchesType;
  });

  const handleApply = async (jobId: string) => {
    // Add the job to the user's applications
    const selectedJobData = jobs.find((job) => job.id === jobId);
    if (selectedJobData) {
      // Import necessary functions from supabase-db
      const { applyForJob, broadcastToChannel, REALTIME_CHANNELS } =
        await import("@/lib/supabase-db");

      // Get user from localStorage
      const userStr = localStorage.getItem("user");
      let userId = "temp-user-id";
      if (userStr) {
        try {
          const user = JSON.parse(userStr);
          userId = user.id;
        } catch (e) {
          console.error("Error parsing user:", e);
        }
      }

      // In a real implementation, this would call an API
      // For now, we'll just store it in localStorage
      const storedApplications = localStorage.getItem("applications");
      let applications = [];

      if (storedApplications) {
        try {
          applications = JSON.parse(storedApplications);

          // Check if user has already applied for this job
          const alreadyApplied = applications.some(
            (app) =>
              app.jobTitle === selectedJobData.title &&
              app.companyName === selectedJobData.company,
          );

          if (alreadyApplied) {
            alert(
              `You have already applied for ${selectedJobData.title} at ${selectedJobData.company}.`,
            );
            setDialogOpen(false);
            return;
          }
        } catch (e) {
          console.error("Error parsing applications:", e);
          applications = [];
        }
      }

      const newApplication = {
        id: Date.now().toString(),
        jobTitle: selectedJobData.title,
        companyName: selectedJobData.company,
        appliedDate: new Date().toISOString().split("T")[0],
        status: "pending",
        location: selectedJobData.location,
        description: selectedJobData.description,
        userId: userId,
        jobId: jobId,
      };

      applications.push(newApplication);
      localStorage.setItem("applications", JSON.stringify(applications));

      try {
        // Try to use Supabase to apply for the job
        await applyForJob(jobId, userId);

        // Broadcast the new application to the applications channel
        await broadcastToChannel(
          REALTIME_CHANNELS.APPLICATIONS,
          "new-application",
          newApplication,
        );

        console.log(
          "Application created and broadcasted successfully",
          newApplication,
        );
      } catch (dbError) {
        console.error("Error with database operation:", dbError);
        // Fallback is already handled with localStorage
      }

      // Force reload of applications in dashboard
      window.dispatchEvent(new CustomEvent("application-added"));

      // Show success message
      alert(
        `Successfully applied for ${selectedJobData.title} at ${selectedJobData.company}!`,
      );
    }

    onApply(jobId);
    setDialogOpen(false);
  };

  const openJobDetails = (job: JobListing) => {
    setSelectedJob(job);
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
    <div className="w-full bg-background p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Job & Internship Listings</h1>
        <p className="text-muted-foreground">
          Find and apply for opportunities that match your skills and interests
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
          <Select value={jobType} onValueChange={setJobType}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by job type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="Full-time">Full-time</SelectItem>
              <SelectItem value="Part-time">Part-time</SelectItem>
              <SelectItem value="Internship">Internship</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {filteredJobs.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            No jobs found matching your criteria.
          </p>
          <Button
            variant="link"
            onClick={() => {
              setSearchTerm("");
              setJobType("all");
            }}
          >
            Clear filters
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {filteredJobs.map((job) => (
            <Card key={job.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-start space-y-0 pb-2">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    {job.logo && (
                      <div className="h-10 w-10 rounded-md overflow-hidden bg-muted">
                        <img
                          src={job.logo}
                          alt={`${job.company} logo`}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    )}
                    <div>
                      <CardTitle className="text-xl">{job.title}</CardTitle>
                      <CardDescription className="text-base">
                        {job.company}
                      </CardDescription>
                    </div>
                  </div>
                </div>
                <Badge
                  variant={
                    job.type === "Internship"
                      ? "secondary"
                      : job.type === "Part-time"
                        ? "outline"
                        : "default"
                  }
                >
                  {job.type}
                </Badge>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-4">
                  <div className="flex items-center text-sm">
                    <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>{job.location}</span>
                  </div>
                  {job.salary && (
                    <div className="flex items-center text-sm">
                      <Briefcase className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span>{job.salary}</span>
                    </div>
                  )}
                  <div className="flex items-center text-sm">
                    <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>Posted: {formatDate(job.postedDate)}</span>
                  </div>
                </div>
                <p className="text-sm line-clamp-2">{job.description}</p>
              </CardContent>
              <CardFooter className="flex justify-between items-center">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Clock className="mr-2 h-4 w-4" />
                  <span>Deadline: {formatDate(job.deadline)}</span>
                </div>
                <Button onClick={() => openJobDetails(job)}>
                  View Details
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        {selectedJob && (
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <div className="flex items-center gap-3 mb-2">
                {selectedJob.logo && (
                  <div className="h-12 w-12 rounded-md overflow-hidden bg-muted">
                    <img
                      src={selectedJob.logo}
                      alt={`${selectedJob.company} logo`}
                      className="h-full w-full object-cover"
                    />
                  </div>
                )}
                <div>
                  <DialogTitle className="text-2xl">
                    {selectedJob.title}
                  </DialogTitle>
                  <DialogDescription className="text-base">
                    {selectedJob.company} • {selectedJob.location}
                  </DialogDescription>
                </div>
              </div>
            </DialogHeader>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-4">
              <div className="flex flex-col items-center justify-center p-3 bg-muted/50 rounded-md">
                <Briefcase className="h-5 w-5 mb-1 text-primary" />
                <span className="text-sm font-medium">{selectedJob.type}</span>
                {selectedJob.salary && (
                  <span className="text-sm">{selectedJob.salary}</span>
                )}
              </div>

              <div className="flex flex-col items-center justify-center p-3 bg-muted/50 rounded-md">
                <Calendar className="h-5 w-5 mb-1 text-primary" />
                <span className="text-sm font-medium">Posted On</span>
                <span className="text-sm">
                  {formatDate(selectedJob.postedDate)}
                </span>
              </div>

              <div className="flex flex-col items-center justify-center p-3 bg-muted/50 rounded-md">
                <Clock className="h-5 w-5 mb-1 text-primary" />
                <span className="text-sm font-medium">Apply By</span>
                <span className="text-sm">
                  {formatDate(selectedJob.deadline)}
                </span>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">Job Description</h3>
                <p className="text-sm">{selectedJob.description}</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Requirements</h3>
                <ul className="list-disc pl-5 text-sm space-y-1">
                  {selectedJob.requirements.map((req, index) => (
                    <li key={index}>{req}</li>
                  ))}
                </ul>
              </div>
            </div>

            <DialogFooter className="mt-6">
              <Button variant="outline" onClick={() => setDialogOpen(false)}>
                Close
              </Button>
              <Button onClick={() => handleApply(selectedJob.id)}>
                Apply Now
              </Button>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
};

export default JobListings;
