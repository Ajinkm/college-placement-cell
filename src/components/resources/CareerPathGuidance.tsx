import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import {
  BarChart,
  BookOpen,
  BriefcaseBusiness,
  Code,
  FileText,
  GraduationCap,
  Lightbulb,
  LineChart,
  MapPin,
  MessageSquare,
  Rocket,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";

const CareerPathGuidance = () => {
  const [activeTab, setActiveTab] = useState("tech");
  const [selectedPath, setSelectedPath] = useState("software-engineer");

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Career Path Guidance</h1>
        <p className="text-muted-foreground">
          Explore career paths, growth opportunities, and industry insights
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Career Paths</CardTitle>
              <CardDescription>
                Explore different career trajectories in various industries
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid grid-cols-4 w-full">
                  <TabsTrigger value="tech">Technology</TabsTrigger>
                  <TabsTrigger value="business">Business</TabsTrigger>
                  <TabsTrigger value="design">Design</TabsTrigger>
                  <TabsTrigger value="data">Data Science</TabsTrigger>
                </TabsList>

                {/* Technology Career Paths */}
                <TabsContent value="tech" className="space-y-6 mt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card
                      className={`cursor-pointer ${selectedPath === "software-engineer" ? "border-primary bg-primary/5" : ""}`}
                      onClick={() => setSelectedPath("software-engineer")}
                    >
                      <CardHeader className="pb-2">
                        <div className="flex items-center">
                          <Code className="h-5 w-5 mr-2 text-primary" />
                          <CardTitle className="text-lg">
                            Software Engineering
                          </CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground mb-2">
                          Design, develop, and maintain software systems and
                          applications
                        </p>
                        <div className="flex flex-wrap gap-1 mt-2">
                          <Badge variant="outline">Web Dev</Badge>
                          <Badge variant="outline">Mobile</Badge>
                          <Badge variant="outline">Backend</Badge>
                          <Badge variant="outline">DevOps</Badge>
                        </div>
                      </CardContent>
                    </Card>

                    <Card
                      className={`cursor-pointer ${selectedPath === "product-manager" ? "border-primary bg-primary/5" : ""}`}
                      onClick={() => setSelectedPath("product-manager")}
                    >
                      <CardHeader className="pb-2">
                        <div className="flex items-center">
                          <Rocket className="h-5 w-5 mr-2 text-primary" />
                          <CardTitle className="text-lg">
                            Product Management
                          </CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground mb-2">
                          Lead product development from conception to launch
                        </p>
                        <div className="flex flex-wrap gap-1 mt-2">
                          <Badge variant="outline">Strategy</Badge>
                          <Badge variant="outline">UX</Badge>
                          <Badge variant="outline">Analytics</Badge>
                          <Badge variant="outline">Agile</Badge>
                        </div>
                      </CardContent>
                    </Card>

                    <Card
                      className={`cursor-pointer ${selectedPath === "cloud-architect" ? "border-primary bg-primary/5" : ""}`}
                      onClick={() => setSelectedPath("cloud-architect")}
                    >
                      <CardHeader className="pb-2">
                        <div className="flex items-center">
                          <LineChart className="h-5 w-5 mr-2 text-primary" />
                          <CardTitle className="text-lg">
                            Cloud Architecture
                          </CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground mb-2">
                          Design and implement cloud infrastructure and
                          solutions
                        </p>
                        <div className="flex flex-wrap gap-1 mt-2">
                          <Badge variant="outline">AWS</Badge>
                          <Badge variant="outline">Azure</Badge>
                          <Badge variant="outline">GCP</Badge>
                          <Badge variant="outline">Security</Badge>
                        </div>
                      </CardContent>
                    </Card>

                    <Card
                      className={`cursor-pointer ${selectedPath === "cybersecurity" ? "border-primary bg-primary/5" : ""}`}
                      onClick={() => setSelectedPath("cybersecurity")}
                    >
                      <CardHeader className="pb-2">
                        <div className="flex items-center">
                          <Zap className="h-5 w-5 mr-2 text-primary" />
                          <CardTitle className="text-lg">
                            Cybersecurity
                          </CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground mb-2">
                          Protect systems and data from cyber threats and
                          attacks
                        </p>
                        <div className="flex flex-wrap gap-1 mt-2">
                          <Badge variant="outline">Network</Badge>
                          <Badge variant="outline">Ethical Hacking</Badge>
                          <Badge variant="outline">Compliance</Badge>
                          <Badge variant="outline">Forensics</Badge>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {selectedPath === "software-engineer" && (
                    <div className="mt-8 space-y-6">
                      <div>
                        <h3 className="text-xl font-semibold mb-4">
                          Software Engineering Career Path
                        </h3>
                        <div className="space-y-4">
                          <div className="flex items-center">
                            <div className="w-1/4 font-medium">Entry Level</div>
                            <div className="w-3/4">
                              <div className="flex justify-between mb-1">
                                <span className="text-sm">
                                  Junior Software Engineer
                                </span>
                                <span className="text-sm text-muted-foreground">
                                  0-2 years
                                </span>
                              </div>
                              <Progress value={20} className="h-2" />
                            </div>
                          </div>
                          <div className="flex items-center">
                            <div className="w-1/4 font-medium">Mid Level</div>
                            <div className="w-3/4">
                              <div className="flex justify-between mb-1">
                                <span className="text-sm">
                                  Software Engineer
                                </span>
                                <span className="text-sm text-muted-foreground">
                                  2-5 years
                                </span>
                              </div>
                              <Progress value={40} className="h-2" />
                            </div>
                          </div>
                          <div className="flex items-center">
                            <div className="w-1/4 font-medium">
                              Senior Level
                            </div>
                            <div className="w-3/4">
                              <div className="flex justify-between mb-1">
                                <span className="text-sm">
                                  Senior Software Engineer
                                </span>
                                <span className="text-sm text-muted-foreground">
                                  5-8 years
                                </span>
                              </div>
                              <Progress value={60} className="h-2" />
                            </div>
                          </div>
                          <div className="flex items-center">
                            <div className="w-1/4 font-medium">Lead Level</div>
                            <div className="w-3/4">
                              <div className="flex justify-between mb-1">
                                <span className="text-sm">
                                  Tech Lead / Architect
                                </span>
                                <span className="text-sm text-muted-foreground">
                                  8-12 years
                                </span>
                              </div>
                              <Progress value={80} className="h-2" />
                            </div>
                          </div>
                          <div className="flex items-center">
                            <div className="w-1/4 font-medium">
                              Executive Level
                            </div>
                            <div className="w-3/4">
                              <div className="flex justify-between mb-1">
                                <span className="text-sm">
                                  CTO / VP of Engineering
                                </span>
                                <span className="text-sm text-muted-foreground">
                                  12+ years
                                </span>
                              </div>
                              <Progress value={100} className="h-2" />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold mb-3">
                          Key Skills
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <h4 className="font-medium mb-2">
                              Technical Skills
                            </h4>
                            <ul className="space-y-1 text-sm">
                              <li className="flex items-center">
                                <span className="text-primary mr-2">•</span>
                                <span>
                                  Programming Languages (JavaScript, Python,
                                  Java)
                                </span>
                              </li>
                              <li className="flex items-center">
                                <span className="text-primary mr-2">•</span>
                                <span>
                                  Web Frameworks (React, Angular, Vue)
                                </span>
                              </li>
                              <li className="flex items-center">
                                <span className="text-primary mr-2">•</span>
                                <span>Database Management (SQL, NoSQL)</span>
                              </li>
                              <li className="flex items-center">
                                <span className="text-primary mr-2">•</span>
                                <span>Version Control (Git)</span>
                              </li>
                              <li className="flex items-center">
                                <span className="text-primary mr-2">•</span>
                                <span>Cloud Services (AWS, Azure, GCP)</span>
                              </li>
                            </ul>
                          </div>
                          <div>
                            <h4 className="font-medium mb-2">Soft Skills</h4>
                            <ul className="space-y-1 text-sm">
                              <li className="flex items-center">
                                <span className="text-primary mr-2">•</span>
                                <span>Problem Solving</span>
                              </li>
                              <li className="flex items-center">
                                <span className="text-primary mr-2">•</span>
                                <span>Communication</span>
                              </li>
                              <li className="flex items-center">
                                <span className="text-primary mr-2">•</span>
                                <span>Teamwork</span>
                              </li>
                              <li className="flex items-center">
                                <span className="text-primary mr-2">•</span>
                                <span>Time Management</span>
                              </li>
                              <li className="flex items-center">
                                <span className="text-primary mr-2">•</span>
                                <span>Adaptability</span>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold mb-3">
                          Recommended Certifications
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="border rounded-md p-3">
                            <h4 className="font-medium">
                              AWS Certified Developer
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              Cloud development skills
                            </p>
                          </div>
                          <div className="border rounded-md p-3">
                            <h4 className="font-medium">
                              Microsoft Certified: Azure Developer
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              Azure cloud platform expertise
                            </p>
                          </div>
                          <div className="border rounded-md p-3">
                            <h4 className="font-medium">
                              Google Associate Cloud Engineer
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              GCP deployment and management
                            </p>
                          </div>
                          <div className="border rounded-md p-3">
                            <h4 className="font-medium">
                              Certified Kubernetes Administrator
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              Container orchestration
                            </p>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold mb-3">
                          Salary Insights
                        </h3>
                        <div className="border rounded-md p-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <h4 className="text-sm font-medium">
                                Junior Software Engineer
                              </h4>
                              <p className="text-lg font-bold">₹4-7 LPA</p>
                            </div>
                            <div>
                              <h4 className="text-sm font-medium">
                                Software Engineer
                              </h4>
                              <p className="text-lg font-bold">₹8-12 LPA</p>
                            </div>
                            <div>
                              <h4 className="text-sm font-medium">
                                Senior Software Engineer
                              </h4>
                              <p className="text-lg font-bold">₹15-25 LPA</p>
                            </div>
                            <div>
                              <h4 className="text-sm font-medium">
                                Tech Lead / Architect
                              </h4>
                              <p className="text-lg font-bold">₹25-40 LPA</p>
                            </div>
                          </div>
                          <p className="text-xs text-muted-foreground mt-4">
                            *Salary ranges are approximate and may vary based on
                            location, company size, and experience
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </TabsContent>

                {/* Business Career Paths */}
                <TabsContent value="business" className="space-y-6 mt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card className="cursor-pointer">
                      <CardHeader className="pb-2">
                        <div className="flex items-center">
                          <BriefcaseBusiness className="h-5 w-5 mr-2 text-primary" />
                          <CardTitle className="text-lg">
                            Business Development
                          </CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground mb-2">
                          Identify growth opportunities and build business
                          relationships
                        </p>
                        <div className="flex flex-wrap gap-1 mt-2">
                          <Badge variant="outline">Sales</Badge>
                          <Badge variant="outline">Partnerships</Badge>
                          <Badge variant="outline">Strategy</Badge>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="cursor-pointer">
                      <CardHeader className="pb-2">
                        <div className="flex items-center">
                          <BarChart className="h-5 w-5 mr-2 text-primary" />
                          <CardTitle className="text-lg">Marketing</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground mb-2">
                          Promote products and services to target audiences
                        </p>
                        <div className="flex flex-wrap gap-1 mt-2">
                          <Badge variant="outline">Digital</Badge>
                          <Badge variant="outline">Content</Badge>
                          <Badge variant="outline">Analytics</Badge>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="cursor-pointer">
                      <CardHeader className="pb-2">
                        <div className="flex items-center">
                          <Users className="h-5 w-5 mr-2 text-primary" />
                          <CardTitle className="text-lg">
                            Human Resources
                          </CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground mb-2">
                          Manage employee relations, recruitment, and
                          development
                        </p>
                        <div className="flex flex-wrap gap-1 mt-2">
                          <Badge variant="outline">Recruitment</Badge>
                          <Badge variant="outline">Training</Badge>
                          <Badge variant="outline">Culture</Badge>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="cursor-pointer">
                      <CardHeader className="pb-2">
                        <div className="flex items-center">
                          <TrendingUp className="h-5 w-5 mr-2 text-primary" />
                          <CardTitle className="text-lg">Finance</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground mb-2">
                          Manage financial resources and strategic planning
                        </p>
                        <div className="flex flex-wrap gap-1 mt-2">
                          <Badge variant="outline">Accounting</Badge>
                          <Badge variant="outline">Analysis</Badge>
                          <Badge variant="outline">Investment</Badge>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                {/* Design Career Paths */}
                <TabsContent value="design" className="space-y-6 mt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card className="cursor-pointer">
                      <CardHeader className="pb-2">
                        <div className="flex items-center">
                          <Lightbulb className="h-5 w-5 mr-2 text-primary" />
                          <CardTitle className="text-lg">
                            UX/UI Design
                          </CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground mb-2">
                          Create user-centered digital experiences and
                          interfaces
                        </p>
                        <div className="flex flex-wrap gap-1 mt-2">
                          <Badge variant="outline">Wireframing</Badge>
                          <Badge variant="outline">Prototyping</Badge>
                          <Badge variant="outline">User Research</Badge>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="cursor-pointer">
                      <CardHeader className="pb-2">
                        <div className="flex items-center">
                          <Lightbulb className="h-5 w-5 mr-2 text-primary" />
                          <CardTitle className="text-lg">
                            Graphic Design
                          </CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground mb-2">
                          Create visual content for digital and print media
                        </p>
                        <div className="flex flex-wrap gap-1 mt-2">
                          <Badge variant="outline">Typography</Badge>
                          <Badge variant="outline">Illustration</Badge>
                          <Badge variant="outline">Branding</Badge>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                {/* Data Science Career Paths */}
                <TabsContent value="data" className="space-y-6 mt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card className="cursor-pointer">
                      <CardHeader className="pb-2">
                        <div className="flex items-center">
                          <BarChart className="h-5 w-5 mr-2 text-primary" />
                          <CardTitle className="text-lg">
                            Data Analyst
                          </CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground mb-2">
                          Analyze data to extract insights and support
                          decision-making
                        </p>
                        <div className="flex flex-wrap gap-1 mt-2">
                          <Badge variant="outline">SQL</Badge>
                          <Badge variant="outline">Excel</Badge>
                          <Badge variant="outline">Visualization</Badge>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="cursor-pointer">
                      <CardHeader className="pb-2">
                        <div className="flex items-center">
                          <BarChart className="h-5 w-5 mr-2 text-primary" />
                          <CardTitle className="text-lg">
                            Data Scientist
                          </CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground mb-2">
                          Apply statistical methods and machine learning to
                          solve complex problems
                        </p>
                        <div className="flex flex-wrap gap-1 mt-2">
                          <Badge variant="outline">Python</Badge>
                          <Badge variant="outline">ML</Badge>
                          <Badge variant="outline">Statistics</Badge>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Career Assessment</CardTitle>
                <CardDescription>
                  Discover career paths that match your skills and interests
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Take our comprehensive assessment to identify suitable career
                  options
                </p>
                <Button
                  className="w-full"
                  onClick={() =>
                    alert("Career assessment will be available soon!")
                  }
                >
                  Start Assessment
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Industry Insights</CardTitle>
                <CardDescription>
                  Latest trends and opportunities
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border rounded-md p-4">
                  <h3 className="font-medium mb-1">
                    Tech Talent Demand Rising
                  </h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    Companies are increasingly seeking professionals with AI and
                    machine learning expertise
                  </p>
                  <Button
                    variant="link"
                    className="px-0 h-auto text-sm"
                    onClick={() =>
                      alert("Full article will be available soon!")
                    }
                  >
                    Read More
                  </Button>
                </div>

                <div className="border rounded-md p-4">
                  <h3 className="font-medium mb-1">
                    Remote Work Opportunities
                  </h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    Global companies are hiring remote talent from India for
                    tech and business roles
                  </p>
                  <Button
                    variant="link"
                    className="px-0 h-auto text-sm"
                    onClick={() =>
                      alert("Full article will be available soon!")
                    }
                  >
                    Read More
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Career Resources</CardTitle>
                <CardDescription>
                  Tools to help you advance your career
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start">
                  <FileText className="h-5 w-5 mr-3 text-primary" />
                  <div>
                    <h3 className="font-medium text-sm">
                      Career Planning Guide
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      Step-by-step guide to planning your career path
                    </p>
                    <Button
                      variant="link"
                      className="px-0 py-1 h-auto text-xs"
                      onClick={() =>
                        alert("PDF download will be available soon!")
                      }
                    >
                      Download PDF
                    </Button>
                  </div>
                </div>

                <Separator />

                <div className="flex items-start">
                  <GraduationCap className="h-5 w-5 mr-3 text-primary" />
                  <div>
                    <h3 className="font-medium text-sm">
                      Skill Development Courses
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      Online courses to build in-demand skills
                    </p>
                    <Button
                      variant="link"
                      className="px-0 py-1 h-auto text-xs"
                      onClick={() =>
                        alert("Course catalog will be available soon!")
                      }
                    >
                      Browse Courses
                    </Button>
                  </div>
                </div>

                <Separator />

                <div className="flex items-start">
                  <MessageSquare className="h-5 w-5 mr-3 text-primary" />
                  <div>
                    <h3 className="font-medium text-sm">Career Counseling</h3>
                    <p className="text-xs text-muted-foreground">
                      One-on-one guidance from industry experts
                    </p>
                    <Button
                      variant="link"
                      className="px-0 py-1 h-auto text-xs"
                      onClick={() =>
                        alert("Session booking will be available soon!")
                      }
                    >
                      Book Session
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Upcoming Webinars</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border rounded-md p-4">
                  <h3 className="font-medium mb-1">
                    Navigating Tech Careers in 2023
                  </h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    June 20, 5:00 PM - 6:30 PM
                  </p>
                  <Button
                    size="sm"
                    onClick={() =>
                      alert("Webinar registration will be available soon!")
                    }
                  >
                    Register
                  </Button>
                </div>

                <div className="border rounded-md p-4">
                  <h3 className="font-medium mb-1">
                    Building a Personal Brand
                  </h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    June 25, 3:00 PM - 4:00 PM
                  </p>
                  <Button
                    size="sm"
                    onClick={() =>
                      alert("Webinar registration will be available soon!")
                    }
                  >
                    Register
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareerPathGuidance;
