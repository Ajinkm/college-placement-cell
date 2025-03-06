import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Download,
  FileText,
  Plus,
  Trash2,
  Upload,
  User,
  Mail,
  Phone,
  MapPin,
  Globe,
  GraduationCap,
  Briefcase,
  Award,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

const resumeSchema = z.object({
  personalInfo: z.object({
    name: z.string().min(2, { message: "Name is required" }),
    email: z.string().email({ message: "Valid email is required" }),
    phone: z.string().min(10, { message: "Valid phone number is required" }),
    address: z.string().optional(),
    website: z.string().optional(),
    summary: z.string().optional(),
  }),
  education: z.array(
    z.object({
      degree: z.string().min(2, { message: "Degree is required" }),
      institution: z.string().min(2, { message: "Institution is required" }),
      location: z.string().optional(),
      startDate: z.string().min(4, { message: "Start year is required" }),
      endDate: z.string().optional(),
      gpa: z.string().optional(),
      description: z.string().optional(),
    }),
  ),
  experience: z.array(
    z.object({
      title: z.string().min(2, { message: "Job title is required" }),
      company: z.string().min(2, { message: "Company is required" }),
      location: z.string().optional(),
      startDate: z.string().min(4, { message: "Start date is required" }),
      endDate: z.string().optional(),
      current: z.boolean().optional(),
      description: z.string().optional(),
    }),
  ),
  skills: z.array(
    z.object({
      name: z.string().min(1, { message: "Skill name is required" }),
      level: z.string().optional(),
    }),
  ),
  projects: z.array(
    z.object({
      name: z.string().min(2, { message: "Project name is required" }),
      description: z.string().optional(),
      technologies: z.string().optional(),
      link: z.string().optional(),
      startDate: z.string().optional(),
      endDate: z.string().optional(),
    }),
  ),
  certifications: z.array(
    z.object({
      name: z.string().min(2, { message: "Certification name is required" }),
      issuer: z.string().optional(),
      date: z.string().optional(),
      link: z.string().optional(),
    }),
  ),
});

type ResumeFormValues = z.infer<typeof resumeSchema>;

const ResumeBuilder = () => {
  const [activeTab, setActiveTab] = useState("personal");
  const [resumePreview, setResumePreview] = useState<string | null>(null);
  const [resumeScore, setResumeScore] = useState(0);
  const [resumeAnalysis, setResumeAnalysis] = useState<any>(null);
  const [resumeTemplate, setResumeTemplate] = useState("modern");

  // Initialize form with default values
  const form = useForm<ResumeFormValues>({
    resolver: zodResolver(resumeSchema),
    defaultValues: {
      personalInfo: {
        name: "",
        email: "",
        phone: "",
        address: "",
        website: "",
        summary: "",
      },
      education: [
        {
          degree: "",
          institution: "",
          location: "",
          startDate: "",
          endDate: "",
          gpa: "",
          description: "",
        },
      ],
      experience: [
        {
          title: "",
          company: "",
          location: "",
          startDate: "",
          endDate: "",
          current: false,
          description: "",
        },
      ],
      skills: [
        {
          name: "",
          level: "Intermediate",
        },
      ],
      projects: [
        {
          name: "",
          description: "",
          technologies: "",
          link: "",
          startDate: "",
          endDate: "",
        },
      ],
      certifications: [
        {
          name: "",
          issuer: "",
          date: "",
          link: "",
        },
      ],
    },
  });

  // Try to load user data from profile if available
  useEffect(() => {
    const userStr = localStorage.getItem("user");
    const profileStr = localStorage.getItem("studentProfile");

    if (userStr) {
      const user = JSON.parse(userStr);
      if (user.name) {
        form.setValue("personalInfo.name", user.name);
      }
      if (user.email) {
        form.setValue("personalInfo.email", user.email);
      }
    }

    if (profileStr) {
      const profile = JSON.parse(profileStr);
      if (profile.name) {
        form.setValue("personalInfo.name", profile.name);
      }
      if (profile.email) {
        form.setValue("personalInfo.email", profile.email);
      }
      if (profile.phone) {
        form.setValue("personalInfo.phone", profile.phone);
      }
      if (profile.skills) {
        const skillsArray = profile.skills.split(",").map((skill: string) => ({
          name: skill.trim(),
          level: "Intermediate",
        }));
        form.setValue("skills", skillsArray);
      }
      if (profile.department && profile.year) {
        form.setValue("education", [
          {
            degree: `Bachelor's in ${profile.department}`,
            institution: "University Name",
            location: "City, Country",
            startDate: new Date().getFullYear() - 4 + "",
            endDate: new Date().getFullYear() + "",
            gpa: profile.cgpa || "",
            description: "",
          },
        ]);
      }
    }
  }, [form]);

  // Add new item to array fields
  const addItem = (
    fieldName:
      | "education"
      | "experience"
      | "skills"
      | "projects"
      | "certifications",
  ) => {
    const currentItems = form.getValues(fieldName);
    let newItem;

    switch (fieldName) {
      case "education":
        newItem = {
          degree: "",
          institution: "",
          location: "",
          startDate: "",
          endDate: "",
          gpa: "",
          description: "",
        };
        break;
      case "experience":
        newItem = {
          title: "",
          company: "",
          location: "",
          startDate: "",
          endDate: "",
          current: false,
          description: "",
        };
        break;
      case "skills":
        newItem = {
          name: "",
          level: "Intermediate",
        };
        break;
      case "projects":
        newItem = {
          name: "",
          description: "",
          technologies: "",
          link: "",
          startDate: "",
          endDate: "",
        };
        break;
      case "certifications":
        newItem = {
          name: "",
          issuer: "",
          date: "",
          link: "",
        };
        break;
    }

    form.setValue(fieldName, [...currentItems, newItem]);
  };

  // Remove item from array fields
  const removeItem = (
    fieldName:
      | "education"
      | "experience"
      | "skills"
      | "projects"
      | "certifications",
    index: number,
  ) => {
    const currentItems = form.getValues(fieldName);
    if (currentItems.length <= 1) return; // Keep at least one item

    const newItems = currentItems.filter((_, i) => i !== index);
    form.setValue(fieldName, newItems);
  };

  // Generate resume preview
  const generatePreview = () => {
    const formData = form.getValues();
    console.log("Resume data:", formData);

    // In a real implementation, this would generate a PDF
    // For now, we'll just simulate it
    setResumePreview("resume_preview.pdf");

    // Analyze the resume
    analyzeResume(formData);
  };

  // Analyze resume for completeness and quality
  const analyzeResume = (data: ResumeFormValues) => {
    // Calculate a score based on completeness
    let score = 0;
    let maxScore = 0;

    // Personal info (20 points)
    const personalInfoFields = Object.values(data.personalInfo);
    personalInfoFields.forEach((field) => {
      maxScore += 3;
      if (field && field.length > 0) score += 3;
    });

    // Education (15 points)
    data.education.forEach((edu) => {
      Object.values(edu).forEach((field) => {
        maxScore += 2;
        if (field && (typeof field === "string" ? field.length > 0 : field))
          score += 2;
      });
    });

    // Experience (25 points)
    data.experience.forEach((exp) => {
      Object.values(exp).forEach((field) => {
        maxScore += 3;
        if (field && (typeof field === "string" ? field.length > 0 : field))
          score += 3;
      });
    });

    // Skills (15 points)
    data.skills.forEach((skill) => {
      maxScore += 3;
      if (skill.name && skill.name.length > 0) score += 3;
    });

    // Projects (15 points)
    data.projects.forEach((project) => {
      Object.values(project).forEach((field) => {
        maxScore += 2;
        if (field && typeof field === "string" && field.length > 0) score += 2;
      });
    });

    // Certifications (10 points)
    data.certifications.forEach((cert) => {
      Object.values(cert).forEach((field) => {
        maxScore += 2;
        if (field && typeof field === "string" && field.length > 0) score += 2;
      });
    });

    // Calculate percentage
    const percentage = Math.round((score / maxScore) * 100);
    setResumeScore(percentage);

    // Generate analysis
    const analysis = {
      score: percentage,
      strengths: [],
      weaknesses: [],
      suggestions: [],
    };

    // Check for strengths and weaknesses
    if (data.personalInfo.summary && data.personalInfo.summary.length > 50) {
      analysis.strengths.push("Strong professional summary");
    } else {
      analysis.weaknesses.push("Professional summary is missing or too short");
      analysis.suggestions.push(
        "Add a compelling professional summary that highlights your career goals and key strengths",
      );
    }

    if (
      data.experience.length > 0 &&
      data.experience[0].description &&
      data.experience[0].description.length > 50
    ) {
      analysis.strengths.push("Detailed work experience");
    } else {
      analysis.weaknesses.push("Work experience lacks detail");
      analysis.suggestions.push(
        "Add specific achievements and responsibilities to your work experience using action verbs",
      );
    }

    if (data.skills.length >= 5) {
      analysis.strengths.push("Good range of skills");
    } else {
      analysis.weaknesses.push("Limited skills section");
      analysis.suggestions.push(
        "Add more relevant technical and soft skills to showcase your capabilities",
      );
    }

    if (data.projects.length === 0 || !data.projects[0].name) {
      analysis.weaknesses.push("No projects listed");
      analysis.suggestions.push(
        "Add relevant projects to demonstrate practical application of your skills",
      );
    }

    // Add general suggestions
    analysis.suggestions.push(
      "Quantify achievements with specific metrics where possible",
    );
    analysis.suggestions.push(
      "Tailor your resume for specific job applications by highlighting relevant skills",
    );
    analysis.suggestions.push(
      "Use industry-specific keywords to pass through ATS (Applicant Tracking Systems)",
    );

    setResumeAnalysis(analysis);
  };

  // Download resume
  const downloadResume = () => {
    alert(
      "In a real implementation, this would download your resume as a PDF.",
    );
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Resume Builder</h1>
        <p className="text-muted-foreground">
          Create a professional resume to showcase your skills and experience
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Build Your Resume</CardTitle>
              <CardDescription>
                Fill in the details below to create your resume
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form className="space-y-6">
                  <Tabs value={activeTab} onValueChange={setActiveTab}>
                    <TabsList className="grid grid-cols-6 w-full">
                      <TabsTrigger value="personal">Personal</TabsTrigger>
                      <TabsTrigger value="education">Education</TabsTrigger>
                      <TabsTrigger value="experience">Experience</TabsTrigger>
                      <TabsTrigger value="skills">Skills</TabsTrigger>
                      <TabsTrigger value="projects">Projects</TabsTrigger>
                      <TabsTrigger value="certifications">
                        Certifications
                      </TabsTrigger>
                    </TabsList>

                    {/* Personal Information */}
                    <TabsContent value="personal" className="space-y-4 mt-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="personalInfo.name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Full Name</FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <User className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                  <Input
                                    className="pl-10"
                                    placeholder="John Doe"
                                    {...field}
                                  />
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="personalInfo.email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                  <Input
                                    className="pl-10"
                                    placeholder="john.doe@example.com"
                                    {...field}
                                  />
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="personalInfo.phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Phone</FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <Phone className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                  <Input
                                    className="pl-10"
                                    placeholder="+91 9876543210"
                                    {...field}
                                  />
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="personalInfo.address"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Address</FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                  <Input
                                    className="pl-10"
                                    placeholder="City, State, Country"
                                    {...field}
                                  />
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="grid grid-cols-1 gap-4">
                        <FormField
                          control={form.control}
                          name="personalInfo.website"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Website/LinkedIn</FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <Globe className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                  <Input
                                    className="pl-10"
                                    placeholder="linkedin.com/in/johndoe"
                                    {...field}
                                  />
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="personalInfo.summary"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Professional Summary</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="A brief summary of your professional background and career goals"
                                className="min-h-[120px]"
                                {...field}
                              />
                            </FormControl>
                            <FormDescription>
                              Keep it concise and impactful (3-5 sentences)
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </TabsContent>

                    {/* Education */}
                    <TabsContent value="education" className="space-y-6 mt-4">
                      {form.watch("education").map((_, index) => (
                        <div
                          key={index}
                          className="space-y-4 p-4 border rounded-md"
                        >
                          <div className="flex justify-between items-center">
                            <h3 className="text-lg font-medium">
                              Education #{index + 1}
                            </h3>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => removeItem("education", index)}
                              disabled={form.watch("education").length <= 1}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                              control={form.control}
                              name={`education.${index}.degree`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Degree/Certificate</FormLabel>
                                  <FormControl>
                                    <Input
                                      placeholder="Bachelor of Technology"
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name={`education.${index}.institution`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Institution</FormLabel>
                                  <FormControl>
                                    <Input
                                      placeholder="University Name"
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <FormField
                              control={form.control}
                              name={`education.${index}.location`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Location</FormLabel>
                                  <FormControl>
                                    <Input
                                      placeholder="City, Country"
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name={`education.${index}.startDate`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Start Year</FormLabel>
                                  <FormControl>
                                    <Input placeholder="2020" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name={`education.${index}.endDate`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>End Year (or Expected)</FormLabel>
                                  <FormControl>
                                    <Input placeholder="2024" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                              control={form.control}
                              name={`education.${index}.gpa`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>CGPA/Percentage</FormLabel>
                                  <FormControl>
                                    <Input placeholder="8.5/10" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>

                          <FormField
                            control={form.control}
                            name={`education.${index}.description`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Description (Optional)</FormLabel>
                                <FormControl>
                                  <Textarea
                                    placeholder="Relevant coursework, achievements, etc."
                                    className="min-h-[80px]"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      ))}

                      <Button
                        type="button"
                        variant="outline"
                        className="w-full"
                        onClick={() => addItem("education")}
                      >
                        <Plus className="mr-2 h-4 w-4" /> Add Education
                      </Button>
                    </TabsContent>

                    {/* Experience */}
                    <TabsContent value="experience" className="space-y-6 mt-4">
                      {form.watch("experience").map((_, index) => (
                        <div
                          key={index}
                          className="space-y-4 p-4 border rounded-md"
                        >
                          <div className="flex justify-between items-center">
                            <h3 className="text-lg font-medium">
                              Experience #{index + 1}
                            </h3>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => removeItem("experience", index)}
                              disabled={form.watch("experience").length <= 1}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                              control={form.control}
                              name={`experience.${index}.title`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Job Title</FormLabel>
                                  <FormControl>
                                    <Input
                                      placeholder="Software Engineer Intern"
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name={`experience.${index}.company`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Company</FormLabel>
                                  <FormControl>
                                    <Input
                                      placeholder="Company Name"
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <FormField
                              control={form.control}
                              name={`experience.${index}.location`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Location</FormLabel>
                                  <FormControl>
                                    <Input
                                      placeholder="City, Country"
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name={`experience.${index}.startDate`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Start Date</FormLabel>
                                  <FormControl>
                                    <Input placeholder="June 2022" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name={`experience.${index}.endDate`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>End Date</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Present" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>

                          <FormField
                            control={form.control}
                            name={`experience.${index}.description`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                  <Textarea
                                    placeholder="Describe your responsibilities and achievements"
                                    className="min-h-[120px]"
                                    {...field}
                                  />
                                </FormControl>
                                <FormDescription>
                                  Use bullet points and action verbs to
                                  highlight achievements
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      ))}

                      <Button
                        type="button"
                        variant="outline"
                        className="w-full"
                        onClick={() => addItem("experience")}
                      >
                        <Plus className="mr-2 h-4 w-4" /> Add Experience
                      </Button>
                    </TabsContent>

                    {/* Skills */}
                    <TabsContent value="skills" className="space-y-6 mt-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {form.watch("skills").map((_, index) => (
                          <div
                            key={index}
                            className="flex items-center space-x-2"
                          >
                            <FormField
                              control={form.control}
                              name={`skills.${index}.name`}
                              render={({ field }) => (
                                <FormItem className="flex-1">
                                  <FormControl>
                                    <Input
                                      placeholder="Skill name"
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name={`skills.${index}.level`}
                              render={({ field }) => (
                                <FormItem className="w-32">
                                  <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                  >
                                    <FormControl>
                                      <SelectTrigger>
                                        <SelectValue placeholder="Level" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      <SelectItem value="Beginner">
                                        Beginner
                                      </SelectItem>
                                      <SelectItem value="Intermediate">
                                        Intermediate
                                      </SelectItem>
                                      <SelectItem value="Advanced">
                                        Advanced
                                      </SelectItem>
                                      <SelectItem value="Expert">
                                        Expert
                                      </SelectItem>
                                    </SelectContent>
                                  </Select>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              onClick={() => removeItem("skills", index)}
                              disabled={form.watch("skills").length <= 1}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>

                      <Button
                        type="button"
                        variant="outline"
                        className="w-full"
                        onClick={() => addItem("skills")}
                      >
                        <Plus className="mr-2 h-4 w-4" /> Add Skill
                      </Button>
                    </TabsContent>

                    {/* Projects */}
                    <TabsContent value="projects" className="space-y-6 mt-4">
                      {form.watch("projects").map((_, index) => (
                        <div
                          key={index}
                          className="space-y-4 p-4 border rounded-md"
                        >
                          <div className="flex justify-between items-center">
                            <h3 className="text-lg font-medium">
                              Project #{index + 1}
                            </h3>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => removeItem("projects", index)}
                              disabled={form.watch("projects").length <= 1}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                              control={form.control}
                              name={`projects.${index}.name`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Project Name</FormLabel>
                                  <FormControl>
                                    <Input
                                      placeholder="E-commerce Website"
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name={`projects.${index}.link`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Project Link (Optional)</FormLabel>
                                  <FormControl>
                                    <Input
                                      placeholder="https://github.com/username/project"
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                              control={form.control}
                              name={`projects.${index}.startDate`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Start Date (Optional)</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Jan 2023" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name={`projects.${index}.endDate`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>End Date (Optional)</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Mar 2023" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>

                          <FormField
                            control={form.control}
                            name={`projects.${index}.technologies`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Technologies Used</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="React, Node.js, MongoDB"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name={`projects.${index}.description`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                  <Textarea
                                    placeholder="Describe the project, your role, and achievements"
                                    className="min-h-[100px]"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      ))}

                      <Button
                        type="button"
                        variant="outline"
                        className="w-full"
                        onClick={() => addItem("projects")}
                      >
                        <Plus className="mr-2 h-4 w-4" /> Add Project
                      </Button>
                    </TabsContent>

                    {/* Certifications */}
                    <TabsContent
                      value="certifications"
                      className="space-y-6 mt-4"
                    >
                      {form.watch("certifications").map((_, index) => (
                        <div
                          key={index}
                          className="space-y-4 p-4 border rounded-md"
                        >
                          <div className="flex justify-between items-center">
                            <h3 className="text-lg font-medium">
                              Certification #{index + 1}
                            </h3>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() =>
                                removeItem("certifications", index)
                              }
                              disabled={
                                form.watch("certifications").length <= 1
                              }
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                              control={form.control}
                              name={`certifications.${index}.name`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Certification Name</FormLabel>
                                  <FormControl>
                                    <Input
                                      placeholder="AWS Certified Developer"
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name={`certifications.${index}.issuer`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Issuing Organization</FormLabel>
                                  <FormControl>
                                    <Input
                                      placeholder="Amazon Web Services"
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                              control={form.control}
                              name={`certifications.${index}.date`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Date</FormLabel>
                                  <FormControl>
                                    <Input placeholder="June 2023" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name={`certifications.${index}.link`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>
                                    Credential Link (Optional)
                                  </FormLabel>
                                  <FormControl>
                                    <Input
                                      placeholder="https://credential-url.com"
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        </div>
                      ))}

                      <Button
                        type="button"
                        variant="outline"
                        className="w-full"
                        onClick={() => addItem("certifications")}
                      >
                        <Plus className="mr-2 h-4 w-4" /> Add Certification
                      </Button>
                    </TabsContent>
                  </Tabs>
                </form>
              </Form>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="flex space-x-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    const prevTab = {
                      personal: "personal",
                      education: "personal",
                      experience: "education",
                      skills: "experience",
                      projects: "skills",
                      certifications: "projects",
                    }[activeTab];
                    setActiveTab(prevTab);
                  }}
                  disabled={activeTab === "personal"}
                >
                  Previous
                </Button>
                <Button
                  type="button"
                  onClick={() => {
                    const nextTab = {
                      personal: "education",
                      education: "experience",
                      experience: "skills",
                      skills: "projects",
                      projects: "certifications",
                      certifications: "certifications",
                    }[activeTab];
                    setActiveTab(nextTab);
                  }}
                  disabled={activeTab === "certifications"}
                >
                  Next
                </Button>
              </div>
              <Button type="button" onClick={generatePreview}>
                Generate Resume
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div className="lg:col-span-1">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Resume Preview</CardTitle>
                <CardDescription>
                  Generate your resume to see a preview
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center min-h-[200px]">
                {resumePreview ? (
                  <div className="text-center">
                    <FileText className="h-16 w-16 text-primary mx-auto mb-4" />
                    <p className="font-medium">Your resume is ready!</p>
                    <p className="text-sm text-muted-foreground mb-4">
                      Click the button below to download
                    </p>
                    <Button onClick={downloadResume}>
                      <Download className="mr-2 h-4 w-4" /> Download Resume
                    </Button>
                  </div>
                ) : (
                  <div className="text-center">
                    <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                    <p className="text-muted-foreground">
                      Fill in your details and click "Generate Resume" to create
                      your resume
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {resumeAnalysis && (
              <Card>
                <CardHeader>
                  <CardTitle>Resume Analysis</CardTitle>
                  <CardDescription>Score: {resumeScore}%</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {resumeAnalysis.strengths.length > 0 && (
                    <div>
                      <h3 className="text-sm font-medium mb-2">Strengths</h3>
                      <ul className="space-y-1">
                        {resumeAnalysis.strengths.map((strength, index) => (
                          <li key={index} className="flex items-start text-sm">
                            <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                            <span>{strength}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {resumeAnalysis.weaknesses.length > 0 && (
                    <div>
                      <h3 className="text-sm font-medium mb-2">
                        Areas to Improve
                      </h3>
                      <ul className="space-y-1">
                        {resumeAnalysis.weaknesses.map((weakness, index) => (
                          <li key={index} className="flex items-start text-sm">
                            <AlertCircle className="h-4 w-4 text-amber-500 mr-2 mt-0.5" />
                            <span>{weakness}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <Separator />

                  <div>
                    <h3 className="text-sm font-medium mb-2">Suggestions</h3>
                    <ul className="space-y-1">
                      {resumeAnalysis.suggestions.map((suggestion, index) => (
                        <li key={index} className="flex items-start text-sm">
                          <span className="text-primary font-medium mr-2">
                            {index + 1}.
                          </span>
                          <span>{suggestion}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            )}

            <Card>
              <CardHeader>
                <CardTitle>Resume Templates</CardTitle>
                <CardDescription>
                  Choose a template for your resume
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div
                    className={`border rounded-md p-4 cursor-pointer ${resumeTemplate === "modern" ? "border-primary bg-primary/5" : ""}`}
                    onClick={() => setResumeTemplate("modern")}
                  >
                    <div className="h-20 bg-gray-100 mb-2 rounded flex items-center justify-center">
                      <span className="text-xs text-gray-500">Modern</span>
                    </div>
                    <p className="text-xs text-center font-medium">Modern</p>
                  </div>
                  <div
                    className={`border rounded-md p-4 cursor-pointer ${resumeTemplate === "classic" ? "border-primary bg-primary/5" : ""}`}
                    onClick={() => setResumeTemplate("classic")}
                  >
                    <div className="h-20 bg-gray-100 mb-2 rounded flex items-center justify-center">
                      <span className="text-xs text-gray-500">Classic</span>
                    </div>
                    <p className="text-xs text-center font-medium">Classic</p>
                  </div>
                  <div
                    className={`border rounded-md p-4 cursor-pointer ${resumeTemplate === "creative" ? "border-primary bg-primary/5" : ""}`}
                    onClick={() => setResumeTemplate("creative")}
                  >
                    <div className="h-20 bg-gray-100 mb-2 rounded flex items-center justify-center">
                      <span className="text-xs text-gray-500">Creative</span>
                    </div>
                    <p className="text-xs text-center font-medium">Creative</p>
                  </div>
                  <div
                    className={`border rounded-md p-4 cursor-pointer ${resumeTemplate === "minimal" ? "border-primary bg-primary/5" : ""}`}
                    onClick={() => setResumeTemplate("minimal")}
                  >
                    <div className="h-20 bg-gray-100 mb-2 rounded flex items-center justify-center">
                      <span className="text-xs text-gray-500">Minimal</span>
                    </div>
                    <p className="text-xs text-center font-medium">Minimal</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Resume Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start">
                    <span className="text-primary font-medium mr-2">•</span>
                    <span>Keep your resume to 1-2 pages maximum</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary font-medium mr-2">•</span>
                    <span>Use action verbs to describe your experiences</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary font-medium mr-2">•</span>
                    <span>
                      Quantify achievements with numbers when possible
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary font-medium mr-2">•</span>
                    <span>Tailor your resume for each job application</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary font-medium mr-2">•</span>
                    <span>
                      Proofread carefully for spelling and grammar errors
                    </span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;
