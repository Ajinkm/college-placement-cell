import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building, GraduationCap, Users, Award } from "lucide-react";

const AboutPage = () => {
  return (
    <div className="container mx-auto py-12 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">About Our Placement Portal</h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Connecting students with opportunities and helping them build
          successful careers
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <GraduationCap className="mr-2 h-5 w-5 text-primary" />
              Our Mission
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              Our mission is to bridge the gap between academia and industry by
              providing a comprehensive platform that connects talented students
              with leading employers. We strive to empower students with the
              tools, resources, and opportunities they need to launch successful
              careers while helping companies find the perfect candidates for
              their roles.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Building className="mr-2 h-5 w-5 text-primary" />
              Our Vision
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              We envision a future where every student has equal access to
              career opportunities regardless of their background. Our platform
              aims to democratize the recruitment process, making it
              transparent, efficient, and fair for all stakeholders involved.
              We're committed to continuous innovation to meet the evolving
              needs of both students and employers.
            </p>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-2xl font-bold mb-6 text-center">
        What Sets Us Apart
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="mr-2 h-5 w-5 text-primary" />
              Personalized Experience
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              Our platform offers tailored experiences for students, recruiters,
              and administrators. Students receive job recommendations based on
              their skills and preferences, while recruiters can efficiently
              find candidates that match their requirements.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Award className="mr-2 h-5 w-5 text-primary" />
              Quality Assurance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              We maintain high standards by vetting all job postings and
              ensuring that only legitimate opportunities are listed on our
              platform. Our admin approval system guarantees that students have
              access to quality job openings from reputable companies.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <GraduationCap className="mr-2 h-5 w-5 text-primary" />
              Comprehensive Resources
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              Beyond job listings, we provide valuable resources such as resume
              building tools, interview preparation guides, and career
              development resources to help students succeed in their
              professional journeys.
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="bg-muted/30 p-8 rounded-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Our Team</h2>
        <p className="text-center mb-8 max-w-3xl mx-auto">
          Our dedicated team of professionals works tirelessly to improve the
          platform and provide the best possible experience for all users.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {teamMembers.map((member, index) => (
            <div key={index} className="text-center">
              <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-4">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-medium text-lg">{member.name}</h3>
              <p className="text-sm text-muted-foreground">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const teamMembers = [
  {
    name: "Dr. Rajesh Kumar",
    role: "Director, Placement Cell",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rajesh",
  },
  {
    name: "Prof. Anita Sharma",
    role: "Faculty Coordinator",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Anita",
  },
  {
    name: "Mr. Vikram Singh",
    role: "Industry Relations Manager",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Vikram",
  },
  {
    name: "Ms. Priya Patel",
    role: "Student Coordinator",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya",
  },
];

export default AboutPage;
