import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Building,
  MapPin,
  Globe,
  Phone,
  Mail,
  Upload,
  Save,
  Edit,
} from "lucide-react";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";

interface CompanyProfileProps {
  companyName?: string;
  industry?: string;
  description?: string;
  website?: string;
  location?: string;
  phone?: string;
  email?: string;
  logo?: string;
  isEditing?: boolean;
}

const CompanyProfile = ({
  companyName = "Acme Corporation",
  industry = "Technology",
  description = "Acme Corporation is a leading technology company specializing in innovative software solutions for businesses of all sizes. We provide cutting-edge products and services that help organizations streamline their operations and achieve their goals.",
  website = "https://www.acmecorp.com",
  location = "San Francisco, CA",
  phone = "+1 (555) 123-4567",
  email = "info@acmecorp.com",
  logo = "https://api.dicebear.com/7.x/avataaars/svg?seed=acme",
  isEditing = false,
}: CompanyProfileProps) => {
  const [editing, setEditing] = useState(isEditing);
  const [activeTab, setActiveTab] = useState("profile");
  const [logoPreview, setLogoPreview] = useState(logo);

  const form = useForm({
    defaultValues: {
      companyName,
      industry,
      description,
      website,
      location,
      phone,
      email,
    },
  });

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real implementation, this would upload to a server
      // For now, we'll just create a local URL for preview
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === "string") {
          setLogoPreview(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = (data: any) => {
    console.log("Form submitted:", data);
    // In a real implementation, this would save to a database

    // Save the company profile data to localStorage
    const profileData = {
      ...data,
      logo: logoPreview,
    };

    localStorage.setItem("companyProfile", JSON.stringify(profileData));
    localStorage.setItem("hasCompanyProfile", "true");

    // Update the user object in localStorage with the company name
    const userStr = localStorage.getItem("user");
    if (userStr) {
      const user = JSON.parse(userStr);
      user.name = data.companyName;
      localStorage.setItem("user", JSON.stringify(user));
    }

    setEditing(false);
    alert("Company profile updated successfully!");
  };

  return (
    <div className="w-full h-full bg-background p-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Company Profile</h1>
          <TabsList>
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="jobs">Posted Jobs</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>Company Information</CardTitle>
                  <CardDescription>
                    Manage your company's public profile information
                  </CardDescription>
                </div>
                {!editing && (
                  <Button variant="outline" onClick={() => setEditing(true)}>
                    <Edit className="mr-2 h-4 w-4" /> Edit Profile
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {editing ? (
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                  >
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="md:w-1/3 flex flex-col items-center space-y-4">
                        <div className="relative w-40 h-40 rounded-lg overflow-hidden border-2 border-muted">
                          <img
                            src={logoPreview}
                            alt="Company Logo"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="w-full">
                          <label
                            htmlFor="logo-upload"
                            className="cursor-pointer"
                          >
                            <div className="flex items-center justify-center w-full">
                              <Button
                                variant="outline"
                                className="w-full"
                                type="button"
                              >
                                <Upload className="mr-2 h-4 w-4" /> Upload Logo
                              </Button>
                              <input
                                id="logo-upload"
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handleLogoChange}
                              />
                            </div>
                          </label>
                        </div>
                      </div>
                      <div className="md:w-2/3 space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="companyName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Company Name</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="Enter company name"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="industry"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Industry</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="Enter industry"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <FormField
                          control={form.control}
                          name="description"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Company Description</FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder="Enter company description"
                                  className="min-h-[120px]"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="website"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Website</FormLabel>
                                <FormControl>
                                  <div className="flex">
                                    <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-input bg-muted text-muted-foreground text-sm">
                                      <Globe className="h-4 w-4" />
                                    </span>
                                    <Input
                                      className="rounded-l-none"
                                      placeholder="www.example.com"
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
                            name="location"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Location</FormLabel>
                                <FormControl>
                                  <div className="flex">
                                    <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-input bg-muted text-muted-foreground text-sm">
                                      <MapPin className="h-4 w-4" />
                                    </span>
                                    <Input
                                      className="rounded-l-none"
                                      placeholder="City, Country"
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
                            name="phone"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Phone</FormLabel>
                                <FormControl>
                                  <div className="flex">
                                    <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-input bg-muted text-muted-foreground text-sm">
                                      <Phone className="h-4 w-4" />
                                    </span>
                                    <Input
                                      className="rounded-l-none"
                                      placeholder="+1 (123) 456-7890"
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
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                  <div className="flex">
                                    <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-input bg-muted text-muted-foreground text-sm">
                                      <Mail className="h-4 w-4" />
                                    </span>
                                    <Input
                                      className="rounded-l-none"
                                      placeholder="contact@example.com"
                                      {...field}
                                    />
                                  </div>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                    </div>
                    <CardFooter className="flex justify-end space-x-4 px-0">
                      <Button
                        variant="outline"
                        type="button"
                        onClick={() => setEditing(false)}
                      >
                        Cancel
                      </Button>
                      <Button type="submit">
                        <Save className="mr-2 h-4 w-4" /> Save Changes
                      </Button>
                    </CardFooter>
                  </form>
                </Form>
              ) : (
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="md:w-1/3 flex flex-col items-center">
                    <div className="w-40 h-40 rounded-lg overflow-hidden border-2 border-muted">
                      <img
                        src={logoPreview}
                        alt="Company Logo"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="md:w-2/3 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">
                          Company Name
                        </h3>
                        <p className="text-base">{companyName}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">
                          Industry
                        </h3>
                        <p className="text-base">{industry}</p>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">
                        Description
                      </h3>
                      <p className="text-base">{description}</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center">
                        <Globe className="h-4 w-4 mr-2 text-muted-foreground" />
                        <a
                          href={website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline"
                        >
                          {website}
                        </a>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>{location}</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center">
                        <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>{phone}</span>
                      </div>
                      <div className="flex items-center">
                        <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                        <a
                          href={`mailto:${email}`}
                          className="text-primary hover:underline"
                        >
                          {email}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="jobs" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Posted Jobs</CardTitle>
              <CardDescription>
                Manage your job and internship postings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <Building className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-medium">No jobs posted yet</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Create your first job posting to start receiving applications
                </p>
                <Button className="mt-4">Post a New Job</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Recruitment Analytics</CardTitle>
              <CardDescription>
                Track your recruitment performance and applicant statistics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <Building className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-medium">
                  No analytics available
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Post jobs and receive applications to view analytics
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CompanyProfile;
