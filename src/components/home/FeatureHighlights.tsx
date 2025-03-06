import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Briefcase, GraduationCap, Building, Users } from "lucide-react";

interface FeatureHighlightsProps {
  features?: {
    title: string;
    description: string;
    icon: React.ReactNode;
    userType: string;
  }[];
}

const FeatureHighlights = ({
  features = [
    {
      title: "Student Dashboard",
      description:
        "Manage your profile, upload resumes, track applications, and receive AI-based resume analysis.",
      icon: <GraduationCap className="h-10 w-10 text-primary" />,
      userType: "students",
    },
    {
      title: "Recruiter Portal",
      description:
        "Post job opportunities, filter candidates, schedule interviews, and manage your recruitment process.",
      icon: <Building className="h-10 w-10 text-primary" />,
      userType: "recruiters",
    },
    {
      title: "Job & Internship Listings",
      description:
        "Browse through available opportunities with advanced filtering and easy application management.",
      icon: <Briefcase className="h-10 w-10 text-primary" />,
      userType: "students",
    },
    {
      title: "Admin Dashboard",
      description:
        "Comprehensive analytics, user management, approval workflows, and announcement capabilities.",
      icon: <Users className="h-10 w-10 text-primary" />,
      userType: "admins",
    },
  ],
}: FeatureHighlightsProps) => {
  return (
    <div className="w-full bg-background py-16 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl mb-4">
            Comprehensive Placement Portal
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Connect students with employers through our professional, responsive
            platform designed specifically for college placement departments.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="overflow-hidden border-2 hover:border-primary/50 transition-all duration-300"
            >
              <CardContent className="p-6">
                <div className="mb-4">{feature.icon}</div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-xl">{feature.title}</h3>
                    <Badge variant="outline">{feature.userType}</Badge>
                  </div>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button size="lg" className="rounded-full px-8">
            Explore Features
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FeatureHighlights;
