import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { supabase } from "@/lib/supabase";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
  User,
  Mail,
  Phone,
  MapPin,
  GraduationCap,
  Briefcase,
  FileText,
  Edit,
  Download,
  Upload,
  CheckCircle,
  AlertCircle,
  Save,
  XCircle,
} from "lucide-react";

interface StudentProfileProps {
  studentName?: string;
  studentEmail?: string;
  studentPhone?: string;
  studentLocation?: string;
  studentImage?: string;
  studentDepartment?: string;
  studentYear?: string;
  studentCGPA?: string;
  studentSkills?: string[];
  studentBio?: string;
  hasResume?: boolean;
  resumeScore?: number;
  studentData?: any;
}

const StudentProfile = ({
  studentName = "John Doe",
  studentEmail = "john.doe@university.edu",
  studentPhone = "+91 9876543210",
  studentLocation = "Mumbai, India",
  studentImage = "https://api.dicebear.com/7.x/avataaars/svg?seed=john",
  studentDepartment = "Computer Science",
  studentYear = "3rd Year",
  studentCGPA = "8.5",
  studentSkills = [
    "JavaScript",
    "React",
    "Node.js",
    "Python",
    "Machine Learning",
    "Data Analysis",
  ],
  studentBio = "Passionate computer science student with a keen interest in web development and machine learning. Looking for opportunities to apply my skills in a real-world setting.",
  hasResume = false,
  resumeScore = 75,
  studentData = null,
}: StudentProfileProps) => {
  const [activeTab, setActiveTab] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState<any>(null);
  const [hasResumeState, setHasResumeState] = useState(hasResume);
  const [resumeAnalysis, setResumeAnalysis] = useState<any>(null);
  // Removed job suggestions from this component

  // Load profile data from localStorage if available
  useEffect(() => {
    const storedProfile = localStorage.getItem("studentProfile");
    if (storedProfile) {
      const profile = JSON.parse(storedProfile);
      setProfileData(profile);
    } else if (studentData) {
      setProfileData(studentData);
    }

    // Check if user has uploaded a resume
    const hasResumeStored = localStorage.getItem("hasResume");
    if (hasResumeStored) {
      setHasResumeState(true);

      // Load resume analysis if available
      const analysisStored = localStorage.getItem("resumeAnalysis");
      if (analysisStored) {
        const analysis = JSON.parse(analysisStored);
        setResumeAnalysis(analysis);
      }
    }
  }, [studentData]);

  const handleEditProfile = () => {
    setIsEditing(true);
  };

  const handleSaveProfile = (formData: any) => {
    // Save the updated profile data to localStorage
    const updatedProfileData = {
      ...profileData,
      ...formData,
      profileImage: profileData?.profileImage || studentImage,
    };

    setProfileData(updatedProfileData);
    localStorage.setItem("studentProfile", JSON.stringify(updatedProfileData));

    // Update the user object in localStorage with the new name
    const userStr = localStorage.getItem("user");
    if (userStr) {
      const user = JSON.parse(userStr);
      user.name = formData.name;
      localStorage.setItem("user", JSON.stringify(user));
    }

    setIsEditing(false);
    alert("Profile updated successfully!");
  };

  const handleResumeUpload = async () => {
    // Create a file input element
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = ".pdf,.doc,.docx";
    fileInput.style.display = "none";
    document.body.appendChild(fileInput);

    // Handle file selection
    fileInput.onchange = async (e: any) => {
      const file = e.target.files?.[0];
      if (file) {
        try {
          // Get current user from localStorage
          const userStr = localStorage.getItem("user");
          if (!userStr) throw new Error("User not found");

          const user = JSON.parse(userStr);
          const userId = user.id;
          const fileName = `${userId}_${Date.now()}_${file.name}`;

          // Upload file to Supabase storage
          const { data, error } = await supabase.storage
            .from("resumes")
            .upload(fileName, file);

          if (error) throw error;

          // Get the public URL
          const { data: urlData } = supabase.storage
            .from("resumes")
            .getPublicUrl(fileName);

          // Update user profile with resume URL
          const { error: updateError } = await supabase
            .from("profiles")
            .update({
              resume_url: urlData.publicUrl,
              has_resume: true,
              updated_at: new Date().toISOString(),
            })
            .eq("user_id", userId);

          if (updateError) throw updateError;

          // Mark as having a resume
          localStorage.setItem("hasResume", "true");
          setHasResumeState(true);

          // Simulate resume analysis
          analyzeResume(file);

          alert("Resume uploaded successfully!");
        } catch (error) {
          console.error("Resume upload error:", error);
          alert("Failed to upload resume. Please try again.");
        }
      }
      document.body.removeChild(fileInput);
    };

    // Trigger file selection dialog
    fileInput.click();
  };

  const analyzeResume = (file: File) => {
    // In a real implementation, this would send the resume to an API for analysis
    // For now, we'll simulate the analysis with some sample data

    // Store resume analysis in localStorage
    const analysis = {
      score: Math.floor(Math.random() * 30) + 65, // Random score between 65-95
      keySkills: ["JavaScript", "React", "Node.js", "Python", "Data Analysis"],
      missingKeywords: ["TypeScript", "AWS", "Docker", "CI/CD"],
      suggestions: [
        "Quantify your achievements with specific metrics",
        "Add more details about your technical projects",
        "Consider adding a brief professional summary",
        "Include relevant industry certifications",
      ],
    };

    localStorage.setItem("resumeAnalysis", JSON.stringify(analysis));
  };

  const handleResumeDownload = () => {
    // In a real implementation, this would download the resume
    alert("Resume download feature will be implemented soon!");
  };

  // Use profile data if available
  const displayName = profileData?.name || studentName;
  const displayEmail = profileData?.email || studentEmail;
  const displayPhone = profileData?.phone || studentPhone;
  const displayLocation = studentLocation;
  const displayImage = profileData?.profileImage || studentImage;
  const displayDepartment = profileData?.department || studentDepartment;
  const displayYear = profileData?.year || studentYear;
  const displayCGPA = profileData?.cgpa || "";
  const displayBio = profileData?.bio || "";
  const displaySkills = profileData?.skills
    ? profileData.skills.split(",").map((s: string) => s.trim())
    : [];
  const displayRollNumber = profileData?.rollNumber || "";

  return (
    <div className="w-full h-full bg-background p-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Student Profile</h1>
          <TabsList>
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="resume">Resume</TabsTrigger>
            <TabsTrigger value="education">Education</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>
                    Manage your personal details and profile information
                  </CardDescription>
                </div>
                <Button variant="outline" onClick={handleEditProfile}>
                  <Edit className="mr-2 h-4 w-4" /> Edit Profile
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {isEditing ? (
                <EditProfileForm
                  initialData={{
                    name: displayName,
                    email: displayEmail,
                    phone: displayPhone,
                    rollNumber: displayRollNumber,
                    department: displayDepartment,
                    year: displayYear,
                    cgpa: displayCGPA,
                    bio: displayBio,
                    skills: displaySkills.join(", "),
                  }}
                  onSave={handleSaveProfile}
                  onCancel={() => setIsEditing(false)}
                />
              ) : (
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="md:w-1/3 flex flex-col items-center space-y-4">
                    <Avatar className="h-32 w-32">
                      <AvatarImage src={displayImage} alt={displayName} />
                      <AvatarFallback>
                        {displayName.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="text-center">
                      <h2 className="text-xl font-bold">{displayName}</h2>
                      <p className="text-muted-foreground">
                        {displayDepartment}
                      </p>
                      <div className="flex justify-center mt-2">
                        <Badge variant="outline">{displayYear}</Badge>
                      </div>
                    </div>
                  </div>

                  <div className="md:w-2/3 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center space-x-2">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">Email</p>
                          <p className="text-sm text-muted-foreground">
                            {displayEmail}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">Phone</p>
                          <p className="text-sm text-muted-foreground">
                            {displayPhone}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center space-x-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">Roll Number</p>
                          <p className="text-sm text-muted-foreground">
                            {displayRollNumber}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <GraduationCap className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">CGPA</p>
                          <p className="text-sm text-muted-foreground">
                            {displayCGPA}/10
                          </p>
                        </div>
                      </div>
                    </div>

                    {displayBio && (
                      <div>
                        <p className="text-sm font-medium">Bio</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          {displayBio}
                        </p>
                      </div>
                    )}

                    {displaySkills && displaySkills.length > 0 && (
                      <div>
                        <p className="text-sm font-medium">Skills</p>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {displaySkills.map((skill: string, index: number) => (
                            <Badge key={index} variant="secondary">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="resume" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Resume Management</CardTitle>
              <CardDescription>
                Upload, manage, and analyze your resume
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/3 space-y-4">
                  <div className="border rounded-md p-6 text-center">
                    <FileText className="h-12 w-12 mx-auto text-primary" />
                    <h3 className="mt-4 font-medium">
                      {hasResumeState
                        ? "Resume Uploaded"
                        : "No Resume Uploaded"}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-2">
                      {hasResumeState
                        ? "Your resume is ready for applications"
                        : "Upload your resume to apply for jobs"}
                    </p>
                    <div className="mt-4 space-y-2">
                      {hasResumeState ? (
                        <>
                          <Button
                            variant="outline"
                            className="w-full"
                            onClick={handleResumeDownload}
                          >
                            <Download className="mr-2 h-4 w-4" /> Download
                          </Button>
                          <Button
                            variant="outline"
                            className="w-full"
                            onClick={handleResumeUpload}
                          >
                            <Upload className="mr-2 h-4 w-4" /> Update
                          </Button>
                        </>
                      ) : (
                        <Button className="w-full" onClick={handleResumeUpload}>
                          <Upload className="mr-2 h-4 w-4" /> Upload Resume
                        </Button>
                      )}
                    </div>
                  </div>
                </div>

                {hasResumeState && (
                  <div className="md:w-2/3 space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-2">
                        Resume Analysis
                      </h3>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium">
                              Overall Score
                            </span>
                            <span className="text-sm font-medium">
                              {resumeAnalysis
                                ? resumeAnalysis.score
                                : resumeScore}
                              %
                            </span>
                          </div>
                          <Progress
                            value={
                              resumeAnalysis
                                ? resumeAnalysis.score
                                : resumeScore
                            }
                            className="h-2"
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="border rounded-md p-4">
                            <div className="flex items-start">
                              <div
                                className={`rounded-full p-1.5 ${resumeScore >= 70 ? "bg-green-100" : "bg-yellow-100"} mr-2`}
                              >
                                {(resumeAnalysis
                                  ? resumeAnalysis.score
                                  : resumeScore) >= 70 ? (
                                  <CheckCircle className="h-4 w-4 text-green-600" />
                                ) : (
                                  <AlertCircle className="h-4 w-4 text-yellow-600" />
                                )}
                              </div>
                              <div>
                                <h4 className="text-sm font-medium">
                                  Content Quality
                                </h4>
                                <p className="text-xs text-muted-foreground mt-1">
                                  {(resumeAnalysis
                                    ? resumeAnalysis.score
                                    : resumeScore) >= 70
                                    ? "Good job! Your resume content is well-structured."
                                    : "Consider adding more details about your achievements."}
                                </p>
                              </div>
                            </div>
                          </div>

                          <div className="border rounded-md p-4">
                            <div className="flex items-start">
                              <div
                                className={`rounded-full p-1.5 ${resumeScore >= 60 ? "bg-green-100" : "bg-yellow-100"} mr-2`}
                              >
                                {(resumeAnalysis
                                  ? resumeAnalysis.score
                                  : resumeScore) >= 60 ? (
                                  <CheckCircle className="h-4 w-4 text-green-600" />
                                ) : (
                                  <AlertCircle className="h-4 w-4 text-yellow-600" />
                                )}
                              </div>
                              <div>
                                <h4 className="text-sm font-medium">
                                  Keyword Optimization
                                </h4>
                                <p className="text-xs text-muted-foreground mt-1">
                                  {(resumeAnalysis
                                    ? resumeAnalysis.score
                                    : resumeScore) >= 60
                                    ? "Your resume includes relevant keywords for your field."
                                    : "Add more industry-specific keywords to improve visibility."}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="border rounded-md p-4">
                          <h4 className="text-sm font-medium mb-2">
                            Improvement Suggestions
                          </h4>
                          <ul className="text-sm text-muted-foreground space-y-2">
                            {resumeAnalysis && resumeAnalysis.suggestions ? (
                              resumeAnalysis.suggestions.map(
                                (suggestion: string, index: number) => (
                                  <li key={index} className="flex items-start">
                                    <AlertCircle className="h-4 w-4 text-primary mr-2 mt-0.5" />
                                    <span>{suggestion}</span>
                                  </li>
                                ),
                              )
                            ) : (
                              <>
                                <li className="flex items-start">
                                  <AlertCircle className="h-4 w-4 text-primary mr-2 mt-0.5" />
                                  <span>
                                    Quantify your achievements with specific
                                    metrics
                                  </span>
                                </li>
                                <li className="flex items-start">
                                  <AlertCircle className="h-4 w-4 text-primary mr-2 mt-0.5" />
                                  <span>
                                    Add more details about your technical
                                    projects
                                  </span>
                                </li>
                                <li className="flex items-start">
                                  <AlertCircle className="h-4 w-4 text-primary mr-2 mt-0.5" />
                                  <span>
                                    Consider adding a brief professional summary
                                  </span>
                                </li>
                              </>
                            )}
                          </ul>
                        </div>

                        <div className="border rounded-md p-4">
                          <h4 className="text-sm font-medium mb-2">
                            Resume Improvement Suggestions
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            Based on our analysis, here are some ways to improve
                            your resume:
                          </p>
                          <ul className="text-sm text-muted-foreground mt-2 space-y-1 list-disc pl-5">
                            <li>Add more quantifiable achievements</li>
                            <li>Include relevant coursework and projects</li>
                            <li>
                              Tailor your resume for specific job applications
                            </li>
                            <li>Ensure consistent formatting throughout</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="education" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>Education Details</CardTitle>
                  <CardDescription>
                    Manage your academic information and achievements
                  </CardDescription>
                </div>
                <Button variant="outline" onClick={() => setIsEditing(true)}>
                  <Edit className="mr-2 h-4 w-4" /> Edit Education
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {isEditing ? (
                <EditEducationForm
                  initialData={{
                    degree: profileData?.degree || "",
                    university: profileData?.university || "",
                    graduationYear: profileData?.graduationYear || "",
                    keyCourses: profileData?.keyCourses || "",
                    secondarySchool: profileData?.secondarySchool || "",
                    secondaryYears: profileData?.secondaryYears || "",
                    secondaryPercentage: profileData?.secondaryPercentage || "",
                    certifications: profileData?.certifications || [],
                  }}
                  onSave={(data) => {
                    const updatedProfileData = {
                      ...profileData,
                      ...data,
                    };
                    setProfileData(updatedProfileData);
                    localStorage.setItem(
                      "studentProfile",
                      JSON.stringify(updatedProfileData),
                    );
                    setIsEditing(false);
                    alert("Education details updated successfully!");
                  }}
                  onCancel={() => setIsEditing(false)}
                />
              ) : (
                <div className="space-y-6">
                  {profileData?.degree && profileData?.university && (
                    <div className="border rounded-md p-6">
                      <div className="flex items-start">
                        <div className="rounded-full bg-primary/10 p-3 mr-4">
                          <GraduationCap className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-medium">{`${profileData.degree} in ${displayDepartment}`}</h3>
                          <p className="text-muted-foreground">
                            {profileData.university}
                          </p>
                          <div className="flex items-center mt-2">
                            <Badge variant="outline">
                              {profileData.graduationYear
                                ? `${parseInt(profileData.graduationYear) - 4} - ${profileData.graduationYear}`
                                : ""}
                            </Badge>
                            {displayCGPA && (
                              <>
                                <span className="mx-2 text-muted-foreground">
                                  •
                                </span>
                                <span className="text-sm">
                                  CGPA: {displayCGPA}/10
                                </span>
                              </>
                            )}
                          </div>
                          {profileData.keyCourses && (
                            <div className="mt-4">
                              <h4 className="text-sm font-medium mb-2">
                                Key Courses
                              </h4>
                              <div className="flex flex-wrap gap-2">
                                {profileData.keyCourses
                                  .split(",")
                                  .map((course, index) => (
                                    <Badge key={index} variant="secondary">
                                      {course.trim()}
                                    </Badge>
                                  ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {profileData?.secondarySchool && (
                    <div className="border rounded-md p-6">
                      <div className="flex items-start">
                        <div className="rounded-full bg-primary/10 p-3 mr-4">
                          <GraduationCap className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-medium">
                            Higher Secondary Education
                          </h3>
                          <p className="text-muted-foreground">
                            {profileData.secondarySchool}
                          </p>
                          {profileData.secondaryYears && (
                            <div className="flex items-center mt-2">
                              <Badge variant="outline">
                                {profileData.secondaryYears}
                              </Badge>
                              {profileData.secondaryPercentage && (
                                <>
                                  <span className="mx-2 text-muted-foreground">
                                    •
                                  </span>
                                  <span className="text-sm">
                                    Percentage:{" "}
                                    {profileData.secondaryPercentage}%
                                  </span>
                                </>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {profileData?.certifications &&
                    profileData.certifications.length > 0 && (
                      <div className="mt-6">
                        <h3 className="text-lg font-medium mb-4">
                          Certifications
                        </h3>
                        <div className="space-y-4">
                          {profileData.certifications.map((cert, index) => (
                            <div key={index} className="flex items-start">
                              <div className="rounded-full bg-primary/10 p-2 mr-3">
                                <Briefcase className="h-4 w-4 text-primary" />
                              </div>
                              <div>
                                <h4 className="font-medium">{cert.name}</h4>
                                <p className="text-sm text-muted-foreground">
                                  {cert.provider} • {cert.completionYear}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                  {(!profileData?.degree ||
                    !profileData?.certifications ||
                    profileData.certifications.length === 0) && (
                    <div className="text-center py-6">
                      <GraduationCap className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
                      <h3 className="text-lg font-medium">
                        No education details added yet
                      </h3>
                      <p className="text-muted-foreground mt-1">
                        Click the Edit Education button to add your education
                        details
                      </p>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

// Education Form Component
const educationSchema = z.object({
  degree: z.string().optional(),
  university: z.string().optional(),
  graduationYear: z.string().optional(),
  keyCourses: z.string().optional(),
  secondarySchool: z.string().optional(),
  secondaryYears: z.string().optional(),
  secondaryPercentage: z.string().optional(),
});

type EducationFormValues = z.infer<typeof educationSchema>;

interface EditEducationFormProps {
  initialData: any;
  onSave: (data: any) => void;
  onCancel: () => void;
}

const EditEducationForm = ({
  initialData,
  onSave,
  onCancel,
}: EditEducationFormProps) => {
  const [certifications, setCertifications] = useState<any[]>(
    initialData.certifications || [],
  );
  const [newCertName, setNewCertName] = useState("");
  const [newCertProvider, setNewCertProvider] = useState("");
  const [newCertYear, setNewCertYear] = useState("");

  const form = useForm<EducationFormValues>({
    resolver: zodResolver(educationSchema),
    defaultValues: {
      degree: initialData.degree || "",
      university: initialData.university || "",
      graduationYear: initialData.graduationYear || "",
      keyCourses: initialData.keyCourses || "",
      secondarySchool: initialData.secondarySchool || "",
      secondaryYears: initialData.secondaryYears || "",
      secondaryPercentage: initialData.secondaryPercentage || "",
    },
  });

  const addCertification = () => {
    if (newCertName && newCertProvider && newCertYear) {
      setCertifications([
        ...certifications,
        {
          name: newCertName,
          provider: newCertProvider,
          completionYear: newCertYear,
        },
      ]);
      setNewCertName("");
      setNewCertProvider("");
      setNewCertYear("");
    }
  };

  const removeCertification = (index: number) => {
    setCertifications(certifications.filter((_, i) => i !== index));
  };

  const handleSubmit = (data: EducationFormValues) => {
    onSave({
      ...data,
      certifications,
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">College/University Education</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="degree"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Degree</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., B.Tech, M.Tech, BCA" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="university"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>University/College</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter university or college name"
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
              name="graduationYear"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Graduation Year</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., 2024" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="keyCourses"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Key Courses</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g., Data Structures, Algorithms, Database Systems"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Separate courses with commas
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Secondary Education</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="secondarySchool"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>School Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your school name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="secondaryYears"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Years</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., 2018-2020" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="secondaryPercentage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Percentage/Grade</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., 92" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Certifications</h3>

          {certifications.length > 0 && (
            <div className="space-y-2">
              {certifications.map((cert, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 border rounded-md"
                >
                  <div>
                    <p className="font-medium">{cert.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {cert.provider} • {cert.completionYear}
                    </p>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeCertification(index)}
                  >
                    <XCircle className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <FormLabel>Certification Name</FormLabel>
              <Input
                placeholder="e.g., AWS Certified Developer"
                value={newCertName}
                onChange={(e) => setNewCertName(e.target.value)}
              />
            </div>
            <div>
              <FormLabel>Provider</FormLabel>
              <Input
                placeholder="e.g., Amazon Web Services"
                value={newCertProvider}
                onChange={(e) => setNewCertProvider(e.target.value)}
              />
            </div>
            <div>
              <FormLabel>Completion Year</FormLabel>
              <div className="flex space-x-2">
                <Input
                  placeholder="e.g., 2023"
                  value={newCertYear}
                  onChange={(e) => setNewCertYear(e.target.value)}
                />
                <Button
                  type="button"
                  onClick={addCertification}
                  disabled={!newCertName || !newCertProvider || !newCertYear}
                >
                  Add
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-2">
          <Button variant="outline" type="button" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">
            <Save className="mr-2 h-4 w-4" /> Save Changes
          </Button>
        </div>
      </form>
    </Form>
  );
};

// Edit Profile Form Component
const profileSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email" }),
  phone: z.string().min(10, { message: "Please enter a valid phone number" }),
  rollNumber: z.string().min(2, { message: "Roll number is required" }),
  department: z.string().min(2, { message: "Department is required" }),
  year: z.string().min(1, { message: "Year is required" }),
  cgpa: z
    .string()
    .refine(
      (val) =>
        !isNaN(parseFloat(val)) &&
        parseFloat(val) >= 0 &&
        parseFloat(val) <= 10,
      {
        message: "CGPA must be a number between 0 and 10",
      },
    ),
  skills: z.string().optional(),
  bio: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

interface EditProfileFormProps {
  initialData: any;
  onSave: (data: ProfileFormValues) => void;
  onCancel: () => void;
}

const EditProfileForm = ({
  initialData,
  onSave,
  onCancel,
}: EditProfileFormProps) => {
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: initialData.name || "",
      email: initialData.email || "",
      phone: initialData.phone || "",
      rollNumber: initialData.rollNumber || "",
      department: initialData.department || "",
      year: initialData.year || "",
      cgpa: initialData.cgpa || "",
      skills: initialData.skills || "",
      bio: initialData.bio || "",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSave)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your full name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Enter your email"
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
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your phone number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="rollNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Roll Number</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your roll number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="department"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Department</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Computer Science">
                      Computer Science
                    </SelectItem>
                    <SelectItem value="Electrical Engineering">
                      Electrical Engineering
                    </SelectItem>
                    <SelectItem value="Mechanical Engineering">
                      Mechanical Engineering
                    </SelectItem>
                    <SelectItem value="Civil Engineering">
                      Civil Engineering
                    </SelectItem>
                    <SelectItem value="Electronics and Communication">
                      Electronics and Communication
                    </SelectItem>
                    <SelectItem value="Information Technology">
                      Information Technology
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="year"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Year of Study</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select year" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="1st Year">1st Year</SelectItem>
                    <SelectItem value="2nd Year">2nd Year</SelectItem>
                    <SelectItem value="3rd Year">3rd Year</SelectItem>
                    <SelectItem value="4th Year">4th Year</SelectItem>
                    <SelectItem value="5th Year">5th Year</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="cgpa"
          render={({ field }) => (
            <FormItem>
              <FormLabel>CGPA</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  step="0.01"
                  min="0"
                  max="10"
                  placeholder="Enter your CGPA"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="skills"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Skills</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter your skills (e.g., JavaScript, React, Python, Machine Learning)"
                  className="min-h-[80px]"
                  {...field}
                />
              </FormControl>
              <FormDescription>Separate skills with commas</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Write a short bio about yourself"
                  className="min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end space-x-2">
          <Button variant="outline" type="button" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">
            <Save className="mr-2 h-4 w-4" /> Save Changes
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default StudentProfile;
