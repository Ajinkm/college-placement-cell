import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  CalendarIcon,
  BriefcaseIcon,
  GraduationCapIcon,
  ClockIcon,
  MapPinIcon,
  BanknoteIcon,
  UsersIcon,
} from "lucide-react";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Form schema validation
const formSchema = z.object({
  title: z
    .string()
    .min(5, { message: "Job title must be at least 5 characters" }),
  company: z.string().min(2, { message: "Company name is required" }),
  location: z.string().min(2, { message: "Location is required" }),
  type: z.string(),
  category: z.string(),
  experience: z.string(),
  salary: z.string().optional(),
  deadline: z.string(),
  positions: z.string(),
  description: z
    .string()
    .min(50, { message: "Description must be at least 50 characters" }),
  requirements: z
    .string()
    .min(50, { message: "Requirements must be at least 50 characters" }),
  benefits: z.string().optional(),
  applicationProcess: z.string().optional(),
});

interface JobPostingFormProps {
  initialData?: z.infer<typeof formSchema>;
  onSubmit?: (data: z.infer<typeof formSchema>) => void;
  isEditing?: boolean;
}

const JobPostingForm = ({
  initialData = {
    title: "",
    company: "Your Company",
    location: "Remote",
    type: "full-time",
    category: "engineering",
    experience: "entry-level",
    salary: "",
    deadline: "",
    positions: "1",
    description: "",
    requirements: "",
    benefits: "",
    applicationProcess: "",
  },
  onSubmit = (data) => console.log("Form submitted:", data),
  isEditing = false,
}: JobPostingFormProps) => {
  const [activeTab, setActiveTab] = useState("basic");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      onSubmit(data);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-background">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">
            {isEditing ? "Edit Job Posting" : "Create New Job Posting"}
          </CardTitle>
          <CardDescription>
            {isEditing
              ? "Update the details of your job posting"
              : "Fill in the details to create a new job or internship posting"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-6"
            >
              <Tabs
                defaultValue="basic"
                value={activeTab}
                onValueChange={setActiveTab}
              >
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="basic">
                    <BriefcaseIcon className="mr-2 h-4 w-4" />
                    Basic Info
                  </TabsTrigger>
                  <TabsTrigger value="details">
                    <ClockIcon className="mr-2 h-4 w-4" />
                    Job Details
                  </TabsTrigger>
                  <TabsTrigger value="description">
                    <GraduationCapIcon className="mr-2 h-4 w-4" />
                    Description
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="basic" className="space-y-4 mt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Job Title</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="e.g. Software Engineer"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="company"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Company Name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="e.g. Tech Solutions Inc."
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
                      name="location"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Location</FormLabel>
                          <FormControl>
                            <div className="flex items-center">
                              <MapPinIcon className="mr-2 h-4 w-4 text-muted-foreground" />
                              <Input
                                placeholder="e.g. Remote, New York, NY"
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
                      name="type"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Job Type</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select job type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="full-time">
                                Full-time
                              </SelectItem>
                              <SelectItem value="part-time">
                                Part-time
                              </SelectItem>
                              <SelectItem value="contract">Contract</SelectItem>
                              <SelectItem value="internship">
                                Internship
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="flex justify-end">
                    <Button
                      type="button"
                      onClick={() => setActiveTab("details")}
                    >
                      Next: Job Details
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="details" className="space-y-4 mt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Job Category</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select category" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="engineering">
                                Engineering
                              </SelectItem>
                              <SelectItem value="design">Design</SelectItem>
                              <SelectItem value="marketing">
                                Marketing
                              </SelectItem>
                              <SelectItem value="sales">Sales</SelectItem>
                              <SelectItem value="finance">Finance</SelectItem>
                              <SelectItem value="hr">
                                Human Resources
                              </SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="experience"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Experience Level</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select experience level" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="internship">
                                Internship
                              </SelectItem>
                              <SelectItem value="entry-level">
                                Entry Level
                              </SelectItem>
                              <SelectItem value="mid-level">
                                Mid Level
                              </SelectItem>
                              <SelectItem value="senior">Senior</SelectItem>
                              <SelectItem value="executive">
                                Executive
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <FormField
                      control={form.control}
                      name="salary"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Salary Range (Optional)</FormLabel>
                          <FormControl>
                            <div className="flex items-center">
                              <BanknoteIcon className="mr-2 h-4 w-4 text-muted-foreground" />
                              <Input
                                placeholder="e.g. $50,000 - $70,000"
                                {...field}
                              />
                            </div>
                          </FormControl>
                          <FormDescription>
                            Leave blank to display as "Competitive"
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="deadline"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Application Deadline</FormLabel>
                          <FormControl>
                            <div className="flex items-center">
                              <CalendarIcon className="mr-2 h-4 w-4 text-muted-foreground" />
                              <Input type="date" {...field} />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="positions"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Number of Positions</FormLabel>
                          <FormControl>
                            <div className="flex items-center">
                              <UsersIcon className="mr-2 h-4 w-4 text-muted-foreground" />
                              <Input type="number" min="1" {...field} />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="flex justify-between">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setActiveTab("basic")}
                    >
                      Back: Basic Info
                    </Button>
                    <Button
                      type="button"
                      onClick={() => setActiveTab("description")}
                    >
                      Next: Description
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="description" className="space-y-4 mt-4">
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Job Description</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Describe the role, responsibilities, and what the job entails..."
                            className="min-h-[120px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="requirements"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Requirements</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="List the skills, qualifications, and experience required..."
                            className="min-h-[120px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="benefits"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Benefits (Optional)</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="List the benefits, perks, and advantages of working with your company..."
                            className="min-h-[100px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="applicationProcess"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Application Process (Optional)</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Describe the application and interview process..."
                            className="min-h-[100px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex justify-between">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setActiveTab("details")}
                    >
                      Back: Job Details
                    </Button>
                    <Button type="submit" disabled={isSubmitting}>
                      {isSubmitting
                        ? "Submitting..."
                        : isEditing
                          ? "Update Job Posting"
                          : "Create Job Posting"}
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex justify-between border-t pt-6">
          <Button
            variant="outline"
            type="button"
            onClick={() => form.reset(initialData)}
          >
            Reset Form
          </Button>
          {activeTab === "description" && (
            <Button
              type="button"
              onClick={form.handleSubmit(handleSubmit)}
              disabled={isSubmitting}
            >
              {isSubmitting
                ? "Submitting..."
                : isEditing
                  ? "Update Job Posting"
                  : "Create Job Posting"}
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default JobPostingForm;
