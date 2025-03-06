import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import {
  CheckCircle,
  XCircle,
  Clock,
  Search,
  Filter,
  Eye,
  ThumbsUp,
  ThumbsDown,
  AlertCircle,
} from "lucide-react";

interface JobPosting {
  id: string;
  companyName: string;
  jobTitle: string;
  location: string;
  salary: string;
  applicants: number;
  postedDate: string;
  status: "pending" | "approved" | "rejected";
  description: string;
  requirements: string[];
  recruiterName: string;
  recruiterEmail: string;
}

const JobApproval = ({ jobs = mockJobs }: { jobs?: JobPosting[] }) => {
  const [selectedTab, setSelectedTab] = useState("pending");
  const [selectedJob, setSelectedJob] = useState<JobPosting | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [filterCompany, setFilterCompany] = useState<string>("");

  const filteredJobs = jobs.filter((job) => {
    // Filter by status tab
    if (job.status !== selectedTab) return false;

    // Filter by company name if filter is applied
    if (
      filterCompany &&
      !job.companyName.toLowerCase().includes(filterCompany.toLowerCase())
    ) {
      return false;
    }

    return true;
  });

  const handleViewJob = (job: JobPosting) => {
    setSelectedJob(job);
    setDialogOpen(true);
  };

  const handleApproveJob = (jobId: string) => {
    // In a real implementation, this would call an API to update the job status
    console.log(`Approving job ${jobId}`);
    setDialogOpen(false);
  };

  const handleRejectJob = (jobId: string) => {
    // In a real implementation, this would call an API to update the job status
    console.log(`Rejecting job ${jobId}`);
    setDialogOpen(false);
  };

  return (
    <div className="w-full h-full bg-background p-6">
      <Card className="w-full">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-2xl">Job Posting Approval</CardTitle>
              <CardDescription>
                Review and manage job postings from recruiters
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search by company..."
                  className="pl-8 h-9 w-[200px] rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  value={filterCompany}
                  onChange={(e) => setFilterCompany(e.target.value)}
                />
              </div>
              <Select defaultValue="all">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
                  <SelectItem value="remote">Remote</SelectItem>
                  <SelectItem value="onsite">On-site</SelectItem>
                  <SelectItem value="hybrid">Hybrid</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="pending" onValueChange={setSelectedTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="pending" className="flex gap-2">
                <Clock className="h-4 w-4" />
                Pending
                <Badge variant="secondary" className="ml-1">
                  {jobs.filter((job) => job.status === "pending").length}
                </Badge>
              </TabsTrigger>
              <TabsTrigger value="approved" className="flex gap-2">
                <CheckCircle className="h-4 w-4" />
                Approved
                <Badge variant="secondary" className="ml-1">
                  {jobs.filter((job) => job.status === "approved").length}
                </Badge>
              </TabsTrigger>
              <TabsTrigger value="rejected" className="flex gap-2">
                <XCircle className="h-4 w-4" />
                Rejected
                <Badge variant="secondary" className="ml-1">
                  {jobs.filter((job) => job.status === "rejected").length}
                </Badge>
              </TabsTrigger>
            </TabsList>

            {["pending", "approved", "rejected"].map((status) => (
              <TabsContent key={status} value={status}>
                {filteredJobs.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-12">
                    <AlertCircle className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium">
                      No {status} job postings
                    </h3>
                    <p className="text-muted-foreground mt-1">
                      {status === "pending"
                        ? "All job postings have been reviewed."
                        : status === "approved"
                          ? "No job postings have been approved yet."
                          : "No job postings have been rejected yet."}
                    </p>
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Company</TableHead>
                        <TableHead>Job Title</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Salary</TableHead>
                        <TableHead>Posted Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredJobs.map((job) => (
                        <TableRow key={job.id}>
                          <TableCell className="font-medium">
                            {job.companyName}
                          </TableCell>
                          <TableCell>{job.jobTitle}</TableCell>
                          <TableCell>{job.location}</TableCell>
                          <TableCell>{job.salary}</TableCell>
                          <TableCell>{job.postedDate}</TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                job.status === "approved"
                                  ? "default"
                                  : job.status === "rejected"
                                    ? "destructive"
                                    : "secondary"
                              }
                              className="flex w-fit items-center gap-1"
                            >
                              {job.status === "approved" ? (
                                <>
                                  <CheckCircle className="h-3 w-3" />
                                  Approved
                                </>
                              ) : job.status === "rejected" ? (
                                <>
                                  <XCircle className="h-3 w-3" />
                                  Rejected
                                </>
                              ) : (
                                <>
                                  <Clock className="h-3 w-3" />
                                  Pending
                                </>
                              )}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleViewJob(job)}
                            >
                              <Eye className="h-4 w-4 mr-1" />
                              View
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-between border-t pt-4">
          <div className="text-sm text-muted-foreground">
            Showing {filteredJobs.length} of {jobs.length} job postings
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-1" />
              Advanced Filters
            </Button>
            <Button size="sm">Export Report</Button>
          </div>
        </CardFooter>
      </Card>

      {/* Job Details Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-3xl">
          {selectedJob && (
            <>
              <DialogHeader>
                <DialogTitle className="text-xl">
                  {selectedJob.jobTitle}
                </DialogTitle>
                <DialogDescription className="flex items-center gap-2">
                  <span className="font-medium">{selectedJob.companyName}</span>{" "}
                  • {selectedJob.location}
                </DialogDescription>
              </DialogHeader>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-4">
                <div className="space-y-1">
                  <h4 className="text-sm font-medium">Salary Range</h4>
                  <p>{selectedJob.salary}</p>
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-medium">Posted Date</h4>
                  <p>{selectedJob.postedDate}</p>
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-medium">Applicants</h4>
                  <p>{selectedJob.applicants} potential candidates</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium mb-2">Job Description</h4>
                  <p className="text-sm">{selectedJob.description}</p>
                </div>

                <div>
                  <h4 className="text-sm font-medium mb-2">Requirements</h4>
                  <ul className="list-disc pl-5 text-sm space-y-1">
                    {selectedJob.requirements.map((req, index) => (
                      <li key={index}>{req}</li>
                    ))}
                  </ul>
                </div>

                <Alert>
                  <AlertTitle className="flex items-center gap-2">
                    <AlertCircle className="h-4 w-4" />
                    Recruiter Information
                  </AlertTitle>
                  <AlertDescription>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                      <div>
                        <span className="text-xs text-muted-foreground">
                          Name
                        </span>
                        <p>{selectedJob.recruiterName}</p>
                      </div>
                      <div>
                        <span className="text-xs text-muted-foreground">
                          Email
                        </span>
                        <p>{selectedJob.recruiterEmail}</p>
                      </div>
                    </div>
                  </AlertDescription>
                </Alert>
              </div>

              <DialogFooter className="flex justify-end gap-2 mt-4">
                {selectedJob.status === "pending" && (
                  <>
                    <Button
                      variant="outline"
                      onClick={() => handleRejectJob(selectedJob.id)}
                    >
                      <ThumbsDown className="h-4 w-4 mr-2" />
                      Reject Posting
                    </Button>
                    <Button onClick={() => handleApproveJob(selectedJob.id)}>
                      <ThumbsUp className="h-4 w-4 mr-2" />
                      Approve Posting
                    </Button>
                  </>
                )}
                {selectedJob.status === "approved" && (
                  <Button
                    variant="destructive"
                    onClick={() => handleRejectJob(selectedJob.id)}
                  >
                    <XCircle className="h-4 w-4 mr-2" />
                    Revoke Approval
                  </Button>
                )}
                {selectedJob.status === "rejected" && (
                  <Button onClick={() => handleApproveJob(selectedJob.id)}>
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Approve Posting
                  </Button>
                )}
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

// Mock data for demonstration
const mockJobs: JobPosting[] = [
  {
    id: "1",
    companyName: "Tech Innovations Inc.",
    jobTitle: "Senior Software Engineer",
    location: "Remote",
    salary: "$120,000 - $150,000",
    applicants: 0,
    postedDate: "2023-06-15",
    status: "pending",
    description:
      "We are looking for an experienced software engineer to join our team and help build cutting-edge applications. The ideal candidate will have strong experience with React, Node.js, and cloud technologies.",
    requirements: [
      "Bachelor's degree in Computer Science or related field",
      "5+ years of experience in software development",
      "Strong proficiency in JavaScript/TypeScript, React, and Node.js",
      "Experience with cloud platforms (AWS, Azure, or GCP)",
      "Excellent problem-solving and communication skills",
    ],
    recruiterName: "Jane Smith",
    recruiterEmail: "jane.smith@techinnovations.com",
  },
  {
    id: "2",
    companyName: "Global Finance Group",
    jobTitle: "Financial Analyst Intern",
    location: "New York, NY",
    salary: "$25 - $30 per hour",
    applicants: 0,
    postedDate: "2023-06-14",
    status: "approved",
    description:
      "Summer internship opportunity for finance students to gain hands-on experience in financial analysis, reporting, and forecasting. Interns will work directly with senior analysts on real projects.",
    requirements: [
      "Currently pursuing a degree in Finance, Accounting, or related field",
      "Strong analytical and quantitative skills",
      "Proficiency in Excel and financial modeling",
      "Excellent attention to detail",
      "Ability to work in a fast-paced environment",
    ],
    recruiterName: "Michael Johnson",
    recruiterEmail: "michael.j@globalfinance.com",
  },
  {
    id: "3",
    companyName: "Healthcare Solutions",
    jobTitle: "Biomedical Engineer",
    location: "Boston, MA",
    salary: "$90,000 - $110,000",
    applicants: 0,
    postedDate: "2023-06-10",
    status: "rejected",
    description:
      "Join our R&D team to develop innovative medical devices. You will be responsible for designing, testing, and improving medical equipment that helps save lives.",
    requirements: [
      "Master's degree in Biomedical Engineering or related field",
      "3+ years of experience in medical device development",
      "Knowledge of FDA regulations and approval processes",
      "Experience with CAD software and prototyping",
      "Strong problem-solving skills",
    ],
    recruiterName: "Sarah Williams",
    recruiterEmail: "sarah.w@healthcaresolutions.com",
  },
  {
    id: "4",
    companyName: "Digital Marketing Agency",
    jobTitle: "Social Media Specialist",
    location: "Remote",
    salary: "$60,000 - $75,000",
    applicants: 0,
    postedDate: "2023-06-12",
    status: "pending",
    description:
      "We are seeking a creative and data-driven Social Media Specialist to manage social media accounts for our clients. The ideal candidate will have experience creating engaging content and analyzing social media metrics.",
    requirements: [
      "Bachelor's degree in Marketing, Communications, or related field",
      "2+ years of experience in social media management",
      "Proficiency with social media platforms and analytics tools",
      "Experience with content creation and scheduling tools",
      "Strong copywriting and communication skills",
    ],
    recruiterName: "David Chen",
    recruiterEmail: "david.c@digitalmarketing.com",
  },
  {
    id: "5",
    companyName: "Sustainable Energy Corp",
    jobTitle: "Environmental Engineer",
    location: "Denver, CO",
    salary: "$85,000 - $100,000",
    applicants: 0,
    postedDate: "2023-06-08",
    status: "approved",
    description:
      "Join our team of environmental engineers working on renewable energy projects. You will be involved in designing, implementing, and monitoring environmental protection measures for our sustainable energy initiatives.",
    requirements: [
      "Bachelor's degree in Environmental Engineering or related field",
      "3+ years of experience in environmental engineering",
      "Knowledge of environmental regulations and compliance",
      "Experience with environmental impact assessments",
      "Strong analytical and problem-solving skills",
    ],
    recruiterName: "Lisa Rodriguez",
    recruiterEmail: "lisa.r@sustainableenergy.com",
  },
];

export default JobApproval;
